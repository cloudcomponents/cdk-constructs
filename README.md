[![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)](https://github.com/cloudcomponents/cdk-constructs)

# @cloudcomponents/cdk-constructs

[![Build Status](https://github.com/cloudcomponents/cdk-constructs/workflows/Build/badge.svg)](https://github.com/cloudcomponents/cdk-constructs/actions?query=workflow=Build)
[![cdkdx](https://img.shields.io/badge/buildtool-cdkdx-blue.svg)](https://github.com/hupe1980/cdkdx)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/search?q=%40cloudcomponents)
[![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)](https://pypi.org/search/?q=%22cloudcomponents%22&o=)

> A collection of higher-level reusable [cdk constructs](https://github.com/awslabs/aws-cdk)

## Constructs

This repository is a monorepo managed with [Lerna](https://github.com/lerna/lerna). [Several constructs](/packages) are published to pypi and npm from the same codebase.

| Constructs                                                                                           | Description                                                                                                 | Npm-Downloads                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [cdk-codepipeline-slack](/packages/cdk-codepipeline-slack)                                           | #slack approval workflow and notification messages on codepipeline state changes                            | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-codepipeline-slack)                      |
| [cdk-contentful-webhook](/packages/cdk-contentful-webhook)                                           | Create, update and delete contentful webhooks with your app deployment                                      | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-contentful-webhook)                      |
| [cdk-github-webhook](/packages/cdk-github-webhook)                                                   | Create, update and delete github webhooks with your app deployment                                          | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-github-webhook)                          |
| [cdk-stripe-webhook](/packages/cdk-stripe-webhook)                                                   | Create, update and delete stripe webhooks with your app deployment                                          | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-stripe-webhook)                          |
| [cdk-static-website](/packages/cdk-static-website)                                                   | Static website using S3, configures CloudFront (CDN) and maps a custom domain via Route53 (DNS)             | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-static-website)                          |
| [cdk-pull-request-check](/packages/cdk-pull-request-check)                                           | CodeCommit pull request check                                                                               | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-pull-request-check)                      |
| [cdk-pull-request-approval-rule](/packages/cdk-pull-request-approval-rule)                           | CodeCommit pull request approval rules to enforcing your pull request workflow                              | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-pull-request-approval-rule)              |
| [cdk-codepipeline-merge-action](/packages/cdk-codepipeline-merge-action)                             | CodePipeline action to merge branches                                                                       | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-codepipeline-merge-action)               |
| [cdk-codepipeline-check-parameter-action](/packages/cdk-codepipeline-check-parameter-action)         | Cdk component that checks if system parameters are set correctly                                            | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-codepipeline-check-parameter-action)     |
| [cdk-codecommit-backup](/packages/cdk-codecommit-backup)                                             | Backup CodeCommit repositories to S3                                                                        | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-codecommit-backup)                       |
| [cdk-dependency-check](/packages/cdk-dependency-check)                                               | OWASP dependency-check for codecommit repositories                                                          | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-dependency-check)                        |
| [cdk-container-registry](/packages/cdk-container-registry)                                           | Registry for container images                                                                               | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-container-registry)                      |
| [cdk-blue-green-container-deployment](/packages/cdk-blue-green-container-deployment)                 | Blue green container deployment with CodeDeploy                                                             | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-blue-green-container-deployment)         |
| [cdk-chatops](/packages/cdk-chatops)                                                                 | Constructs for chattool integration: #slack / msteams                                                       | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-chatops)                                 |
| [cdk-developer-tools-notifications](/packages/cdk-developer-tools-notifications)                     | #slack / msteams / email notifications for developer tools: CodeCommit, CodeBuild, CodeDeploy, CodePipeline | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-developer-tools-notifications)           |
| [cdk-deletable-bucket](/packages/cdk-deletable-bucket)                                               | Bucket with content cleanup to allow bucket deletion when the stack will be destroyed                       | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-deletable-bucket)                        |
| [cdk-codepipeline-dockerfile-linter-action](/packages/cdk-codepipeline-dockerfile-linter-action)     | CodePipeline action to lint dockerfiles with hadolint                                                       | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-codepipeline-dockerfile-linter-action)   |
| [cdk-codepipeline-anchore-inline-scan-action](/packages/cdk-codepipeline-anchore-inline-scan-action) | CodePipeline action to integrate Anchore Engine into your pipeline                                          | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-codepipeline-anchore-inline-scan-action) |
| [cdk-dynamodb-seeder](/packages/cdk-dynamodb-seeder) | A seeder for dynamodb tables       | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-dynamodb-seeder) |
| [cdk-temp-stack](/packages/cdk-temp-stack) | A stack that destroys itself after a given time (ttl)        | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-temp-stack) |
| [cdk-lambda-at-edge-pattern](/packages/cdk-lambda-at-edge-pattern) | CDK Constructs for Lambda@Edge pattern: HttpHeaders     | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-lambda-at-edge-pattern) |
| [cdk-cloudfront-authorization](/packages/cdk-cloudfront-authorization) | CloudFront with Cognito authentication using Lambda@Edge     | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-cloudfront-authorization) |
| [cdk-secret-key](/packages/cdk-secret-key) | Provide secret keys to lambdas     | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-secret-key) |
| [cdk-responsive-email-template](/packages/cdk-responsive-email-template) | Responsive email template for aws ses     | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-responsive-email-template) |
| [cdk-s3-antivirus](/packages/cdk-s3-antivirus) | Antivirus for Amazon S3     | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-s3-antivirus) |
| [cdk-wordpress](/packages/cdk-wordpress) | CDK Construct to deploy wordpress    | ![npm](https://img.shields.io/npm/dm/@cloudcomponents/cdk-wordpress) |
## Contributing

We welcome community contributions and pull requests.

## Build

1. Install `yarn` on your system.

1. Install Docker which is required for some of the packages.

1. Install Node dependencies. This also automatically builds the packages.

    yarn install --frozen-lockfile

1. Run tests.

    npm test

1. Run linting.

    npm run lint

## License

[MIT](LICENSE)
