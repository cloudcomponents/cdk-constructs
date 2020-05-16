![cloudcomponents Logo](/logo.png?raw=true)

# @cloudcomponents/cdk-pull-request-approval-rule

> Codecommit pull request approval rules

## Install

```bash
npm i @cloudcomponents/cdk-pull-request-approval-rule
```

## How to use

```typescript
import { App, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { BuildSpec } from '@aws-cdk/aws-codebuild';
import { PullRequestCheck } from '@cloudcomponents/cdk-pull-request-check';
import {
    ApprovalRuleTemplate,
    ApprovalRuleTemplateRepositoryAssociation,
} from '@cloudcomponents/cdk-pull-request-approval-rule';

export class CodepipelinePullRequestCheckStack extends Stack {
    public constructor(parent: App, name: string, props?: StackProps) {
        super(parent, name, props);

        const repository = new Repository(this, 'Repository', {
            repositoryName: 'repository',
            description: 'Some description.', // optional property
        });

        const { approvalRuleTemplateName } = new ApprovalRuleTemplate(
            this,
            'ApprovalRuleTemplate',
            {
                approvalRuleTemplateName: 'Require 1 approver',
                template: {
                    approvers: {
                        numberOfApprovalsNeeded: 1,
                    },
                },
            },
        );

        new ApprovalRuleTemplateRepositoryAssociation(
            this,
            'ApprovalRuleTemplateRepositoryAssociation',
            {
                approvalRuleTemplateName,
                repository,
            },
        );

        // Approves the pull request
        new PullRequestCheck(this, 'PullRequestCheck', {
            repository,
            buildSpec: BuildSpec.fromSourceFilename('prcheck.yml'),
        });
    }
}
```

## ApprovalRuleOverridden notification

```typescript
import { App, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { BuildSpec } from '@aws-cdk/aws-codebuild';
import { Topic } from '@aws-cdk/aws-sns';
import { SnsTopic } from '@aws-cdk/aws-events-targets';
import { PullRequestCheck } from '@cloudcomponents/cdk-pull-request-check';
import {
    ApprovalRuleTemplate,
    ApprovalRuleTemplateRepositoryAssociation,
} from '@cloudcomponents/cdk-pull-request-approval-rule';

export class CodepipelinePullRequestCheckStack extends Stack {
    public constructor(parent: App, name: string, props?: StackProps) {
        super(parent, name, props);

        const repository = new Repository(this, 'Repository', {
            repositoryName: 'repository',
            description: 'Some description.', // optional property
        });

        const { approvalRuleTemplateName } = new ApprovalRuleTemplate(
            this,
            'ApprovalRuleTemplate',
            {
                approvalRuleTemplateName: 'Require 1 approver',
                template: {
                    approvers: {
                        numberOfApprovalsNeeded: 1,
                    },
                },
            },
        );

        const ruleAsscociation = new ApprovalRuleTemplateRepositoryAssociation(
            stack,
            'ApprovalRuleTemplateRepositoryAssociation',
            {
                approvalRuleTemplateName: 'name',
                repository,
            },
        );

        const topic = new Topic(stack, 'Topic');

        ruleAsscociation.onOverridden('overridden', {
            target: new SnsTopic(topic),
        });

        // Approves the pull request
        new PullRequestCheck(this, 'PullRequestCheck', {
            repository,
            buildSpec: BuildSpec.fromSourceFilename('prcheck.yml'),
        });
    }
```

## License

[MIT](../../LICENSE)
