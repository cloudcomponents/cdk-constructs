[![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)](https://github.com/cloudcomponents/cdk-constructs)

# @cloudcomponents/cdk-pull-request-approval-rule

[![Build Status](https://github.com/cloudcomponents/cdk-constructs/workflows/Build/badge.svg)](https://github.com/cloudcomponents/cdk-constructs/actions?query=workflow=Build)
[![cdkdx](https://img.shields.io/badge/buildtool-cdkdx-blue.svg)](https://github.com/hupe1980/cdkdx)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-pull-request-approval-rule)
[![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)](https://pypi.org/project/cloudcomponents.cdk-pull-request-approval-rule/)

> CodeCommit pull request approval rules to enforcing your pull request workflow

## Install
TypeScript/JavaScript:

```bash
npm i @cloudcomponents/cdk-pull-request-approval-rule
```

Python:

```bash
pip install cloudcomponents.cdk-pull-request-approval-rule
```

## How to use

```typescript
import { ApprovalRuleTemplate, ApprovalRuleTemplateRepositoryAssociation } from '@cloudcomponents/cdk-pull-request-approval-rule';
import { PullRequestCheck } from '@cloudcomponents/cdk-pull-request-check';
import { Stack, StackProps } from 'aws-cdk-lib';
import { BuildSpec } from 'aws-cdk-lib/aws-codebuild';
import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { Construct } from 'constructs';

export class PullRequestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const repository = new Repository(this, 'Repository', {
      repositoryName: 'pr-check-repository',
    });

    const { approvalRuleTemplateName } = new ApprovalRuleTemplate(this, 'ApprovalRuleTemplate', {
      approvalRuleTemplateName: 'template-name',
      template: {
        approvers: {
          numberOfApprovalsNeeded: 1,
        },
      },
    });

    new ApprovalRuleTemplateRepositoryAssociation(this, 'ApprovalRuleTemplateRepositoryAssociation', {
      approvalRuleTemplateName,
      repository,
    });

    new PullRequestCheck(this, 'PullRequestCheck', {
      repository,
      buildSpec: BuildSpec.fromSourceFilename('prcheck.yml'),
    });
  }
}
```

## ApprovalRuleOverridden notification

```typescript
import { ApprovalRuleTemplate, ApprovalRuleTemplateRepositoryAssociation } from '@cloudcomponents/cdk-pull-request-approval-rule';
import { PullRequestCheck } from '@cloudcomponents/cdk-pull-request-check';
import { Stack, StackProps } from 'aws-cdk-lib';
import { BuildSpec } from 'aws-cdk-lib/aws-codebuild';
import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { SnsTopic } from 'aws-cdk-lib/aws-events-targets';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';

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
          approvalRuleTemplateName,
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

## API Reference

See [API.md](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-pull-request-approval-rule/API.md).

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-pull-request-approval-rule/LICENSE)
