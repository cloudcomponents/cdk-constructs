import { CustomResource, CustomResourceProvider, CustomResourceProviderRuntime } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { approvalRuleTemplateDir } from './directories';

export interface Approvers {
  readonly numberOfApprovalsNeeded: number;
  readonly approvalPoolMembers?: string[];
}

export interface Template {
  readonly branches?: string[];
  readonly approvers: Approvers;
}

export interface ApprovalRuleTemplateProps {
  /**
   * The name of the approval rule template.
   */
  readonly approvalRuleTemplateName: string;

  /**
   * The description of the approval rule template
   */
  readonly approvalRuleTemplateDescription?: string;

  /**
   * The content of the approval rule that is created on pull requests in associated repositories.
   */
  readonly template: Template;
}

export class ApprovalRuleTemplate extends Construct {
  public readonly approvalRuleTemplateName: string;

  constructor(scope: Construct, id: string, props: ApprovalRuleTemplateProps) {
    super(scope, id);

    const { approvalRuleTemplateName, approvalRuleTemplateDescription, template } = props;

    const serviceToken = CustomResourceProvider.getOrCreate(this, 'Custom::ApprovalRuleTemplate', {
      codeDirectory: approvalRuleTemplateDir,
      runtime: CustomResourceProviderRuntime.NODEJS_16_X,
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
    });

    const resource = new CustomResource(this, 'CustomResource', {
      serviceToken,
      resourceType: 'Custom::ApprovalRuleTemplate',
      properties: {
        ApprovalRuleTemplateName: approvalRuleTemplateName,
        ApprovalRuleTemplateDescription: approvalRuleTemplateDescription,
        Template: {
          DestinationReferences: template.branches?.map((branch) => `refs/heads/${branch}`),
          Approvers: {
            NumberOfApprovalsNeeded: template.approvers.numberOfApprovalsNeeded,
            ApprovalPoolMembers: template.approvers.approvalPoolMembers,
          },
        },
      },
    });

    this.approvalRuleTemplateName = resource.getAttString('ApprovalRuleTemplateName');
  }
}
