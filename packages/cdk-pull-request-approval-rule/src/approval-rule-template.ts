import {
  Construct,
  CustomResource,
  CustomResourceProvider,
  CustomResourceProviderRuntime,
} from '@aws-cdk/core';

import { approvalRuleTemplateDir } from './directories';

interface Approvers {
  numberOfApprovalsNeeded: number;
  approvalPoolMembers?: string;
}

interface Template {
  branches?: string[];
  approvers: Approvers;
}

export interface ApprovalRuleTemplateProps {
  /**
   * The name of the approval rule template.
   */
  approvalRuleTemplateName: string;

  /**
   * The description of the approval rule template
   */
  approvalRuleTemplateDescription?: string;

  /**
   * The content of the approval rule that is created on pull requests in associated repositories.
   */
  template: Template;
}

export class ApprovalRuleTemplate extends Construct {
  public readonly approvalRuleTemplateName: string;

  public constructor(
    parent: Construct,
    id: string,
    props: ApprovalRuleTemplateProps,
  ) {
    super(parent, id);

    const {
      approvalRuleTemplateName,
      approvalRuleTemplateDescription,
      template,
    } = props;

    const serviceToken = CustomResourceProvider.getOrCreate(
      this,
      'Custom::ApprovalRuleTemplate',
      {
        codeDirectory: approvalRuleTemplateDir,
        runtime: CustomResourceProviderRuntime.NODEJS_12,
        policyStatements: [
          {
            Effect: 'Allow',
            Action: [
              'codecommit:CreateApprovalRuleTemplate',
              'codecommit:DeleteApprovalRuleTemplate',
              'codecommit:GetApprovalRuleTemplate',
              'codecommit:UpdateApprovalRuleTemplateContent',
              'codecommit:UpdateApprovalRuleTemplateDescription',
              'codecommit:UpdateApprovalRuleTemplateName',
            ],
            Resource: '*',
          },
        ],
      },
    );

    const resource = new CustomResource(this, 'CustomResource', {
      serviceToken,
      resourceType: 'Custom::ApprovalRuleTemplate',
      properties: {
        ApprovalRuleTemplateName: approvalRuleTemplateName,
        ApprovalRuleTemplateDescription: approvalRuleTemplateDescription,
        Template: {
          DestinationReferences: template.branches?.map(
            (branch) => `refs/heads/${branch}`,
          ),
          Approvers: {
            NumberOfApprovalsNeeded: template.approvers.numberOfApprovalsNeeded,
            ApprovalPoolMembers: template.approvers.approvalPoolMembers,
          },
        },
      },
    });

    this.approvalRuleTemplateName = resource.getAttString(
      'ApprovalRuleTemplateName',
    );
  }
}
