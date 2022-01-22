import { RemovalPolicy, aws_ec2, aws_ecs, aws_rds } from 'aws-cdk-lib';
import { Construct } from 'constructs';
export interface DatabaseProps {
  readonly vpc: aws_ec2.IVpc;
  readonly databaseName?: string;
  readonly engine?: aws_rds.IInstanceEngine;
  readonly allocatedStorage?: number;
  readonly instanceType?: aws_ec2.InstanceType;
  readonly removalPolicy?: RemovalPolicy;
}

export class Database extends Construct {
  public readonly environment: Record<string, string>;
  public readonly secrets: Record<string, aws_ecs.Secret>;

  private readonly instance: aws_rds.DatabaseInstance;

  constructor(scope: Construct, id: string, props: DatabaseProps) {
    super(scope, id);

    const databaseName = props.databaseName ?? 'wordpress';

    this.instance = new aws_rds.DatabaseInstance(this, 'Database', {
      databaseName,
      vpc: props.vpc,
      engine:
        props.engine ??
        aws_rds.DatabaseInstanceEngine.mariaDb({
          version: aws_rds.MariaDbEngineVersion.VER_10_5,
        }),
      allocatedStorage: props.allocatedStorage ?? 10,
      instanceType: props.instanceType ?? aws_ec2.InstanceType.of(aws_ec2.InstanceClass.BURSTABLE3, aws_ec2.InstanceSize.MICRO),
      deleteAutomatedBackups: props.removalPolicy === RemovalPolicy.DESTROY,
      removalPolicy: props.removalPolicy,
    });

    this.environment = {
      WORDPRESS_DB_NAME: databaseName,
    };

    this.secrets = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      WORDPRESS_DB_HOST: aws_ecs.Secret.fromSecretsManager(this.instance.secret!, 'host'),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      WORDPRESS_DB_USER: aws_ecs.Secret.fromSecretsManager(this.instance.secret!, 'username'),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      WORDPRESS_DB_PASSWORD: aws_ecs.Secret.fromSecretsManager(this.instance.secret!, 'password'),
    };
  }

  public allowDefaultPortFrom(other: aws_ec2.IConnectable, description?: string): void {
    this.instance.connections.allowDefaultPortFrom(other, description);
  }
}
