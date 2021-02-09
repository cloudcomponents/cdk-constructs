import { IProject } from '@aws-cdk/aws-codebuild';
import { IRepository } from '@aws-cdk/aws-codecommit';
import { IServerApplication, ILambdaApplication, IEcsApplication } from '@aws-cdk/aws-codedeploy';
import { IPipeline } from '@aws-cdk/aws-codepipeline';
import { CfnNotificationRule } from '@aws-cdk/aws-codestarnotifications';
import { Construct } from '@aws-cdk/core';

import { NotificationTargetProperty, INotificationTarget } from './notification-targets';

export interface INotificationRule {
  readonly notificationRuleArn: string;
}

export interface CommonNotificationRuleProps {
  /**
   * The name for the notification rule. Notification rule names
   * must be unique in your AWS account.
   */
  readonly name: string;

  /**
   * SNS topics or AWS Chatbot clients to associate with the notification rule.
   */
  readonly targets?: INotificationTarget[];

  /**
   * The level of detail to include in the notifications for this
   * resource. BASIC will include only the contents of the event
   * as it would appear in AWS CloudWatch. FULL will include any
   * supplemental information provided by AWS CodeStar Notifications
   * and/or the service for the resource for which the notification
   * is created.
   *
   * @default FULL
   */
  readonly detailType?: DetailType;

  /**
   * The status of the notification rule. The default value is ENABLED.
   * If the status is set to DISABLED, notifications aren't sent for
   * the notification rule.
   *
   * @default ENABLED
   */
  readonly status?: Status;
}

export interface NotificationRuleProps extends CommonNotificationRuleProps {
  /**
   * A list of events associated with this notification rule.
   */
  readonly events: Events[];

  /**
   * The Amazon Resource Name (ARN) of the resource to associate with
   * the notification rule. Supported resources include pipelines in
   * AWS CodePipeline, repositories in AWS CodeCommit, and build
   * projects in AWS CodeBuild.
   */
  readonly resource: string;
}

export class NotificationRule extends Construct implements INotificationRule {
  public readonly notificationRuleArn: string;
  private readonly targets = new Array<NotificationTargetProperty>();

  constructor(scope: Construct, id: string, props: NotificationRuleProps) {
    super(scope, id);

    for (const target of props.targets || []) {
      this.addTarget(target);
    }

    const notificationRule = new CfnNotificationRule(this, 'NotificationRule', {
      name: props.name,
      status: props.status || Status.ENABLED,
      detailType: props.detailType || DetailType.FULL,
      targets: this.targets,
      eventTypeIds: props.events,
      resource: props.resource,
    });

    this.notificationRuleArn = notificationRule.ref;
  }

  public addTarget(target: INotificationTarget): void {
    this.targets.push(target.bind(this, this));
  }

  protected validate(): string[] {
    if (this.targets.length === 0) {
      return ['Notification rule must have a target'];
    }
    return [];
  }
}

export interface RepositoryNotificationRuleProps extends CommonNotificationRuleProps {
  readonly repository: IRepository;
  readonly events: RepositoryEvent[];
}

export class RepositoryNotificationRule extends NotificationRule {
  constructor(scope: Construct, id: string, props: RepositoryNotificationRuleProps) {
    super(scope, id, {
      ...props,
      resource: props.repository.repositoryArn,
    });
  }
}

export interface PipelineNotificationRuleProps extends CommonNotificationRuleProps {
  readonly pipeline: IPipeline;
  readonly events: PipelineEvent[];
}

export class PipelineNotificationRule extends NotificationRule {
  constructor(scope: Construct, id: string, props: PipelineNotificationRuleProps) {
    super(scope, id, {
      ...props,
      resource: props.pipeline.pipelineArn,
    });
  }
}

export interface ProjectNotificationRuleProps extends CommonNotificationRuleProps {
  readonly project: IProject;
  readonly events: ProjectEvent[];
}

export class ProjectNotificationRule extends NotificationRule {
  constructor(scope: Construct, id: string, props: ProjectNotificationRuleProps) {
    super(scope, id, {
      ...props,
      resource: props.project.projectArn,
    });
  }
}

export interface ApplicationNotificationRuleProps extends CommonNotificationRuleProps {
  readonly application: IServerApplication | ILambdaApplication | IEcsApplication;
  readonly events: ApplicationEvent[];
}

export class ApplicationNotificationRule extends NotificationRule {
  constructor(scope: Construct, id: string, props: ApplicationNotificationRuleProps) {
    super(scope, id, {
      ...props,
      resource: props.application.applicationArn,
    });
  }
}

