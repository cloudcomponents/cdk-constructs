# README

@cloudcomponents/cdk-developer-tools-notifications

# @cloudcomponents/cdk-developer-tools-notifications

## Table of contents

### Enumerations

- [ApplicationEvent](#application-event)
- [DetailType](#detail-type)
- [PipelineEvent](#pipeline-event)
- [ProjectEvent](#project-event)
- [RepositoryEvent](#repository-event)
- [Status](#status)
- [TargetType](#target-type)

### Classes

- [ApplicationNotificationRule](#application-notification-rule)
- [MSTeamsIncomingWebhook](#ms-teams-incoming-webhook)
- [NotificationRule](#notification-rule)
- [PipelineNotificationRule](#pipeline-notification-rule)
- [ProjectNotificationRule](#project-notification-rule)
- [RepositoryNotificationRule](#repository-notification-rule)
- [SlackChannel](#slack-channel)
- [SnsTopic](#sns-topic)

### Interfaces

- [ApplicationNotificationRuleProps](#application-notification-rule-props)
- [CommonNotificationRuleProps](#common-notification-rule-props)
- [INotificationRule](#i-notification-rule)
- [INotificationTarget](#i-notification-target)
- [NotificationRuleProps](#notification-rule-props)
- [NotificationTargetProperty](#notification-target-property)
- [PipelineNotificationRuleProps](#pipeline-notification-rule-props)
- [ProjectNotificationRuleProps](#project-notification-rule-props)
- [RepositoryNotificationRuleProps](#repository-notification-rule-props)

# Application Notification Rule

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / ApplicationNotificationRule

# Class: ApplicationNotificationRule

## Hierarchy

- [`NotificationRule`](#notification-rule)

  ↳ **`ApplicationNotificationRule`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [node](#node)
- [notificationRuleArn](#notificationrulearn)

### Methods

- [addTarget](#addtarget)
- [toString](#tostring)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new ApplicationNotificationRule**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`ApplicationNotificationRuleProps`](#application-notification-rule-props) |

#### Overrides

[NotificationRule](#notification-rule).[constructor](#constructor)

## Properties

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

[NotificationRule](#notification-rule).[node](#node)

___

### notificationRuleArn

• `Readonly` **notificationRuleArn**: `string`

#### Inherited from

[NotificationRule](#notification-rule).[notificationRuleArn](#notificationrulearn)

## Methods

### addTarget

▸ **addTarget**(`target`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`INotificationTarget`](#i-notification-target) |

#### Returns

`void`

#### Inherited from

[NotificationRule](#notification-rule).[addTarget](#addtarget)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

[NotificationRule](#notification-rule).[toString](#tostring)

___

### isConstruct

▸ `Static` **isConstruct**(`x`): x is Construct

(deprecated) Checks if `x` is a construct.

**`deprecated`** use `x instanceof Construct` instead

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `any` | Any object. |

#### Returns

x is Construct

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

[NotificationRule](#notification-rule).[isConstruct](#isconstruct)

# MS Teams Incoming Webhook

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / MSTeamsIncomingWebhook

# Class: MSTeamsIncomingWebhook

## Implements

- [`INotificationTarget`](#i-notification-target)

## Table of contents

### Constructors

- [constructor](#constructor)

### Methods

- [bind](#bind)

## Constructors

### constructor

• **new MSTeamsIncomingWebhook**(`webhook`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `webhook` | `MSTeamsIncomingWebhookConfiguration` |

## Methods

### bind

▸ **bind**(`scope`, `_rule`): [`NotificationTargetProperty`](#notification-target-property)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `_rule` | [`INotificationRule`](#i-notification-rule) |

#### Returns

[`NotificationTargetProperty`](#notification-target-property)

#### Implementation of

[INotificationTarget](#i-notification-target).[bind](#bind)

# Notification Rule

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / NotificationRule

# Class: NotificationRule

## Hierarchy

- `Construct`

  ↳ **`NotificationRule`**

  ↳↳ [`RepositoryNotificationRule`](#repository-notification-rule)

  ↳↳ [`PipelineNotificationRule`](#pipeline-notification-rule)

  ↳↳ [`ProjectNotificationRule`](#project-notification-rule)

  ↳↳ [`ApplicationNotificationRule`](#application-notification-rule)

## Implements

- [`INotificationRule`](#i-notification-rule)

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [node](#node)
- [notificationRuleArn](#notificationrulearn)
- [targets](#targets)

### Methods

- [addTarget](#addtarget)
- [toString](#tostring)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new NotificationRule**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`NotificationRuleProps`](#notification-rule-props) |

#### Overrides

Construct.constructor

## Properties

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

Construct.node

___

### notificationRuleArn

• `Readonly` **notificationRuleArn**: `string`

#### Implementation of

[INotificationRule](#i-notification-rule).[notificationRuleArn](#notificationrulearn)

___

### targets

• `Private` `Readonly` **targets**: [`NotificationTargetProperty`](#notification-target-property)[]

## Methods

### addTarget

▸ **addTarget**(`target`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`INotificationTarget`](#i-notification-target) |

#### Returns

`void`

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

Construct.toString

___

### isConstruct

▸ `Static` **isConstruct**(`x`): x is Construct

(deprecated) Checks if `x` is a construct.

**`deprecated`** use `x instanceof Construct` instead

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `any` | Any object. |

#### Returns

x is Construct

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

Construct.isConstruct

# Pipeline Notification Rule

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / PipelineNotificationRule

# Class: PipelineNotificationRule

## Hierarchy

- [`NotificationRule`](#notification-rule)

  ↳ **`PipelineNotificationRule`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [node](#node)
- [notificationRuleArn](#notificationrulearn)

### Methods

- [addTarget](#addtarget)
- [toString](#tostring)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new PipelineNotificationRule**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`PipelineNotificationRuleProps`](#pipeline-notification-rule-props) |

#### Overrides

[NotificationRule](#notification-rule).[constructor](#constructor)

## Properties

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

[NotificationRule](#notification-rule).[node](#node)

___

### notificationRuleArn

• `Readonly` **notificationRuleArn**: `string`

#### Inherited from

[NotificationRule](#notification-rule).[notificationRuleArn](#notificationrulearn)

## Methods

### addTarget

▸ **addTarget**(`target`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`INotificationTarget`](#i-notification-target) |

#### Returns

`void`

#### Inherited from

[NotificationRule](#notification-rule).[addTarget](#addtarget)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

[NotificationRule](#notification-rule).[toString](#tostring)

___

### isConstruct

▸ `Static` **isConstruct**(`x`): x is Construct

(deprecated) Checks if `x` is a construct.

**`deprecated`** use `x instanceof Construct` instead

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `any` | Any object. |

#### Returns

x is Construct

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

[NotificationRule](#notification-rule).[isConstruct](#isconstruct)

# Project Notification Rule

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / ProjectNotificationRule

# Class: ProjectNotificationRule

## Hierarchy

- [`NotificationRule`](#notification-rule)

  ↳ **`ProjectNotificationRule`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [node](#node)
- [notificationRuleArn](#notificationrulearn)

### Methods

- [addTarget](#addtarget)
- [toString](#tostring)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new ProjectNotificationRule**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`ProjectNotificationRuleProps`](#project-notification-rule-props) |

#### Overrides

[NotificationRule](#notification-rule).[constructor](#constructor)

## Properties

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

[NotificationRule](#notification-rule).[node](#node)

___

### notificationRuleArn

• `Readonly` **notificationRuleArn**: `string`

#### Inherited from

[NotificationRule](#notification-rule).[notificationRuleArn](#notificationrulearn)

## Methods

### addTarget

▸ **addTarget**(`target`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`INotificationTarget`](#i-notification-target) |

#### Returns

`void`

#### Inherited from

[NotificationRule](#notification-rule).[addTarget](#addtarget)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

[NotificationRule](#notification-rule).[toString](#tostring)

___

### isConstruct

▸ `Static` **isConstruct**(`x`): x is Construct

(deprecated) Checks if `x` is a construct.

**`deprecated`** use `x instanceof Construct` instead

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `any` | Any object. |

#### Returns

x is Construct

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

[NotificationRule](#notification-rule).[isConstruct](#isconstruct)

# Repository Notification Rule

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / RepositoryNotificationRule

# Class: RepositoryNotificationRule

## Hierarchy

- [`NotificationRule`](#notification-rule)

  ↳ **`RepositoryNotificationRule`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [node](#node)
- [notificationRuleArn](#notificationrulearn)

### Methods

- [addTarget](#addtarget)
- [toString](#tostring)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new RepositoryNotificationRule**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`RepositoryNotificationRuleProps`](#repository-notification-rule-props) |

#### Overrides

[NotificationRule](#notification-rule).[constructor](#constructor)

## Properties

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

[NotificationRule](#notification-rule).[node](#node)

___

### notificationRuleArn

• `Readonly` **notificationRuleArn**: `string`

#### Inherited from

[NotificationRule](#notification-rule).[notificationRuleArn](#notificationrulearn)

## Methods

### addTarget

▸ **addTarget**(`target`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`INotificationTarget`](#i-notification-target) |

#### Returns

`void`

#### Inherited from

[NotificationRule](#notification-rule).[addTarget](#addtarget)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

[NotificationRule](#notification-rule).[toString](#tostring)

___

### isConstruct

▸ `Static` **isConstruct**(`x`): x is Construct

(deprecated) Checks if `x` is a construct.

**`deprecated`** use `x instanceof Construct` instead

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `any` | Any object. |

#### Returns

x is Construct

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

[NotificationRule](#notification-rule).[isConstruct](#isconstruct)

# Slack Channel

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / SlackChannel

# Class: SlackChannel

## Implements

- [`INotificationTarget`](#i-notification-target)

## Table of contents

### Constructors

- [constructor](#constructor)

### Methods

- [bind](#bind)

## Constructors

### constructor

• **new SlackChannel**(`channel`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | `ISlackChannelConfiguration` |

## Methods

### bind

▸ **bind**(`_scope`, `_rule`): [`NotificationTargetProperty`](#notification-target-property)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_scope` | `Construct` |
| `_rule` | [`INotificationRule`](#i-notification-rule) |

#### Returns

[`NotificationTargetProperty`](#notification-target-property)

#### Implementation of

[INotificationTarget](#i-notification-target).[bind](#bind)

# Sns Topic

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / SnsTopic

# Class: SnsTopic

## Implements

- [`INotificationTarget`](#i-notification-target)

## Table of contents

### Constructors

- [constructor](#constructor)

### Methods

- [bind](#bind)

## Constructors

### constructor

• **new SnsTopic**(`topic`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `topic` | `ITopic` |

## Methods

### bind

▸ **bind**(`_scope`, `_rule`): [`NotificationTargetProperty`](#notification-target-property)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_scope` | `Construct` |
| `_rule` | [`INotificationRule`](#i-notification-rule) |

#### Returns

[`NotificationTargetProperty`](#notification-target-property)

#### Implementation of

[INotificationTarget](#i-notification-target).[bind](#bind)

# Application Event

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / ApplicationEvent

# Enumeration: ApplicationEvent

## Table of contents

### Enumeration members

- [DEPLOYMENT\_FAILED](#deployment_failed)
- [DEPLOYMENT\_STARTED](#deployment_started)
- [DEPLOYMENT\_SUCCEEDED](#deployment_succeeded)

## Enumeration members

### DEPLOYMENT\_FAILED

• **DEPLOYMENT\_FAILED** = `"codedeploy-application-deployment-failed"`

___

### DEPLOYMENT\_STARTED

• **DEPLOYMENT\_STARTED** = `"codedeploy-application-deployment-started"`

___

### DEPLOYMENT\_SUCCEEDED

• **DEPLOYMENT\_SUCCEEDED** = `"codedeploy-application-deployment-succeeded"`

# Detail Type

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / DetailType

# Enumeration: DetailType

## Table of contents

### Enumeration members

- [BASIC](#basic)
- [FULL](#full)

## Enumeration members

### BASIC

• **BASIC** = `"BASIC"`

___

### FULL

• **FULL** = `"FULL"`

# Pipeline Event

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / PipelineEvent

# Enumeration: PipelineEvent

## Table of contents

### Enumeration members

- [ACTION\_EXECUTION\_CANCELED](#action_execution_canceled)
- [ACTION\_EXECUTION\_FAILED](#action_execution_failed)
- [ACTION\_EXECUTION\_STARTED](#action_execution_started)
- [ACTION\_EXECUTION\_SUCCEEDED](#action_execution_succeeded)
- [MANUAL\_APPROVAL\_FAILED](#manual_approval_failed)
- [MANUAL\_APPROVAL\_NEEDED](#manual_approval_needed)
- [MANUAL\_APPROVAL\_SUCCEEDED](#manual_approval_succeeded)
- [PIPELINE\_EXECUTION\_CANCELED](#pipeline_execution_canceled)
- [PIPELINE\_EXECUTION\_FAILED](#pipeline_execution_failed)
- [PIPELINE\_EXECUTION\_RESUMED](#pipeline_execution_resumed)
- [PIPELINE\_EXECUTION\_STARTED](#pipeline_execution_started)
- [PIPELINE\_EXECUTION\_SUCCEEDED](#pipeline_execution_succeeded)
- [PIPELINE\_EXECUTION\_SUPERSEDED](#pipeline_execution_superseded)
- [STAGE\_EXECUTION\_CANCELED](#stage_execution_canceled)
- [STAGE\_EXECUTION\_FAILED](#stage_execution_failed)
- [STAGE\_EXECUTION\_RESUMED](#stage_execution_resumed)
- [STAGE\_EXECUTION\_STARTED](#stage_execution_started)
- [STAGE\_EXECUTION\_SUCCEEDED](#stage_execution_succeeded)

## Enumeration members

### ACTION\_EXECUTION\_CANCELED

• **ACTION\_EXECUTION\_CANCELED** = `"codepipeline-pipeline-action-execution-canceled"`

___

### ACTION\_EXECUTION\_FAILED

• **ACTION\_EXECUTION\_FAILED** = `"codepipeline-pipeline-action-execution-failed"`

___

### ACTION\_EXECUTION\_STARTED

• **ACTION\_EXECUTION\_STARTED** = `"codepipeline-pipeline-action-execution-started"`

___

### ACTION\_EXECUTION\_SUCCEEDED

• **ACTION\_EXECUTION\_SUCCEEDED** = `"codepipeline-pipeline-action-execution-succeeded"`

___

### MANUAL\_APPROVAL\_FAILED

• **MANUAL\_APPROVAL\_FAILED** = `"codepipeline-pipeline-manual-approval-failed"`

___

### MANUAL\_APPROVAL\_NEEDED

• **MANUAL\_APPROVAL\_NEEDED** = `"codepipeline-pipeline-manual-approval-needed"`

___

### MANUAL\_APPROVAL\_SUCCEEDED

• **MANUAL\_APPROVAL\_SUCCEEDED** = `"codepipeline-pipeline-manual-approval-succeeded"`

___

### PIPELINE\_EXECUTION\_CANCELED

• **PIPELINE\_EXECUTION\_CANCELED** = `"codepipeline-pipeline-pipeline-execution-canceled"`

___

### PIPELINE\_EXECUTION\_FAILED

• **PIPELINE\_EXECUTION\_FAILED** = `"codepipeline-pipeline-pipeline-execution-failed"`

___

### PIPELINE\_EXECUTION\_RESUMED

• **PIPELINE\_EXECUTION\_RESUMED** = `"codepipeline-pipeline-pipeline-execution-resumed"`

___

### PIPELINE\_EXECUTION\_STARTED

• **PIPELINE\_EXECUTION\_STARTED** = `"codepipeline-pipeline-pipeline-execution-started"`

___

### PIPELINE\_EXECUTION\_SUCCEEDED

• **PIPELINE\_EXECUTION\_SUCCEEDED** = `"codepipeline-pipeline-pipeline-execution-succeeded"`

___

### PIPELINE\_EXECUTION\_SUPERSEDED

• **PIPELINE\_EXECUTION\_SUPERSEDED** = `"codepipeline-pipeline-pipeline-execution-superseded"`

___

### STAGE\_EXECUTION\_CANCELED

• **STAGE\_EXECUTION\_CANCELED** = `"codepipeline-pipeline-stage-execution-canceled"`

___

### STAGE\_EXECUTION\_FAILED

• **STAGE\_EXECUTION\_FAILED** = `"codepipeline-pipeline-stage-execution-failed"`

___

### STAGE\_EXECUTION\_RESUMED

• **STAGE\_EXECUTION\_RESUMED** = `"codepipeline-pipeline-stage-execution-resumed"`

___

### STAGE\_EXECUTION\_STARTED

• **STAGE\_EXECUTION\_STARTED** = `"codepipeline-pipeline-stage-execution-started"`

___

### STAGE\_EXECUTION\_SUCCEEDED

• **STAGE\_EXECUTION\_SUCCEEDED** = `"codepipeline-pipeline-stage-execution-succeeded"`

# Project Event

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / ProjectEvent

# Enumeration: ProjectEvent

## Table of contents

### Enumeration members

- [BUILD\_PHASE\_FAILURE](#build_phase_failure)
- [BUILD\_PHASE\_SUCCESS](#build_phase_success)
- [BUILD\_STATE\_FAILED](#build_state_failed)
- [BUILD\_STATE\_IN\_PROGRESS](#build_state_in_progress)
- [BUILD\_STATE\_STOPPED](#build_state_stopped)
- [BUILD\_STATE\_SUCCEEDED](#build_state_succeeded)

## Enumeration members

### BUILD\_PHASE\_FAILURE

• **BUILD\_PHASE\_FAILURE** = `"codebuild-project-build-phase-failure"`

___

### BUILD\_PHASE\_SUCCESS

• **BUILD\_PHASE\_SUCCESS** = `"codebuild-project-build-phase-success"`

___

### BUILD\_STATE\_FAILED

• **BUILD\_STATE\_FAILED** = `"codebuild-project-build-state-failed"`

___

### BUILD\_STATE\_IN\_PROGRESS

• **BUILD\_STATE\_IN\_PROGRESS** = `"codebuild-project-build-state-in-progress"`

___

### BUILD\_STATE\_STOPPED

• **BUILD\_STATE\_STOPPED** = `"codebuild-project-build-state-stopped"`

___

### BUILD\_STATE\_SUCCEEDED

• **BUILD\_STATE\_SUCCEEDED** = `"codebuild-project-build-state-succeeded"`

# Repository Event

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / RepositoryEvent

# Enumeration: RepositoryEvent

## Table of contents

### Enumeration members

- [APPROVAL\_RULE\_OVERRIDE](#approval_rule_override)
- [APPROVAL\_STATUS\_CHANGED](#approval_status_changed)
- [BRANCHES\_AND\_TAGS\_CREATED](#branches_and_tags_created)
- [BRANCHES\_AND\_TAGS\_DELETED](#branches_and_tags_deleted)
- [BRANCHES\_AND\_TAGS\_UPDATED](#branches_and_tags_updated)
- [COMMENTS\_ON\_COMMITS](#comments_on_commits)
- [COMMENTS\_ON\_PULL\_REQUEST](#comments_on_pull_request)
- [PULL\_REQUEST\_CREATED](#pull_request_created)
- [PULL\_REQUEST\_MERGED](#pull_request_merged)
- [PULL\_REQUEST\_SOURCE\_UPDATED](#pull_request_source_updated)
- [PULL\_REQUEST\_STATUS\_CHANGED](#pull_request_status_changed)

## Enumeration members

### APPROVAL\_RULE\_OVERRIDE

• **APPROVAL\_RULE\_OVERRIDE** = `"codecommit-repository-approvals-rule-override"`

___

### APPROVAL\_STATUS\_CHANGED

• **APPROVAL\_STATUS\_CHANGED** = `"codecommit-repository-approvals-status-changed"`

___

### BRANCHES\_AND\_TAGS\_CREATED

• **BRANCHES\_AND\_TAGS\_CREATED** = `"codecommit-repository-branches-and-tags-created"`

___

### BRANCHES\_AND\_TAGS\_DELETED

• **BRANCHES\_AND\_TAGS\_DELETED** = `"codecommit-repository-branches-and-tags-deleted"`

___

### BRANCHES\_AND\_TAGS\_UPDATED

• **BRANCHES\_AND\_TAGS\_UPDATED** = `"codecommit-repository-branches-and-tags-updated"`

___

### COMMENTS\_ON\_COMMITS

• **COMMENTS\_ON\_COMMITS** = `"codecommit-repository-comments-on-commits"`

___

### COMMENTS\_ON\_PULL\_REQUEST

• **COMMENTS\_ON\_PULL\_REQUEST** = `"codecommit-repository-comments-on-pull-requests"`

___

### PULL\_REQUEST\_CREATED

• **PULL\_REQUEST\_CREATED** = `"codecommit-repository-pull-request-created"`

___

### PULL\_REQUEST\_MERGED

• **PULL\_REQUEST\_MERGED** = `"codecommit-repository-pull-request-merged"`

___

### PULL\_REQUEST\_SOURCE\_UPDATED

• **PULL\_REQUEST\_SOURCE\_UPDATED** = `"codecommit-repository-pull-request-source-updated"`

___

### PULL\_REQUEST\_STATUS\_CHANGED

• **PULL\_REQUEST\_STATUS\_CHANGED** = `"codecommit-repository-pull-request-status-changed"`

# Status

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / Status

# Enumeration: Status

## Table of contents

### Enumeration members

- [DISABLED](#disabled)
- [ENABLED](#enabled)

## Enumeration members

### DISABLED

• **DISABLED** = `"DISABLED"`

___

### ENABLED

• **ENABLED** = `"ENABLED"`

# Target Type

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / TargetType

# Enumeration: TargetType

## Table of contents

### Enumeration members

- [AWS\_CHATBOT\_SLACK](#aws_chatbot_slack)
- [SNS](#sns)

## Enumeration members

### AWS\_CHATBOT\_SLACK

• **AWS\_CHATBOT\_SLACK** = `"AWSChatbotSlack"`

___

### SNS

• **SNS** = `"SNS"`

# Application Notification Rule Props

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / ApplicationNotificationRuleProps

# Interface: ApplicationNotificationRuleProps

## Hierarchy

- [`CommonNotificationRuleProps`](#common-notification-rule-props)

  ↳ **`ApplicationNotificationRuleProps`**

## Table of contents

### Properties

- [application](#application)
- [detailType](#detailtype)
- [events](#events)
- [name](#name)
- [status](#status)
- [targets](#targets)

## Properties

### application

• `Readonly` **application**: `IServerApplication` \| `ILambdaApplication` \| `IEcsApplication`

___

### detailType

• `Optional` `Readonly` **detailType**: [`DetailType`](#detail-type)

The level of detail to include in the notifications for this
resource. BASIC will include only the contents of the event
as it would appear in AWS CloudWatch. FULL will include any
supplemental information provided by AWS CodeStar Notifications
and/or the service for the resource for which the notification
is created.

**`default`** FULL

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[detailType](#detailtype)

___

### events

• `Readonly` **events**: [`ApplicationEvent`](#application-event)[]

___

### name

• `Readonly` **name**: `string`

The name for the notification rule. Notification rule names
must be unique in your AWS account.

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[name](#name)

___

### status

• `Optional` `Readonly` **status**: [`Status`](#status)

The status of the notification rule. The default value is ENABLED.
If the status is set to DISABLED, notifications aren't sent for
the notification rule.

**`default`** ENABLED

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[status](#status)

___

### targets

• `Optional` `Readonly` **targets**: [`INotificationTarget`](#i-notification-target)[]

SNS topics or AWS Chatbot clients to associate with the notification rule.

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[targets](#targets)

# Common Notification Rule Props

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / CommonNotificationRuleProps

# Interface: CommonNotificationRuleProps

## Hierarchy

- **`CommonNotificationRuleProps`**

  ↳ [`NotificationRuleProps`](#notification-rule-props)

  ↳ [`RepositoryNotificationRuleProps`](#repository-notification-rule-props)

  ↳ [`PipelineNotificationRuleProps`](#pipeline-notification-rule-props)

  ↳ [`ProjectNotificationRuleProps`](#project-notification-rule-props)

  ↳ [`ApplicationNotificationRuleProps`](#application-notification-rule-props)

## Table of contents

### Properties

- [detailType](#detailtype)
- [name](#name)
- [status](#status)
- [targets](#targets)

## Properties

### detailType

• `Optional` `Readonly` **detailType**: [`DetailType`](#detail-type)

The level of detail to include in the notifications for this
resource. BASIC will include only the contents of the event
as it would appear in AWS CloudWatch. FULL will include any
supplemental information provided by AWS CodeStar Notifications
and/or the service for the resource for which the notification
is created.

**`default`** FULL

___

### name

• `Readonly` **name**: `string`

The name for the notification rule. Notification rule names
must be unique in your AWS account.

___

### status

• `Optional` `Readonly` **status**: [`Status`](#status)

The status of the notification rule. The default value is ENABLED.
If the status is set to DISABLED, notifications aren't sent for
the notification rule.

**`default`** ENABLED

___

### targets

• `Optional` `Readonly` **targets**: [`INotificationTarget`](#i-notification-target)[]

SNS topics or AWS Chatbot clients to associate with the notification rule.

# I Notification Rule

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / INotificationRule

# Interface: INotificationRule

## Implemented by

- [`NotificationRule`](#notification-rule)

## Table of contents

### Properties

- [notificationRuleArn](#notificationrulearn)

## Properties

### notificationRuleArn

• `Readonly` **notificationRuleArn**: `string`

# I Notification Target

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / INotificationTarget

# Interface: INotificationTarget

## Implemented by

- [`MSTeamsIncomingWebhook`](#ms-teams-incoming-webhook)
- [`SlackChannel`](#slack-channel)
- [`SnsTopic`](#sns-topic)

## Table of contents

### Methods

- [bind](#bind)

## Methods

### bind

▸ **bind**(`scope`, `rule`): [`NotificationTargetProperty`](#notification-target-property)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `rule` | [`INotificationRule`](#i-notification-rule) |

#### Returns

[`NotificationTargetProperty`](#notification-target-property)

# Notification Rule Props

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / NotificationRuleProps

# Interface: NotificationRuleProps

## Hierarchy

- [`CommonNotificationRuleProps`](#common-notification-rule-props)

  ↳ **`NotificationRuleProps`**

## Table of contents

### Properties

- [detailType](#detailtype)
- [events](#events)
- [name](#name)
- [resource](#resource)
- [status](#status)
- [targets](#targets)

## Properties

### detailType

• `Optional` `Readonly` **detailType**: [`DetailType`](#detail-type)

The level of detail to include in the notifications for this
resource. BASIC will include only the contents of the event
as it would appear in AWS CloudWatch. FULL will include any
supplemental information provided by AWS CodeStar Notifications
and/or the service for the resource for which the notification
is created.

**`default`** FULL

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[detailType](#detailtype)

___

### events

• `Readonly` **events**: `Events`[]

A list of events associated with this notification rule.

___

### name

• `Readonly` **name**: `string`

The name for the notification rule. Notification rule names
must be unique in your AWS account.

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[name](#name)

___

### resource

• `Readonly` **resource**: `string`

The Amazon Resource Name (ARN) of the resource to associate with
the notification rule. Supported resources include pipelines in
AWS CodePipeline, repositories in AWS CodeCommit, and build
projects in AWS CodeBuild.

___

### status

• `Optional` `Readonly` **status**: [`Status`](#status)

The status of the notification rule. The default value is ENABLED.
If the status is set to DISABLED, notifications aren't sent for
the notification rule.

**`default`** ENABLED

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[status](#status)

___

### targets

• `Optional` `Readonly` **targets**: [`INotificationTarget`](#i-notification-target)[]

SNS topics or AWS Chatbot clients to associate with the notification rule.

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[targets](#targets)

# Notification Target Property

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / NotificationTargetProperty

# Interface: NotificationTargetProperty

## Table of contents

### Properties

- [targetAddress](#targetaddress)
- [targetType](#targettype)

## Properties

### targetAddress

• `Readonly` **targetAddress**: `string`

___

### targetType

• `Readonly` **targetType**: `TargetType`

# Pipeline Notification Rule Props

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / PipelineNotificationRuleProps

# Interface: PipelineNotificationRuleProps

## Hierarchy

- [`CommonNotificationRuleProps`](#common-notification-rule-props)

  ↳ **`PipelineNotificationRuleProps`**

## Table of contents

### Properties

- [detailType](#detailtype)
- [events](#events)
- [name](#name)
- [pipeline](#pipeline)
- [status](#status)
- [targets](#targets)

## Properties

### detailType

• `Optional` `Readonly` **detailType**: [`DetailType`](#detail-type)

The level of detail to include in the notifications for this
resource. BASIC will include only the contents of the event
as it would appear in AWS CloudWatch. FULL will include any
supplemental information provided by AWS CodeStar Notifications
and/or the service for the resource for which the notification
is created.

**`default`** FULL

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[detailType](#detailtype)

___

### events

• `Readonly` **events**: [`PipelineEvent`](#pipeline-event)[]

___

### name

• `Readonly` **name**: `string`

The name for the notification rule. Notification rule names
must be unique in your AWS account.

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[name](#name)

___

### pipeline

• `Readonly` **pipeline**: `IPipeline`

___

### status

• `Optional` `Readonly` **status**: [`Status`](#status)

The status of the notification rule. The default value is ENABLED.
If the status is set to DISABLED, notifications aren't sent for
the notification rule.

**`default`** ENABLED

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[status](#status)

___

### targets

• `Optional` `Readonly` **targets**: [`INotificationTarget`](#i-notification-target)[]

SNS topics or AWS Chatbot clients to associate with the notification rule.

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[targets](#targets)

# Project Notification Rule Props

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / ProjectNotificationRuleProps

# Interface: ProjectNotificationRuleProps

## Hierarchy

- [`CommonNotificationRuleProps`](#common-notification-rule-props)

  ↳ **`ProjectNotificationRuleProps`**

## Table of contents

### Properties

- [detailType](#detailtype)
- [events](#events)
- [name](#name)
- [project](#project)
- [status](#status)
- [targets](#targets)

## Properties

### detailType

• `Optional` `Readonly` **detailType**: [`DetailType`](#detail-type)

The level of detail to include in the notifications for this
resource. BASIC will include only the contents of the event
as it would appear in AWS CloudWatch. FULL will include any
supplemental information provided by AWS CodeStar Notifications
and/or the service for the resource for which the notification
is created.

**`default`** FULL

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[detailType](#detailtype)

___

### events

• `Readonly` **events**: [`ProjectEvent`](#project-event)[]

___

### name

• `Readonly` **name**: `string`

The name for the notification rule. Notification rule names
must be unique in your AWS account.

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[name](#name)

___

### project

• `Readonly` **project**: `IProject`

___

### status

• `Optional` `Readonly` **status**: [`Status`](#status)

The status of the notification rule. The default value is ENABLED.
If the status is set to DISABLED, notifications aren't sent for
the notification rule.

**`default`** ENABLED

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[status](#status)

___

### targets

• `Optional` `Readonly` **targets**: [`INotificationTarget`](#i-notification-target)[]

SNS topics or AWS Chatbot clients to associate with the notification rule.

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[targets](#targets)

# Repository Notification Rule Props

[@cloudcomponents/cdk-developer-tools-notifications](#readme) / RepositoryNotificationRuleProps

# Interface: RepositoryNotificationRuleProps

## Hierarchy

- [`CommonNotificationRuleProps`](#common-notification-rule-props)

  ↳ **`RepositoryNotificationRuleProps`**

## Table of contents

### Properties

- [detailType](#detailtype)
- [events](#events)
- [name](#name)
- [repository](#repository)
- [status](#status)
- [targets](#targets)

## Properties

### detailType

• `Optional` `Readonly` **detailType**: [`DetailType`](#detail-type)

The level of detail to include in the notifications for this
resource. BASIC will include only the contents of the event
as it would appear in AWS CloudWatch. FULL will include any
supplemental information provided by AWS CodeStar Notifications
and/or the service for the resource for which the notification
is created.

**`default`** FULL

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[detailType](#detailtype)

___

### events

• `Readonly` **events**: [`RepositoryEvent`](#repository-event)[]

___

### name

• `Readonly` **name**: `string`

The name for the notification rule. Notification rule names
must be unique in your AWS account.

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[name](#name)

___

### repository

• `Readonly` **repository**: `IRepository`

___

### status

• `Optional` `Readonly` **status**: [`Status`](#status)

The status of the notification rule. The default value is ENABLED.
If the status is set to DISABLED, notifications aren't sent for
the notification rule.

**`default`** ENABLED

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[status](#status)

___

### targets

• `Optional` `Readonly` **targets**: [`INotificationTarget`](#i-notification-target)[]

SNS topics or AWS Chatbot clients to associate with the notification rule.

#### Inherited from

[CommonNotificationRuleProps](#common-notification-rule-props).[targets](#targets)
