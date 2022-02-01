import { aws_cognito, custom_resources } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface UserPoolClientRedirectsProps {
  readonly userPoolClient: aws_cognito.IUserPoolClient;
  readonly userPool: aws_cognito.IUserPool;
  readonly callbackUrls: string[];
  readonly logoutUrls: string[];
  readonly oauthScopes: aws_cognito.OAuthScope[];
  readonly identityProviders: aws_cognito.UserPoolClientIdentityProvider[];
}

export class UserPoolClientRedirects extends Construct {
  constructor(scope: Construct, id: string, props: UserPoolClientRedirectsProps) {
    super(scope, id);

    new custom_resources.AwsCustomResource(this, 'Resource', {
      onUpdate: {
        service: 'CognitoIdentityServiceProvider',
        action: 'updateUserPoolClient',
        parameters: {
          UserPoolId: props.userPool.userPoolId,
          ClientId: props.userPoolClient.userPoolClientId,
          AllowedOAuthFlows: ['code'],
          AllowedOAuthFlowsUserPoolClient: true,
          SupportedIdentityProviders: props.identityProviders.map((provider) => provider.name),
          AllowedOAuthScopes: props.oauthScopes.map((scope) => scope.scopeName),
          CallbackURLs: props.callbackUrls,
          LogoutURLs: props.logoutUrls,
        },
        physicalResourceId: custom_resources.PhysicalResourceId.of(
          `${props.userPool.userPoolId}-${props.userPoolClient.userPoolClientId}-updated-client`,
        ),
      },
      policy: custom_resources.AwsCustomResourcePolicy.fromSdkCalls({
        resources: [props.userPool.userPoolArn],
      }),
    });
  }
}
