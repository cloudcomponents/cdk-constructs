import { Construct } from '@aws-cdk/core';
import {
  AwsCustomResource,
  AwsCustomResourcePolicy,
  PhysicalResourceId,
} from '@aws-cdk/custom-resources';
import { IStringParameter } from '@aws-cdk/aws-ssm';
import { IFunction, Function } from '@aws-cdk/aws-lambda';

export interface EdgeFunctionProviderProps {
  readonly parameter: IStringParameter;
}

export class EdgeFunctionProvider extends Construct {
  public readonly edgeFunction: IFunction;

  constructor(scope: Construct, id: string, props: EdgeFunctionProviderProps) {
    super(scope, id);

    const cr = new AwsCustomResource(this, 'Resource', {
      onUpdate: {
        service: 'SSM',
        action: 'getParameter',
        parameters: {
          Name: props.parameter.parameterName,
        },
        region: 'us-east-1',
        physicalResourceId: PhysicalResourceId.of(Date.now().toString()), // Update physical id to always fetch the latest version
      },
      policy: AwsCustomResourcePolicy.fromSdkCalls({
        resources: [props.parameter.parameterArn],
      }),
    });

    this.edgeFunction = Function.fromFunctionArn(
      this,
      'Function',
      cr.getResponseField('Parameter.Value'),
    );
  }
}
