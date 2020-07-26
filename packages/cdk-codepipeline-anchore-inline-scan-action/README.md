[![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)](https://github.com/cloudcomponents/cdk-constructs)

# @cloudcomponents/cdk-codepipeline-anchore-inline-scan-action

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-constructs.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-constructs)
[![cdkdx](https://img.shields.io/badge/buildtool-cdkdx-blue.svg)](https://github.com/hupe1980/cdkdx)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-codepipeline-anchore-inline-scan-action)
[![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)](https://pypi.org/project/cloudcomponents.cdk-codepipeline-anchore-inline-scan-action/)

> CodePipeline action to integrate [Anchore Engine](https://docs.anchore.com/current/) into your pipeline

## Install
TypeScript/JavaScript:

```bash
npm i @cloudcomponents/cdk-codepipeline-anchore-inline-scan-action
```

Python:

```bash
pip install cloudcomponents.cdk-codepipeline-anchore-inline-scan-action
```

## How to use

```typescript
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { Pipeline, Artifact } from '@aws-cdk/aws-codepipeline';
import { CodeCommitSourceAction } from '@aws-cdk/aws-codepipeline-actions';
import { CodePipelineDockerfileLinterAction } from '@cloudcomponents/cdk-codepipeline-dockerfile-linter-action';
import { CodePipelineAnchoreInlineScanAction } from '@cloudcomponents/cdk-codepipeline-anchore-inline-scan-action';
export class ContainerAuditStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const repository = new Repository(this, 'Repository', {
      repositoryName: 'container-audit-repository',
    });

    const sourceArtifact = new Artifact();

    const sourceAction = new CodeCommitSourceAction({
      actionName: 'CodeCommit',
      repository,
      output: sourceArtifact,
      branch: 'master',
    });

    const linterAction = new CodePipelineDockerfileLinterAction({
      actionName: 'Linter',
      input: sourceArtifact,
    });

    const vulnScanAction = new CodePipelineAnchoreInlineScanAction({
      actionName: 'VulnScan',
      input: sourceArtifact,
    });

    new Pipeline(this, 'Pipeline', {
      pipelineName: 'container-audit-pipeline',
      stages: [
        {
          stageName: 'Source',
          actions: [sourceAction],
        },
        {
          stageName: 'Audit',
          actions: [linterAction, vulnScanAction],
        },
      ],
    });
  }
}
```

## API Reference

See [API.md](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-codepipeline-anchore-inline-scan-action/API.md).

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-codepipeline-anchore-inline-scan-action/LICENSE)
