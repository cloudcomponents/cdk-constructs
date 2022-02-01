[![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)](https://github.com/cloudcomponents/cdk-constructs)

# @cloudcomponents/cdk-cloudfront-authorization

[![Build Status](https://github.com/cloudcomponents/cdk-constructs/workflows/Build/badge.svg)](https://github.com/cloudcomponents/cdk-constructs/actions?query=workflow=Build)
[![cdkdx](https://img.shields.io/badge/buildtool-cdkdx-blue.svg)](https://github.com/hupe1980/cdkdx)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-cloudfront-authorization)
[![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)](https://pypi.org/project/cloudcomponents.cdk-cloudfront-authorization/)
[![Mentioned in Awesome CDK](https://awesome.re/mentioned-badge.svg)](https://github.com/kolomied/awesome-cdk) 

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
import { SpaAuthorization, SpaDistribution } from '@cloudcomponents/cdk-cloudfront-authorization';
import { Stack, StackProps, aws_cognito } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class CloudFrontAuthorizationStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const userPool = new aws_cognito.UserPool(this, 'UserPool', {
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
import { SpaAuthorization, SpaDistribution } from '@cloudcomponents/cdk-cloudfront-authorization';
import { Stack, StackProps, aws_cognito } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class CloudFrontAuthorizationStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const userPool = new aws_cognito.UserPool(this, 'UserPool', {
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

## Identity Providers
Identity providers can be specified in the authorization object. To make sure that the user pool client is created after the identity provider, please specify a dependency using "addDependency".

```typescript
const identityProvider = UserPoolIdentityProviderAmazon(this, "IdentityProvider", {
  // ...
})
const authorization = new SpaAuthorization(this, 'Authorization_SPA', {
  // ...
  identityProviders: [cognito.UserPoolClientIdentityProvider.AMAZON],
};
authorization.userPoolClient.node.addDependency(identityProvider);
```

## SPA mode vs. Static Site mode

### SPA
- User Pool client does not use a client secret
- The cookies with JWT's are not "http only", so that they can be read and used by the SPA (e.g. to display the user name, or to refresh tokens)
- 404's (page not found on S3) will return index.html, to enable SPA-routing

### Static Site
- Enforce use of a client secret
- Set cookies to be http only by default (unless you've provided other cookie settings explicitly)
- No special error handling

## API Reference

See [API.md](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-cloudfront-authorization/API.md).

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-cloudfront-authorization/LICENSE)
