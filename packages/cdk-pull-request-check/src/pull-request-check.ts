import * as path from 'path';
import { BuildSpec, ComputeType, IBuildImage, LinuxBuildImage, Project, Source, BuildEnvironmentVariable, IArtifacts } from '@aws-cdk/aws-codebuild';
import { IRepository } from '@aws-cdk/aws-codecommit';
import { IVpc, SubnetSelection, ISecurityGroup } from '@aws-cdk/aws-ec2';
import { EventField, RuleTargetInput, OnEventOptions, Rule } from '@aws-cdk/aws-events';
import { CodeBuildProject, LambdaFunction } from '@aws-cdk/aws-events-targets';
import { PolicyStatement, Effect, IRole } from '@aws-cdk/aws-iam';
import { Code, Function, IFunction, Runtime } from '@aws-cdk/aws-lambda';
import { Construct } from '@aws-cdk/core';

export interface PullRequestCheckProps {
  /**
   * The CodeCommit repository.
   */
  readonly repository: IRepository;

  /**
   * The human-visible name of this PullRequest-Project.
   *  * @default taken from {@link #repository:#repositoryName}-pull-request
   */
  readonly projectName?: string;

  /**
   * Filename or contents of buildspec in JSON format.
   * @see https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec-ref-example
   */
  readonly buildSpec: BuildSpec;

  /**
   * Build environment to use for the build.
   *
   * @default BuildEnvironment.LinuxBuildImage.STANDARD_2_0
   */
  readonly buildImage?: IBuildImage;

  /**
   * The type of compute to use for this build.
   * See the {@link ComputeType} enum for the possible values.
   *
   * @default taken from {@link #buildImage#defaultComputeType}
   */
  readonly computeType?: ComputeType;

  /**
   * Indicates how the project builds Docker images. Specify true to enable
   * running the Docker daemon inside a Docker container. This value must be
   * set to true only if this build project will be used to build Docker
   * images, and the specified build environment image is not one provided by
   * AWS CodeBuild with Docker support. Otherwise, all associated builds that
   * attempt to interact with the Docker daemon will fail.
   *
   * @default false
   */
  readonly privileged?: boolean;

  /**
   * Indicates whether the approval state [APPROVE, REVOKE] should be updated
   *
   * @default true
   */
  readonly updateApprovalState?: boolean;

  /**
   * Specifies whether comments should be written in the request
   *
   * @default true
   */
  readonly postComment?: boolean;

  /** The IAM service Role of the Project. */
  readonly role?: IRole;

  /**
   * VPC network to place codebuild network interfaces.
   * Specify this if the codebuild project needs to access resources in a VPC.
   *
   * @default No VPC is specified
   */
  readonly vpc?: IVpc;

  /**
   * Where to place the network interfaces within the VPC.
   * Only used if 'vpc' is supplied.
   *
   * @default All private subnets
   */
  readonly subnetSelection?: SubnetSelection;

  /**
   * What security group to associate with the codebuild project's network interfaces.
   * If no security group is identified, one will be created automatically.
   * Only used if 'vpc' is supplied.
   *
   * @default Security group will be automatically created
   */
  readonly securityGroups?: ISecurityGroup[];
  /**
   * Whether to allow the CodeBuild to send all network traffic.
   * If set to false, you must individually add traffic rules to allow the CodeBuild project to connect to network targets.
   * Only used if 'vpc' is supplied.
   *
   * @default true
   */
  readonly allowAllOutbound?: boolean;

  /**
   * The environment variables that your builds can use.
   */
  readonly environmentVariables?: {
    [name: string]: BuildEnvironmentVariable;
  };

  /**
   * Defines where build artifacts will be stored.
   *
   * Could be: PipelineBuildArtifacts, NoArtifacts and S3Artifacts.
   *
   * @default NoArtifacts
   */
  readonly artifacts?: IArtifacts;
}

/**
 * Represents a reference to a PullRequestCheck.
 */
export class PullRequestCheck extends Construct {
  public readonly codeBuildResultFunction?: IFunction;

