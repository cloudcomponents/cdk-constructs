import {
  App,
  Stack,
  StackProps,
  SSMParameterProvider,
  RemovalPolicy
} from '@aws-cdk/cdk';
import { StaticWebsite } from '@cloudcomponents/cdk-static-website';

export class StaticWebsiteStack extends Stack {
  constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    const certificateArn = new SSMParameterProvider(this, {
      parameterName: '/certificate/cloudcomponents.org'
    }).parameterValue();

    new StaticWebsite(this, 'StaticWebsite', {
      bucketConfiguration: {
        removalPolicy: RemovalPolicy.Destroy
      },
      aliasConfiguration: {
        domainName: 'cloudcomponents.org',
        names: ['www.cloudcomponents.org', 'cloudcomponents.org'],
        acmCertRef: certificateArn
      }
    });
  }
}
