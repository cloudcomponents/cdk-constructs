[![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)](https://github.com/cloudcomponents/cdk-constructs)

# @cloudcomponents/cdk-s3-antivirus

[![Build Status](https://github.com/cloudcomponents/cdk-constructs/workflows/Build/badge.svg)](https://github.com/cloudcomponents/cdk-constructs/actions?query=workflow=Build)
[![cdkdx](https://img.shields.io/badge/buildtool-cdkdx-blue.svg)](https://github.com/hupe1980/cdkdx)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-s3-antivirus)
[![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)](https://pypi.org/project/cloudcomponents.cdk-s3-antivirus/)

> Antivirus for Amazon S3

## Install
TypeScript/JavaScript:

```bash
npm i @cloudcomponents/cdk-s3-antivirus
```

Python:

```bash
pip install cloudcomponents.cdk-s3-antivirus
```

## How to use

```typescript
import { SnsDestination } from '@aws-cdk/aws-lambda-destinations';
import { Bucket } from '@aws-cdk/aws-s3';
import { Topic } from '@aws-cdk/aws-sns';
import { EmailSubscription } from '@aws-cdk/aws-sns-subscriptions';
import { Construct, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core';

import { Scanner } from '@cloudcomponents/cdk-s3-antivirus';

export class S3AntivirusStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'Bucket', {
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const topic = new Topic(this, 'Topic', {});
    topic.addSubscription(new EmailSubscription(process.env.DEVSECOPS_TEAM_EMAIL as string));

    const scanner = new Scanner(this, 'Scanner', {
      onResult: new SnsDestination(topic),
      onError: new SnsDestination(topic),
    });

    scanner.addSourceBucket(bucket);
  }
}
```

## API Reference

See [API.md](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-s3-antivirus/API.md).

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-s3-antivirus/LICENSE)
