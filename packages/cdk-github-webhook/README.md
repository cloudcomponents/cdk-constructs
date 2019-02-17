# @cloudcomponents/cdk-github-webhook

> Cdk component that provisions github webhooks

## Install

```bash
npm install --save @cloudcomponents/cdk-github-webhook
```

## How to use

```javascript

import { RestApi } from '@aws-cdk/aws-apigateway';
import { App, Stack, StackProps } from '@aws-cdk/cdk';
import { GithubWebhook } from '@cloudcomponents/cdk-github-webhook';

export class GithubWebhookStack extends Stack {
  constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    const api = new RestApi(this, 'github-webhook');
    api.root.addMethod('POST');

    const githubApiToken = process.env.API_TOKEN as string;

    // @example https://github.com/cloudcomponents/cdk-components
    const githubRepoUrl = process.env.REPO_URL as string;

    // @see https://developer.github.com/v3/activity/events/types/
    const events = ['*'];

    new GithubWebhook(this, 'GithubWebhook', {
      githubApiToken,
      githubRepoUrl,
      payloadUrl: api.url,
      events,
      logLevel: 'debug'
    });
  }
}

```

## License

[MIT](../../LICENSE)
