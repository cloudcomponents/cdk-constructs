import * as path from 'path';
import { Construct } from '@aws-cdk/core';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { IRepository } from '@aws-cdk/aws-codecommit';
import { PolicyStatement, IRole } from '@aws-cdk/aws-iam';

export interface MergeBranchesFunctionProps {
  /**
   * The CodeCommit repository.
   */
  readonly repository: IRepository;

  readonly codeCommitRole?: IRole;
}

export class MergeBranchesFunction extends Function {
  constructor(scope: Construct, id: string, props: MergeBranchesFunctionProps) {
    super(scope, id, {
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'merge-branches')),
      environment: {
        CODE_COMMIT_ROLE_ARN: props.codeCommitRole?.roleArn ?? '',
      },
    });

    if (props.codeCommitRole) {
      this.addToRolePolicy(
        new PolicyStatement({
          resources: [props.codeCommitRole.roleArn],
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
