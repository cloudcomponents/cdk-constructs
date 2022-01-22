import { aws_cloudfront, aws_route53, aws_route53_targets } from 'aws-cdk-lib';
import { Construct } from 'constructs';
export interface DnsProps {
  readonly domainName: string;
  readonly domainZone: aws_route53.IHostedZone;
  readonly distribution: aws_cloudfront.IDistribution;
}

export class Dns extends Construct {
  constructor(scope: Construct, id: string, props: DnsProps) {
    super(scope, id);

    new aws_route53.ARecord(this, 'ARecord', {
      zone: props.domainZone,
      recordName: props.domainName,
      target: aws_route53.RecordTarget.fromAlias(new aws_route53_targets.CloudFrontTarget(props.distribution)),
    });

    new aws_route53.AaaaRecord(this, 'AaaaRecord', {
      zone: props.domainZone,
      recordName: props.domainName,
      target: aws_route53.RecordTarget.fromAlias(new aws_route53_targets.CloudFrontTarget(props.distribution)),
    });
  }
}
