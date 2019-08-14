# @cloudcomponents/cdk-components

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-components.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-components)

> A collection of higher-level [cdk components](https://github.com/awslabs/aws-cdk): slack-approval-workflow, contentful-webhook, github-webhook, static-website, pull-request-check...

## Components

This repository is a monorepo managed with [Lerna](https://github.com/lerna/lerna). [Several components](/packages) are published to npm from the same codebase.

| Component                                                  | Description                                                                                                                  |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [cdk-codepipeline-slack](/packages/cdk-codepipeline-slack) | Cdk component that provides a #slack approval workflow                                                                       |
| [cdk-contentful-webhook](/packages/cdk-contentful-webhook) | Cdk component that provides contentful webhooks                                                                              |
| [cdk-github-webhook](/packages/cdk-github-webhook)         | Cdk component that provides github webhooks                                                                                  |
| [cdk-static-website](/packages/cdk-static-website)         | Cdk component that creates a static website using S3, configures CloudFront (CDN) and maps a custom domain via Route53 (DNS) |
| [cdk-pull-request-check](/packages/cdk-pull-request-check) | Cdk component that automatically check pull requests                                                                         |

## Contributing

We welcome community contributions and pull requests.

## License

[MIT](LICENSE)
