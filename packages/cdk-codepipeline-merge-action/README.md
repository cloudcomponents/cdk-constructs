![cloudcomponents Logo](/logo.png?raw=true)

# @cloudcomponents/cdk-codepipeline-merge-action

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-constructs.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-constructs)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-codepipeline-merge-action)

> Cdk component that automatically merge branches in codepipelines

## Install

```bash
npm i @cloudcomponents/cdk-codepipeline-merge-action
```

## How to use

```typescript
import { App, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { Pipeline, Artifact } from '@aws-cdk/aws-codepipeline';
import { CodeCommitSourceAction } from '@aws-cdk/aws-codepipeline-actions';
import { CodePipelineMergeAction } from '@cloudcomponents/cdk-codepipeline-merge-action';

const PIPELINE_BRANCH = 'next';

export class CodePipelineMergeActionStack extends Stack {
  public constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    const repository = new Repository(this, 'Repository', {
      repositoryName: 'MyRepositoryName',
    });

    const sourceArtifact = new Artifact();

    const sourceAction = new CodeCommitSourceAction({
      actionName: 'CodeCommit',
      repository,
      output: sourceArtifact,
      branch: PIPELINE_BRANCH,
    });

    const mergeAction = new CodePipelineMergeAction({
      actionName: 'MergeIntoMaster',
      repository,
      sourceCommitSpecifier: PIPELINE_BRANCH,
      destinationCommitSpecifier: 'master',
    });

    new Pipeline(this, 'MyPipeline', {
      pipelineName: 'MyPipeline',
      stages: [
        {
          stageName: 'Source',
          actions: [sourceAction],
        },
        {
          stageName: 'Merge',
          actions: [mergeAction],
        },
      ],
    });
  }
}
```

## Example

See more complete [examples](../../examples).

## License

[MIT](./LICENSE)
