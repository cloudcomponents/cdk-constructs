import { Construct, Stack, StackProps, Duration } from '@aws-cdk/core';
import { TimeToLive } from './time-to-live';

export interface TempStackProps extends StackProps {
  /**
   * Specifies the Time to Live (TTL) settings for the stack.
   */
  readonly ttl: Duration;
}

export class TempStack extends Stack {
  constructor(scope: Construct, id: string, props: TempStackProps) {
    super(scope, id, props);

    new TimeToLive(this, 'TimeToLive', {
      ttl: props.ttl,
    });
  }
}
