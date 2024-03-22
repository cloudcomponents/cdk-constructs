import * as path from 'path';
import { Annotations, Aws, Duration, Stack, aws_events, aws_events_targets, aws_iam, aws_lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface TimeToLiveProps {
  /**
   * Specifies the Time to Live (TTL) settings for the stack.
   */
  readonly ttl: Duration;
}

export class TimeToLive extends Construct {
  constructor(scope: Construct, id: string, props: TimeToLiveProps) {
    super(scope, id);

    Annotations.of(this).addInfo(`Warning! The stack destroys itself in ${props.ttl.toMinutes()} minutes.\n`);

    const deleteStack = new aws_lambda.Function(this, 'DeleteStack', {
      runtime: aws_lambda.Runtime.NODEJS_16_X,
      code: aws_lambda.Code.fromAsset(path.join(__dirname, 'lambdas', 'delete-stack')),
      handler: 'index.handler',
    });

    deleteStack.addToRolePolicy(
      new aws_iam.PolicyStatement({
        effect: aws_iam.Effect.ALLOW,
        actions: ['*'],
        resources: ['*'],
      }),
    );

    const rule = new aws_events.Rule(this, 'TimeToLive', {
      schedule: aws_events.Schedule.rate(props.ttl),
    });

    rule.addTarget(
      new aws_events_targets.LambdaFunction(deleteStack, {
        event: aws_events.RuleTargetInput.fromObject({
          stackId: Aws.STACK_ID,
        }),
      }),
    );

    this.node.addValidation({
      validate: () => {
        Stack.of(this).node.children.forEach((c) => {
          if (!this.node.findAll().includes(c)) {
            c.node.addDependency(this);
          }
        });

        let count = 0;
        Stack.of(this).node.children.forEach((c) => {
          if (c instanceof TimeToLive) {
            count++;
          }
        });

        if (count > 1) {
          return [`Found ${count} instances of the TimeToLive construct in the stack. The construct may only be added once per stack.`];
        }

        return [];
      },
    });
  }
}
