# @cloudcomponents/cdk-components

[![Build Status](https://travis-ci.org/cloudcomponents/cdk-components.svg?branch=master)](https://travis-ci.org/cloudcomponents/cdk-components)

> A collection of higher-level [cdk components](https://github.com/awslabs/aws-cdk): slack-approval-workflow, github-webhook, static-website, pull-request-check, website-monitor...

## Components

This repository is a monorepo managed with [Lerna](https://github.com/lerna/lerna). [Several components](/packages) are published to npm from the same codebase.

| Component                                                  | Description                                                                                                                  |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [cdk-codepipeline-slack](/packages/cdk-codepipeline-slack) | Cdk component that provisions a #slack approval workflow                                                                     |
| [cdk-github-webhook](/packages/cdk-github-webhook)         | Cdk component that provisions github webhooks                                                                                |
| [cdk-static-website](/packages/cdk-static-website)         | Cdk component that creates a static website using S3, configures CloudFront (CDN) and maps a custom domain via Route53 (DNS) |
| [cdk-pull-request-check](/packages/cdk-pull-request-check) | Cdk component that automatically check pull requests                                                                         |
| [cdk-website-monitor](/packages/cdk-website-monitor)       | Cdk component to monitor websites                                                                                            |

## Contributing

We welcome community contributions and pull requests.

## License

[MIT](LICENSE)
