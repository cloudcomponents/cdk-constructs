# README

@cloudcomponents/cdk-dependency-check

# @cloudcomponents/cdk-dependency-check

## Table of contents

### Classes

- [CodeCommitDependencyCheck](#code-commit-dependency-check)

### Interfaces

- [CodeCommitDependencyCheckProps](#code-commit-dependency-check-props)

# Code Commit Dependency Check

[@cloudcomponents/cdk-dependency-check](#readme) / CodeCommitDependencyCheck

# Class: CodeCommitDependencyCheck

## Hierarchy

- `Construct`

  ↳ **`CodeCommitDependencyCheck`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [checkProject](#checkproject)
- [node](#node)

### Methods

- [onCheckFailed](#oncheckfailed)
- [onCheckStarted](#oncheckstarted)
- [onCheckSucceeded](#onchecksucceeded)
- [toString](#tostring)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new CodeCommitDependencyCheck**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`CodeCommitDependencyCheckProps`](#code-commit-dependency-check-props) |

#### Overrides

Construct.constructor

## Properties

### checkProject

• `Private` `Readonly` **checkProject**: `Project`

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

Construct.node

## Methods

### onCheckFailed

▸ **onCheckFailed**(`id`, `options?`): `Rule`

Defines an event rule which triggers when a check fails.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `OnEventOptions` |

#### Returns

`Rule`

___

### onCheckStarted

▸ **onCheckStarted**(`id`, `options?`): `Rule`

Defines an event rule which triggers when a check starts.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `OnEventOptions` |

#### Returns

`Rule`

___

### onCheckSucceeded

▸ **onCheckSucceeded**(`id`, `options?`): `Rule`

Defines an event rule which triggers when a check complets successfully.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `OnEventOptions` |

#### Returns

`Rule`

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

# Code Commit Dependency Check Props

[@cloudcomponents/cdk-dependency-check](#readme) / CodeCommitDependencyCheckProps

# Interface: CodeCommitDependencyCheckProps

## Table of contents

### Properties

- [computeType](#computetype)
- [enableExperimental](#enableexperimental)
- [excludes](#excludes)
- [failOnCVSS](#failoncvss)
- [paths](#paths)
- [preCheckCommand](#precheckcommand)
- [projectName](#projectname)
- [reportsBucket](#reportsbucket)
- [repository](#repository)
- [schedule](#schedule)
- [suppressions](#suppressions)
- [version](#version)

## Properties

### computeType

• `Optional` `Readonly` **computeType**: `ComputeType`

The type of compute to use for check the repositories.
See the {@link ComputeType} enum for the possible values.

**`default`** taken from {@link #buildImage#defaultComputeType}

___

### enableExperimental

• `Optional` `Readonly` **enableExperimental**: `boolean`

Enable the experimental analyzers. If not set the analyzers marked as experimental will not be loaded or used.

**`default`** false

___

### excludes

• `Optional` `Readonly` **excludes**: `string`[]

The path patterns to exclude from the scan

___

### failOnCVSS

• `Optional` `Readonly` **failOnCVSS**: `number`

If the score set between 0 and 10 the exit code from dependency-check will indicate if a vulnerability with a CVSS score equal to or higher was identified.

**`default`** 0

___

### paths

• `Optional` `Readonly` **paths**: `string`[]

The paths to scan. Basedir repositoryDir

**`default`** the repositoryDir

___

### preCheckCommand

• `Optional` `Readonly` **preCheckCommand**: `string`

Custom command to be executed before the dependency check

**`default`** `echo "No preCheckCommand!"`

___

### projectName

• `Optional` `Readonly` **projectName**: `string`

The name of the project being scanned.

* @default taken from {@link #repository#repositoryName}

___

### reportsBucket

• `Optional` `Readonly` **reportsBucket**: `Bucket`

Bucket for uploading html reports

___

### repository

• `Readonly` **repository**: `IRepository`

The repository to be checked

___

### schedule

• `Readonly` **schedule**: `Schedule`

Schedule for dependency check.

___

### suppressions

• `Optional` `Readonly` **suppressions**: `string`[]

The file paths to the suppression XML files; used to suppress false positives.

___

### version

• `Optional` `Readonly` **version**: `string`

Version of the dependency check

**`default`** 5.3.2
