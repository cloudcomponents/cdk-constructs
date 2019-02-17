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

    // website.addLambdaFunctionAssociation({
    //   functionArn:
    //     'arn:aws:lambda:us-east-1:741759823656:function:LambdaEdgeStack-Redirect7D9319B2-1FI8G8X0T3WCE',
    //   functionVersion: '2',
    //   eventType: 'origin-request'
    // });
  }
}
