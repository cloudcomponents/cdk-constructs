import { App, Stack, StackProps, RemovalPolicy } from '@aws-cdk/core';
import { StringParameter } from '@aws-cdk/aws-ssm';
import { StaticWebsite } from '@cloudcomponents/cdk-static-website';

export class StaticWebsiteStack extends Stack {
  public constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    const certificateArn = StringParameter.valueFromLookup(
      this,
      '/certificate/cloudcomponents.org',
    );

    new StaticWebsite(this, 'StaticWebsite', {
      bucketConfiguration: {
        removalPolicy: RemovalPolicy.DESTROY,
      },
      aliasConfiguration: {
        domainName: 'cloudcomponents.org',
        names: ['www.cloudcomponents.org', 'cloudcomponents.org'],
        acmCertRef: certificateArn,
      },
    });
  }
}
