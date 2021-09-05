[![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)](https://github.com/cloudcomponents/cdk-constructs)

# @cloudcomponents/cdk-wordpress

[![Build Status](https://github.com/cloudcomponents/cdk-constructs/workflows/Build/badge.svg)](https://github.com/cloudcomponents/cdk-constructs/actions?query=workflow=Build)
[![cdkdx](https://img.shields.io/badge/buildtool-cdkdx-blue.svg)](https://github.com/hupe1980/cdkdx)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-wordpress)
[![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)](https://pypi.org/project/cloudcomponents.cdk-wordpress/)

> CDK Construct to deploy wordpress


## Install
TypeScript/JavaScript:

```bash
npm i @cloudcomponents/cdk-wordpress
```

Python:

```bash
pip install cloudcomponents.cdk-wordpress
```

## How to use

```typescript
import { PublicHostedZone } from '@aws-cdk/aws-route53';
import { Construct, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core';

import { Wordpress } from '@cloudcomponents/cdk-wordpress';

export class WordpressStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const hostedZone = PublicHostedZone.fromLookup(this, 'HostedZone', {
      domainName: 'cloudcomponents.org',
    });

    new Wordpress(this, 'Wordpress', {
      domainName: 'blog.cloudcomponents.org',
      domainZone: hostedZone,
      removalPolicy: RemovalPolicy.DESTROY,
      offloadStaticContent: true, // Support for plugin e.g. `WP Offload Media for Amazon S3`
    });
  }
}
```

## API Reference

See [API.md](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-wordpress/API.md).

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-wordpress/LICENSE)
