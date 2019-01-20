import { App, Stack, StackProps } from '@aws-cdk/cdk';
import { StaticWebsite } from '@cloudcomponents/cdk-static-website';

export class StaticWebsiteStack extends Stack {
  constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    new StaticWebsite(this, 'StaticWebsite', {
      domainName: 'cloudcomponents.org',
      siteSubDomain: 'test'
    });
  }
}
