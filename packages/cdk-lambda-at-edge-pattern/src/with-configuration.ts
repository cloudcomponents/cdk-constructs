import * as path from 'path';
import { CustomResource, Duration, aws_iam, aws_lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export enum LogLevel {
  NONE = 'none',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
}

export interface Configuration {
  readonly logLevel: LogLevel;
  readonly [key: string]: unknown;
}

export interface WithConfigurationProps {
  readonly function: aws_lambda.IFunction;
  readonly configuration: Configuration;
}

export class WithConfiguration extends Construct {
  public readonly functionVersion: aws_lambda.IVersion;

  constructor(scope: Construct, id: string, props: WithConfigurationProps) {
    super(scope, id);

    const resourceType = 'Custom::WithConfiguration';

    const handler = new aws_lambda.SingletonFunction(this, 'Handler', {
      uuid: 'cloudcomponents-cdk-lambda-at-edge-pattern-with-configuration',
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      code: aws_lambda.Code.fromAsset(path.join(__dirname, 'lambdas', 'with-configuration')),
      handler: 'index.handler',
      lambdaPurpose: resourceType,
      timeout: Duration.minutes(5),
    });

    handler.addToRolePolicy(
      new aws_iam.PolicyStatement({
        effect: aws_iam.Effect.ALLOW,
        actions: ['lambda:GetFunction', 'lambda:UpdateFunctionCode'],
        resources: [props.function.functionArn],
      }),
    );

    const cr = new CustomResource(this, 'WithConfiguration', {
      serviceToken: handler.functionArn,
      resourceType,
      properties: {
        Region: 'us-east-1',
        FunctionName: props.function.functionName,
        Configuration: JSON.stringify(props.configuration, null, 2),
      },
    });

    this.functionVersion = aws_lambda.Version.fromVersionArn(this, 'Version', cr.getAttString('FunctionArn'));
  }
}
