![cloudcomponents Logo](/logo.png?raw=true)

# @cloudcomponents/cdk-stripe-webhook

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-constructs.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-constructs)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-stripe-webhook)

> Create, update and delete stripe webhooks with your app deployment

## Install

```bash
npm install --save @cloudcomponents/cdk-stripe-webhook
```

## How to use

```typescript
import { RestApi } from '@aws-cdk/aws-apigateway';
import { App, Stack, StackProps } from '@aws-cdk/core';
import { StripeWebhook } from '@cloudcomponents/cdk-stripe-webhook';

export class StripeWebhookStack extends Stack {
  public constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, 'Endpoint');
    api.root.addMethod('POST');

    const secretKey = process.env.SECRET_KEY as string;

    const events = ['charge.failed', 'charge.succeeded'];

    new StripeWebhook(this, 'StripeWebhook', {
      secretKey,
      url: api.url,
      events,
      logLevel: 'debug',
    });
  }
}
```

## Example

See more complete [examples](../../examples).

## License

[MIT](./LICENSE)
