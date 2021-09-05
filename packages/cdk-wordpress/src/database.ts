import { InstanceClass, InstanceSize, InstanceType, IConnectable, IVpc } from '@aws-cdk/aws-ec2';
import { Secret } from '@aws-cdk/aws-ecs';
import { DatabaseInstance, DatabaseInstanceEngine, IInstanceEngine, MariaDbEngineVersion } from '@aws-cdk/aws-rds';
import { Construct, RemovalPolicy } from '@aws-cdk/core';

export interface DatabaseProps {
  readonly vpc: IVpc;
  readonly databaseName?: string;
  readonly engine?: IInstanceEngine;
  readonly allocatedStorage?: number;
  readonly instanceType?: InstanceType;
  readonly removalPolicy?: RemovalPolicy;
}

export class Database extends Construct {
  public readonly environment: Record<string, string>;
  public readonly secrets: Record<string, Secret>;

  private readonly instance: DatabaseInstance;

  constructor(scope: Construct, id: string, props: DatabaseProps) {
    super(scope, id);

    const databaseName = props.databaseName ?? 'wordpress';

    this.instance = new DatabaseInstance(this, 'Database', {
      databaseName,
      vpc: props.vpc,
      engine:
        props.engine ??
        DatabaseInstanceEngine.mariaDb({
          version: MariaDbEngineVersion.VER_10_5,
        }),
      allocatedStorage: props.allocatedStorage ?? 10,
      instanceType: props.instanceType ?? InstanceType.of(InstanceClass.BURSTABLE3, InstanceSize.MICRO),
      deleteAutomatedBackups: props.removalPolicy === RemovalPolicy.DESTROY,
      removalPolicy: props.removalPolicy,
    });

    this.environment = {
      WORDPRESS_DB_NAME: databaseName,
    };

    this.secrets = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      WORDPRESS_DB_HOST: Secret.fromSecretsManager(this.instance.secret!, 'host'),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      WORDPRESS_DB_USER: Secret.fromSecretsManager(this.instance.secret!, 'username'),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      WORDPRESS_DB_PASSWORD: Secret.fromSecretsManager(this.instance.secret!, 'password'),
    };
  }

  public allowDefaultPortFrom(other: IConnectable, description?: string): void {
    this.instance.connections.allowDefaultPortFrom(other, description);
  }
}
