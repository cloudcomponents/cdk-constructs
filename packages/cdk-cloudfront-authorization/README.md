[![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)](https://github.com/cloudcomponents/cdk-constructs)

# @cloudcomponents/cdk-cloudfront-authorization 

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-constructs.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-constructs)
[![cdkdx](https://img.shields.io/badge/buildtool-cdkdx-blue.svg)](https://github.com/hupe1980/cdkdx)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-cloudfront-authorization)
[![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)](https://pypi.org/project/cloudcomponents.cdk-cloudfront-authorization/)

> CloudFront with Cognito authentication using Lambda@Edge

This construct is based on https://github.com/aws-samples/cloudfront-authorization-at-edge.

## Install
TypeScript/JavaScript:

```bash
npm i @cloudcomponents/cdk-cloudfront-authorization 
```

Python:

```bash
pip install cloudcomponents.cdk-cloudfront-authorization 
```

## How to use SPA

```typescript
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { UserPool } from '@aws-cdk/aws-cognito';
import {
  SpaAuthorization,
  SpaDistribution,
} from '@cloudcomponents/cdk-cloudfront-authorization';

export class CloudFrontAuthorizationStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const userPool = new UserPool(this, 'UserPool', {
      selfSignUpEnabled: false,
      userPoolName: 'cloudfront-authorization-userpool',
    });

    // UserPool must have a domain!
    userPool.addDomain('Domain', {
      cognitoDomain: {
        domainPrefix: 'cloudcomponents',
      },
    });

    const authorization = new SpaAuthorization(this, 'Authorization', {
      userPool,
    });

    new SpaDistribution(this, 'Distribution', {
      authorization,
    });
  }
}

```

## How to use StaticSite

```typescript
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { UserPool } from '@aws-cdk/aws-cognito';
import {
  StaticSiteAuthorization,
  StaticSiteDistribution,
} from '@cloudcomponents/cdk-cloudfront-authorization';

export class CloudFrontAuthorizationStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const userPool = new UserPool(this, 'UserPool', {
      selfSignUpEnabled: false,
      userPoolName: 'cloudfront-authorization-userpool',
    });

    // UserPool must have a domain!
    userPool.addDomain('Domain', {
      cognitoDomain: {
        domainPrefix: 'cloudcomponents',
      },
    });

    const authorization = new StaticSiteAuthorization(this, 'Authorization', {
      userPool,
    });

    new StaticSiteDistribution(this, 'Distribution', {
      authorization,
    });
  }
}

```

## API Reference

See [API.md](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-cloudfront-authorization/API.md).

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-cloudfront-authorization/LICENSE)
