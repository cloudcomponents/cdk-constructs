import {
  Construct,
  CustomResource,
  CustomResourceProvider,
  CustomResourceProviderRuntime,
} from '@aws-cdk/core';
import { OnEventOptions, Rule } from '@aws-cdk/aws-events';
import { IRepository } from '@aws-cdk/aws-codecommit';

import { approvalRuleTemplateRepositoryAssociationDir } from './directories';

export interface ApprovalRuleTemplateRepositoryAssociationProps {
  /**
   * The name of the template you want to associate with one or more repositories.
   */
  approvalRuleTemplateName: string;

  /**
   * The repository you want to associate with the template.
   */
  repository: IRepository;
}

export class ApprovalRuleTemplateRepositoryAssociation extends Construct {
  private repository: IRepository;

  public constructor(
    parent: Construct,
    id: string,
    props: ApprovalRuleTemplateRepositoryAssociationProps,
  ) {
    super(parent, id);

    this.repository = props.repository;

    const resourceType = 'Custom::ApprovalRuleTemplateRepositoryAssociation';

    const serviceToken = CustomResourceProvider.getOrCreate(
      this,
      resourceType,
      {
        codeDirectory: approvalRuleTemplateRepositoryAssociationDir,
        runtime: CustomResourceProviderRuntime.NODEJS_12,
        policyStatements: [
          {
            Effect: 'Allow',
            Action: [
              'codecommit:AssociateApprovalRuleTemplateWithRepository',
              'codecommit:DisassociateApprovalRuleTemplateFromRepository',
            ],
            Resource: this.repository.repositoryArn,
          },
        ],
      },
    );

    new CustomResource(this, 'CustomResource', {
      serviceToken,
      resourceType,
      properties: {
        ApprovalRuleTemplateName: props.approvalRuleTemplateName,
        RepositoryName: this.repository.repositoryName,
      },
    });
  }

  public onOverridden(id: string, options: OnEventOptions): Rule {
    const rule = this.repository.onPullRequestStateChange(id, options);
    rule.addEventPattern({
      detail: {
        event: ['pullRequestApprovalRuleOverridden'],
      },
    });
    return rule;
  }
}
