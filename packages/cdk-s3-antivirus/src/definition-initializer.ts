import { Effect, PolicyStatement } from '@aws-cdk/aws-iam';
import { IFunction } from '@aws-cdk/aws-lambda';
import { Construct } from '@aws-cdk/core';
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from '@aws-cdk/custom-resources';

export interface DefinitionInitializerProps {
  fn: IFunction;
}

export class DefinitionInitializer extends Construct {
  constructor(scope: Construct, id: string, props: DefinitionInitializerProps) {
    super(scope, id);

    new AwsCustomResource(this, 'CustomResource', {
      onCreate: {
        service: 'Lambda',
        action: 'invoke',
        parameters: {
          FunctionName: props.fn.functionArn,
        },
        physicalResourceId: PhysicalResourceId.of(props.fn.functionArn),
      },
      policy: AwsCustomResourcePolicy.fromStatements([
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['lambda:InvokeFunction'],
          resources: [props.fn.functionArn],
        }),
      ]),
    });
  }
}
