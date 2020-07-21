![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)

# @cloudcomponents/cdk-deletable-bucket

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-constructs.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-constructs)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-deletable-bucket)
[![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)](https://pypi.org/project/cloudcomponents.cdk-deletable-bucket/)

> Bucket with content cleanup to allow bucket deletion when the stack will be destroyed

## Install
TypeScript/JavaScript:

```bash
npm i @cloudcomponents/cdk-deletable-bucket
```

Python:

```bash
pip install cloudcomponents.cdk-deletable-bucket
```

## How to use

```typescript
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { DeletableBucket } from '@cloudcomponents/cdk-deletable-bucket';

export class DeletableBucketStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new DeletableBucket(this, 'DeletableBucket', {
      bucketName: 'bucket2delete',
      forceDelete: true,
    });
  }
}
```

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](./LICENSE)