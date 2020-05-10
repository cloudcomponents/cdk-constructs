import {
    CloudFormationCustomResourceEvent,
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceUpdateEvent,
    CloudFormationCustomResourceDeleteEvent,
} from 'aws-lambda';
import { CodeCommit } from 'aws-sdk';

export interface ApprovalRuleRepositoryAssociationProps {
    approvalRuleTemplateName: string;
    repositoryNames: string[];
}

interface HandlerReturn {
    PhysicalResourceId: string;
    Data: {
        AssociatedRepositoryNames?: CodeCommit.RepositoryNameList;
        DisAssociatedRepositoryNames?: CodeCommit.RepositoryNameList;
    };
}

const codecommit = new CodeCommit();

const getProperties = (
    props:
        | CloudFormationCustomResourceEvent['ResourceProperties']
        | CloudFormationCustomResourceUpdateEvent['OldResourceProperties'],
): ApprovalRuleRepositoryAssociationProps => ({
    approvalRuleTemplateName: props.ApprovalRuleTemplateName,
    repositoryNames: props.RepositoryNames,
});

const onCreate = async (
    event: CloudFormationCustomResourceCreateEvent,
): Promise<HandlerReturn> => {
    const { approvalRuleTemplateName, repositoryNames } = getProperties(
        event.ResourceProperties,
    );

    const { associatedRepositoryNames } = await codecommit
        .batchAssociateApprovalRuleTemplateWithRepositories({
            approvalRuleTemplateName,
            repositoryNames,
        })
        .promise();

    return {
        PhysicalResourceId: approvalRuleTemplateName,
        Data: {
            AssociatedRepositoryNames: associatedRepositoryNames,
        },
    };
};

const onUpdate = async (
    event: CloudFormationCustomResourceUpdateEvent,
): Promise<HandlerReturn> => {
    const newProps = getProperties(event.ResourceProperties);
    const oldProps = getProperties(event.OldResourceProperties);

    let associatedRepositoryNames: CodeCommit.RepositoryNameList = [];
    let disassociatedRepositoryNames: CodeCommit.RepositoryNameList = [];

    const added =
        newProps.approvalRuleTemplateName === oldProps.approvalRuleTemplateName
            ? newProps.repositoryNames.filter((element) => {
                  return !oldProps.repositoryNames.includes(element);
              })
            : newProps.repositoryNames;

    if (added.length > 0) {
        const response = await codecommit
            .batchAssociateApprovalRuleTemplateWithRepositories({
                approvalRuleTemplateName: newProps.approvalRuleTemplateName,
                repositoryNames: added,
            })
            .promise();

        associatedRepositoryNames = response.associatedRepositoryNames;
    }

    const deleted =
        newProps.approvalRuleTemplateName === oldProps.approvalRuleTemplateName
            ? oldProps.repositoryNames.filter((element) => {
                  return !newProps.repositoryNames.includes(element);
              })
            : oldProps.repositoryNames;

    if (deleted.length > 0) {
        const response = await codecommit
            .batchDisassociateApprovalRuleTemplateFromRepositories({
                approvalRuleTemplateName: newProps.approvalRuleTemplateName,
                repositoryNames: deleted,
            })
            .promise();

        disassociatedRepositoryNames = response.disassociatedRepositoryNames;
    }

    return {
        PhysicalResourceId: newProps.approvalRuleTemplateName,
        Data: {
            AssociatedRepositoryNames: associatedRepositoryNames,
            DisAssociatedRepositoryNames: disassociatedRepositoryNames,
        },
    };
};

const onDelete = async (
    event: CloudFormationCustomResourceDeleteEvent,
): Promise<void> => {
    const { approvalRuleTemplateName, repositoryNames } = getProperties(
        event.ResourceProperties,
    );

    await codecommit
        .batchDisassociateApprovalRuleTemplateFromRepositories({
            approvalRuleTemplateName,
            repositoryNames,
        })
        .promise();
};

export const handler = async (
    event: CloudFormationCustomResourceEvent,
): Promise<HandlerReturn | void> => {
    const requestType = event.RequestType;

    switch (requestType) {
        case 'Create':
            return onCreate(event as CloudFormationCustomResourceCreateEvent);
        case 'Update':
            return onUpdate(event as CloudFormationCustomResourceUpdateEvent);
        case 'Delete':
            return onDelete(event as CloudFormationCustomResourceDeleteEvent);
        default:
            throw new Error(`Invalid request type: ${requestType}`);
    }
};
