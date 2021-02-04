[![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)](https://github.com/cloudcomponents/cdk-constructs)

# @cloudcomponents/cdk-pull-request-check 

[![Build Status](https://github.com/cloudcomponents/cdk-constructs/workflows/Build/badge.svg)](https://github.com/cloudcomponents/cdk-constructs/actions?query=workflow=Build)
[![cdkdx](https://img.shields.io/badge/buildtool-cdkdx-blue.svg)](https://github.com/hupe1980/cdkdx)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-pull-request-check)
[![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)](https://pypi.org/project/cloudcomponents.cdk-pull-request-check/)
[![Mentioned in Awesome CDK](https://awesome.re/mentioned-badge.svg)](https://github.com/kolomied/awesome-cdk)

> Cdk component that automatically check pull requests

## Install
TypeScript/JavaScript:

```bash
npm install --save @cloudcomponents/cdk-pull-request-check
```

Python:

```bash
pip install cloudcomponents.cdk-pull-request-check
```

## How to use

```typescript
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { BuildSpec } from '@aws-cdk/aws-codebuild';
import { PullRequestCheck } from '@cloudcomponents/cdk-pull-request-check';

export class CodePipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const repository = new Repository(this, 'Repository', {
      repositoryName: 'MyRepositoryName',
    });

    // CodePipeline etc.

    new PullRequestCheck(this, 'PullRequestCheck', {
      repository,
      buildSpec: BuildSpec.fromSourceFilename('prcheck.yml'),
    });
  }
}
```

## Approval Template Rules

```typescript
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { BuildSpec } from '@aws-cdk/aws-codebuild';
import { PullRequestCheck } from '@cloudcomponents/cdk-pull-request-check';
import {
  ApprovalRuleTemplate,
  ApprovalRuleTemplateRepositoryAssociation,
} from '@cloudcomponents/cdk-pull-request-approval-rule';

export class CodePipelinePullRequestCheckStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const repository = new Repository(this, 'Repository', {
      repositoryName: 'repository',
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

## Custom notifications

The component comments the pull request and sets the approval state by default. Custom notifications can be set up this way

```typescript
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { BuildSpec } from '@aws-cdk/aws-codebuild';
import { SnsTopic } from '@aws-cdk/aws-events-targets';
import { Topic } from '@aws-cdk/aws-sns';
import { EmailSubscription } from '@aws-cdk/aws-sns-subscriptions';
import { PullRequestCheck } from '@cloudcomponents/cdk-pull-request-check';

export class CodePipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const repository = new Repository(this, 'Repository', {
      repositoryName: 'MyRepositoryName',
      description: 'Some description.', // optional property
    });

    // Your CodePipeline...

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

## API Reference

See [API.md](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-pull-request-check/API.md).

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-pull-request-check/LICENSE)
