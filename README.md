![cloudcomponents Logo](/logo.png)

# @cloudcomponents/cdk-constructs

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-constructs.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-constructs)

> A collection of higher-level reusable [cdk constructs](https://github.com/awslabs/aws-cdk)

## Constructs

This repository is a monorepo managed with [Lerna](https://github.com/lerna/lerna). [Several constructs](/packages) are published to npm from the same codebase.

| Constructs                                                                                   | Description                                                                                                 | Downloads                                                                                      |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [cdk-codepipeline-slack](/packages/cdk-codepipeline-slack)                                   | #slack approval workflow and notification messages on codepipeline state changes                            | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-codepipeline-slack)                  |
| [cdk-contentful-webhook](/packages/cdk-contentful-webhook)                                   | Create, update and delete contentful webhooks with your app deployment                                      | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-contentful-webhook)                  |
| [cdk-github-webhook](/packages/cdk-github-webhook)                                           | Create, update and delete github webhooks with your app deployment                                          | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-github-webhook)                      |
| [cdk-stripe-webhook](/packages/cdk-stripe-webhook)                                           | Create, update and delete stripe webhooks with your app deployment                                          | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-stripe-webhook)                      |
| [cdk-static-website](/packages/cdk-static-website)                                           | Static website using S3, configures CloudFront (CDN) and maps a custom domain via Route53 (DNS)             | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-static-website)                      |
| [cdk-pull-request-check](/packages/cdk-pull-request-check)                                   | CodeCommit pull request check                                                                               | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-pull-request-check)                  |
| [cdk-pull-request-approval-rule](/packages/cdk-pull-request-approval-rule)                   | CodeCommit pull request approval rules                                                                      | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-pull-request-approval-rule)          |
| [cdk-codepipeline-merge-action](/packages/cdk-codepipeline-merge-action)                     | CodePipeline action to merge branches                                                                       | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-codepipeline-merge-action)           |
| [cdk-codepipeline-check-parameter-action](/packages/cdk-codepipeline-check-parameter-action) | Cdk component that checks if system parameters are set correctly                                            | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-codepipeline-check-parameter-action) |
| [cdk-codecommit-backup](/packages/cdk-codecommit-backup)                                     | Backup CodeCommit repositories to S3                                                                        | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-codecommit-backup)                   |
| [cdk-dependency-check](/packages/cdk-dependency-check)                                       | OWASP dependency-check for codecommit repositories                                                          | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-dependency-check)                    |
| [cdk-container-registry](/packages/cdk-container-registry)                                   | Registry for container images                                                                               | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-container-registry)                  |
| [cdk-blue-green-container-deployment](/packages/cdk-blue-green-container-deployment)         | Blue green container deployment                                                                             | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-blue-green-container-deployment)     |
| [cdk-chatops](/packages/cdk-chatops)                                                         | Constructs for chattool integration: #slack / msteams                                                       | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-chatops)                             |
| [cdk-developer-tools-notifications](/packages/cdk-developer-tools-notifications)             | #slack / msteams / email notifications for developer tools: CodeCommit, CodeBuild, CodeDeploy, CodePipeline | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-developer-tools-notifications)       |
| [cdk-deletable-bucket](/packages/cdk-deletable-bucket)                                       | Bucket with content cleanup to allow bucket deletion when the stack will be destroyed                       | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-deletable-bucket)                    |

## Contributing

We welcome community contributions and pull requests.

## License

[MIT](LICENSE)
