import { aws_lambda, aws_ssm, custom_resources } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface EdgeFunctionProviderProps {
  readonly parameter: aws_ssm.IStringParameter;
}

export class EdgeFunctionProvider extends Construct {
  public readonly edgeFunction: aws_lambda.IFunction;

  constructor(scope: Construct, id: string, props: EdgeFunctionProviderProps) {
    super(scope, id);

    const cr = new custom_resources.AwsCustomResource(this, 'Resource', {
      onUpdate: {
        service: 'SSM',
        action: 'getParameter',
        parameters: {
          Name: props.parameter.parameterName,
        },
        region: 'us-east-1',
        physicalResourceId: custom_resources.PhysicalResourceId.of(Date.now().toString()), // Update physical id to always fetch the latest version
      },
      policy: custom_resources.AwsCustomResourcePolicy.fromSdkCalls({
        resources: [props.parameter.parameterArn],
      }),
    });

    this.edgeFunction = aws_lambda.Function.fromFunctionArn(this, 'Function', cr.getResponseField('Parameter.Value'));
  }
}
