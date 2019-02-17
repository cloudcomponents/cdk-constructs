# @cloudcomponents/cdk-static-website

> Cdk component that creates a static website using S3, configures CloudFront (CDN) and maps a custom domain via Route53 (DNS)

## Install

```bash
npm install --save @cloudcomponents/cdk-static-website
```

## How to use

```javascript
import * as path from 'path';
import { App, Stack, StackProps, SSMParameterProvider } from '@aws-cdk/cdk';
import { StaticWebsite } from '@cloudcomponents/cdk-static-website';

export class StaticWebsiteStack extends Stack {
  constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    const certificateArn = new SSMParameterProvider(this, {
      parameterName: '/certificate/cloudcomponents.org'
    }).parameterValue();

    const website = new StaticWebsite(this, 'StaticWebsite', {
      bucketConfiguration: {
        source: path.join(__dirname, '..', 'website', 'build')
      },
      aliasConfiguration: {
        domainName: 'cloudcomponents.org',
        names: ['www.cloudcomponents.org', 'cloudcomponents.org'],
        acmCertRef: certificateArn
      }
    });
  }
}
```

### Lambda@Edge function

```javascript
website.addLambdaFunctionAssociation({
  functionArn: 'arn:aws:lambda:...',
  functionVersion: '1',
  eventType: 'origin-request'
});
```

## License

[MIT](../../LICENSE)
