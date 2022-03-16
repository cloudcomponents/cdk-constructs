# README

@cloudcomponents/cdk-blue-green-container-deployment

# @cloudcomponents/cdk-blue-green-container-deployment

## Table of contents

### Enumerations

- [PropagateTags](#propagate-tags)
- [RollbackEvent](#rollback-event)
- [SchedulingStrategy](#scheduling-strategy)

### Classes

- [DummyTaskDefinition](#dummy-task-definition)
- [EcsDeploymentConfig](#ecs-deployment-config)
- [EcsDeploymentGroup](#ecs-deployment-group)
- [EcsService](#ecs-service)
- [PushImageProject](#push-image-project)

### Interfaces

- [DummyTaskDefinitionProps](#dummy-task-definition-props)
- [EcsDeploymentConfigurationProps](#ecs-deployment-configuration-props)
- [EcsDeploymentGroupProps](#ecs-deployment-group-props)
- [EcsServiceProps](#ecs-service-props)
- [IDummyTaskDefinition](#i-dummy-task-definition)
- [IEcsDeploymentConfig](#i-ecs-deployment-config)
- [IEcsDeploymentGroup](#i-ecs-deployment-group)
- [IEcsService](#i-ecs-service)
- [PushImageProjectProps](#push-image-project-props)
- [TrafficListener](#traffic-listener)

# Dummy Task Definition

[@cloudcomponents/cdk-blue-green-container-deployment](#readme) / DummyTaskDefinition

# Class: DummyTaskDefinition

## Hierarchy

- `Construct`

  ↳ **`DummyTaskDefinition`**

## Implements

- [`IDummyTaskDefinition`](#i-dummy-task-definition)
- `ITaggable`

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [containerName](#containername)
- [containerPort](#containerport)
- [executionRole](#executionrole)
- [family](#family)
- [node](#node)
- [tags](#tags)
- [taskDefinitionArn](#taskdefinitionarn)

### Methods

- [addToExecutionRolePolicy](#addtoexecutionrolepolicy)
- [toString](#tostring)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new DummyTaskDefinition**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`DummyTaskDefinitionProps`](#dummy-task-definition-props) |

#### Overrides

Construct.constructor

## Properties

### containerName

• `Readonly` **containerName**: `string`

#### Implementation of

[IDummyTaskDefinition](#i-dummy-task-definition).[containerName](#containername)

___

### containerPort

• `Readonly` **containerPort**: `number`

#### Implementation of

[IDummyTaskDefinition](#i-dummy-task-definition).[containerPort](#containerport)

___

### executionRole

• `Readonly` **executionRole**: `IRole`

#### Implementation of

[IDummyTaskDefinition](#i-dummy-task-definition).[executionRole](#executionrole)

___

### family

• `Readonly` **family**: `string`

#### Implementation of

[IDummyTaskDefinition](#i-dummy-task-definition).[family](#family)

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

Construct.node

___

### tags

• `Readonly` **tags**: `TagManager`

#### Implementation of

ITaggable.tags

___

### taskDefinitionArn

• `Readonly` **taskDefinitionArn**: `string`

#### Implementation of

[IDummyTaskDefinition](#i-dummy-task-definition).[taskDefinitionArn](#taskdefinitionarn)

## Methods

### addToExecutionRolePolicy

▸ **addToExecutionRolePolicy**(`statement`): `void`

Adds a policy statement to the task execution IAM role.

#### Parameters

| Name | Type |
| :------ | :------ |
| `statement` | `PolicyStatement` |

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

# Ecs Deployment Config

[@cloudcomponents/cdk-blue-green-container-deployment](#readme) / EcsDeploymentConfig

# Class: EcsDeploymentConfig

## Hierarchy

- `Resource`

  ↳ **`EcsDeploymentConfig`**

## Implements

- [`IEcsDeploymentConfig`](#i-ecs-deployment-config)

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [deploymentConfigArn](#deploymentconfigarn)
- [deploymentConfigName](#deploymentconfigname)
- [env](#env)
- [node](#node)
- [physicalName](#physicalname)
- [stack](#stack)
- [ALL\_AT\_ONCE](#all_at_once)
- [CANARY\_10PERCENT\_15MINUTES](#canary_10percent_15minutes)
- [CANARY\_10PERCENT\_5MINUTES](#canary_10percent_5minutes)
- [LINEAR\_10PERCENT\_EVERY\_1MINUTE](#linear_10percent_every_1minute)
- [LINEAR\_10PERCENT\_EVERY\_3MINUTES](#linear_10percent_every_3minutes)

### Methods

- [\_enableCrossEnvironment](#_enablecrossenvironment)
- [applyRemovalPolicy](#applyremovalpolicy)
- [generatePhysicalName](#generatephysicalname)
- [getResourceArnAttribute](#getresourcearnattribute)
- [getResourceNameAttribute](#getresourcenameattribute)
- [toString](#tostring)
- [fromEcsDeploymentConfigName](#fromecsdeploymentconfigname)
- [isConstruct](#isconstruct)
- [isResource](#isresource)

## Constructors

### constructor

• **new EcsDeploymentConfig**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`EcsDeploymentConfigurationProps`](#ecs-deployment-configuration-props) |

#### Overrides

Resource.constructor

## Properties

### deploymentConfigArn

• `Readonly` **deploymentConfigArn**: `string`

#### Implementation of

[IEcsDeploymentConfig](#i-ecs-deployment-config).[deploymentConfigArn](#deploymentconfigarn)

___

### deploymentConfigName

• `Readonly` **deploymentConfigName**: `string`

#### Implementation of

[IEcsDeploymentConfig](#i-ecs-deployment-config).[deploymentConfigName](#deploymentconfigname)

___

### env

• `Readonly` **env**: `ResourceEnvironment`

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

**`stability`** stable

#### Inherited from

Resource.env

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

Resource.node

___

### physicalName

• `Protected` `Readonly` **physicalName**: `string`

Returns a string-encoded token that resolves to the physical name that should be passed to the CloudFormation resource.

This value will resolve to one of the following:
- a concrete value (e.g. `"my-awesome-bucket"`)
- `undefined`, when a name should be generated by CloudFormation
- a concrete name generated automatically during synthesis, in
   cross-environment scenarios.

**`stability`** stable

#### Inherited from

Resource.physicalName

___

### stack

• `Readonly` **stack**: `Stack`

The stack in which this resource is defined.

**`stability`** stable

#### Inherited from

Resource.stack

___

### ALL\_AT\_ONCE

▪ `Static` `Readonly` **ALL\_AT\_ONCE**: [`IEcsDeploymentConfig`](#i-ecs-deployment-config)

___

### CANARY\_10PERCENT\_15MINUTES

▪ `Static` `Readonly` **CANARY\_10PERCENT\_15MINUTES**: [`IEcsDeploymentConfig`](#i-ecs-deployment-config)

___

### CANARY\_10PERCENT\_5MINUTES

▪ `Static` `Readonly` **CANARY\_10PERCENT\_5MINUTES**: [`IEcsDeploymentConfig`](#i-ecs-deployment-config)

___

### LINEAR\_10PERCENT\_EVERY\_1MINUTE

▪ `Static` `Readonly` **LINEAR\_10PERCENT\_EVERY\_1MINUTE**: [`IEcsDeploymentConfig`](#i-ecs-deployment-config)

___

### LINEAR\_10PERCENT\_EVERY\_3MINUTES

▪ `Static` `Readonly` **LINEAR\_10PERCENT\_EVERY\_3MINUTES**: [`IEcsDeploymentConfig`](#i-ecs-deployment-config)

## Methods

### \_enableCrossEnvironment

▸ **_enableCrossEnvironment**(): `void`

Called when this resource is referenced across environments
(account/region) to order to request that a physical name will be generated
for this resource during synthesis, so the resource can be referenced
through it's absolute name/arn.

**`internal`**

#### Returns

`void`

#### Inherited from

Resource.\_enableCrossEnvironment

___

### applyRemovalPolicy

▸ **applyRemovalPolicy**(`policy`): `void`

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `policy` | `RemovalPolicy` |

#### Returns

`void`

#### Inherited from

Resource.applyRemovalPolicy

___

### generatePhysicalName

▸ `Protected` **generatePhysicalName**(): `string`

**`stability`** stable

#### Returns

`string`

#### Inherited from

Resource.generatePhysicalName

___

### getResourceArnAttribute

▸ `Protected` **getResourceArnAttribute**(`arnAttr`, `arnComponents`): `string`

Returns an environment-sensitive token that should be used for the resource's "ARN" attribute (e.g. `bucket.bucketArn`).

Normally, this token will resolve to `arnAttr`, but if the resource is
referenced across environments, `arnComponents` will be used to synthesize
a concrete ARN with the resource's physical name. Make sure to reference
`this.physicalName` in `arnComponents`.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arnAttr` | `string` | The CFN attribute which resolves to the ARN of the resource. |
| `arnComponents` | `ArnComponents` | The format of the ARN of this resource. |

#### Returns

`string`

#### Inherited from

Resource.getResourceArnAttribute

___

### getResourceNameAttribute

▸ `Protected` **getResourceNameAttribute**(`nameAttr`): `string`

Returns an environment-sensitive token that should be used for the resource's "name" attribute (e.g. `bucket.bucketName`).

Normally, this token will resolve to `nameAttr`, but if the resource is
referenced across environments, it will be resolved to `this.physicalName`,
which will be a concrete name.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nameAttr` | `string` | The CFN attribute which resolves to the resource's name. |

#### Returns

`string`

#### Inherited from

Resource.getResourceNameAttribute

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

Resource.toString

___

### fromEcsDeploymentConfigName

▸ `Static` **fromEcsDeploymentConfigName**(`_scope`, `_id`, `ecsDeploymentConfigName`): [`IEcsDeploymentConfig`](#i-ecs-deployment-config)

Import a custom Deployment Configuration for an ECS Deployment Group defined outside the CDK.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_scope` | `Construct` | the parent Construct for this new Construct |
| `_id` | `string` | the logical ID of this new Construct |
| `ecsDeploymentConfigName` | `string` | the name of the referenced custom Deployment Configuration |

#### Returns

[`IEcsDeploymentConfig`](#i-ecs-deployment-config)

a Construct representing a reference to an existing custom Deployment Configuration

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

Resource.isConstruct

___

### isResource

▸ `Static` **isResource**(`construct`): construct is CfnResource

Check whether the given construct is a Resource.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `construct` | `IConstruct` |

#### Returns

construct is CfnResource

#### Inherited from

Resource.isResource

# Ecs Deployment Group

[@cloudcomponents/cdk-blue-green-container-deployment](#readme) / EcsDeploymentGroup

# Class: EcsDeploymentGroup

## Hierarchy

- `Resource`

  ↳ **`EcsDeploymentGroup`**

## Implements

- [`IEcsDeploymentGroup`](#i-ecs-deployment-group)
- `ITaggable`

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [application](#application)
- [deploymentConfig](#deploymentconfig)
- [deploymentGroupArn](#deploymentgrouparn)
- [deploymentGroupName](#deploymentgroupname)
- [env](#env)
- [node](#node)
- [physicalName](#physicalname)
- [stack](#stack)
- [tags](#tags)

### Methods

- [\_enableCrossEnvironment](#_enablecrossenvironment)
- [applyRemovalPolicy](#applyremovalpolicy)
- [generatePhysicalName](#generatephysicalname)
- [getResourceArnAttribute](#getresourcearnattribute)
- [getResourceNameAttribute](#getresourcenameattribute)
- [toString](#tostring)
- [isConstruct](#isconstruct)
- [isResource](#isresource)

## Constructors

### constructor

• **new EcsDeploymentGroup**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`EcsDeploymentGroupProps`](#ecs-deployment-group-props) |

#### Overrides

Resource.constructor

## Properties

### application

• `Readonly` **application**: `IEcsApplication`

The reference to the CodeDeploy ECS Application that this Deployment Group belongs to.

#### Implementation of

[IEcsDeploymentGroup](#i-ecs-deployment-group).[application](#application)

___

### deploymentConfig

• `Readonly` **deploymentConfig**: [`IEcsDeploymentConfig`](#i-ecs-deployment-config)

The Deployment Configuration this Group uses.

#### Implementation of

[IEcsDeploymentGroup](#i-ecs-deployment-group).[deploymentConfig](#deploymentconfig)

___

### deploymentGroupArn

• `Readonly` **deploymentGroupArn**: `string`

The ARN of this Deployment Group.

#### Implementation of

[IEcsDeploymentGroup](#i-ecs-deployment-group).[deploymentGroupArn](#deploymentgrouparn)

___

### deploymentGroupName

• `Readonly` **deploymentGroupName**: `string`

The physical name of the CodeDeploy Deployment Group.

#### Implementation of

[IEcsDeploymentGroup](#i-ecs-deployment-group).[deploymentGroupName](#deploymentgroupname)

___

### env

• `Readonly` **env**: `ResourceEnvironment`

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

**`stability`** stable

#### Implementation of

[IEcsDeploymentGroup](#i-ecs-deployment-group).[env](#env)

#### Inherited from

Resource.env

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Implementation of

[IEcsDeploymentGroup](#i-ecs-deployment-group).[node](#node)

#### Inherited from

Resource.node

___

### physicalName

• `Protected` `Readonly` **physicalName**: `string`

Returns a string-encoded token that resolves to the physical name that should be passed to the CloudFormation resource.

This value will resolve to one of the following:
- a concrete value (e.g. `"my-awesome-bucket"`)
- `undefined`, when a name should be generated by CloudFormation
- a concrete name generated automatically during synthesis, in
   cross-environment scenarios.

**`stability`** stable

#### Inherited from

Resource.physicalName

___

### stack

• `Readonly` **stack**: `Stack`

The stack in which this resource is defined.

**`stability`** stable

#### Implementation of

[IEcsDeploymentGroup](#i-ecs-deployment-group).[stack](#stack)

#### Inherited from

Resource.stack

___

### tags

• `Readonly` **tags**: `TagManager`

#### Implementation of

ITaggable.tags

## Methods

### \_enableCrossEnvironment

▸ **_enableCrossEnvironment**(): `void`

Called when this resource is referenced across environments
(account/region) to order to request that a physical name will be generated
for this resource during synthesis, so the resource can be referenced
through it's absolute name/arn.

**`internal`**

#### Returns

`void`

#### Inherited from

Resource.\_enableCrossEnvironment

___

### applyRemovalPolicy

▸ **applyRemovalPolicy**(`policy`): `void`

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `policy` | `RemovalPolicy` |

#### Returns

`void`

#### Implementation of

[IEcsDeploymentGroup](#i-ecs-deployment-group).[applyRemovalPolicy](#applyremovalpolicy)

#### Inherited from

Resource.applyRemovalPolicy

___

### generatePhysicalName

▸ `Protected` **generatePhysicalName**(): `string`

**`stability`** stable

#### Returns

`string`

#### Inherited from

Resource.generatePhysicalName

___

### getResourceArnAttribute

▸ `Protected` **getResourceArnAttribute**(`arnAttr`, `arnComponents`): `string`

Returns an environment-sensitive token that should be used for the resource's "ARN" attribute (e.g. `bucket.bucketArn`).

Normally, this token will resolve to `arnAttr`, but if the resource is
referenced across environments, `arnComponents` will be used to synthesize
a concrete ARN with the resource's physical name. Make sure to reference
`this.physicalName` in `arnComponents`.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arnAttr` | `string` | The CFN attribute which resolves to the ARN of the resource. |
| `arnComponents` | `ArnComponents` | The format of the ARN of this resource. |

#### Returns

`string`

#### Inherited from

Resource.getResourceArnAttribute

___

### getResourceNameAttribute

▸ `Protected` **getResourceNameAttribute**(`nameAttr`): `string`

Returns an environment-sensitive token that should be used for the resource's "name" attribute (e.g. `bucket.bucketName`).

Normally, this token will resolve to `nameAttr`, but if the resource is
referenced across environments, it will be resolved to `this.physicalName`,
which will be a concrete name.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nameAttr` | `string` | The CFN attribute which resolves to the resource's name. |

#### Returns

`string`

#### Inherited from

Resource.getResourceNameAttribute

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

Resource.toString

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

Resource.isConstruct

___

### isResource

▸ `Static` **isResource**(`construct`): construct is CfnResource

Check whether the given construct is a Resource.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `construct` | `IConstruct` |

#### Returns

construct is CfnResource

#### Inherited from

Resource.isResource

# Ecs Service

[@cloudcomponents/cdk-blue-green-container-deployment](#readme) / EcsService

# Class: EcsService

## Hierarchy

- `Construct`

  ↳ **`EcsService`**

## Implements

- `IConnectable`
- [`IEcsService`](#i-ecs-service)
- `ITaggable`

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [clusterName](#clustername)
- [connections](#connections)
- [node](#node)
- [serviceName](#servicename)
- [tags](#tags)

### Methods

- [toString](#tostring)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new EcsService**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`EcsServiceProps`](#ecs-service-props) |

#### Overrides

Construct.constructor

## Properties

### clusterName

• `Readonly` **clusterName**: `string`

#### Implementation of

[IEcsService](#i-ecs-service).[clusterName](#clustername)

___

### connections

• `Readonly` **connections**: `Connections`

#### Implementation of

IConnectable.connections

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

Construct.node

___

### serviceName

• `Readonly` **serviceName**: `string`

#### Implementation of

[IEcsService](#i-ecs-service).[serviceName](#servicename)

___

### tags

• `Readonly` **tags**: `TagManager`

#### Implementation of

ITaggable.tags

## Methods

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

# Push Image Project

[@cloudcomponents/cdk-blue-green-container-deployment](#readme) / PushImageProject

# Class: PushImageProject

## Hierarchy

- `PipelineProject`

  ↳ **`PushImageProject`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [\_connections](#_connections)
- [env](#env)
- [grantPrincipal](#grantprincipal)
- [node](#node)
- [physicalName](#physicalname)
- [projectArn](#projectarn)
- [projectName](#projectname)
- [role](#role)
- [stack](#stack)

### Accessors

- [connections](#connections)
- [encryptionKey](#encryptionkey)

### Methods

- [\_enableCrossEnvironment](#_enablecrossenvironment)
- [addFileSystemLocation](#addfilesystemlocation)
- [addSecondaryArtifact](#addsecondaryartifact)
- [addSecondarySource](#addsecondarysource)
- [addToRolePolicy](#addtorolepolicy)
- [applyRemovalPolicy](#applyremovalpolicy)
- [bindAsNotificationRuleSource](#bindasnotificationrulesource)
- [bindToCodePipeline](#bindtocodepipeline)
- [enableBatchBuilds](#enablebatchbuilds)
- [generatePhysicalName](#generatephysicalname)
- [getResourceArnAttribute](#getresourcearnattribute)
- [getResourceNameAttribute](#getresourcenameattribute)
- [metric](#metric)
- [metricBuilds](#metricbuilds)
- [metricDuration](#metricduration)
- [metricFailedBuilds](#metricfailedbuilds)
- [metricSucceededBuilds](#metricsucceededbuilds)
- [notifyOn](#notifyon)
- [notifyOnBuildFailed](#notifyonbuildfailed)
- [notifyOnBuildSucceeded](#notifyonbuildsucceeded)
- [onBuildFailed](#onbuildfailed)
- [onBuildStarted](#onbuildstarted)
- [onBuildSucceeded](#onbuildsucceeded)
- [onEvent](#onevent)
- [onPhaseChange](#onphasechange)
- [onStateChange](#onstatechange)
- [toString](#tostring)
- [fromProjectArn](#fromprojectarn)
- [fromProjectName](#fromprojectname)
- [isConstruct](#isconstruct)
- [isResource](#isresource)
- [serializeEnvVariables](#serializeenvvariables)

## Constructors

### constructor

• **new PushImageProject**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`PushImageProjectProps`](#push-image-project-props) |

#### Overrides

PipelineProject.constructor

## Properties

### \_connections

• `Protected` **\_connections**: `undefined` \| `Connections`

Actual connections object for this Project.
May be unset, in which case this Project is not configured to use a VPC.

**`internal`**

#### Inherited from

PipelineProject.\_connections

___

### env

• `Readonly` **env**: `ResourceEnvironment`

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

**`stability`** stable

#### Inherited from

PipelineProject.env

___

### grantPrincipal

• `Readonly` **grantPrincipal**: `IPrincipal`

The principal to grant permissions to.

**`stability`** stable

#### Inherited from

PipelineProject.grantPrincipal

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

PipelineProject.node

___

### physicalName

• `Protected` `Readonly` **physicalName**: `string`

Returns a string-encoded token that resolves to the physical name that should be passed to the CloudFormation resource.

This value will resolve to one of the following:
- a concrete value (e.g. `"my-awesome-bucket"`)
- `undefined`, when a name should be generated by CloudFormation
- a concrete name generated automatically during synthesis, in
   cross-environment scenarios.

**`stability`** stable

#### Inherited from

PipelineProject.physicalName

___

### projectArn

• `Readonly` **projectArn**: `string`

The ARN of the project.

**`stability`** stable

#### Inherited from

PipelineProject.projectArn

___

### projectName

• `Readonly` **projectName**: `string`

The name of the project.

**`stability`** stable

#### Inherited from

PipelineProject.projectName

___

### role

• `Optional` `Readonly` **role**: `IRole`

The IAM role for this project.

**`stability`** stable

#### Inherited from

PipelineProject.role

___

### stack

• `Readonly` **stack**: `Stack`

The stack in which this resource is defined.

**`stability`** stable

#### Inherited from

PipelineProject.stack

## Accessors

### connections

• `get` **connections**(): `Connections`

Access the Connections object.

Will fail if this Project does not have a VPC set.

**`stability`** stable

#### Returns

`Connections`

#### Inherited from

PipelineProject.connections

___

### encryptionKey

• `Private` `set` **encryptionKey**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Inherited from

PipelineProject.encryptionKey

## Methods

### \_enableCrossEnvironment

▸ **_enableCrossEnvironment**(): `void`

Called when this resource is referenced across environments
(account/region) to order to request that a physical name will be generated
for this resource during synthesis, so the resource can be referenced
through it's absolute name/arn.

**`internal`**

#### Returns

`void`

#### Inherited from

PipelineProject.\_enableCrossEnvironment

___

### addFileSystemLocation

▸ **addFileSystemLocation**(`fileSystemLocation`): `void`

Adds a fileSystemLocation to the Project.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileSystemLocation` | `IFileSystemLocation` | the fileSystemLocation to add. |

#### Returns

`void`

#### Inherited from

PipelineProject.addFileSystemLocation

___

### addSecondaryArtifact

▸ **addSecondaryArtifact**(`secondaryArtifact`): `void`

Adds a secondary artifact to the Project.

**`see`** https://docs.aws.amazon.com/codebuild/latest/userguide/sample-multi-in-out.html

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secondaryArtifact` | `IArtifacts` | the artifact to add as a secondary artifact. |

#### Returns

`void`

#### Inherited from

PipelineProject.addSecondaryArtifact

___

### addSecondarySource

▸ **addSecondarySource**(`secondarySource`): `void`

Adds a secondary source to the Project.

**`see`** https://docs.aws.amazon.com/codebuild/latest/userguide/sample-multi-in-out.html

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secondarySource` | `ISource` | the source to add as a secondary source. |

#### Returns

`void`

#### Inherited from

PipelineProject.addSecondarySource

___

### addToRolePolicy

▸ **addToRolePolicy**(`statement`): `void`

Add a permission only if there's a policy attached.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `statement` | `PolicyStatement` | The permissions statement to add. |

#### Returns

`void`

#### Inherited from

PipelineProject.addToRolePolicy

___

### applyRemovalPolicy

▸ **applyRemovalPolicy**(`policy`): `void`

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `policy` | `RemovalPolicy` |

#### Returns

`void`

#### Inherited from

PipelineProject.applyRemovalPolicy

___

### bindAsNotificationRuleSource

▸ **bindAsNotificationRuleSource**(`_scope`): `NotificationRuleSourceConfig`

Returns a source configuration for notification rule.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `_scope` | `Construct` |

#### Returns

`NotificationRuleSourceConfig`

#### Inherited from

PipelineProject.bindAsNotificationRuleSource

___

### bindToCodePipeline

▸ **bindToCodePipeline**(`_scope`, `options`): `void`

A callback invoked when the given project is added to a CodePipeline.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_scope` | `Construct` | the construct the binding is taking place in. |
| `options` | `BindToCodePipelineOptions` | additional options for the binding. |

#### Returns

`void`

#### Inherited from

PipelineProject.bindToCodePipeline

___

### enableBatchBuilds

▸ **enableBatchBuilds**(): `undefined` \| `BatchBuildConfig`

Enable batch builds.

Returns an object contining the batch service role if batch builds
could be enabled.

**`stability`** stable

#### Returns

`undefined` \| `BatchBuildConfig`

#### Inherited from

PipelineProject.enableBatchBuilds

___

### generatePhysicalName

▸ `Protected` **generatePhysicalName**(): `string`

**`stability`** stable

#### Returns

`string`

#### Inherited from

PipelineProject.generatePhysicalName

___

### getResourceArnAttribute

▸ `Protected` **getResourceArnAttribute**(`arnAttr`, `arnComponents`): `string`

Returns an environment-sensitive token that should be used for the resource's "ARN" attribute (e.g. `bucket.bucketArn`).

Normally, this token will resolve to `arnAttr`, but if the resource is
referenced across environments, `arnComponents` will be used to synthesize
a concrete ARN with the resource's physical name. Make sure to reference
`this.physicalName` in `arnComponents`.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arnAttr` | `string` | The CFN attribute which resolves to the ARN of the resource. |
| `arnComponents` | `ArnComponents` | The format of the ARN of this resource. |

#### Returns

`string`

#### Inherited from

PipelineProject.getResourceArnAttribute

___

### getResourceNameAttribute

▸ `Protected` **getResourceNameAttribute**(`nameAttr`): `string`

Returns an environment-sensitive token that should be used for the resource's "name" attribute (e.g. `bucket.bucketName`).

Normally, this token will resolve to `nameAttr`, but if the resource is
referenced across environments, it will be resolved to `this.physicalName`,
which will be a concrete name.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nameAttr` | `string` | The CFN attribute which resolves to the resource's name. |

#### Returns

`string`

#### Inherited from

PipelineProject.getResourceNameAttribute

___

### metric

▸ **metric**(`metricName`, `props?`): `Metric`

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `metricName` | `string` | The name of the metric. |
| `props?` | `MetricOptions` | Customization properties. |

#### Returns

`Metric`

a CloudWatch metric associated with this build project.

#### Inherited from

PipelineProject.metric

___

### metricBuilds

▸ **metricBuilds**(`props?`): `Metric`

Measures the number of builds triggered.

Units: Count

Valid CloudWatch statistics: Sum

**`default`** sum over 5 minutes

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `props?` | `MetricOptions` |

#### Returns

`Metric`

#### Inherited from

PipelineProject.metricBuilds

___

### metricDuration

▸ **metricDuration**(`props?`): `Metric`

Measures the duration of all builds over time.

Units: Seconds

Valid CloudWatch statistics: Average (recommended), Maximum, Minimum

**`default`** average over 5 minutes

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `props?` | `MetricOptions` |

#### Returns

`Metric`

#### Inherited from

PipelineProject.metricDuration

___

### metricFailedBuilds

▸ **metricFailedBuilds**(`props?`): `Metric`

Measures the number of builds that failed because of client error or because of a timeout.

Units: Count

Valid CloudWatch statistics: Sum

**`default`** sum over 5 minutes

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `props?` | `MetricOptions` |

#### Returns

`Metric`

#### Inherited from

PipelineProject.metricFailedBuilds

___

### metricSucceededBuilds

▸ **metricSucceededBuilds**(`props?`): `Metric`

Measures the number of successful builds.

Units: Count

Valid CloudWatch statistics: Sum

**`default`** sum over 5 minutes

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `props?` | `MetricOptions` |

#### Returns

`Metric`

#### Inherited from

PipelineProject.metricSucceededBuilds

___

### notifyOn

▸ **notifyOn**(`id`, `target`, `options`): `INotificationRule`

Defines a CodeStar Notification rule triggered when the project events emitted by you specified, it very similar to `onEvent` API.

You can also use the methods `notifyOnBuildSucceeded` and
`notifyOnBuildFailed` to define rules for these specific event emitted.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `target` | `INotificationRuleTarget` |
| `options` | `ProjectNotifyOnOptions` |

#### Returns

`INotificationRule`

#### Inherited from

PipelineProject.notifyOn

___

### notifyOnBuildFailed

▸ **notifyOnBuildFailed**(`id`, `target`, `options?`): `INotificationRule`

Defines a CodeStar notification rule which triggers when a build fails.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `target` | `INotificationRuleTarget` |
| `options?` | `NotificationRuleOptions` |

#### Returns

`INotificationRule`

#### Inherited from

PipelineProject.notifyOnBuildFailed

___

### notifyOnBuildSucceeded

▸ **notifyOnBuildSucceeded**(`id`, `target`, `options?`): `INotificationRule`

Defines a CodeStar notification rule which triggers when a build completes successfully.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `target` | `INotificationRuleTarget` |
| `options?` | `NotificationRuleOptions` |

#### Returns

`INotificationRule`

#### Inherited from

PipelineProject.notifyOnBuildSucceeded

___

### onBuildFailed

▸ **onBuildFailed**(`id`, `options?`): `Rule`

Defines an event rule which triggers when a build fails.

To access fields from the event in the event target input,
use the static fields on the `StateChangeEvent` class.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `OnEventOptions` |

#### Returns

`Rule`

#### Inherited from

PipelineProject.onBuildFailed

___

### onBuildStarted

▸ **onBuildStarted**(`id`, `options?`): `Rule`

Defines an event rule which triggers when a build starts.

To access fields from the event in the event target input,
use the static fields on the `StateChangeEvent` class.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `OnEventOptions` |

#### Returns

`Rule`

#### Inherited from

PipelineProject.onBuildStarted

___

### onBuildSucceeded

▸ **onBuildSucceeded**(`id`, `options?`): `Rule`

Defines an event rule which triggers when a build completes successfully.

To access fields from the event in the event target input,
use the static fields on the `StateChangeEvent` class.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `OnEventOptions` |

#### Returns

`Rule`

#### Inherited from

PipelineProject.onBuildSucceeded

___

### onEvent

▸ **onEvent**(`id`, `options?`): `Rule`

Defines a CloudWatch event rule triggered when something happens with this project.

**`see`** https://docs.aws.amazon.com/codebuild/latest/userguide/sample-build-notifications.html

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `OnEventOptions` |

#### Returns

`Rule`

#### Inherited from

PipelineProject.onEvent

___

### onPhaseChange

▸ **onPhaseChange**(`id`, `options?`): `Rule`

Defines a CloudWatch event rule that triggers upon phase change of this build project.

**`see`** https://docs.aws.amazon.com/codebuild/latest/userguide/sample-build-notifications.html

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `OnEventOptions` |

#### Returns

`Rule`

#### Inherited from

PipelineProject.onPhaseChange

___

### onStateChange

▸ **onStateChange**(`id`, `options?`): `Rule`

Defines a CloudWatch event rule triggered when the build project state changes.

You can filter specific build status events using an event
pattern filter on the `build-status` detail field:

    const rule = project.onStateChange('OnBuildStarted', { target });
    rule.addEventPattern({
      detail: {
        'build-status': [
          "IN_PROGRESS",
          "SUCCEEDED",
          "FAILED",
          "STOPPED"
        ]
      }
    });

You can also use the methods `onBuildFailed` and `onBuildSucceeded` to define rules for
these specific state changes.

To access fields from the event in the event target input,
use the static fields on the `StateChangeEvent` class.

**`see`** https://docs.aws.amazon.com/codebuild/latest/userguide/sample-build-notifications.html

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `OnEventOptions` |

#### Returns

`Rule`

#### Inherited from

PipelineProject.onStateChange

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

PipelineProject.toString

___

### fromProjectArn

▸ `Static` **fromProjectArn**(`scope`, `id`, `projectArn`): `IProject`

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `projectArn` | `string` |

#### Returns

`IProject`

#### Inherited from

PipelineProject.fromProjectArn

___

### fromProjectName

▸ `Static` **fromProjectName**(`scope`, `id`, `projectName`): `IProject`

Import a Project defined either outside the CDK, or in a different CDK Stack (and exported using the {@link export} method).

**`stability`** stable

**`note`** if you're importing a CodeBuild Project for use
in a CodePipeline, make sure the existing Project
has permissions to access the S3 Bucket of that Pipeline -
otherwise, builds in that Pipeline will always fail.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | the parent Construct for this Construct. |
| `id` | `string` | the logical name of this Construct. |
| `projectName` | `string` | the name of the project to import. |

#### Returns

`IProject`

a reference to the existing Project

#### Inherited from

PipelineProject.fromProjectName

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

PipelineProject.isConstruct

___

### isResource

▸ `Static` **isResource**(`construct`): construct is CfnResource

Check whether the given construct is a Resource.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `construct` | `IConstruct` |

#### Returns

construct is CfnResource

#### Inherited from

PipelineProject.isResource

___

### serializeEnvVariables

▸ `Static` **serializeEnvVariables**(`environmentVariables`, `validateNoPlainTextSecrets?`, `principal?`): `EnvironmentVariableProperty`[]

Convert the environment variables map of string to {@link BuildEnvironmentVariable}, which is the customer-facing type, to a list of {@link CfnProject.EnvironmentVariableProperty}, which is the representation of environment variables in CloudFormation.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `environmentVariables` | `Object` | the map of string to environment variables. |
| `validateNoPlainTextSecrets?` | `boolean` | whether to throw an exception if any of the plain text environment variables contain secrets, defaults to 'false'. |
| `principal?` | `IGrantable` | - |

#### Returns

`EnvironmentVariableProperty`[]

an array of {@link CfnProject.EnvironmentVariableProperty} instances

#### Inherited from

PipelineProject.serializeEnvVariables

# Propagate Tags

[@cloudcomponents/cdk-blue-green-container-deployment](#readme) / PropagateTags

# Enumeration: PropagateTags

## Table of contents

### Enumeration members

- [SERVICE](#service)
- [TASK\_DEFINITION](#task_definition)

## Enumeration members

### SERVICE

• **SERVICE** = `"SERVICE"`

___

### TASK\_DEFINITION

• **TASK\_DEFINITION** = `"TASK_DEFINITION"`

# Rollback Event

[@cloudcomponents/cdk-blue-green-container-deployment](#readme) / RollbackEvent

# Enumeration: RollbackEvent

## Table of contents

### Enumeration members

- [DEPLOYMENT\_FAILURE](#deployment_failure)
- [DEPLOYMENT\_STOP\_ON\_ALARM](#deployment_stop_on_alarm)
- [DEPLOYMENT\_STOP\_ON\_REQUEST](#deployment_stop_on_request)

## Enumeration members

### DEPLOYMENT\_FAILURE

• **DEPLOYMENT\_FAILURE** = `"DEPLOYMENT_FAILURE"`

___

### DEPLOYMENT\_STOP\_ON\_ALARM

• **DEPLOYMENT\_STOP\_ON\_ALARM** = `"DEPLOYMENT_STOP_ON_ALARM"`

___

### DEPLOYMENT\_STOP\_ON\_REQUEST

• **DEPLOYMENT\_STOP\_ON\_REQUEST** = `"DEPLOYMENT_STOP_ON_REQUEST"`

# Scheduling Strategy

[@cloudcomponents/cdk-blue-green-container-deployment](#readme) / SchedulingStrategy

# Enumeration: SchedulingStrategy

## Table of contents

### Enumeration members

- [DAEMON](#daemon)
- [REPLICA](#replica)

## Enumeration members

### DAEMON

• **DAEMON** = `"DAEMON"`

___

### REPLICA

• **REPLICA** = `"REPLICA"`

# Dummy Task Definition Props

[@cloudcomponents/cdk-blue-green-container-deployment](#readme) / DummyTaskDefinitionProps

# Interface: DummyTaskDefinitionProps

## Table of contents

### Properties

- [containerName](#containername)
- [containerPort](#containerport)
- [family](#family)
- [image](#image)

## Properties

### containerName

• `Optional` `Readonly` **containerName**: `string`

The name of the container.

**`default`** `sample-website`

___

### containerPort

• `Optional` `Readonly` **containerPort**: `number`

**`default`** 80

___

### family

• `Optional` `Readonly` **family**: `string`

The name of a family that this task definition is registered to. A family groups multiple versions of a task definition.

**`default`** - Automatically generated name.

___

### image

• `Readonly` **image**: `string`

The image used to start a container.

# Ecs Deployment Configuration Props

[@cloudcomponents/cdk-blue-green-container-deployment](#readme) / EcsDeploymentConfigurationProps

# Interface: EcsDeploymentConfigurationProps

## Table of contents

### Properties

- [deploymentConfigName](#deploymentconfigname)
- [minimumHealthyHosts](#minimumhealthyhosts)
- [trafficRoutingConfig](#trafficroutingconfig)

## Properties

### deploymentConfigName

• `Optional` `Readonly` **deploymentConfigName**: `string`

`AWS::CodeDeploy::DeploymentConfig.DeploymentConfigName`.

**`external`**

**`link`** http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codedeploy-deploymentconfig.html#cfn-codedeploy-deploymentconfig-deploymentconfigname

___

### minimumHealthyHosts

• `Optional` `Readonly` **minimumHealthyHosts**: `MinimumHealthyHostsProperty` \| `IResolvable`

`AWS::CodeDeploy::DeploymentConfig.MinimumHealthyHosts`.

**`external`**

**`link`** http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codedeploy-deploymentconfig.html#cfn-codedeploy-deploymentconfig-minimumhealthyhosts

___

### trafficRoutingConfig

• `Optional` `Readonly` **trafficRoutingConfig**: `IResolvable` \| `TrafficRoutingConfigProperty`

`AWS::CodeDeploy::DeploymentConfig.TrafficRoutingConfig`.

**`external`**

**`link`** http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codedeploy-deploymentconfig.html#cfn-codedeploy-deploymentconfig-trafficroutingconfig

# Ecs Deployment Group Props

[@cloudcomponents/cdk-blue-green-container-deployment](#readme) / EcsDeploymentGroupProps

# Interface: EcsDeploymentGroupProps

## Table of contents

### Properties

- [applicationName](#applicationname)
- [autoRollbackOnEvents](#autorollbackonevents)
- [deploymentConfig](#deploymentconfig)
- [deploymentGroupName](#deploymentgroupname)
- [ecsServices](#ecsservices)
- [prodTrafficListener](#prodtrafficlistener)
- [targetGroups](#targetgroups)
- [terminationWaitTime](#terminationwaittime)
- [testTrafficListener](#testtrafficlistener)

## Properties

### applicationName

• `Optional` `Readonly` **applicationName**: `string`

___

### autoRollbackOnEvents

• `Optional` `Readonly` **autoRollbackOnEvents**: [`RollbackEvent`](#rollback-event)[]

The event type or types that trigger a rollback.

___

### deploymentConfig

• `Optional` `Readonly` **deploymentConfig**: [`IEcsDeploymentConfig`](#i-ecs-deployment-config)

___

### deploymentGroupName

• `Readonly` **deploymentGroupName**: `string`

___

### ecsServices

• `Readonly` **ecsServices**: [`IEcsService`](#i-ecs-service)[]

___

### prodTrafficListener

• `Readonly` **prodTrafficListener**: [`TrafficListener`](#traffic-listener)

___

### targetGroups

• `Readonly` **targetGroups**: `ApplicationTargetGroup`[]

___

### terminationWaitTime

• `Optional` `Readonly` **terminationWaitTime**: `Duration`

the number of minutes before deleting the original (blue) task set.
During an Amazon ECS deployment, CodeDeploy shifts traffic from the
original (blue) task set to a replacement (green) task set.

The maximum setting is 2880 minutes (2 days).

**`default`** 60 minutes

___

### testTrafficListener

• `Readonly` **testTrafficListener**: [`TrafficListener`](#traffic-listener)

# Ecs Service Props

[@cloudcomponents/cdk-blue-green-container-deployment](#readme) / EcsServiceProps

# Interface: EcsServiceProps

## Table of contents

### Properties

- [circuitBreaker](#circuitbreaker)
- [cluster](#cluster)
- [containerPort](#containerport)
- [desiredCount](#desiredcount)
- [healthCheckGracePeriod](#healthcheckgraceperiod)
- [launchType](#launchtype)
- [maxHealthyPercent](#maxhealthypercent)
- [minHealthyPercent](#minhealthypercent)
- [platformVersion](#platformversion)
- [prodTargetGroup](#prodtargetgroup)
- [propagateTags](#propagatetags)
- [securityGroups](#securitygroups)
- [serviceName](#servicename)
- [taskDefinition](#taskdefinition)
- [testTargetGroup](#testtargetgroup)

## Properties

### circuitBreaker

• `Optional` `Readonly` **circuitBreaker**: `DeploymentCircuitBreaker`

Whether to enable the deployment circuit breaker. If this property is defined, circuit breaker will be implicitly
enabled.

**`default`** - disabled

___

### cluster

• `Readonly` **cluster**: `ICluster`

___

### containerPort

• `Optional` `Readonly` **containerPort**: `number`

___

### desiredCount

• `Optional` `Readonly` **desiredCount**: `number`

___

### healthCheckGracePeriod

• `Optional` `Readonly` **healthCheckGracePeriod**: `Duration`

The period of time, in seconds, that the Amazon ECS service scheduler ignores unhealthy
Elastic Load Balancing target health checks after a task has first started.

**`default`** - defaults to 60 seconds if at least one load balancer is in-use and it is not already set

___

### launchType

• `Optional` `Readonly` **launchType**: `LaunchType`

___

### maxHealthyPercent

• `Optional` `Readonly` **maxHealthyPercent**: `number`

The maximum number of tasks, specified as a percentage of the Amazon ECS
service's DesiredCount value, that can run in a service during a
deployment.

**`default`** - 100 if daemon, otherwise 200

___

### minHealthyPercent

• `Optional` `Readonly` **minHealthyPercent**: `number`

The minimum number of tasks, specified as a percentage of
the Amazon ECS service's DesiredCount value, that must
continue to run and remain healthy during a deployment.

**`default`** - 0 if daemon, otherwise 50

___

### platformVersion

• `Optional` `Readonly` **platformVersion**: `string`

___

### prodTargetGroup

• `Readonly` **prodTargetGroup**: `ITargetGroup`

___

### propagateTags

• `Optional` `Readonly` **propagateTags**: [`PropagateTags`](#propagate-tags)

Specifies whether to propagate the tags from the task definition or the service to the tasks in the service. If no value is specified, the tags aren't propagated.

**`default`** - no propagate

___

### securityGroups

• `Optional` `Readonly` **securityGroups**: `SecurityGroup`[]

___

### serviceName

• `Readonly` **serviceName**: `string`

___

### taskDefinition

• `Readonly` **taskDefinition**: [`DummyTaskDefinition`](#dummy-task-definition)

___

### testTargetGroup

• `Readonly` **testTargetGroup**: `ITargetGroup`

# I Dummy Task Definition

[@cloudcomponents/cdk-blue-green-container-deployment](#readme) / IDummyTaskDefinition

# Interface: IDummyTaskDefinition

## Implemented by

- [`DummyTaskDefinition`](#dummy-task-definition)

## Table of contents

### Properties

- [containerName](#containername)
- [containerPort](#containerport)
- [executionRole](#executionrole)
- [family](#family)
- [taskDefinitionArn](#taskdefinitionarn)

## Properties

### containerName

• `Readonly` **containerName**: `string`

___

### containerPort

• `Readonly` **containerPort**: `number`

___

### executionRole

• `Readonly` **executionRole**: `IRole`

___

### family

• `Readonly` **family**: `string`

___

### taskDefinitionArn

• `Readonly` **taskDefinitionArn**: `string`

# I Ecs Deployment Config

[@cloudcomponents/cdk-blue-green-container-deployment](#readme) / IEcsDeploymentConfig

# Interface: IEcsDeploymentConfig

## Implemented by

- [`EcsDeploymentConfig`](#ecs-deployment-config)

## Table of contents

### Properties

- [deploymentConfigArn](#deploymentconfigarn)
- [deploymentConfigName](#deploymentconfigname)

## Properties

### deploymentConfigArn

• `Readonly` **deploymentConfigArn**: `string`

___

### deploymentConfigName

• `Readonly` **deploymentConfigName**: `string`

# I Ecs Deployment Group

[@cloudcomponents/cdk-blue-green-container-deployment](#readme) / IEcsDeploymentGroup

# Interface: IEcsDeploymentGroup

Interface for an ECS deployment group.

## Hierarchy

- `IResource`

  ↳ **`IEcsDeploymentGroup`**

## Implemented by

- [`EcsDeploymentGroup`](#ecs-deployment-group)

## Table of contents

### Properties

- [application](#application)
- [deploymentConfig](#deploymentconfig)
- [deploymentGroupArn](#deploymentgrouparn)
- [deploymentGroupName](#deploymentgroupname)
- [env](#env)
- [node](#node)
- [stack](#stack)

### Methods

- [applyRemovalPolicy](#applyremovalpolicy)

## Properties

### application

• `Readonly` **application**: `IEcsApplication`

The reference to the CodeDeploy ECS Application that this Deployment Group belongs to.

___

### deploymentConfig

• `Readonly` **deploymentConfig**: [`IEcsDeploymentConfig`](#i-ecs-deployment-config)

The Deployment Configuration this Group uses.

___

### deploymentGroupArn

• `Readonly` **deploymentGroupArn**: `string`

The ARN of this Deployment Group.

___

### deploymentGroupName

• `Readonly` **deploymentGroupName**: `string`

The physical name of the CodeDeploy Deployment Group.

___

### env

• `Readonly` **env**: `ResourceEnvironment`

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

**`stability`** stable

#### Inherited from

IResource.env

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

IResource.node

___

### stack

• `Readonly` **stack**: `Stack`

The stack in which this resource is defined.

**`stability`** stable

#### Inherited from

IResource.stack

## Methods

### applyRemovalPolicy

▸ **applyRemovalPolicy**(`policy`): `void`

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `policy` | `RemovalPolicy` |

#### Returns

`void`

#### Inherited from

IResource.applyRemovalPolicy

# I Ecs Service

[@cloudcomponents/cdk-blue-green-container-deployment](#readme) / IEcsService

# Interface: IEcsService

## Implemented by

- [`EcsService`](#ecs-service)

## Table of contents

### Properties

- [clusterName](#clustername)
- [serviceName](#servicename)

## Properties

### clusterName

• `Readonly` **clusterName**: `string`

___

### serviceName

• `Readonly` **serviceName**: `string`

# Push Image Project Props

[@cloudcomponents/cdk-blue-green-container-deployment](#readme) / PushImageProjectProps

# Interface: PushImageProjectProps

## Table of contents

### Properties

- [buildSpec](#buildspec)
- [cache](#cache)
- [computeType](#computetype)
- [environmentVariables](#environmentvariables)
- [imageRepository](#imagerepository)
- [projectName](#projectname)
- [taskDefinition](#taskdefinition)

## Properties

### buildSpec

• `Optional` `Readonly` **buildSpec**: `BuildSpec`

___

### cache

• `Optional` `Readonly` **cache**: `Cache`

___

### computeType

• `Optional` `Readonly` **computeType**: `ComputeType`

___

### environmentVariables

• `Optional` `Readonly` **environmentVariables**: `Record`<`string`, `BuildEnvironmentVariable`\>

___

### imageRepository

• `Readonly` **imageRepository**: `IRepository`

___

### projectName

• `Optional` `Readonly` **projectName**: `string`

___

### taskDefinition

• `Readonly` **taskDefinition**: [`IDummyTaskDefinition`](#i-dummy-task-definition)

# Traffic Listener

[@cloudcomponents/cdk-blue-green-container-deployment](#readme) / TrafficListener

# Interface: TrafficListener

## Table of contents

### Properties

- [listenerArn](#listenerarn)

## Properties

### listenerArn

• `Readonly` **listenerArn**: `string`

ARN of the listener

**`attribute`**
