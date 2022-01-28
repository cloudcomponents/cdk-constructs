# README

@cloudcomponents/cdk-pull-request-check

# @cloudcomponents/cdk-pull-request-check

## Table of contents

### Classes

- [PullRequestCheck](#pull-request-check)

### Interfaces

- [PullRequestCheckProps](#pull-request-check-props)

# Pull Request Check

[@cloudcomponents/cdk-pull-request-check](#readme) / PullRequestCheck

# Class: PullRequestCheck

Represents a reference to a PullRequestCheck.

## Hierarchy

- `Construct`

  ↳ **`PullRequestCheck`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [codeBuildResultFunction](#codebuildresultfunction)
- [node](#node)
- [pullRequestProject](#pullrequestproject)

### Methods

- [addToRolePolicy](#addtorolepolicy)
- [onCheckFailed](#oncheckfailed)
- [onCheckStarted](#oncheckstarted)
- [onCheckSucceeded](#onchecksucceeded)
- [toString](#tostring)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new PullRequestCheck**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`PullRequestCheckProps`](#pull-request-check-props) |

#### Overrides

Construct.constructor

## Properties

### codeBuildResultFunction

• `Optional` `Readonly` **codeBuildResultFunction**: `IFunction`

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

Construct.node

___

### pullRequestProject

• `Private` **pullRequestProject**: `Project`

## Methods

### addToRolePolicy

▸ **addToRolePolicy**(`statement`): `void`

Add a permission only if there's a policy attached.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `statement` | `PolicyStatement` | The permissions statement to add |

#### Returns

`void`

___

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

# Pull Request Check Props

[@cloudcomponents/cdk-pull-request-check](#readme) / PullRequestCheckProps

# Interface: PullRequestCheckProps

## Table of contents

### Properties

- [allowAllOutbound](#allowalloutbound)
- [artifacts](#artifacts)
- [buildImage](#buildimage)
- [buildSpec](#buildspec)
- [computeType](#computetype)
- [environmentVariables](#environmentvariables)
- [postComment](#postcomment)
- [privileged](#privileged)
- [projectName](#projectname)
- [repository](#repository)
- [role](#role)
- [securityGroups](#securitygroups)
- [subnetSelection](#subnetselection)
- [updateApprovalState](#updateapprovalstate)
- [vpc](#vpc)

## Properties

### allowAllOutbound

• `Optional` `Readonly` **allowAllOutbound**: `boolean`

Whether to allow the CodeBuild to send all network traffic.
If set to false, you must individually add traffic rules to allow the CodeBuild project to connect to network targets.
Only used if 'vpc' is supplied.

**`default`** true

___

### artifacts

• `Optional` `Readonly` **artifacts**: `IArtifacts`

Defines where build artifacts will be stored.

Could be: PipelineBuildArtifacts, NoArtifacts and S3Artifacts.

**`default`** NoArtifacts

___

### buildImage

• `Optional` `Readonly` **buildImage**: `IBuildImage`

Build environment to use for the build.

**`default`** BuildEnvironment.LinuxBuildImage.STANDARD_2_0

___

### buildSpec

• `Readonly` **buildSpec**: `BuildSpec`

Filename or contents of buildspec in JSON format.

**`see`** https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html#build-spec-ref-example

___

### computeType

• `Optional` `Readonly` **computeType**: `ComputeType`

The type of compute to use for this build.
See the {@link ComputeType} enum for the possible values.

**`default`** taken from {@link #buildImage#defaultComputeType}

___

### environmentVariables

• `Optional` `Readonly` **environmentVariables**: `Object`

The environment variables that your builds can use.

#### Index signature

▪ [name: `string`]: `BuildEnvironmentVariable`

___

### postComment

• `Optional` `Readonly` **postComment**: `boolean`

Specifies whether comments should be written in the request

**`default`** true

___

### privileged

• `Optional` `Readonly` **privileged**: `boolean`

Indicates how the project builds Docker images. Specify true to enable
running the Docker daemon inside a Docker container. This value must be
set to true only if this build project will be used to build Docker
images, and the specified build environment image is not one provided by
AWS CodeBuild with Docker support. Otherwise, all associated builds that
attempt to interact with the Docker daemon will fail.

**`default`** false

___

### projectName

• `Optional` `Readonly` **projectName**: `string`

The human-visible name of this PullRequest-Project.
 * @default taken from {@link #repository:#repositoryName}-pull-request

___

### repository

• `Readonly` **repository**: `IRepository`

The CodeCommit repository.

___

### role

• `Optional` `Readonly` **role**: `IRole`

The IAM service Role of the Project.

___

### securityGroups

• `Optional` `Readonly` **securityGroups**: `ISecurityGroup`[]

What security group to associate with the codebuild project's network interfaces.
If no security group is identified, one will be created automatically.
Only used if 'vpc' is supplied.

**`default`** Security group will be automatically created

___

### subnetSelection

• `Optional` `Readonly` **subnetSelection**: `SubnetSelection`

Where to place the network interfaces within the VPC.
Only used if 'vpc' is supplied.

**`default`** All private subnets

___

### updateApprovalState

• `Optional` `Readonly` **updateApprovalState**: `boolean`

Indicates whether the approval state [APPROVE, REVOKE] should be updated

**`default`** true

___

### vpc

• `Optional` `Readonly` **vpc**: `IVpc`

VPC network to place codebuild network interfaces.
Specify this if the codebuild project needs to access resources in a VPC.

**`default`** No VPC is specified
