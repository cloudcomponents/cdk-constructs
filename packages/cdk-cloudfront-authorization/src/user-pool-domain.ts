import * as path from 'path';
import { CustomResource, aws_cognito, aws_iam, aws_lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface UserPoolDomainProps {
  readonly userPool: aws_cognito.IUserPool;
}

export class UserPoolDomain extends Construct {
  public readonly cognitoAuthDomain: string;

  constructor(scope: Construct, id: string, props: UserPoolDomainProps) {
    super(scope, id);

    const secretGenerator = new aws_lambda.SingletonFunction(this, 'Function', {
      uuid: 'cloudcomponents-cdk-cloudfront-authorization-user-pool-domain',
      runtime: aws_lambda.Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: aws_lambda.Code.fromAsset(path.join(__dirname, 'lambdas', 'user-pool-domain')),
    });

    secretGenerator.addToRolePolicy(
      new aws_iam.PolicyStatement({
        effect: aws_iam.Effect.ALLOW,
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
