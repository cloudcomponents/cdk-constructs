![cloudcomponents Logo](/logo.png?raw=true)

# @cloudcomponents/cdk-container-registry

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-constructs.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-constructs)

> Registry for container images

## Install

```bash
npm i @cloudcomponents/cdk-container-registry
```

## How to use

```typescript
import { App, Stack, StackProps } from '@aws-cdk/core';
import { Topic } from '@aws-cdk/aws-sns';
import { EmailSubscription } from '@aws-cdk/aws-sns-subscriptions';
import {
  ImageRepository,
  Severity,
} from '@cloudcomponents/cdk-container-registry';

export class EcsBlueGreenDeploymentStack extends Stack {
  public constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    const alarmTopic = new Topic(this, 'Topic');

    alarmTopic.addSubscription(
      new EmailSubscription(process.env.DEVSECOPS_TEAM_EMAIL as string),
    );

    const imageRepository = new ImageRepository(this, 'ImageRepository', {
      forceDelete: true, //Only for tests
      imageScanOnPush: true,
    });

    imageRepository.onFinding('finding', {
      severity: Severity.HIGH,
      alarmTopic,
    });
  }
}
```

## License

[MIT](../../LICENSE)
