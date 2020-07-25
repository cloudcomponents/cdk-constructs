import * as path from 'path';
import { Aws, Construct, Duration, Stack } from '@aws-cdk/core';
import { Code, Runtime, Function } from '@aws-cdk/aws-lambda';
import { Effect, PolicyStatement } from '@aws-cdk/aws-iam';
import { Rule, Schedule, RuleTargetInput } from '@aws-cdk/aws-events';
import { LambdaFunction } from '@aws-cdk/aws-events-targets';

export interface TimeToLiveProps {
  /**
   * Specifies the Time to Live (TTL) settings for the stack.
   */
  readonly ttl: Duration;
}

export class TimeToLive extends Construct {
  constructor(scope: Construct, id: string, props: TimeToLiveProps) {
    super(scope, id);

    Stack.of(this).node.addWarning(
      `Warning! The stack destroys itself in ${props.ttl.toMinutes()} minutes.\n`,
    );

    const deleteStack = new Function(this, 'DeleteStack', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'delete-stack')),
      handler: 'index.handler',
    });

    deleteStack.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['*'],
        resources: ['*'],
      }),
    );

    const rule = new Rule(this, 'TimeToLive', {
      schedule: Schedule.rate(props.ttl),
    });

    rule.addTarget(
      new LambdaFunction(deleteStack, {
        event: RuleTargetInput.fromObject({
          stackId: Aws.STACK_ID,
        }),
      }),
    );
  }

  protected onPrepare(): void {
    Stack.of(this).node.children.forEach((c) => {
      if (!this.node.findAll().includes(c)) {
        c.node.addDependency(this);
      }
    });
  }

  protected validate(): string[] {
    let count = 0;
    Stack.of(this).node.children.forEach((c) => {
      if (c instanceof TimeToLive) {
        count++;
      }
    });

    if (count > 1) {
      return [
        `Found ${count} instances of the TimeToLove construct in the stack. The construct may only be added once per stack.`,
      ];
    }

    return [];
  }
}
