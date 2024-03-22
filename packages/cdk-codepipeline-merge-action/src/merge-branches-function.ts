import * as path from 'path';
import { IRepository } from 'aws-cdk-lib/aws-codecommit';
import { PolicyStatement, IRole } from 'aws-cdk-lib/aws-iam';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export interface MergeBranchesFunctionProps {
  /**
   * The CodeCommit repository.
   */
  readonly repository: IRepository;

  /**
   * Role for crossAccount permission
   */
  readonly crossAccountRole?: IRole;
}

export class MergeBranchesFunction extends Function {
  constructor(scope: Construct, id: string, props: MergeBranchesFunctionProps) {
    super(scope, id, {
      runtime: Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'merge-branches')),
    });

    if (props.crossAccountRole) {
      this.addToRolePolicy(
        new PolicyStatement({
          resources: [props.crossAccountRole.roleArn],
          actions: ['sts:AssumeRole'],
        }),
      );
    } else {
      this.addToRolePolicy(
        new PolicyStatement({
          resources: [props.repository.repositoryArn],
          actions: ['codecommit:MergeBranchesByFastForward'],
        }),
      );
    }
  }
}
