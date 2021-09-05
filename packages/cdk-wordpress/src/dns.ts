import { IDistribution } from '@aws-cdk/aws-cloudfront';
import { AaaaRecord, ARecord, IHostedZone, RecordTarget } from '@aws-cdk/aws-route53';
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets';
import { Construct } from '@aws-cdk/core';

export interface DnsProps {
  readonly domainName: string;
  readonly domainZone: IHostedZone;
  readonly distribution: IDistribution;
}

export class Dns extends Construct {
  constructor(scope: Construct, id: string, props: DnsProps) {
    super(scope, id);

    new ARecord(this, 'ARecord', {
      zone: props.domainZone,
      recordName: props.domainName,
      target: RecordTarget.fromAlias(new CloudFrontTarget(props.distribution)),
    });

    new AaaaRecord(this, 'AaaaRecord', {
      zone: props.domainZone,
      recordName: props.domainName,
      target: RecordTarget.fromAlias(new CloudFrontTarget(props.distribution)),
    });
  }
}
