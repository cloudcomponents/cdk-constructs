[![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)](https://github.com/cloudcomponents/cdk-constructs)

# @cloudcomponents/cdk-temp-stack 

[![Build Status](https://github.com/cloudcomponents/cdk-constructs/workflows/Build/badge.svg)](https://github.com/cloudcomponents/cdk-constructs/actions?query=workflow=Build)
[![cdkdx](https://img.shields.io/badge/buildtool-cdkdx-blue.svg)](https://github.com/hupe1980/cdkdx)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-temp-stack)
[![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)](https://pypi.org/project/cloudcomponents.cdk-temp-stack/)

> A stack that destroys itself after a given time (ttl) 

## Install
TypeScript/JavaScript:

```bash
npm i @cloudcomponents/cdk-temp-stack
```

Python:

```bash
pip install cloudcomponents.cdk-temp-stack
```

## How to use

```typescript
// temp-infra-app.ts

#!/usr/bin/env node

import 'source-map-support/register';
import { App, Duration } from '@aws-cdk/core';

import { TempInfraStack } from './temp-infra-stack';

const app = new App();

new TempInfraStack(app, 'TempInfraStack', {
  env: {
    region: process.env.DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
  ttl: Duration.minutes(10),
});

// temp-infra-stack.ts

import { Construct } from '@aws-cdk/core';
import { Vpc } from '@aws-cdk/aws-ec2';
import { TempStack, TempStackProps } from '@cloudcomponents/cdk-temp-stack';

export class TempInfraStack extends TempStack {
  constructor(scope: Construct, id: string, props: TempStackProps) {
    super(scope, id, props);

    new Vpc(this, 'VPC');
  }
}
```

## TimeToLive Construct

Alternatively, you can also add the TimeToLive construct to your stack

```typescript
// your stack

import { Construct, Stack, StackProps, Duration } from '@aws-cdk/core';
import { TimeToLive } from '@cloudcomponents/cdk-temp-stack';

export class YourStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new TimeToLive(this, 'TimeToLive', {
      ttl: Duration.minutes(10),
    });
  }
}
```

## API Reference

See [API.md](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-temp-stack/API.md).

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-temp-stack/LICENSE)
