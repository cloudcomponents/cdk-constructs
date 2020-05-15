# @cloudcomponents/cdk-pull-request-check

> Cdk component that automatically check pull requests

## Install

```bash
npm install --save @cloudcomponents/cdk-pull-request-check
```

## How to use

```javascript
import { App, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { BuildSpec } from '@aws-cdk/aws-codebuild';
import { PullRequestCheck } from '@cloudcomponents/cdk-pull-request-check';

export class CodepipelineStack extends Stack {
    constructor(parent: App, name: string, props?: StackProps) {
        super(parent, name, props);

        const repository = new Repository(this, 'Repository', {
            repositoryName: 'MyRepositoryName',
            description: 'Some description.', // optional property
        });

        // Codepipeline etc.

        new PullRequestCheck(this, 'PullRequestCheck', {
            repository,
            buildSpec: BuildSpec.fromSourceFilename('buildspecs/prcheck.yml'),
        });
    }
}
```

## Approval Template Rules

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
                repositories: [repository],
            },
        );

        // Approves the pull request
        new PullRequestCheck(this, 'PullRequestCheck', {
            repository,
            buildSpec: BuildSpec.fromSourceFilename('buildspecs/prcheck.yml'),
        });
    }
}
```

## Custom notifications

The component comments the pull request and sets the approval state by default. Custom notifications can be set up this way

```typescript
import { App, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { BuildSpec } from '@aws-cdk/aws-codebuild';
import { SnsTopic } from '@aws-cdk/aws-events-targets';
import { Topic } from '@aws-cdk/aws-sns';
import { EmailSubscription } from '@aws-cdk/aws-sns-subscriptions';
import { PullRequestCheck } from '@cloudcomponents/cdk-pull-request-check';

export class CodepipelineStack extends Stack {
    constructor(parent: App, name: string, props?: StackProps) {
        super(parent, name, props);

        const repository = new Repository(this, 'Repository', {
            repositoryName: 'MyRepositoryName',
            description: 'Some description.', // optional property
        });

        // Your Codepipeline...

        const prCheck = new PullRequestCheck(this, 'PullRequestCheck', {
            repository,
            buildSpec: BuildSpec.fromSourceFilename('buildspecs/prcheck.yml'),
        });

        const prTopic = new Topic(this, 'PullRequestTopic');

        prTopic.addSubscription(
            new EmailSubscription(process.env.DEVSECOPS_TEAM_EMAIL as string),
        );

        prCheck.onCheckStarted('started', {
            target: new SnsTopic(prTopic),
        });

        prCheck.onCheckSucceeded('succeeded', {
            target: new SnsTopic(prTopic),
        });

        prCheck.onCheckFailed('failed', {
            target: new SnsTopic(prTopic),
        });
    }
}
```

## License

[MIT](../../LICENSE)
