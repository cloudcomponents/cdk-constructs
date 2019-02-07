import { App, Stack, StackProps } from '@aws-cdk/cdk';
import { StaticWebsite } from '@cloudcomponents/cdk-static-website';

export class StaticWebsiteStack extends Stack {
  constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    new StaticWebsite(this, 'StaticWebsite', {
      siteName: 'testpage',
      aliasConfiguration: {
        domainName: 'cloudcomponents.org',
        siteSubDomain: 'test'
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
