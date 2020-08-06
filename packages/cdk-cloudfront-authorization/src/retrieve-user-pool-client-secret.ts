import { IUserPool, IUserPoolClient } from '@aws-cdk/aws-cognito';
import { Construct } from '@aws-cdk/core';
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from '@aws-cdk/custom-resources';

export interface RetrieveUserPoolClientSecretProps {
  readonly userPoolClient: IUserPoolClient;
  readonly userPool: IUserPool;
}

export class RetrieveUserPoolClientSecret extends Construct {
  public clientSecret: string;

  constructor(scope: Construct, id: string, props: RetrieveUserPoolClientSecretProps) {
    super(scope, id);

    const clientSecret = new AwsCustomResource(this, 'Resource', {
      onUpdate: {
        service: 'CognitoIdentityServiceProvider',
        action: 'describeUserPoolClient',
        parameters: {
          UserPoolId: props.userPool.userPoolId,
          ClientId: props.userPoolClient.userPoolClientId,
        },
        physicalResourceId: PhysicalResourceId.of(`${props.userPool.userPoolId}-${props.userPoolClient.userPoolClientId}-retrieved-client-secret`),
      },
      policy: AwsCustomResourcePolicy.fromSdkCalls({
        resources: [props.userPool.userPoolArn],
      }),
    });

    this.clientSecret = clientSecret.getResponseField('UserPoolClient.ClientSecret');
  }
}
