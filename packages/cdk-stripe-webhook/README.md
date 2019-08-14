# @cloudcomponents/cdk-stripe-webhook

> Cdk component that provisions stripe webhooks

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

## License

[MIT](../../LICENSE)
