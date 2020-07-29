import {
  App,
  BootstraplessSynthesizer,
  Construct,
  DefaultStackSynthesizer,
  IStackSynthesizer,
  Stack,
} from '@aws-cdk/core';
import { Code, Function, Runtime, IFunction } from '@aws-cdk/aws-lambda';
import {
  IRole,
  CompositePrincipal,
  ServicePrincipal,
  ManagedPolicy,
  Role,
} from '@aws-cdk/aws-iam';
import { StringParameter, IStringParameter } from '@aws-cdk/aws-ssm';

import { LogLevel } from './with-configuration';
import { EdgeFunctionProvider } from './edge-function-provider';

export interface CommonEdgeFunctionProps {
  readonly role?: IRole;

  readonly logLevel?: LogLevel;

  /**
   * The name of the parameter.
   */
  readonly parameterName?: string;

  readonly [key: string]: unknown;
}

export interface EdgeFunctionProps extends CommonEdgeFunctionProps {
  readonly code: Code;
  readonly name: string;
}

export class EdgeFunction extends Construct {
  public readonly role: IRole;

  private readonly stack: Stack;
  private readonly parameter: IStringParameter;

  constructor(scope: Construct, id: string, props: EdgeFunctionProps) {
    super(scope, id);

    this.stack = Stack.of(this);

    const { region, node } = this.stack;

    const {
      role,
      code,
      name,
      parameterName = `/cloudcomponents/edge-lambda/${node.uniqueId}/${name}`,
    } = props;

    const lambdaAtEdgeStack =
      region !== 'us-east-1'
        ? this.getOrCreateCrossRegionSupportStack()
        : this.stack;

    this.role =
      role ??
      new Role(lambdaAtEdgeStack, 'LambdaAtEdgeExecutionRole', {
        assumedBy: new CompositePrincipal(
          new ServicePrincipal('edgelambda.amazonaws.com'),
          new ServicePrincipal('lambda.amazonaws.com'),
        ),
        managedPolicies: [
          ManagedPolicy.fromAwsManagedPolicyName(
            'service-role/AWSLambdaBasicExecutionRole',
          ),
        ],
      });

    const lambdaFunction = new Function(lambdaAtEdgeStack, name, {
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code,
      role: this.role,
    });

    this.parameter = new StringParameter(lambdaAtEdgeStack, 'StringParameter', {
      parameterName,
      description: 'Parameter stored for cross region Lambda@Edge',
      stringValue: lambdaFunction.functionArn,
    });
  }

  public retrieveEdgeFunction(scope: Construct): IFunction {
    const { lambdaFunction } = new EdgeFunctionProvider(scope, 'Retrieve', {
      parameter: this.parameter,
    });

    return lambdaFunction;
  }

  private requireApp(): App {
    const app = this.node.root;
    if (!app || !App.isApp(app)) {
      throw new Error(
        'Stacks which uses edge functions must be part of a CDK app',
      );
    }
    return app;
  }

  private getOrCreateCrossRegionSupportStack(): Stack {
    const { account, stackName } = this.stack;
    const stackId = `lambda-at-edge-support-stack`;
    const app = this.requireApp();

    let supportStack = app.node.tryFindChild(stackId) as Stack;

    if (!supportStack) {
      supportStack = new Stack(app, stackId, {
        stackName: `${stackName}-support-lambda-at-edge`,
        env: {
          account,
          region: 'us-east-1',
        },
        synthesizer: this.getCrossRegionSupportSynthesizer(),
      });

      // the stack containing the edge lambdas must be deployed before
      this.stack.addDependency(supportStack);
    }

    return supportStack;
  }

  private getCrossRegionSupportSynthesizer(): IStackSynthesizer | undefined {
    if (this.stack.synthesizer instanceof DefaultStackSynthesizer) {
      // if we have the new synthesizer,
      // we need a bootstrapless copy of it,
      // because we don't want to require bootstrapping the environment
      // of the pipeline account in this replication region
      return new BootstraplessSynthesizer({
        deployRoleArn: this.stack.synthesizer.deployRoleArn,
        cloudFormationExecutionRoleArn: this.stack.synthesizer
          .cloudFormationExecutionRoleArn,
      });
    } else {
      // any other synthesizer: just return undefined
      // (ie., use the default based on the context settings)
      return undefined;
    }
  }
}
