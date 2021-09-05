import { PublicHostedZone } from '@aws-cdk/aws-route53';
import { Construct, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core';

import { Wordpress } from '@cloudcomponents/cdk-wordpress';

export class WordpressStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const hostedZone = PublicHostedZone.fromLookup(this, 'HostedZone', {
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
