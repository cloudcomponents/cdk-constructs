import * as path from 'path';
import { CustomResource } from '@aws-cdk/aws-cloudformation';
import { SingletonFunction, Runtime, Code } from '@aws-cdk/aws-lambda';
import { Construct } from '@aws-cdk/cdk';
import {
  AwsManagedPolicy,
  Role,
  PolicyStatement,
  CompositePrincipal,
  ServicePrincipal
} from '@aws-cdk/aws-iam';

export interface EdgeDeployProps {
  handler: string;
  code: Code;
  role?: Role;
  region?: string;
  runtime: Runtime;
  logLevel?: 'debug' | 'info' | 'warning' | 'error';
}

export class EdgeDeploy extends Construct {
  constructor(parent: Construct, id: string, props: EdgeDeployProps) {
    super(parent, id);

    const lambdaProvider = new SingletonFunction(
      this,
      'CustomResourceHandler',
      {
        uuid: '7C22439C-A863-4F91-A171-CB726CD7BAD3',
        runtime: Runtime.NodeJS810,
        code: Code.asset(path.join(__dirname, '..', 'lambda', 'bundle.zip')),
        handler: 'lib/edge-deploy.handler',
        lambdaPurpose: 'Custom::EdgeDeploy',
        timeout: 15 * 60
      }
    );

    lambdaProvider.addToRolePolicy(
      new PolicyStatement()
        .addAllResources()
        .addAction('lambda:CreateFunction')
        .addAction('iam:PassRole')
    );

    const defaultRole = new Role(this, 'ServiceRole', {
      assumedBy: new CompositePrincipal(
        new ServicePrincipal('lambda.amazonaws.com'),
        new ServicePrincipal('edgelambda.amazonaws.com')
      ),
      managedPolicyArns: [
        new AwsManagedPolicy('service-role/AWSLambdaBasicExecutionRole', this)
          .policyArn
      ]
    });

    console.log(defaultRole);

    const { code, handler, runtime, region, logLevel } = props;

    new CustomResource(this, 'CustomResource', {
      lambdaProvider,
      resourceType: 'Custom::EdgeDeploy',
      properties: {
        Region: region || 'us-east-1',
        Role: defaultRole.roleArn,
        Runtime: runtime,
        LogLevel: logLevel,
        Code: code,
        Handler: handler
      }
    });
  }
}
