import { Wordpress } from '@cloudcomponents/cdk-wordpress';
import { RemovalPolicy, Stack, StackProps, aws_route53 } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class WordpressStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const hostedZone = aws_route53.PublicHostedZone.fromLookup(this, 'HostedZone', {
      domainName: 'cloudcomponents.org',
    });

    new Wordpress(this, 'Wordpress', {
      domainName: 'blog.cloudcomponents.org',
      domainZone: hostedZone,
      removalPolicy: RemovalPolicy.DESTROY,
      offloadStaticContent: true, // Support for plugin e.g. `WP Offload Media for Amazon S3`
    });
  }
}
