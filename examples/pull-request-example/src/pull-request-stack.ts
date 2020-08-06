import { BuildSpec } from '@aws-cdk/aws-codebuild';
import { Repository } from '@aws-cdk/aws-codecommit';
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { ApprovalRuleTemplate, ApprovalRuleTemplateRepositoryAssociation } from '@cloudcomponents/cdk-pull-request-approval-rule';
import { PullRequestCheck } from '@cloudcomponents/cdk-pull-request-check';

export class PullRequestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const repository = new Repository(this, 'Repository', {
      repositoryName: 'pr-check-repository',
    });

    const { approvalRuleTemplateName } = new ApprovalRuleTemplate(this, 'ApprovalRuleTemplate', {
      approvalRuleTemplateName: 'template-name',
      template: {
        approvers: {
          numberOfApprovalsNeeded: 1,
        },
      },
    });

    new ApprovalRuleTemplateRepositoryAssociation(this, 'ApprovalRuleTemplateRepositoryAssociation', {
      approvalRuleTemplateName,
      repository,
    });

    new PullRequestCheck(this, 'PullRequestCheck', {
      repository,
      buildSpec: BuildSpec.fromSourceFilename('prcheck.yml'),
    });
  }
}
