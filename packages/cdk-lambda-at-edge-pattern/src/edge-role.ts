import { aws_iam } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { BaseEdgeConstruct } from './base-edge-construct';

export interface IEdgeRole {
  readonly role: aws_iam.Role;

  addToEdgeRolePolicy(statement: aws_iam.PolicyStatement): void;
}

export interface EdgeRoleProps {
  readonly roleName?: string;
}

export class EdgeRole extends BaseEdgeConstruct implements IEdgeRole {
  public readonly role: aws_iam.Role;

  constructor(scope: Construct, id: string, props: EdgeRoleProps = {}) {
    super(scope, id);

    this.role = new aws_iam.Role(this.edgeStack, id, {
      assumedBy: new aws_iam.CompositePrincipal(
        new aws_iam.ServicePrincipal('edgelambda.amazonaws.com'),
        new aws_iam.ServicePrincipal('lambda.amazonaws.com'),
      ),
      managedPolicies: [aws_iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')],
      ...props,
    });
  }

  public addToEdgeRolePolicy(statement: aws_iam.PolicyStatement): void {
    this.role.addToPolicy(statement);
  }
}
