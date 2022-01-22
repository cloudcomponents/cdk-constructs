import { TempStack, TempStackProps } from '@cloudcomponents/cdk-temp-stack';
import { aws_ec2 } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class TempInfraStack extends TempStack {
  constructor(scope: Construct, id: string, props: TempStackProps) {
    super(scope, id, props);

    new aws_ec2.Vpc(this, 'VPC');
  }
}
