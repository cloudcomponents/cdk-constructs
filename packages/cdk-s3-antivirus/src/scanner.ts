import * as path from 'path';
import { Duration, Stack } from 'aws-cdk-lib';
import { Port } from 'aws-cdk-lib/aws-ec2';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { ArnPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Code, Function, IFunction, FileSystem, Runtime, IDestination } from 'aws-cdk-lib/aws-lambda';
import { S3EventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { Bucket, EventType } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

import { ClamavLayer } from './clamav-layer';
import { DefinitionInitializer } from './definition-initializer';
import { Sandbox } from './sandbox';

export interface ScannerProps {
  readonly buckets?: Bucket[];
  readonly onResult?: IDestination;
  readonly onError?: IDestination;
  readonly updateSchedule?: Schedule;
  /**
   * @default cc:scan-status
   */
  readonly scanStatusTagName?: string;
}

export class Scanner extends Construct {
  public readonly scanFunction: IFunction;
  public readonly updateFunction: IFunction;
  public readonly sandbox: Sandbox;
  public readonly scanStatusTagName: string;

  constructor(scope: Construct, id: string, props: ScannerProps = {}) {
    super(scope, id);

    this.scanStatusTagName = props.scanStatusTagName ?? 'cc:scna-status';

    this.sandbox = new Sandbox(this, 'Sandbox');

    const layer = new ClamavLayer(this, 'ClamavLayer');

    this.scanFunction = new Function(this, 'ScanFunction', {
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'scan')),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_16_X,
      onSuccess: props.onResult,
      onFailure: props.onError,
      filesystem: FileSystem.fromEfsAccessPoint(this.sandbox.lambdaAccessPoint, '/mnt/lambda'),
      vpc: this.sandbox.vpc,
      vpcSubnets: { subnets: this.sandbox.vpc.isolatedSubnets },
      allowAllOutbound: false,
      timeout: Duration.minutes(15),
      memorySize: 10240,
      environment: {
        SCAN_STATUS_TAG_NAME: this.scanStatusTagName,
        EFS_MOUNT_PATH: '/mnt/lambda',
        EFS_DEFINITIONS_PATH: 'virus_database/',
        DEFINITIONS_URL: this.sandbox.definitionBucket.virtualHostedUrlForObject(),
      },
      layers: [layer],
    });

    this.scanFunction.connections.allowToAnyIpv4(Port.tcp(443), 'Allow outbound HTTPS traffic for S3 access.');
    this.sandbox.definitionBucket.grantRead(this.scanFunction);

    this.updateFunction = new Function(this, 'UpdateFunction', {
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'update')),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_16_X,
      onFailure: props.onError,
      timeout: Duration.minutes(5),
      memorySize: 1024,
      environment: {
        SCAN_STATUS_TAG_NAME: this.scanStatusTagName,
        DEFINITIONS_BUCKET: this.sandbox.definitionBucket.bucketName,
      },
      layers: [layer],
    });

    this.sandbox.definitionBucket.grantReadWrite(this.updateFunction);

    new Rule(this, 'UpdateRule', {
      schedule: props.updateSchedule ?? Schedule.rate(Duration.hours(1)),
      targets: [new LambdaFunction(this.updateFunction)],
    });

    new DefinitionInitializer(this, 'DefinitionInitializer', {
      fn: this.updateFunction,
    });

    props.buckets?.forEach((bucket) => {
      this.addSourceBucket(bucket);
    });
  }

  public addSourceBucket(bucket: Bucket): void {
    this.scanFunction.addEventSource(new S3EventSource(bucket, { events: [EventType.OBJECT_CREATED] }));

    bucket.grantRead(this.scanFunction);

    this.scanFunction.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['s3:PutObjectTagging', 's3:PutObjectVersionTagging'],
        resources: [bucket.arnForObjects('*')],
      }),
    );

    if (this.scanFunction.role) {
      const stack = Stack.of(this);
      const scanAssumedRole = `arn:${stack.partition}:sts::${stack.account}:assumed-role/${this.scanFunction.role.roleName}/${this.scanFunction.functionName}`;
      const scanAssumedPrincipal = new ArnPrincipal(scanAssumedRole);

      this.sandbox.addToS3EnpointPolicy(
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['s3:GetObject*', 's3:GetBucket*', 's3:List*'],
          resources: [bucket.bucketArn, bucket.arnForObjects('*')],
          principals: [this.scanFunction.role, scanAssumedPrincipal],
        }),
      );

      this.sandbox.addToS3EnpointPolicy(
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['s3:PutObjectTagging', 's3:PutObjectVersionTagging'],
          resources: [bucket.arnForObjects('*')],
          principals: [this.scanFunction.role, scanAssumedPrincipal],
        }),
      );

      bucket.addToResourcePolicy(
        new PolicyStatement({
          effect: Effect.DENY,
          actions: ['s3:GetObject'],
          resources: [bucket.arnForObjects('*')],
          notPrincipals: [this.scanFunction.role, scanAssumedPrincipal],
          conditions: {
            StringEquals: {
              [`s3:ExistingObjectTag/${this.scanStatusTagName}`]: ['IN PROGRESS', 'INFECTED', 'ERROR'],
            },
          },
        }),
      );
    }
  }
}
