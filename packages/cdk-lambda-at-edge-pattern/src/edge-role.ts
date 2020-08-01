import { Construct } from '@aws-cdk/core';
import {
  IRole,
  CompositePrincipal,
  ServicePrincipal,
  ManagedPolicy,
  Role,
  PolicyStatement,
} from '@aws-cdk/aws-iam';

import { BaseEdgeConstruct } from './base-edge-construct';

export interface IEdgeRole {
  readonly role: IRole;

  addToEdgeRolePolicy(statement: PolicyStatement): void;
}

export interface EdgeRoleProps {
  readonly roleName?: string;
}

export class EdgeRole extends BaseEdgeConstruct implements IEdgeRole {
  public readonly role: IRole;

  constructor(scope: Construct, id: string, props: EdgeRoleProps = {}) {
    super(scope, id);

    this.role = new Role(this.edgeStack, id, {
      assumedBy: new CompositePrincipal(
        new ServicePrincipal('edgelambda.amazonaws.com'),
        new ServicePrincipal('lambda.amazonaws.com'),
      ),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          'service-role/AWSLambdaBasicExecutionRole',
        ),
      ],
      ...props,
    });
  }

  public addToEdgeRolePolicy(statement: PolicyStatement): void {
    this.role.addToPolicy(statement);
  }
}
