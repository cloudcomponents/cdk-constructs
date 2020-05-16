![cloudcomponents Logo](../../logo.png?raw=true)

# @cloudcomponents/cdk-static-website

> Cdk component that creates a static website using S3, configures CloudFront (CDN) and maps a custom domain via Route53 (DNS)

## Install

```bash
npm install --save @cloudcomponents/cdk-static-website
```

## How to use

```javascript
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
```

### Lambda@Edge function

```javascript
website.addLambdaFunctionAssociation({
    functionArn: 'arn:aws:lambda:...',
    functionVersion: '1',
    eventType: 'origin-request',
});
```

## License

[MIT](../../LICENSE)
