![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)

# @cloudcomponents/cdk-static-website

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-constructs.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-constructs)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-static-website)

> Cdk component that creates a static website using S3, configures CloudFront (CDN) and maps a custom domain via Route53 (DNS)

## Install

```bash
npm install --save @cloudcomponents/cdk-static-website
```

## How to use

### Example 1: With an existing certificate
```typescript
import { Construct, Stack, StackProps, RemovalPolicy } from '@aws-cdk/core';
import { StringParameter } from '@aws-cdk/aws-ssm';
import { StaticWebsite } from '@cloudcomponents/cdk-static-website';

export class StaticWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

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

### Example 2: Cloudfront URL with existing sources and up to date Securitypolicy

```typescript
import { Construct, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core';
import { StringParameter } from '@aws-cdk/aws-ssm';
import { StaticWebsite } from '@cloudcomponents/cdk-static-website';
import { SecurityPolicyProtocol } from '@aws-cdk/aws-cloudfront';

export class StaticWebsiteWithExistingSourcesAndSecurityPolicyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const certificateArn = StringParameter.valueFromLookup(
      this,
      '/certificate/cloudcomponents.org',
    );

    new StaticWebsite(this, 'StaticWebsite', {
      bucketConfiguration: {
        source: '../path/to/your/static/webpage',
        removalPolicy: RemovalPolicy.DESTROY,
      },
      aliasConfiguration: {
        domainName: 'cloudcomponents.org',
        names: ['www.cloudcomponents.org', 'cloudcomponents.org'],
        acmCertRef: certificateArn,
        securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2018
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

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](./LICENSE)