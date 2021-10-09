import type {
  CloudFormationCustomResourceEvent,
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceUpdateEvent,
  CloudFormationCustomResourceDeleteEvent,
} from 'aws-lambda';
import { CodeCommit } from 'aws-sdk';

interface Approvers {
  numberOfApprovalsNeeded: number;
  approvalPoolMembers?: string[];
}

interface Template {
  destinationReferences?: string[];
  approvers: Approvers;
}

interface HandlerReturn {
  PhysicalResourceId: string;
  Data: {
    ApprovalRuleTemplateName: CodeCommit.ApprovalRuleTemplateName;
  };
}

export interface ApprovalRuleTemplateProps {
  approvalRuleTemplateName: string;
  approvalRuleTemplateDescription?: string;
  template: Template;
}

const codecommit = new CodeCommit();

const getProperties = (
  props: CloudFormationCustomResourceEvent['ResourceProperties'] | CloudFormationCustomResourceUpdateEvent['OldResourceProperties'],
): ApprovalRuleTemplateProps => ({
  approvalRuleTemplateName: props.ApprovalRuleTemplateName,
  approvalRuleTemplateDescription: props.ApprovalRuleTemplateDescription,
  template: {
    destinationReferences: props.Template.DestinationReferences,
    approvers: {
      numberOfApprovalsNeeded: props.Template.Approvers.NumberOfApprovalsNeeded,
      approvalPoolMembers: props.Template.Approvers.ApprovalPoolMembers,
    },
  },
});

const buildTemplateContent = (template: Template): string => {
  const templateContent = {
    Version: '2018-11-08',
    DestinationReferences: template.destinationReferences || undefined,
    Statements: [
      {
        Type: 'Approvers',
        NumberOfApprovalsNeeded: template.approvers.numberOfApprovalsNeeded,
        ApprovalPoolMembers: template.approvers.approvalPoolMembers || undefined,
      },
    ],
  };
  return JSON.stringify(templateContent, null, 2);
};

const onCreate = async (event: CloudFormationCustomResourceCreateEvent): Promise<HandlerReturn> => {
  const { approvalRuleTemplateName, approvalRuleTemplateDescription = '', template } = getProperties(event.ResourceProperties);

  const { approvalRuleTemplate } = await codecommit
    .createApprovalRuleTemplate({
      approvalRuleTemplateName,
      approvalRuleTemplateDescription,
      approvalRuleTemplateContent: buildTemplateContent(template),
    })
    .promise();

  return {
    PhysicalResourceId: approvalRuleTemplate.approvalRuleTemplateId as string,
    Data: {
      ApprovalRuleTemplateName: approvalRuleTemplate.approvalRuleTemplateName as string,
    },
  };
};

const onUpdate = async (event: CloudFormationCustomResourceUpdateEvent): Promise<HandlerReturn> => {
  const newProps = getProperties(event.ResourceProperties);
  const oldProps = getProperties(event.OldResourceProperties);

  let approvalRuleTemplate: CodeCommit.ApprovalRuleTemplate | undefined;

  if (buildTemplateContent(newProps.template) !== buildTemplateContent(oldProps.template)) {
    const response = await codecommit
      .updateApprovalRuleTemplateContent({
        approvalRuleTemplateName: oldProps.approvalRuleTemplateName,
        newRuleContent: buildTemplateContent(newProps.template),
      })
      .promise();

    approvalRuleTemplate = response.approvalRuleTemplate;
  }

  if (newProps.approvalRuleTemplateDescription !== oldProps.approvalRuleTemplateDescription) {
    const response = await codecommit
      .updateApprovalRuleTemplateDescription({
        approvalRuleTemplateName: oldProps.approvalRuleTemplateName,
        approvalRuleTemplateDescription: newProps.approvalRuleTemplateDescription || '',
      })
      .promise();

    approvalRuleTemplate = response.approvalRuleTemplate;
  }

  if (newProps.approvalRuleTemplateName !== oldProps.approvalRuleTemplateName) {
    const response = await codecommit
      .updateApprovalRuleTemplateName({
        newApprovalRuleTemplateName: newProps.approvalRuleTemplateName,
        oldApprovalRuleTemplateName: oldProps.approvalRuleTemplateName,
      })
      .promise();

    approvalRuleTemplate = response.approvalRuleTemplate;
  }

  if (!approvalRuleTemplate) {
    const response = await codecommit
      .getApprovalRuleTemplate({
        approvalRuleTemplateName: oldProps.approvalRuleTemplateName,
      })
      .promise();

    approvalRuleTemplate = response.approvalRuleTemplate;
  }

  return {
    PhysicalResourceId: approvalRuleTemplate.approvalRuleTemplateId as string,
    Data: {
      ApprovalRuleTemplateName: approvalRuleTemplate.approvalRuleTemplateName as string,
    },
  };
};

const onDelete = async (event: CloudFormationCustomResourceDeleteEvent): Promise<void> => {
  const { approvalRuleTemplateName } = getProperties(event.ResourceProperties);

  await codecommit
    .deleteApprovalRuleTemplate({
      approvalRuleTemplateName,
    })
    .promise();
};

export const handler = async (event: CloudFormationCustomResourceEvent): Promise<HandlerReturn | void> => {
  const requestType = event.RequestType;

  switch (requestType) {
    case 'Create':
      return onCreate(event);
    case 'Update':
      return onUpdate(event);
    case 'Delete':
      return onDelete(event);
    default:
      throw new Error(`Invalid request type: ${requestType}`);
  }
};
