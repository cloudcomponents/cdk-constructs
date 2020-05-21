![cloudcomponents Logo](/logo.png?raw=true)

# @cloudcomponents/cdk-deletable-bucket

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-components.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-components)

> Bucket with content cleanup to allow bucket deletion when the stack will be destroyed

## Install

```bash
npm i @cloudcomponents/cdk-deletable-bucket
```

## How to use

```typescript
import { App, Stack, StackProps } from '@aws-cdk/core';
import { DeletableBucket } from '@cloudcomponents/cdk-deletable-bucket';

export class DeletableBucketStack extends Stack {
    public constructor(parent: App, name: string, props?: StackProps) {
        super(parent, name, props);

        new DeletableBucket(this, 'DeletableBucket', {
            bucketName: 'bucket2delete',
            forceDelete: true,
        });
    }
}
```

## License

[MIT](../../LICENSE)
