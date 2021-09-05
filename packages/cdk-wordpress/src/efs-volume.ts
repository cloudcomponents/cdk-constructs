import { IConnectable, IVpc } from '@aws-cdk/aws-ec2';
import { EfsVolumeConfiguration } from '@aws-cdk/aws-ecs';
import { FileSystem, PerformanceMode, LifecyclePolicy, ThroughputMode } from '@aws-cdk/aws-efs';
import { Construct, RemovalPolicy } from '@aws-cdk/core';

export interface EfsVolumeProps {
  readonly vpc: IVpc;
  readonly name?: string;
  readonly removalPolicy?: RemovalPolicy;
}

export class EfsVolume extends Construct {
  public readonly name: string;
  public readonly efsVolumeConfiguration: EfsVolumeConfiguration;

  private readonly fileSystem: FileSystem;

  constructor(scope: Construct, id: string, props: EfsVolumeProps) {
    super(scope, id);

    this.fileSystem = new FileSystem(this, 'FileSystem', {
      vpc: props.vpc,
      performanceMode: PerformanceMode.GENERAL_PURPOSE,
      lifecyclePolicy: LifecyclePolicy.AFTER_30_DAYS,
      throughputMode: ThroughputMode.BURSTING,
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

  public allowDefaultPortFrom(other: IConnectable, description?: string): void {
    this.fileSystem.connections.allowDefaultPortFrom(other, description);
  }
}
