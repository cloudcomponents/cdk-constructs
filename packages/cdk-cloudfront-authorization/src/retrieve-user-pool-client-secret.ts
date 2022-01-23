import { aws_cognito, custom_resources } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface RetrieveUserPoolClientSecretProps {
  readonly userPoolClient: aws_cognito.IUserPoolClient;
  readonly userPool: aws_cognito.IUserPool;
}

export class RetrieveUserPoolClientSecret extends Construct {
  public clientSecret: string;

  constructor(scope: Construct, id: string, props: RetrieveUserPoolClientSecretProps) {
    super(scope, id);

    const clientSecret = new custom_resources.AwsCustomResource(this, 'Resource', {
      onUpdate: {
        service: 'CognitoIdentityServiceProvider',
        action: 'describeUserPoolClient',
        parameters: {
          UserPoolId: props.userPool.userPoolId,
          ClientId: props.userPoolClient.userPoolClientId,
        },
        physicalResourceId: custom_resources.PhysicalResourceId.of(
          `${props.userPool.userPoolId}-${props.userPoolClient.userPoolClientId}-retrieved-client-secret`,
        ),
      },
      policy: custom_resources.AwsCustomResourcePolicy.fromSdkCalls({
        resources: [props.userPool.userPoolArn],
      }),
    });

    this.clientSecret = clientSecret.getResponseField('UserPoolClient.ClientSecret');
  }
}
