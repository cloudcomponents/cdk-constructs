import * as path from 'path';
import { Construct, CustomResource, Duration } from '@aws-cdk/core';
import { Effect, PolicyStatement } from '@aws-cdk/aws-iam';
import {
  SingletonFunction,
  Runtime,
  Code,
  IFunction,
  IVersion,
  Version,
} from '@aws-cdk/aws-lambda';

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
  readonly function: IFunction;
  readonly configuration: Configuration;
}

export class WithConfiguration extends Construct {
  public readonly lambdaFunction: IVersion;

  constructor(scope: Construct, id: string, props: WithConfigurationProps) {
    super(scope, id);

    const resourceType = 'Custom::WithConfiguration';

    const handler = new SingletonFunction(this, 'Handler', {
      uuid: 'cloudcomponents-cdk-lambda-at-edge-pattern-with-configuration',
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(
        path.join(__dirname, 'lambdas', 'with-configuration'),
      ),
      handler: 'index.handler',
      lambdaPurpose: resourceType,
      timeout: Duration.minutes(5),
    });

    handler.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
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

    this.lambdaFunction = Version.fromVersionArn(
      this,
      'Version',
      cr.getAttString('FunctionArn'),
    );
  }
}
