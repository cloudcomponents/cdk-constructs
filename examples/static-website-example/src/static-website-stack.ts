import { StaticWebsite } from '@cloudcomponents/cdk-static-website';
import { RemovalPolicy, Stack, StackProps, aws_route53 } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class StaticWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const hostedZone = aws_route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: 'cloudcomponents.org',
    });

    new StaticWebsite(this, 'StaticWebsite', {
      hostedZone,
      domainNames: ['cloudcomponents.org', 'www.cloudcomponents.org'],
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}
