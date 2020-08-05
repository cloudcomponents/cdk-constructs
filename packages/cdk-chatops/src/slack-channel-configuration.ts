import { CfnSlackChannelConfiguration } from '@aws-cdk/aws-chatbot';
import { IRole, Role, ServicePrincipal, PolicyStatement, Effect, ManagedPolicy } from '@aws-cdk/aws-iam';
import { IFunction } from '@aws-cdk/aws-lambda';
import { ITopic } from '@aws-cdk/aws-sns';
import { Construct } from '@aws-cdk/core';

export interface ISlackChannelConfiguration {
  readonly configurationArn: string;
}

export interface SlackChannelConfigurationProps {
  /**
   * The name of the configuration.
   */
  readonly configurationName: string;

  /**
   * The iam role that defines the permissions for AWS Chatbot.
   *
   * This is a user-defined role that AWS Chatbot will assume. This is
   * not the service-linked role. For more information, see IAM Policies
   * for AWS Chatbot.
   */
  readonly role?: IRole;

  /**
   * The ID of the Slack channel.
   *
   * To get the ID, open Slack, right click on the channel name
   * in the left pane, then choose Copy Link. The channel ID is
   * the 9-character string at the end of the URL.
   * For example, ABCBBLZZZ.
   */
  readonly slackChannelId: string;

  /**
   * The ID of the Slack workspace authorized with AWS Chatbot.
   *
   * To get the workspace ID, you must perform the initial authorization
   * flow with Slack in the AWS Chatbot console. Then you can copy and
   * paste the workspace ID from the console. For more details, see steps
   * 1-4 in Setting Up AWS Chatbot with Slack in the AWS Chatbot User Guide.
   */
  readonly slackWorkspaceId: string;

  /**
   * The SNS topics that deliver notifications to AWS Chatbot.
   */
  readonly notificationTopics?: ITopic[];

  /**
   * Specifies the logging level for this configuration. This property
   * affects the log entries pushed to Amazon CloudWatch Logs.
   *
   * Logging levels include ERROR, INFO, or NONE.
   *
   * @default NONE
   */
  readonly loggingLevel?: LoggingLevel;
}

export class SlackChannelConfiguration extends Construct {
  public readonly configurationArn: string;
  public readonly role: IRole;

  constructor(scope: Construct, id: string, props: SlackChannelConfigurationProps) {
    super(scope, id);

    this.role =
      props.role ||
      new Role(this, 'ServiceRole', {
        assumedBy: new ServicePrincipal('chatbot.amazonaws.com'),
      });

    const configuration = new CfnSlackChannelConfiguration(this, 'SlackChannelConfiguration', {
      configurationName: props.configurationName,
      iamRoleArn: this.role.roleArn,
      slackChannelId: props.slackChannelId,
      slackWorkspaceId: props.slackWorkspaceId,
      snsTopicArns: props.notificationTopics ? props.notificationTopics.map((topic) => topic.topicArn) : undefined,
      loggingLevel: props.loggingLevel || LoggingLevel.NONE,
    });

    this.configurationArn = configuration.ref;
  }

  /**
   * Adds a statement to the IAM role assumed by the instance.
   */
  public addToRolePolicy(statement: PolicyStatement): void {
    this.role.addToPolicy(statement);
  }

  /**
   * Allows AWS Chatbot to retreive metric graphs from Amazon Cloudwatch
   */
  public addNotificationPermissions(): void {
    this.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['cloudwatch:Describe*', 'cloudwatch:Get*', 'cloudwatch:List*'],
        resources: ['*'],
      }),
    );
  }

  public addReadOnlyCommandPermissions(): void {
    this.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.DENY,
        actions: [
          'iam:*',
          's3:GetBucketPolicy',
          'ssm:*',
          'sts:*',
          'kms:*',
          'cognito-idp:GetSigningCertificate',
          'ec2:GetPasswordData',
          'ecr:GetAuthorizationToken',
          'gamelift:RequestUploadCredentials',
          'gamelift:GetInstanceAccess',
          'lightsail:DownloadDefaultKeyPair',
          'lightsail:GetInstanceAccessDetails',
          'lightsail:GetKeyPair',
          'lightsail:GetKeyPairs',
          'redshift:GetClusterCredentials',
          'storagegateway:DescribeChapCredentials',
        ],
        resources: ['*'],
      }),
    );

    this.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('ReadOnlyAccess'));
  }

  /**
   * Allows Lambda-invoke commands in supported clients
   */
  public addLambdaInvokeCommandPermissions(lambda?: IFunction): void {
    this.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['lambda:invokeAsync', 'lambda:invokeFunction'],
        resources: [lambda?.functionArn || '*'],
      }),
    );
  }

  /**
   * Allows calling AWS Support APIs in supportzed clients
   */
  public addSupportCommandPermissions(): void {
    this.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AWSSupportAccess'));
  }
}

export enum LoggingLevel {
  ERROR = 'ERROR',
  INFO = 'INFO',
  NONE = 'NONE',
}
