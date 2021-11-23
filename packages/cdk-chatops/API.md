# README

@cloudcomponents/cdk-chatops

# @cloudcomponents/cdk-chatops

## Table of contents

### Enumerations

- [AccountLabelMode](#account-label-mode)
- [LoggingLevel](#logging-level)

### Classes

- [MSTeamsIncomingWebhookConfiguration](#ms-teams-incoming-webhook-configuration)
- [SlackChannelConfiguration](#slack-channel-configuration)

### Interfaces

- [ISlackChannelConfiguration](#i-slack-channel-configuration)
- [MSTeamsIncomingWebhookConfigurationProps](#ms-teams-incoming-webhook-configuration-props)
- [SlackChannelConfigurationProps](#slack-channel-configuration-props)

# MS Teams Incoming Webhook Configuration

[@cloudcomponents/cdk-chatops](#readme) / MSTeamsIncomingWebhookConfiguration

# Class: MSTeamsIncomingWebhookConfiguration

## Hierarchy

- `Construct`

  ↳ **`MSTeamsIncomingWebhookConfiguration`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [incomingWebhook](#incomingwebhook)
- [node](#node)

### Methods

- [addEventSource](#addeventsource)
- [onPrepare](#onprepare)
- [onSynthesize](#onsynthesize)
- [onValidate](#onvalidate)
- [prepare](#prepare)
- [synthesize](#synthesize)
- [toString](#tostring)
- [validate](#validate)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new MSTeamsIncomingWebhookConfiguration**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`MSTeamsIncomingWebhookConfigurationProps`](#ms-teams-incoming-webhook-configuration-props) |

#### Overrides

Construct.constructor

## Properties

### incomingWebhook

• `Readonly` **incomingWebhook**: `IFunction`

___

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

Construct.node

## Methods

### addEventSource

▸ **addEventSource**(`snsEventSource`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `snsEventSource` | `SnsEventSource` |

#### Returns

`void`

___

### onPrepare

▸ `Protected` **onPrepare**(): `void`

Perform final modifications before synthesis.

This method can be implemented by derived constructs in order to perform
final changes before synthesis. prepare() will be called after child
constructs have been prepared.

This is an advanced framework feature. Only use this if you
understand the implications.

**`stability`** stable

#### Returns

`void`

#### Inherited from

Construct.onPrepare

___

### onSynthesize

▸ `Protected` **onSynthesize**(`session`): `void`

Allows this construct to emit artifacts into the cloud assembly during synthesis.

This method is usually implemented by framework-level constructs such as `Stack` and `Asset`
as they participate in synthesizing the cloud assembly.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `session` | `ISynthesisSession` | The synthesis session. |

#### Returns

`void`

#### Inherited from

Construct.onSynthesize

___

### onValidate

▸ `Protected` **onValidate**(): `string`[]

Validate the current construct.

This method can be implemented by derived constructs in order to perform
validation logic. It is called on all constructs before synthesis.

**`stability`** stable

#### Returns

`string`[]

An array of validation error messages, or an empty array if the construct is valid.

#### Inherited from

Construct.onValidate

___

### prepare

▸ `Protected` **prepare**(): `void`

Perform final modifications before synthesis.

This method can be implemented by derived constructs in order to perform
final changes before synthesis. prepare() will be called after child
constructs have been prepared.

This is an advanced framework feature. Only use this if you
understand the implications.

**`stability`** stable

#### Returns

`void`

#### Inherited from

Construct.prepare

___

### synthesize

▸ `Protected` **synthesize**(`session`): `void`

Allows this construct to emit artifacts into the cloud assembly during synthesis.

This method is usually implemented by framework-level constructs such as `Stack` and `Asset`
as they participate in synthesizing the cloud assembly.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `session` | `ISynthesisSession` | The synthesis session. |

#### Returns

`void`

#### Inherited from

Construct.synthesize

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

### validate

▸ `Protected` **validate**(): `string`[]

Validate the current construct.

This method can be implemented by derived constructs in order to perform
validation logic. It is called on all constructs before synthesis.

**`stability`** stable

#### Returns

`string`[]

An array of validation error messages, or an empty array if the construct is valid.

#### Inherited from

Construct.validate

___

### isConstruct

▸ `Static` **isConstruct**(`x`): x is Construct

Return whether the given object is a Construct.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `any` |

#### Returns

x is Construct

#### Inherited from

Construct.isConstruct

# Slack Channel Configuration

[@cloudcomponents/cdk-chatops](#readme) / SlackChannelConfiguration

# Class: SlackChannelConfiguration

## Hierarchy

- `Construct`

  ↳ **`SlackChannelConfiguration`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [configurationArn](#configurationarn)
- [node](#node)
- [role](#role)

### Methods

- [addLambdaInvokeCommandPermissions](#addlambdainvokecommandpermissions)
- [addNotificationPermissions](#addnotificationpermissions)
- [addReadOnlyCommandPermissions](#addreadonlycommandpermissions)
- [addSupportCommandPermissions](#addsupportcommandpermissions)
- [addToRolePolicy](#addtorolepolicy)
- [onPrepare](#onprepare)
- [onSynthesize](#onsynthesize)
- [onValidate](#onvalidate)
- [prepare](#prepare)
- [synthesize](#synthesize)
- [toString](#tostring)
- [validate](#validate)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new SlackChannelConfiguration**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`SlackChannelConfigurationProps`](#slack-channel-configuration-props) |

#### Overrides

Construct.constructor

## Properties

### configurationArn

• `Readonly` **configurationArn**: `string`

___

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

Construct.node

___

### role

• `Readonly` **role**: `IRole`

## Methods

### addLambdaInvokeCommandPermissions

▸ **addLambdaInvokeCommandPermissions**(`lambda?`): `void`

Allows Lambda-invoke commands in supported clients

#### Parameters

| Name | Type |
| :------ | :------ |
| `lambda?` | `IFunction` |

#### Returns

`void`

___

### addNotificationPermissions

▸ **addNotificationPermissions**(): `void`

Allows AWS Chatbot to retreive metric graphs from Amazon Cloudwatch

#### Returns

`void`

___

### addReadOnlyCommandPermissions

▸ **addReadOnlyCommandPermissions**(): `void`

#### Returns

`void`

___

### addSupportCommandPermissions

▸ **addSupportCommandPermissions**(): `void`

Allows calling AWS Support APIs in supportzed clients

#### Returns

`void`

___

### addToRolePolicy

▸ **addToRolePolicy**(`statement`): `void`

Adds a statement to the IAM role assumed by the instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `statement` | `PolicyStatement` |

#### Returns

`void`

___

### onPrepare

▸ `Protected` **onPrepare**(): `void`

Perform final modifications before synthesis.

This method can be implemented by derived constructs in order to perform
final changes before synthesis. prepare() will be called after child
constructs have been prepared.

This is an advanced framework feature. Only use this if you
understand the implications.

**`stability`** stable

#### Returns

`void`

#### Inherited from

Construct.onPrepare

___

### onSynthesize

▸ `Protected` **onSynthesize**(`session`): `void`

Allows this construct to emit artifacts into the cloud assembly during synthesis.

This method is usually implemented by framework-level constructs such as `Stack` and `Asset`
as they participate in synthesizing the cloud assembly.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `session` | `ISynthesisSession` | The synthesis session. |

#### Returns

`void`

#### Inherited from

Construct.onSynthesize

___

### onValidate

▸ `Protected` **onValidate**(): `string`[]

Validate the current construct.

This method can be implemented by derived constructs in order to perform
validation logic. It is called on all constructs before synthesis.

**`stability`** stable

#### Returns

`string`[]

An array of validation error messages, or an empty array if the construct is valid.

#### Inherited from

Construct.onValidate

___

### prepare

▸ `Protected` **prepare**(): `void`

Perform final modifications before synthesis.

This method can be implemented by derived constructs in order to perform
final changes before synthesis. prepare() will be called after child
constructs have been prepared.

This is an advanced framework feature. Only use this if you
understand the implications.

**`stability`** stable

#### Returns

`void`

#### Inherited from

Construct.prepare

___

### synthesize

▸ `Protected` **synthesize**(`session`): `void`

Allows this construct to emit artifacts into the cloud assembly during synthesis.

This method is usually implemented by framework-level constructs such as `Stack` and `Asset`
as they participate in synthesizing the cloud assembly.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `session` | `ISynthesisSession` | The synthesis session. |

#### Returns

`void`

#### Inherited from

Construct.synthesize

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

### validate

▸ `Protected` **validate**(): `string`[]

Validate the current construct.

This method can be implemented by derived constructs in order to perform
validation logic. It is called on all constructs before synthesis.

**`stability`** stable

#### Returns

`string`[]

An array of validation error messages, or an empty array if the construct is valid.

#### Inherited from

Construct.validate

___

### isConstruct

▸ `Static` **isConstruct**(`x`): x is Construct

Return whether the given object is a Construct.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `any` |

#### Returns

x is Construct

#### Inherited from

Construct.isConstruct

# Account Label Mode

[@cloudcomponents/cdk-chatops](#readme) / AccountLabelMode

# Enumeration: AccountLabelMode

## Table of contents

### Enumeration members

- [ALIAS](#alias)
- [ID](#id)
- [ID\_AND\_ALIAS](#id_and_alias)

## Enumeration members

### ALIAS

• **ALIAS** = `"ALIAS"`

___

### ID

• **ID** = `"ID"`

___

### ID\_AND\_ALIAS

• **ID\_AND\_ALIAS** = `"ID_AND_ALIAS"`

# Logging Level

[@cloudcomponents/cdk-chatops](#readme) / LoggingLevel

# Enumeration: LoggingLevel

## Table of contents

### Enumeration members

- [ERROR](#error)
- [INFO](#info)
- [NONE](#none)

## Enumeration members

### ERROR

• **ERROR** = `"ERROR"`

___

### INFO

• **INFO** = `"INFO"`

___

### NONE

• **NONE** = `"NONE"`

# I Slack Channel Configuration

[@cloudcomponents/cdk-chatops](#readme) / ISlackChannelConfiguration

# Interface: ISlackChannelConfiguration

## Table of contents

### Properties

- [configurationArn](#configurationarn)

## Properties

### configurationArn

• `Readonly` **configurationArn**: `string`

# MS Teams Incoming Webhook Configuration Props

[@cloudcomponents/cdk-chatops](#readme) / MSTeamsIncomingWebhookConfigurationProps

# Interface: MSTeamsIncomingWebhookConfigurationProps

## Table of contents

### Properties

- [accountLabelMode](#accountlabelmode)
- [notificationTopics](#notificationtopics)
- [themeColor](#themecolor)
- [url](#url)

## Properties

### accountLabelMode

• `Optional` `Readonly` **accountLabelMode**: [`AccountLabelMode`](#account-label-mode)

**`default`** ACCOUNT_LABEL_MODE.ID_AND_ALIAS

___

### notificationTopics

• `Optional` `Readonly` **notificationTopics**: `ITopic`[]

The SNS topics that deliver notifications to MS Teams.

___

### themeColor

• `Optional` `Readonly` **themeColor**: `string`

Specifies a custom brand color for the card. The color will be displayed in a non-obtrusive manner.

**`default`** `#CEDB56`

___

### url

• `Readonly` **url**: `string`

The url of the incoming webhook for a channel

# Slack Channel Configuration Props

[@cloudcomponents/cdk-chatops](#readme) / SlackChannelConfigurationProps

# Interface: SlackChannelConfigurationProps

## Table of contents

### Properties

- [configurationName](#configurationname)
- [loggingLevel](#logginglevel)
- [notificationTopics](#notificationtopics)
- [role](#role)
- [slackChannelId](#slackchannelid)
- [slackWorkspaceId](#slackworkspaceid)

## Properties

### configurationName

• `Readonly` **configurationName**: `string`

The name of the configuration.

___

### loggingLevel

• `Optional` `Readonly` **loggingLevel**: [`LoggingLevel`](#logging-level)

Specifies the logging level for this configuration. This property
affects the log entries pushed to Amazon CloudWatch Logs.

Logging levels include ERROR, INFO, or NONE.

**`default`** NONE

___

### notificationTopics

• `Optional` `Readonly` **notificationTopics**: `ITopic`[]

The SNS topics that deliver notifications to AWS Chatbot.

___

### role

• `Optional` `Readonly` **role**: `IRole`

The iam role that defines the permissions for AWS Chatbot.

This is a user-defined role that AWS Chatbot will assume. This is
not the service-linked role. For more information, see IAM Policies
for AWS Chatbot.

___

### slackChannelId

• `Readonly` **slackChannelId**: `string`

The ID of the Slack channel.

To get the ID, open Slack, right click on the channel name
in the left pane, then choose Copy Link. The channel ID is
the 9-character string at the end of the URL.
For example, ABCBBLZZZ.

___

### slackWorkspaceId

• `Readonly` **slackWorkspaceId**: `string`

The ID of the Slack workspace authorized with AWS Chatbot.

To get the workspace ID, you must perform the initial authorization
flow with Slack in the AWS Chatbot console. Then you can copy and
paste the workspace ID from the console. For more details, see steps
1-4 in Setting Up AWS Chatbot with Slack in the AWS Chatbot User Guide.
