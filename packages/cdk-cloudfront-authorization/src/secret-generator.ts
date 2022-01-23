import * as path from 'path';
import { CustomResource, aws_lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface SecretGeneratorProps {
  readonly length?: number;
  readonly allowedCharacters?: string;
}

export class SecretGenerator extends Construct {
  public readonly secret: string;

  constructor(scope: Construct, id: string, props: SecretGeneratorProps = {}) {
    super(scope, id);

    const secretGenerator = new aws_lambda.SingletonFunction(this, 'Function', {
      uuid: 'cloudcomponents-cdk-cloudfront-authorization-secret-generator',
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: aws_lambda.Code.fromAsset(path.join(__dirname, 'lambdas', 'secret-generator')),
    });

    const cr = new CustomResource(this, 'CustomResource', {
      serviceToken: secretGenerator.functionArn,
      resourceType: 'Custom::GenerateSecret',
      properties: {
        Length: props.length ?? 16,
        AllowedCharacters: props.allowedCharacters ?? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~',
      },
    });

    this.secret = cr.ref;
  }
}
