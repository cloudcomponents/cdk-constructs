![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)

# @cloudcomponents/cdk-pull-request-approval-rule

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-constructs.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-constructs)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-pull-request-approval-rule)

> CodeCommit pull request approval rules to enforcing your pull request workflow

## Install

```bash
npm i @cloudcomponents/cdk-pull-request-approval-rule
```

## How to use

```typescript
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { BuildSpec } from '@aws-cdk/aws-codebuild';
import { PullRequestCheck } from '@cloudcomponents/cdk-pull-request-check';
import {
  ApprovalRuleTemplate,
  ApprovalRuleTemplateRepositoryAssociation,
} from '@cloudcomponents/cdk-pull-request-approval-rule';

export class PullRequestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const repository = new Repository(this, 'Repository', {
      repositoryName: 'pr-check-repository',
    });

    const { approvalRuleTemplateName } = new ApprovalRuleTemplate(
      this,
      'ApprovalRuleTemplate',
      {
        approvalRuleTemplateName: 'template-name',
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

    new PullRequestCheck(this, 'PullRequestCheck', {
      repository,
      buildSpec: BuildSpec.fromSourceFilename('prcheck.yml'),
    });
  }
}
```

## ApprovalRuleOverridden notification

```typescript
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { BuildSpec } from '@aws-cdk/aws-codebuild';
import { PullRequestCheck } from '@cloudcomponents/cdk-pull-request-check';
import {
  ApprovalRuleTemplate,
  ApprovalRuleTemplateRepositoryAssociation,
} from '@cloudcomponents/cdk-pull-request-approval-rule';

export class PullRequestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const repository = new Repository(this, 'Repository', {
      repositoryName: 'pr-check-repository',
    });

    const { approvalRuleTemplateName } = new ApprovalRuleTemplate(
      this,
      'ApprovalRuleTemplate',
      {
        approvalRuleTemplateName: 'template-name',
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
}
```

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](./LICENSE)
