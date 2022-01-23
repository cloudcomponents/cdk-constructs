import { App, BootstraplessSynthesizer, DefaultStackSynthesizer, IStackSynthesizer, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class BaseEdgeConstruct extends Construct {
  protected readonly stack: Stack;
  protected readonly edgeStack: Stack;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.stack = Stack.of(this);

    this.edgeStack = this.stack.region !== 'us-east-1' ? this.getOrCreateCrossRegionSupportStack() : this.stack;
  }

  private getOrCreateCrossRegionSupportStack(): Stack {
    const stack = this.stack.nestedStackParent ?? this.stack;
    const { account, stackName } = stack;
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

  private requireApp(): App {
    const app = this.node.root;
    if (!app || !App.isApp(app)) {
      throw new Error('Stacks which uses edge constructs must be part of a CDK app');
    }
    return app;
  }

  private getCrossRegionSupportSynthesizer(): IStackSynthesizer | undefined {
    if (this.stack.synthesizer instanceof DefaultStackSynthesizer) {
      // if we have the new synthesizer,
      // we need a bootstrapless copy of it,
      // because we don't want to require bootstrapping the environment
      // of the account in this replication region
      return new BootstraplessSynthesizer({
        deployRoleArn: this.stack.synthesizer.deployRoleArn,
        cloudFormationExecutionRoleArn: this.stack.synthesizer.cloudFormationExecutionRoleArn,
      });
    } else {
      // any other synthesizer: just return undefined
      // (ie., use the default based on the context settings)
      return undefined;
    }
  }
}
