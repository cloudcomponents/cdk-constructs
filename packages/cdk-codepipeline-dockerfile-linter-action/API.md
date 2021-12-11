# README

@cloudcomponents/cdk-codepipeline-dockerfile-linter-action

# @cloudcomponents/cdk-codepipeline-dockerfile-linter-action

## Table of contents

### Classes

- [CodePipelineDockerfileLinterAction](#code-pipeline-dockerfile-linter-action)

### Interfaces

- [CodePipelineDockerfileLinterActionProps](#code-pipeline-dockerfile-linter-action-props)

# Code Pipeline Dockerfile Linter Action

[@cloudcomponents/cdk-codepipeline-dockerfile-linter-action](#readme) / CodePipelineDockerfileLinterAction

# Class: CodePipelineDockerfileLinterAction

## Hierarchy

- `Action`

  ↳ **`CodePipelineDockerfileLinterAction`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [props](#props)
- [providedActionProperties](#providedactionproperties)

### Accessors

- [\_pipeline](#_pipeline)
- [\_scope](#_scope)
- [\_stage](#_stage)
- [actionProperties](#actionproperties)

### Methods

- [bind](#bind)
- [bound](#bound)
- [onStateChange](#onstatechange)
- [variableExpression](#variableexpression)

## Constructors

### constructor

• **new CodePipelineDockerfileLinterAction**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`CodePipelineDockerfileLinterActionProps`](#code-pipeline-dockerfile-linter-action-props) |

#### Overrides

Action.constructor

## Properties

### props

• `Private` `Readonly` **props**: [`CodePipelineDockerfileLinterActionProps`](#code-pipeline-dockerfile-linter-action-props)

___

### providedActionProperties

• `Protected` `Readonly` **providedActionProperties**: `ActionProperties`

This is a renamed version of the {@link IAction.actionProperties} property.

**`stability`** stable

#### Inherited from

Action.providedActionProperties

## Accessors

### \_pipeline

• `Private` `get` **_pipeline**(): `any`

#### Returns

`any`

#### Inherited from

Action.\_pipeline

___

### \_scope

• `Private` `get` **_scope**(): `any`

Retrieves the Construct scope of this Action.
Only available after the Action has been added to a Stage,
and that Stage to a Pipeline.

#### Returns

`any`

#### Inherited from

Action.\_scope

___

### \_stage

• `Private` `get` **_stage**(): `any`

#### Returns

`any`

#### Inherited from

Action.\_stage

___

### actionProperties

• `get` **actionProperties**(): `ActionProperties`

The simple properties of the Action, like its Owner, name, etc.

Note that this accessor will be called before the [bind](#bind) callback.

**`stability`** stable

#### Returns

`ActionProperties`

#### Inherited from

Action.actionProperties

## Methods

### bind

▸ **bind**(`scope`, `stage`, `options`): `ActionConfig`

The callback invoked when this Action is added to a Pipeline.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `stage` | `IStage` |
| `options` | `ActionBindOptions` |

#### Returns

`ActionConfig`

#### Inherited from

Action.bind

___

### bound

▸ `Protected` **bound**(`scope`, `_stage`, `options`): `ActionConfig`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `_stage` | `IStage` |
| `options` | `ActionBindOptions` |

#### Returns

`ActionConfig`

#### Overrides

Action.bound

___

### onStateChange

▸ **onStateChange**(`name`, `target?`, `options?`): `Rule`

Creates an Event that will be triggered whenever the state of this Action changes.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `target?` | `IRuleTarget` |
| `options?` | `RuleProps` |

#### Returns

`Rule`

#### Inherited from

Action.onStateChange

___

### variableExpression

▸ `Protected` **variableExpression**(`variableName`): `string`

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `variableName` | `string` |

#### Returns

`string`

#### Inherited from

Action.variableExpression

# Code Pipeline Dockerfile Linter Action Props

[@cloudcomponents/cdk-codepipeline-dockerfile-linter-action](#readme) / CodePipelineDockerfileLinterActionProps

# Interface: CodePipelineDockerfileLinterActionProps

## Hierarchy

- `CommonAwsActionProps`

  ↳ **`CodePipelineDockerfileLinterActionProps`**

## Table of contents

### Properties

- [actionName](#actionname)
- [computeType](#computetype)
- [input](#input)
- [role](#role)
- [runOrder](#runorder)
- [variablesNamespace](#variablesnamespace)
- [version](#version)

## Properties

### actionName

• `Readonly` **actionName**: `string`

The physical, human-readable name of the Action.

Note that Action names must be unique within a single Stage.

**`stability`** stable

#### Inherited from

CommonAwsActionProps.actionName

___

### computeType

• `Optional` `Readonly` **computeType**: `ComputeType`

The type of compute to use for backup the repositories.
See the {@link ComputeType} enum for the possible values.

**`default`** taken from {@link LinuxBuildImage.STANDARD_4_0#defaultComputeType}

___

### input

• `Readonly` **input**: `Artifact`

The source to use as input for this action.

___

### role

• `Optional` `Readonly` **role**: `IRole`

The Role in which context's this Action will be executing in.

The Pipeline's Role will assume this Role
(the required permissions for that will be granted automatically)
right before executing this Action.
This Action will be passed into your {@link IAction.bind}
method in the {@link ActionBindOptions.role} property.

**`default`** a new Role will be generated

**`stability`** stable

#### Inherited from

CommonAwsActionProps.role

___

### runOrder

• `Optional` `Readonly` **runOrder**: `number`

The runOrder property for this Action.

RunOrder determines the relative order in which multiple Actions in the same Stage execute.

**`default`** 1

**`see`** https://docs.aws.amazon.com/codepipeline/latest/userguide/reference-pipeline-structure.html

**`stability`** stable

#### Inherited from

CommonAwsActionProps.runOrder

___

### variablesNamespace

• `Optional` `Readonly` **variablesNamespace**: `string`

The name of the namespace to use for variables emitted by this action.

**`default`** - a name will be generated, based on the stage and action names,
if any of the action's variables were referenced - otherwise,
no namespace will be set

**`stability`** stable

#### Inherited from

CommonAwsActionProps.variablesNamespace

___

### version

• `Optional` `Readonly` **version**: `string`

Version of hadolint

**`default`** v1.19.0
