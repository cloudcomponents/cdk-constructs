import { RemovalPolicy } from 'aws-cdk-lib';
import { Vpc, SubnetType, IVpc, GatewayVpcEndpoint, GatewayVpcEndpointAwsService, SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { FileSystem, LifecyclePolicy, PerformanceMode, IAccessPoint } from 'aws-cdk-lib/aws-efs';
import { AnyPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

import { DefinitionBucket } from './definition-bucket';

export interface SandboxProps {
  readonly encryptedFileSystem?: boolean;
}

export class Sandbox extends Construct {
  public readonly vpc: IVpc;
  public readonly s3Endpoint: GatewayVpcEndpoint;
  public readonly lambdaAccessPoint: IAccessPoint;
  public readonly definitionBucket: DefinitionBucket;

  constructor(scope: Construct, id: string, props: SandboxProps = {}) {
    super(scope, id);

    this.vpc = new Vpc(this, 'VPC', {
      subnetConfiguration: [
        {
          subnetType: SubnetType.PRIVATE_ISOLATED,
          name: 'Sandbox',
        },
      ],
    });

    this.vpc.addFlowLog('FlowLog');

    this.s3Endpoint = this.vpc.addGatewayEndpoint('S3Endpoint', {
      service: GatewayVpcEndpointAwsService.S3,
    });

    this.definitionBucket = new DefinitionBucket(this, 'DefinitionBucket', {
      vpcEndpoint: this.s3Endpoint.vpcEndpointId,
    });

    this.s3Endpoint.addToPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['s3:GetObject', 's3:ListBucket'],
        resources: [this.definitionBucket.arnForObjects('*'), this.definitionBucket.bucketArn],
        principals: [new AnyPrincipal()],
      }),
    );

    const fileSystem = new FileSystem(this, 'FileSystem', {
      vpc: this.vpc,
      lifecyclePolicy: LifecyclePolicy.AFTER_7_DAYS,
      performanceMode: PerformanceMode.GENERAL_PURPOSE,
      removalPolicy: RemovalPolicy.DESTROY,
      securityGroup: new SecurityGroup(this, 'SecurityGroup', {
        vpc: this.vpc,
        allowAllOutbound: false,
      }),
      encrypted: props.encryptedFileSystem ?? true,
    });

    this.lambdaAccessPoint = fileSystem.addAccessPoint('ScanLambdaAP', {
      createAcl: {
        ownerGid: '1000',
        ownerUid: '1000',
        permissions: '755',
      },
      posixUser: {
        gid: '1000',
        uid: '1000',
      },
      path: '/lambda',
    });
  }

  public addToS3EnpointPolicy(statement: PolicyStatement): void {
    this.s3Endpoint.addToPolicy(statement);
  }
}
