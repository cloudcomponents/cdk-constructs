import * as path from 'path';
import { SecretKey } from '@cloudcomponents/cdk-secret-key';
import { CustomResource, Duration, aws_lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface ContentfulWebhookProps {
  readonly accessToken: string | SecretKey;
  readonly spaceId: string;
  readonly name: string;
  readonly url: string;
  readonly topics: string[];
  readonly logLevel?: 'debug' | 'info' | 'warning' | 'error';
}

export class ContentfulWebhook extends Construct {
  public constructor(scope: Construct, id: string, props: ContentfulWebhookProps) {
    super(scope, id);

    const accessToken = typeof props.accessToken === 'string' ? SecretKey.fromPlainText(props.accessToken) : props.accessToken;

    const handler = new aws_lambda.SingletonFunction(this, 'CustomResourceHandler', {
      uuid: '91f2075f-b950-4743-a66b-ee0f6febf50d',
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      code: aws_lambda.Code.fromAsset(path.join(__dirname, 'lambdas', 'contentful-webhook')),
      handler: 'index.handler',
      lambdaPurpose: 'Custom::ContentfulWebhook',
      timeout: Duration.minutes(15),
    });

    if (accessToken.grantRead) {
      accessToken.grantRead(handler);
    }

    new CustomResource(this, 'CustomResource', {
      serviceToken: handler.functionArn,
      resourceType: 'Custom::ContentfulWebhook',
      pascalCaseProperties: true,
      properties: {
        accessTokenString: accessToken.serialize(),
        spaceId: props.spaceId,
        name: props.name,
        url: props.url,
        topics: props.topics,
        logLevel: props.logLevel,
      },
    });
  }
}
