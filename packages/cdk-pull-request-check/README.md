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

## License

[MIT](../../LICENSE)
