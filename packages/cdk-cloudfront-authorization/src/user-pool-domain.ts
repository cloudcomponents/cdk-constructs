import * as path from 'path';
import { IUserPool } from '@aws-cdk/aws-cognito';
import { PolicyStatement, Effect } from '@aws-cdk/aws-iam';
import { Code, SingletonFunction, Runtime } from '@aws-cdk/aws-lambda';
import { Construct, CustomResource } from '@aws-cdk/core';

export interface UserPoolDomainProps {
  readonly userPool: IUserPool;
}

export class UserPoolDomain extends Construct {
  public readonly cognitoAuthDomain: string;

  constructor(scope: Construct, id: string, props: UserPoolDomainProps) {
    super(scope, id);

    const secretGenerator = new SingletonFunction(this, 'Function', {
      uuid: 'cloudcomponents-cdk-cloudfront-authorization-user-pool-domain',
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'user-pool-domain')),
    });

    secretGenerator.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['cognito-idp:DescribeUserPool'],
        resources: [props.userPool.userPoolArn],
      }),
    );

    const cr = new CustomResource(this, 'CustomResource', {
      serviceToken: secretGenerator.functionArn,
      resourceType: 'Custom::UserPoolDomain',
      properties: {
        UserPoolId: props.userPool.userPoolId,
      },
    });

    this.cognitoAuthDomain = cr.getAttString('DomainName');
  }
}