export enum RepositoryEvent {
  COMMENTS_ON_COMMITS = 'codecommit-repository-comments-on-commits',
  COMMENTS_ON_PULL_REQUEST = 'codecommit-repository-comments-on-pull-requests',
  APPROVAL_STATUS_CHANGED = 'codecommit-repository-approvals-status-changed',
  APPROVAL_RULE_OVERRIDE = 'codecommit-repository-approvals-rule-override',
  PULL_REQUEST_CREATED = 'codecommit-repository-pull-request-created',
  PULL_REQUEST_SOURCE_UPDATED = 'codecommit-repository-pull-request-source-updated',
  PULL_REQUEST_STATUS_CHANGED = 'codecommit-repository-pull-request-status-changed',
  PULL_REQUEST_MERGED = 'codecommit-repository-pull-request-merged',
  BRANCHES_AND_TAGS_CREATED = 'codecommit-repository-branches-and-tags-created',
  BRANCHES_AND_TAGS_DELETED = 'codecommit-repository-branches-and-tags-deleted',
  BRANCHES_AND_TAGS_UPDATED = 'codecommit-repository-branches-and-tags-updated',
}

export enum ProjectEvent {
  BUILD_STATE_FAILED = 'codebuild-project-build-state-failed',
  BUILD_STATE_SUCCEEDED = 'codebuild-project-build-state-succeeded',
  BUILD_STATE_IN_PROGRESS = 'codebuild-project-build-state-in-progress',
  BUILD_STATE_STOPPED = 'codebuild-project-build-state-stopped',
  BUILD_PHASE_FAILURE = 'codebuild-project-build-phase-failure',
  BUILD_PHASE_SUCCESS = 'codebuild-project-build-phase-success',
}

export enum ApplicationEvent {
  DEPLOYMENT_FAILED = 'codedeploy-application-deployment-failed',
  DEPLOYMENT_SUCCEEDED = 'codedeploy-application-deployment-succeeded',
  DEPLOYMENT_STARTED = 'codedeploy-application-deployment-started',
}

export enum PipelineEvent {
  ACTION_EXECUTION_SUCCEEDED = 'codepipeline-pipeline-action-execution-succeeded',
  ACTION_EXECUTION_FAILED = 'codepipeline-pipeline-action-execution-failed',
  ACTION_EXECUTION_CANCELED = 'codepipeline-pipeline-action-execution-canceled',
  ACTION_EXECUTION_STARTED = 'codepipeline-pipeline-action-execution-started',
  STAGE_EXECUTION_STARTED = 'codepipeline-pipeline-stage-execution-started',
  STAGE_EXECUTION_SUCCEEDED = 'codepipeline-pipeline-stage-execution-succeeded',
  STAGE_EXECUTION_RESUMED = 'codepipeline-pipeline-stage-execution-resumed',
  STAGE_EXECUTION_CANCELED = 'codepipeline-pipeline-stage-execution-canceled',
  STAGE_EXECUTION_FAILED = 'codepipeline-pipeline-stage-execution-failed',
  PIPELINE_EXECUTION_FAILED = 'codepipeline-pipeline-pipeline-execution-failed',
  PIPELINE_EXECUTION_CANCELED = 'codepipeline-pipeline-pipeline-execution-canceled',
  PIPELINE_EXECUTION_STARTED = 'codepipeline-pipeline-pipeline-execution-started',
  PIPELINE_EXECUTION_RESUMED = 'codepipeline-pipeline-pipeline-execution-resumed',
  PIPELINE_EXECUTION_SUCCEEDED = 'codepipeline-pipeline-pipeline-execution-succeeded',
  PIPELINE_EXECUTION_SUPERSEDED = 'codepipeline-pipeline-pipeline-execution-superseded',
  MANUAL_APPROVAL_FAILED = 'codepipeline-pipeline-manual-approval-failed',
  MANUAL_APPROVAL_NEEDED = 'codepipeline-pipeline-manual-approval-needed',
  MANUAL_APPROVAL_SUCCEEDED = 'codepipeline-pipeline-manual-approval-succeeded',
}

type Events = RepositoryEvent | PipelineEvent | ProjectEvent | ApplicationEvent;

export enum DetailType {
  FULL = 'FULL',
  BASIC = 'BASIC',
}

export enum Status {
  DISABLED = 'DISABLED',
  ENABLED = 'ENABLED',
}
