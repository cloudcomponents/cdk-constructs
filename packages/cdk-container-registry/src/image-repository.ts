import * as path from 'path';
import { Construct, RemovalPolicy } from '@aws-cdk/core';
import {
  AwsCustomResource,
  AwsCustomResourcePolicy,
  PhysicalResourceId,
} from '@aws-cdk/custom-resources';
import { Repository, RepositoryProps } from '@aws-cdk/aws-ecr';
import { Rule, EventField, RuleTargetInput } from '@aws-cdk/aws-events';
import { LambdaFunction } from '@aws-cdk/aws-events-targets';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { ITopic } from '@aws-cdk/aws-sns';
import { PolicyStatement, Effect } from '@aws-cdk/aws-iam';

export interface OnFindingOptions {
  readonly alarmTopic: ITopic;

  readonly severity: Severity;

  /**
   * Only watch changes to the image tags specified.
   * Leave it undefined to watch the full repository.
   *
   * @default - Watch the changes to the repository with all image tags
   */
  readonly imageTags?: string[];
}

export interface ImageRepositoryProps extends RepositoryProps {
  /**
   * If a repository contains images, forces the deletion during stack deletion.
   *
   * @default false
   */
  readonly forceDelete?: boolean;
}

export class ImageRepository extends Repository {
  constructor(scope: Construct, id: string, props?: ImageRepositoryProps) {
    const { forceDelete = false, ...rest } = props ?? {};

    super(scope, id, {
      removalPolicy: forceDelete ? RemovalPolicy.DESTROY : undefined,
      ...rest,
    });

    if (forceDelete) {
      new AwsCustomResource(this, 'ForceImageRepositoryDeletion', {
        resourceType: 'Custom::ECRForceImageRepositoryDeletion',
        onDelete: {
          service: 'ECR',
          action: 'deleteRepository',
          parameters: {
            repositoryName: this.repositoryName,
            force: true,
          },
          physicalResourceId: PhysicalResourceId.of(this.repositoryArn),
        },
        policy: AwsCustomResourcePolicy.fromSdkCalls({
          resources: [this.repositoryArn],
        }),
      });
    }
  }

  public onFinding(id: string, options: OnFindingOptions): Rule {
    const { alarmTopic, severity, imageTags } = options;

    const rule = this.onImageScanCompleted(id, { imageTags });

    const severityFilter = new Function(this, 'SevierityFilter', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'severity-filter')),
      handler: 'index.handler',
    });

    severityFilter.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['sns:Publish'],
        resources: [alarmTopic.topicArn],
      }),
    );

    rule.addTarget(
      new LambdaFunction(severityFilter, {
        event: RuleTargetInput.fromObject({
          account: EventField.account,
          region: EventField.region,
          time: EventField.time,
          repositoryName: EventField.fromPath('$.detail.repository-name'),
          imageDigest: EventField.fromPath('$.detail.image-digest'),
          imageTags: EventField.fromPath('$.detail.image-tags'),
          findingSeveriyCounts: EventField.fromPath(
            '$.detail.finding-severity-counts',
          ),
          severity: severity,
          alarmTopicArn: alarmTopic.topicArn,
        }),
      }),
    );

    return rule;
  }
}

export enum Severity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  INFORMATIONAL = 'INFORMATIONAL',
  UNDEFINED = 'UNDEFINED',
}