  private pullRequestProject: Project;

  constructor(scope: Construct, id: string, props: PullRequestCheckProps) {
    super(scope, id);

    const {
      repository,
      buildSpec,
      buildImage = LinuxBuildImage.STANDARD_4_0,
      computeType = buildImage.defaultComputeType,
      privileged = false,
      updateApprovalState = true,
      postComment = true,
      projectName = `${repository.repositoryName}-pull-request`,
      role,
      vpc,
      subnetSelection,
      securityGroups,
      allowAllOutbound,
      environmentVariables,
      artifacts,
    } = props;

    this.pullRequestProject = new Project(this, 'PullRequestProject', {
      projectName,
      source: Source.codeCommit({
        repository,
      }),
      environment: {
        buildImage,
        computeType,
        privileged,
        environmentVariables,
      },
      buildSpec,
      role,
      vpc,
      subnetSelection,
      securityGroups,
      allowAllOutbound,
      artifacts,
    });

    if (updateApprovalState || postComment) {
      this.codeBuildResultFunction = new Function(this, 'CodeBuildResultFunction', {
        runtime: Runtime.NODEJS_14_X,
        code: Code.fromAsset(path.join(__dirname, 'lambdas', 'code-build-result')),
        handler: 'index.handler',
        environment: {
          UPDATE_APPROVAL_STATE: updateApprovalState ? 'TRUE' : 'FALSE',
          POST_COMMENT: postComment ? 'TRUE' : 'FALSE',
        },
      });

      this.codeBuildResultFunction.addToRolePolicy(
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: [repository.repositoryArn],
          actions: ['codecommit:PostCommentForPullRequest', 'codecommit:UpdatePullRequestApprovalState'],
        }),
      );

      this.pullRequestProject.onStateChange('PullRequestValidationRule', {
        target: new LambdaFunction(this.codeBuildResultFunction),
      });
    }

    const rule = repository.onPullRequestStateChange(`${this.node.addr}Rule`, {
      eventPattern: {
        detail: {
          event: ['pullRequestSourceBranchUpdated', 'pullRequestCreated'],
        },
      },
    });

    rule.addTarget(
      new CodeBuildProject(this.pullRequestProject, {
        event: RuleTargetInput.fromObject({
          sourceVersion: EventField.fromPath('$.detail.sourceCommit'),
          environmentVariablesOverride: [
            {
              name: 'pullRequestId',
              value: EventField.fromPath('$.detail.pullRequestId'),
              type: 'PLAINTEXT',
            },
            {
              name: 'repositoryName',
              value: EventField.fromPath('$.detail.repositoryNames[0]'),
              type: 'PLAINTEXT',
            },
            {
              name: 'sourceCommit',
              value: EventField.fromPath('$.detail.sourceCommit'),
              type: 'PLAINTEXT',
            },
            {
              name: 'destinationCommit',
              value: EventField.fromPath('$.detail.destinationCommit'),
              type: 'PLAINTEXT',
            },
            {
              name: 'revisionId',
              value: EventField.fromPath('$.detail.revisionId'),
              type: 'PLAINTEXT',
            },
          ],
        }),
      }),
    );
  }

  /**
   * Defines an event rule which triggers when a check fails.
   */
  public onCheckFailed(id: string, options?: OnEventOptions): Rule {
    return this.pullRequestProject.onBuildFailed(id, options);
  }

  /**
   * Defines an event rule which triggers when a check starts.
   */
  public onCheckStarted(id: string, options?: OnEventOptions): Rule {
    return this.pullRequestProject.onBuildStarted(id, options);
  }

  /**
   * Defines an event rule which triggers when a check complets successfully.
   */
  public onCheckSucceeded(id: string, options?: OnEventOptions): Rule {
    return this.pullRequestProject.onBuildSucceeded(id, options);
  }

  /**
   * Add a permission only if there's a policy attached.
   * @param statement The permissions statement to add
   */
  public addToRolePolicy(statement: PolicyStatement): void {
    this.pullRequestProject.addToRolePolicy(statement);
  }
}
