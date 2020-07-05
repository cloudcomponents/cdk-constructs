![cloudcomponents Logo](/logo.png?raw=true)

# @cloudcomponents/cdk-contentful-webhook

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-constructs.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-constructs)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-contentful-webhook)

> Create, update and delete contentful webhooks with your app deployment

## Install

```bash
npm install --save @cloudcomponents/cdk-contentful-webhook
```

## How to use

```typescript
import { RestApi } from '@aws-cdk/aws-apigateway';
import { App, Stack, StackProps } from '@aws-cdk/core';
import { ContentfulWebhook } from '@cloudcomponents/cdk-contentful-webhook';

export class ContentfulWebhookStack extends Stack {
  public constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, 'Endpoint');
    api.root.addMethod('POST');

    const accessToken = process.env.ACCESS_TOKEN as string;

    const spaceId = process.env.SPACE_ID as string;

    const topics = ['Entry.create'];

    new ContentfulWebhook(this, 'ContentfulWebhook', {
      accessToken,
      spaceId,
      name: 'ExampleWebhook',
      url: api.url,
      topics,
      logLevel: 'debug',
    });
  }
}
```

## Example

See more complete [examples](../../examples).

## License

[MIT](./LICENSE)
