# @cloudcomponents/cdk-components

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-components.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-components)

> A collection of higher-level [cdk components](https://github.com/awslabs/aws-cdk): slack-approval-workflow, slack-notifier, codecommit-backup, OWASP dependency-check, contentful-webhook, github-webhook, static-website, pull-request-check, codepipeline-merge-action, codepipeline-check-parameter-action...

## Components

This repository is a monorepo managed with [Lerna](https://github.com/lerna/lerna). [Several components](/packages) are published to npm from the same codebase.

| Component                                                                                    | Description                                                                                                                  |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [cdk-codepipeline-slack](/packages/cdk-codepipeline-slack)                                   | Cdk component that provisions a #slack approval workflow and notification messages on codepipeline state changes             |
| [cdk-contentful-webhook](/packages/cdk-contentful-webhook)                                   | Cdk component that provides contentful webhooks                                                                              |
| [cdk-github-webhook](/packages/cdk-github-webhook)                                           | Cdk component that provides github webhooks                                                                                  |
| [cdk-stripe-webhook](/packages/cdk-stripe-webhook)                                           | Cdk component that provides stripe webhooks                                                                                  |
| [cdk-static-website](/packages/cdk-static-website)                                           | Cdk component that creates a static website using S3, configures CloudFront (CDN) and maps a custom domain via Route53 (DNS) |
| [cdk-pull-request-check](/packages/cdk-pull-request-check)                                   | Cdk component that automatically check pull requests                                                                         |
| [cdk-codepipeline-merge-action](/packages/cdk-codepipeline-merge-action)                     | Cdk component that automatically merge branches in codepipelines                                                             |
| [cdk-codepipeline-check-parameter-action](/packages/cdk-codepipeline-check-parameter-action) | Cdk component that checks if system parameters are set correctly                                                             |
| [cdk-codecommit-backup](/packages/cdk-codecommit-backup)                                     | Backup CodeCommit repositories to S3                                                                                         |
| [cdk-dependency-check](/packages/cdk-dependency-check)                                       | OWASP dependency-check                                                                                                       |

## Contributing

We welcome community contributions and pull requests.

## License

[MIT](LICENSE)
