import { CustomResource, CustomResourceProvider, CustomResourceProviderRuntime } from 'aws-cdk-lib';
import { IRepository } from 'aws-cdk-lib/aws-codecommit';
import { OnEventOptions, Rule } from 'aws-cdk-lib/aws-events';
import { Construct } from 'constructs';

import { approvalRuleTemplateRepositoryAssociationDir } from './directories';

export interface ApprovalRuleTemplateRepositoryAssociationProps {
  /**
   * The name of the template you want to associate with one or more repositories.
   */
  readonly approvalRuleTemplateName: string;

  /**
   * The repository you want to associate with the template.
   */
  readonly repository: IRepository;
}

export class ApprovalRuleTemplateRepositoryAssociation extends Construct {
  private repository: IRepository;

  constructor(scope: Construct, id: string, props: ApprovalRuleTemplateRepositoryAssociationProps) {
    super(scope, id);

    this.repository = props.repository;

    const resourceType = 'Custom::ApprovalRuleTemplateRepositoryAssociation';

    const serviceToken = CustomResourceProvider.getOrCreate(this, resourceType, {
      codeDirectory: approvalRuleTemplateRepositoryAssociationDir,
      runtime: CustomResourceProviderRuntime.NODEJS_18_X,
      policyStatements: [
        {
          Effect: 'Allow',
          Action: ['codecommit:AssociateApprovalRuleTemplateWithRepository', 'codecommit:DisassociateApprovalRuleTemplateFromRepository'],
          Resource: '*',
        },
      ],
    });

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
