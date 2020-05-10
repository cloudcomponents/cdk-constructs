import * as path from 'path';
import {
    Construct,
    CustomResource,
    CustomResourceProvider,
    CustomResourceProviderRuntime,
} from '@aws-cdk/core';
import { IRepository } from '@aws-cdk/aws-codecommit';

export interface ApprovalRuleTemplateRepositoryAssociationProps {
    /**
     * The name of the template you want to associate with one or more repositories.
     */
    approvalRuleTemplateName: string;

    /**
     * The repositories you want to associate with the template.
     */
    repositories: IRepository[];
}

export class ApprovalRuleTemplateRepositoryAssociation extends Construct {
    public constructor(
        parent: Construct,
        id: string,
        props: ApprovalRuleTemplateRepositoryAssociationProps,
    ) {
        super(parent, id);

        const { approvalRuleTemplateName, repositories } = props;

        const resourceType =
            'Custom::ApprovalRuleTemplateRepositoryAssociation';

        const serviceToken = CustomResourceProvider.getOrCreate(
            this,
            resourceType,
            {
                codeDirectory: path.join(
                    __dirname,
                    'lambdas',
                    'approval-rule-template-repository-association',
                ),
                runtime: CustomResourceProviderRuntime.NODEJS_12,
                policyStatements: [
                    {
                        Effect: 'Allow',
                        Action: [
                            'codecommit:AssociateApprovalRuleTemplateWithRepository',
                            'codecommit:BatchAssociateApprovalRuleTemplateWithRepositories',
                            'codecommit:BatchDisassociateApprovalRuleTemplateFromRepositories',
                            'codecommit:DisassociateApprovalRuleTemplateFromRepository',
                            'codecommit:ListAssociatedApprovalRuleTemplatesForRepository',
                        ],
                        Resource: repositories.map(
                            ({ repositoryArn }) => repositoryArn,
                        ),
                    },
                ],
            },
        );

        new CustomResource(this, 'CustomResource', {
            serviceToken,
            resourceType,
            properties: {
                ApprovalRuleTemplateName: approvalRuleTemplateName,
                RepositoryNames: repositories.map(
                    (repo) => repo.repositoryName,
                ),
            },
        });
    }
}
