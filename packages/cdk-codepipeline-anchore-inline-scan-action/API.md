# README

@cloudcomponents/cdk-codepipeline-anchore-inline-scan-action

# @cloudcomponents/cdk-codepipeline-anchore-inline-scan-action

## Table of contents

### Classes

- [CodePipelineAnchoreInlineScanAction](#code-pipeline-anchore-inline-scan-action)

### Interfaces

- [CodePipelineAnchoreInlineScanActionProps](#code-pipeline-anchore-inline-scan-action-props)

# Code Pipeline Anchore Inline Scan Action

[@cloudcomponents/cdk-codepipeline-anchore-inline-scan-action](#readme) / CodePipelineAnchoreInlineScanAction

# Class: CodePipelineAnchoreInlineScanAction

## Hierarchy

- `Action`

  ↳ **`CodePipelineAnchoreInlineScanAction`**

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

• **new CodePipelineAnchoreInlineScanAction**(`props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`CodePipelineAnchoreInlineScanActionProps`](#code-pipeline-anchore-inline-scan-action-props) |

#### Overrides

Action.constructor

## Properties

### props

• `Private` `Readonly` **props**: [`CodePipelineAnchoreInlineScanActionProps`](#code-pipeline-anchore-inline-scan-action-props)

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

___

### \_scope

• `Private` `get` **_scope**(): `any`

Retrieves the Construct scope of this Action.
Only available after the Action has been added to a Stage,
and that Stage to a Pipeline.

#### Returns

`any`

___

### \_stage

• `Private` `get` **_stage**(): `any`

#### Returns

`any`

___

### actionProperties

• `get` **actionProperties**(): `ActionProperties`

The simple properties of the Action, like its Owner, name, etc.

Note that this accessor will be called before the [bind](#bind) callback.

**`stability`** stable

#### Returns

`ActionProperties`

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

# Code Pipeline Anchore Inline Scan Action Props

[@cloudcomponents/cdk-codepipeline-anchore-inline-scan-action](#readme) / CodePipelineAnchoreInlineScanActionProps

# Interface: CodePipelineAnchoreInlineScanActionProps

## Hierarchy

- `CommonAwsActionProps`

  ↳ **`CodePipelineAnchoreInlineScanActionProps`**

## Table of contents

### Properties

- [actionName](#actionname)
- [computeType](#computetype)
- [customAnchoreImage](#customanchoreimage)
- [ecrLogin](#ecrlogin)
- [input](#input)
- [policyBundlePath](#policybundlepath)
- [projectRole](#projectrole)
- [role](#role)
- [runOrder](#runorder)
- [timeout](#timeout)
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

### customAnchoreImage

• `Optional` `Readonly` **customAnchoreImage**: `string`

This will override the image name from Dockerhub

___

### ecrLogin

• `Optional` `Readonly` **ecrLogin**: `boolean`

**`default`** false

___

### input

• `Readonly` **input**: `Artifact`

The source to use as input for this action.

___

### policyBundlePath

• `Optional` `Readonly` **policyBundlePath**: `string`

Path to local Anchore policy bundle

**`default`** ./policy_bundle.json

___

### projectRole

• `Optional` `Readonly` **projectRole**: `IRole`

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

### timeout

• `Optional` `Readonly` **timeout**: `number`

Specify timeout for image scanning in seconds.

**`default`** 300

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

Version of anchore ci-tools

**`default`** v0.8.2
