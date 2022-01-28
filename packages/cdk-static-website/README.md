[![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)](https://github.com/cloudcomponents/cdk-constructs)

# @cloudcomponents/cdk-static-website 

[![Build Status](https://github.com/cloudcomponents/cdk-constructs/workflows/Build/badge.svg)](https://github.com/cloudcomponents/cdk-constructs/actions?query=workflow=Build)
[![cdkdx](https://img.shields.io/badge/buildtool-cdkdx-blue.svg)](https://github.com/hupe1980/cdkdx)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-static-website)
[![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)](https://pypi.org/project/cloudcomponents.cdk-static-website/)
[![Mentioned in Awesome CDK](https://awesome.re/mentioned-badge.svg)](https://github.com/kolomied/awesome-cdk)

> Cdk component that creates a static website using S3, configures CloudFront (CDN) and maps a custom domain via Route53 (DNS)

## Install
TypeScript/JavaScript:

```bash
npm i @cloudcomponents/cdk-static-website
```

Python:

```bash
pip install cloudcomponents.cdk-static-website
```

## How to use

```typescript
import { StaticWebsite } from '@cloudcomponents/cdk-static-website';
import { RemovalPolicy, Stack, StackProps, aws_route53 } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class StaticWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const hostedZone = aws_route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: 'cloudcomponents.org',
    });

    new StaticWebsite(this, 'StaticWebsite', {
      hostedZone,
      domainNames: ['cloudcomponents.org', 'www.cloudcomponents.org'],
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}
```

### Single page application (SPA)

```typescript
import { StaticWebsite } from '@cloudcomponents/cdk-static-website';
import { RemovalPolicy, Stack, StackProps, aws_route53 } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class StaticWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const hostedZone = aws_route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: 'cloudcomponents.org',
    });

    new StaticWebsite(this, 'StaticWebsite', {
      hostedZone,
      domainNames: ['cloudcomponents.org', 'www.cloudcomponents.org'],
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          ttl: props.ttl ?? Duration.seconds(300),
          responsePagePath: '/index.html',
        },
      ],
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}
```

### Lambda at edge

```typescript
import { StaticWebsite } from '@cloudcomponents/cdk-static-website';
import { OriginMutation } from '@cloudcomponents/cdk-lambda-at-edge-pattern';
import { RemovalPolicy, Stack, StackProps, aws_route53 } from 'aws-cdk-lib';

import { Construct } from 'constructs';

export class StaticWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const hostedZone = aws_route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: 'cloudcomponents.org',
    });

    const originMutation = new OriginMutation(stack, 'OriginMutation');

    new StaticWebsite(this, 'StaticWebsite', {
      hostedZone,
      domainNames: ['cloudcomponents.org', 'www.cloudcomponents.org'],
      edgeLambdas: [originMutation],
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}
```

## API Reference

See [API.md](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-static-website/API.md).

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-static-website/LICENSE)