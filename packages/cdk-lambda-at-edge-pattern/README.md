[![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)](https://github.com/cloudcomponents/cdk-constructs)

# @cloudcomponents/cdk-lambda-at-edge-pattern 

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-constructs.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-constructs)
[![cdkdx](https://img.shields.io/badge/buildtool-cdkdx-blue.svg)](https://github.com/hupe1980/cdkdx)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-lambda-at-edge-pattern)
[![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)](https://pypi.org/project/cloudcomponents.cdk-lambda-at-edge-pattern/)

> CDK Constructs for Lambda@Edge pattern: HttpHeaders

## Install
TypeScript/JavaScript:

```bash
npm i @cloudcomponents/cdk-lambda-at-edge-pattern 
```

Python:

```bash
pip install cloudcomponents.cdk-lambda-at-edge-pattern 
```

## How to use

```typescript
import { Construct, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core';
import { StringParameter } from '@aws-cdk/aws-ssm';
import { SecurityPolicyProtocol } from '@aws-cdk/aws-cloudfront';
import { StaticWebsite } from '@cloudcomponents/cdk-static-website';
import { HttpHeaders } from '@cloudcomponents/cdk-lambda-at-edge-pattern';

export class StaticWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const certificateArn = StringParameter.valueFromLookup(
      this,
      '/certificate/cloudcomponents.org',
    );

    const website = new StaticWebsite(this, 'StaticWebsite', {
      bucketConfiguration: {
        removalPolicy: RemovalPolicy.DESTROY,
      },
      aliasConfiguration: {
        domainName: 'cloudcomponents.org',
        names: ['www.cloudcomponents.org', 'cloudcomponents.org'],
        acmCertRef: certificateArn,
      },
    });

    // A us-east-1 stack is generated under the hood
    const httpHeaders = new HttpHeaders(this, 'HttpHeaders', {
      httpHeaders: {
        'Content-Security-Policy':
          "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none'; connect-src 'self'",
        'Strict-Transport-Security':
          'max-age=31536000; includeSubdomains; preload',
        'Referrer-Policy': 'same-origin',
        'X-XSS-Protection': '1; mode=block',
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-cache',
      },
    });

    website.addLambdaFunctionAssociation(httpHeaders);
  }
}
```

### Cloudfront Distribution
```typescript
new cloudfront.Distribution(this, 'myDist', {
  defaultBehavior: {
    origin: new origins.S3Origin(myBucket),
    edgeLambdas: [httpHeaders],
  },
});
```

### Cloudfront WebDistribution
```typescript
new cloudfront.CloudFrontWebDistribution(this, 'MyDistribution', {
  originConfigs: [
    {
      s3OriginSource: {
        s3BucketSource: sourceBucket
      },
      behaviors: [
        {
          isDefaultBehavior: true,
          lambdaFunctionAssociations: [httpHeaders],
        }
      ]
    }
  ]
 });
```

## API Reference

See [API.md](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-lambda-at-edge-pattern/API.md).

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-lambda-at-edge-pattern/LICENSE)
