[![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)](https://github.com/cloudcomponents/cdk-constructs)

# @cloudcomponents/cdk-github-webhook 

[![Build Status](https://github.com/cloudcomponents/cdk-constructs/workflows/Build/badge.svg)](https://github.com/cloudcomponents/cdk-constructs/actions?query=workflow=Build)
[![cdkdx](https://img.shields.io/badge/buildtool-cdkdx-blue.svg)](https://github.com/hupe1980/cdkdx)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-github-webhook)
[![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)](https://pypi.org/project/cloudcomponents.cdk-github-webhook/)
[![Mentioned in Awesome CDK](https://awesome.re/mentioned-badge.svg)](https://github.com/kolomied/awesome-cdk)

> Create, update and delete github webhooks with your app deployment

## Install
TypeScript/JavaScript:

```bash
npm i @cloudcomponents/cdk-github-webhook
```

Python:

```bash
pip install cloudcomponents.cdk-github-webhook
```

## How to use

```typescript
import { RestApi } from '@aws-cdk/aws-apigateway';
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { GithubWebhook } from '@cloudcomponents/cdk-github-webhook';
import { SecretKey } from '@cloudcomponents/cdk-secret-key';

export class GithubWebhookStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, 'github-webhook');
    api.root.addMethod('POST');

    const githubApiToken = SecretKey.fromPlainText(process.env.API_TOKEN as string);

    // @example https://github.com/cloudcomponents/cdk-constructs
    const githubRepoUrl = process.env.REPO_URL as string;

    // @see https://developer.github.com/v3/activity/events/types/
    const events = ['*'];
 
    // @see https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks#validating-payloads-from-github
    const webhookSecret = process.env.SECURE_WEBHOOK === 'true' ? (process.env.WEBHOOK_SECRET || githubApiToken.serialize()) : undefined

    new GithubWebhook(this, 'GithubWebhook', {
      githubApiToken,
      githubRepoUrl,
      payloadUrl: api.url,
      events,
      logLevel: 'debug',
      webhookSecret
    });
  }
}
```

## API Reference

See [API.md](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-github-webhook/API.md).

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-github-webhook/LICENSE)
