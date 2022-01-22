import { RemovalPolicy, aws_backup, aws_certificatemanager, aws_ec2, aws_ecs, aws_route53 } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { Application, StaticContentOffload } from './application';
import { Database } from './database';
import { EfsVolume } from './efs-volume';

export interface WordpressProps {
  readonly domainName: string;
  readonly domainZone: aws_route53.IHostedZone;
  readonly subjectAlternativeNames?: string[];
  readonly vpc?: aws_ec2.IVpc;
  readonly volume?: EfsVolume;
  readonly database?: Database;
  readonly image?: aws_ecs.ContainerImage;
  readonly environment?: Record<string, string>;
  readonly secrets?: Record<string, aws_ecs.Secret>;
  readonly serviceName?: string;
  readonly memoryLimitMiB?: number;
  readonly logDriver?: aws_ecs.LogDriver;
  readonly backupPlan?: aws_backup.BackupPlan;
  readonly cloudFrontHashHeader?: string;
  readonly offloadStaticContent?: boolean;
  readonly removalPolicy?: RemovalPolicy;
}

export class Wordpress extends Construct {
  public readonly application: Application;
  public readonly database: Database;
  public readonly volume: EfsVolume;
  public readonly staticContentOffload?: StaticContentOffload;

  constructor(scope: Construct, id: string, props: WordpressProps) {
    super(scope, id);

    const staticContentDomainName = `static.${props.domainName}`;
    const subjectAlternativeNames = props.subjectAlternativeNames ?? [];
    if (props.offloadStaticContent) {
      subjectAlternativeNames.push(staticContentDomainName);
    }

    const certificate = new aws_certificatemanager.DnsValidatedCertificate(this, 'Certificate', {
      domainName: props.domainName,
      hostedZone: props.domainZone,
      subjectAlternativeNames,
      region: 'us-east-1',
    });

    const vpc =
      props.vpc ??
      new aws_ec2.Vpc(this, 'Vpc', {
        maxAzs: 2,
      });

    this.volume =
      props.volume ??
      new EfsVolume(this, 'Volume', {
        vpc,
        removalPolicy: props.removalPolicy,
      });

    this.database =
      props.database ??
      new Database(this, 'Database', {
        vpc,
        removalPolicy: props.removalPolicy,
      });

    this.application = new Application(this, 'Application', {
      domainName: props.domainName,
      domainZone: props.domainZone,
      certificate,
      vpc,
      volume: this.volume,
      database: this.database,
      image: props.image,
      serviceName: props.serviceName,
      memoryLimitMiB: props.memoryLimitMiB,
      environment: props.environment,
      secrets: props.secrets,
      logDriver: props.logDriver,
      cloudFrontHashHeader: props.cloudFrontHashHeader,
      removalPolicy: props.removalPolicy,
    });

    this.database.allowDefaultPortFrom(this.application.service);
    this.volume.allowDefaultPortFrom(this.application.service);

    if (props.offloadStaticContent) {
      this.staticContentOffload = this.application.enableStaticContentOffload(staticContentDomainName, certificate);
    }

    if (props.backupPlan) {
      if (props.removalPolicy) {
        props.backupPlan.applyRemovalPolicy(props.removalPolicy);
      }
      props.backupPlan.addSelection('BackupPlanSelection', {
        resources: [aws_backup.BackupResource.fromConstruct(this)],
      });
    }
  }
}
