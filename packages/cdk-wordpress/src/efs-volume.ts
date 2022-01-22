import { RemovalPolicy, aws_ec2, aws_ecs, aws_efs } from 'aws-cdk-lib';
import { Construct } from 'constructs';
export interface EfsVolumeProps {
  readonly vpc: aws_ec2.IVpc;
  readonly name?: string;
  readonly removalPolicy?: RemovalPolicy;
}

export class EfsVolume extends Construct {
  public readonly name: string;
  public readonly efsVolumeConfiguration: aws_ecs.EfsVolumeConfiguration;

  private readonly fileSystem: aws_efs.FileSystem;

  constructor(scope: Construct, id: string, props: EfsVolumeProps) {
    super(scope, id);

    this.fileSystem = new aws_efs.FileSystem(this, 'FileSystem', {
      vpc: props.vpc,
      performanceMode: aws_efs.PerformanceMode.GENERAL_PURPOSE,
      lifecyclePolicy: aws_efs.LifecyclePolicy.AFTER_30_DAYS,
      throughputMode: aws_efs.ThroughputMode.BURSTING,
      encrypted: true,
      removalPolicy: props.removalPolicy,
    });
    const fileSystemAccessPoint = this.fileSystem.addAccessPoint('AccessPoint');

    this.name = props.name ?? 'efs';

    this.efsVolumeConfiguration = {
      fileSystemId: this.fileSystem.fileSystemId,
      transitEncryption: 'ENABLED',
      authorizationConfig: {
        accessPointId: fileSystemAccessPoint.accessPointId,
      },
    };
  }

  public allowDefaultPortFrom(other: aws_ec2.IConnectable, description?: string): void {
    this.fileSystem.connections.allowDefaultPortFrom(other, description);
  }
}
