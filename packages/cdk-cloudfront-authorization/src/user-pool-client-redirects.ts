import { IUserPoolClient, IUserPool, OAuthScope, UserPoolClientIdentityProvider } from '@aws-cdk/aws-cognito';
import { Construct } from '@aws-cdk/core';
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from '@aws-cdk/custom-resources';

export interface UserPoolClientRedirectsProps {
  readonly userPoolClient: IUserPoolClient;
  readonly userPool: IUserPool;
  readonly callbackUrls: string[];
  readonly logoutUrls: string[];
  readonly oauthScopes: OAuthScope[];
  readonly identityProviders: UserPoolClientIdentityProvider[];
}

export class UserPoolClientRedirects extends Construct {
  constructor(scope: Construct, id: string, props: UserPoolClientRedirectsProps) {
    super(scope, id);

    new AwsCustomResource(this, 'Resource', {
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
        physicalResourceId: PhysicalResourceId.of(`${props.userPool.userPoolId}-${props.userPoolClient.userPoolClientId}-updated-client`),
      },
      policy: AwsCustomResourcePolicy.fromSdkCalls({
        resources: [props.userPool.userPoolArn],
      }),
    });
  }
}
