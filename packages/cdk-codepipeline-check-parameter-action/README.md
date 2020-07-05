![cloudcomponents Logo](/logo.png?raw=true)

# @cloudcomponents/cdk-codepipeline-check-parameter-action

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-constructs.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-constructs)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-codepipeline-check-parameter-action)

> Cdk component that checks if system parameters are set correctly

## Install

```bash
npm i @cloudcomponents/cdk-codepipeline-check-parameter-action
```

## How to use

```typescript
import { App, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { Pipeline, Artifact } from '@aws-cdk/aws-codepipeline';
import { CodeCommitSourceAction } from '@aws-cdk/aws-codepipeline-actions';
import { CodePipelineCheckParameterAction } from '@cloudcomponents/cdk-codepipeline-check-parameter-action';

export class CodePipelineCheckParameterActionStack extends Stack {
  public constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    const repository = new Repository(this, 'Repository', {
      repositoryName: 'MyRepositoryName',
      description: 'Some description.', // optional property
    });

    const sourceArtifact = new Artifact();

    const sourceAction = new CodeCommitSourceAction({
      actionName: 'CodeCommit',
      repository,
      output: sourceArtifact,
      branch: 'master',
    });

    const checkAction = new CodePipelineCheckParameterAction({
      actionName: 'CheckUrl',
      parameterName: '/url',
      regExp: /^http:\/\/[a-zA-Z0-9_\-]+\.[a-zA-Z0-9_\-]+\.[a-zA-Z0-9_\-]+$/,
      logParameter: true,
    });

    new Pipeline(this, 'MyPipeline', {
      pipelineName: 'MyPipeline',
      stages: [
        {
          stageName: 'Source',
          actions: [sourceAction],
        },
        {
          stageName: 'SystemCheck',
          actions: [checkAction],
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
