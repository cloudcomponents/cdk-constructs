import { ContentfulWebhook } from '@cloudcomponents/cdk-contentful-webhook';
import { SecretKey } from '@cloudcomponents/cdk-secret-key';
import { Stack, StackProps, aws_apigateway } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class ContentfulWebhookStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new aws_apigateway.RestApi(this, 'Endpoint');
    api.root.addMethod('POST');

    if (typeof process.env.ACCESS_TOKEN === 'undefined') {
      throw new Error('environment variable ACCESS_TOKEN undefined');
    }
    const accessToken = SecretKey.fromPlainText(process.env.ACCESS_TOKEN);

    if (typeof process.env.SPACE_ID === 'undefined') {
      throw new Error('environment variable SPACE_ID undefined');
    }
    const spaceId = process.env.SPACE_ID;

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
