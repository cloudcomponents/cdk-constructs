import { Vpc } from '@aws-cdk/aws-ec2';
import { Construct } from '@aws-cdk/core';
import { TempStack, TempStackProps } from '@cloudcomponents/cdk-temp-stack';

export class TempInfraStack extends TempStack {
  constructor(scope: Construct, id: string, props: TempStackProps) {
    super(scope, id, props);

    new Vpc(this, 'VPC');
  }
}
