# README

@cloudcomponents/cdk-wordpress

# @cloudcomponents/cdk-wordpress

## Table of contents

### Classes

- [Application](#application)
- [Database](#database)
- [Dns](#dns)
- [EfsVolume](#efs-volume)
- [Wordpress](#wordpress)

### Interfaces

- [ApplicationProps](#application-props)
- [DatabaseProps](#database-props)
- [DnsProps](#dns-props)
- [EfsVolumeProps](#efs-volume-props)
- [StaticContentOffload](#static-content-offload)
- [WordpressProps](#wordpress-props)

# Application

[@cloudcomponents/cdk-wordpress](#readme) / Application

# Class: Application

## Hierarchy

- `Construct`

  ↳ **`Application`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [cloudFrontHashHeader](#cloudfronthashheader)
- [distribution](#distribution)
- [domainName](#domainname)
- [domainZone](#domainzone)
- [listener](#listener)
- [node](#node)
- [removalPolicy](#removalpolicy)
- [service](#service)
- [targetGroup](#targetgroup)

### Methods

- [enableStaticContentOffload](#enablestaticcontentoffload)
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

• **new Application**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`ApplicationProps`](#application-props) |

#### Overrides

Construct.constructor

## Properties

### cloudFrontHashHeader

• `Private` `Readonly` **cloudFrontHashHeader**: `string`

___

### distribution

• `Readonly` **distribution**: `IDistribution`

___

### domainName

• `Readonly` **domainName**: `string`

___

### domainZone

• `Readonly` **domainZone**: `IHostedZone`

___

### listener

• `Readonly` **listener**: `ApplicationListener`

___

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

Construct.node

___

### removalPolicy

• `Private` `Optional` `Readonly` **removalPolicy**: `RemovalPolicy`

___

### service

• `Readonly` **service**: `FargateService`

___

### targetGroup

• `Readonly` **targetGroup**: `ApplicationTargetGroup`

## Methods

### enableStaticContentOffload

▸ **enableStaticContentOffload**(`domainName`, `certificate`): [`StaticContentOffload`](#static-content-offload)

#### Parameters

| Name | Type |
| :------ | :------ |
| `domainName` | `string` |
| `certificate` | `ICertificate` |

#### Returns

[`StaticContentOffload`](#static-content-offload)

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

# Database

[@cloudcomponents/cdk-wordpress](#readme) / Database

# Class: Database

## Hierarchy

- `Construct`

  ↳ **`Database`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [environment](#environment)
- [instance](#instance)
- [node](#node)
- [secrets](#secrets)

### Methods

- [allowDefaultPortFrom](#allowdefaultportfrom)
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

• **new Database**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`DatabaseProps`](#database-props) |

#### Overrides

Construct.constructor

## Properties

### environment

• `Readonly` **environment**: `Record`<`string`, `string`\>

___

### instance

• `Private` `Readonly` **instance**: `DatabaseInstance`

___

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

Construct.node

___

### secrets

• `Readonly` **secrets**: `Record`<`string`, `Secret`\>

## Methods

### allowDefaultPortFrom

▸ **allowDefaultPortFrom**(`other`, `description?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `IConnectable` |
| `description?` | `string` |

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

# Dns

[@cloudcomponents/cdk-wordpress](#readme) / Dns

# Class: Dns

## Hierarchy

- `Construct`

  ↳ **`Dns`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [node](#node)

### Methods

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

• **new Dns**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`DnsProps`](#dns-props) |

#### Overrides

Construct.constructor

## Properties

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

Construct.node

## Methods

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

# Efs Volume

[@cloudcomponents/cdk-wordpress](#readme) / EfsVolume

# Class: EfsVolume

## Hierarchy

- `Construct`

  ↳ **`EfsVolume`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [efsVolumeConfiguration](#efsvolumeconfiguration)
- [fileSystem](#filesystem)
- [name](#name)
- [node](#node)

### Methods

- [allowDefaultPortFrom](#allowdefaultportfrom)
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

• **new EfsVolume**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`EfsVolumeProps`](#efs-volume-props) |

#### Overrides

Construct.constructor

## Properties

### efsVolumeConfiguration

• `Readonly` **efsVolumeConfiguration**: `EfsVolumeConfiguration`

___

### fileSystem

• `Private` `Readonly` **fileSystem**: `FileSystem`

___

### name

• `Readonly` **name**: `string`

___

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

Construct.node

## Methods

### allowDefaultPortFrom

▸ **allowDefaultPortFrom**(`other`, `description?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `IConnectable` |
| `description?` | `string` |

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

# Wordpress

[@cloudcomponents/cdk-wordpress](#readme) / Wordpress

# Class: Wordpress

## Hierarchy

- `Construct`

  ↳ **`Wordpress`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [application](#application)
- [database](#database)
- [node](#node)
- [staticContentOffload](#staticcontentoffload)
- [volume](#volume)

### Methods

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

• **new Wordpress**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`WordpressProps`](#wordpress-props) |

#### Overrides

Construct.constructor

## Properties

### application

• `Readonly` **application**: [`Application`](#application)

___

### database

• `Readonly` **database**: [`Database`](#database)

___

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

Construct.node

___

### staticContentOffload

• `Optional` `Readonly` **staticContentOffload**: [`StaticContentOffload`](#static-content-offload)

___

### volume

• `Readonly` **volume**: [`EfsVolume`](#efs-volume)

## Methods

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

# Application Props

[@cloudcomponents/cdk-wordpress](#readme) / ApplicationProps

# Interface: ApplicationProps

## Table of contents

### Properties

- [certificate](#certificate)
- [cloudFrontHashHeader](#cloudfronthashheader)
- [database](#database)
- [domainName](#domainname)
- [domainZone](#domainzone)
- [environment](#environment)
- [image](#image)
- [logDriver](#logdriver)
- [memoryLimitMiB](#memorylimitmib)
- [removalPolicy](#removalpolicy)
- [secrets](#secrets)
- [serviceName](#servicename)
- [volume](#volume)
- [vpc](#vpc)

## Properties

### certificate

• `Readonly` **certificate**: `ICertificate`

___

### cloudFrontHashHeader

• `Optional` `Readonly` **cloudFrontHashHeader**: `string`

___

### database

• `Readonly` **database**: [`Database`](#database)

___

### domainName

• `Readonly` **domainName**: `string`

___

### domainZone

• `Readonly` **domainZone**: `IHostedZone`

___

### environment

• `Optional` `Readonly` **environment**: `Record`<`string`, `string`\>

___

### image

• `Optional` `Readonly` **image**: `ContainerImage`

___

### logDriver

• `Optional` `Readonly` **logDriver**: `LogDriver`

___

### memoryLimitMiB

• `Optional` `Readonly` **memoryLimitMiB**: `number`

___

### removalPolicy

• `Optional` `Readonly` **removalPolicy**: `RemovalPolicy`

___

### secrets

• `Optional` `Readonly` **secrets**: `Record`<`string`, `Secret`\>

___

### serviceName

• `Optional` `Readonly` **serviceName**: `string`

___

### volume

• `Readonly` **volume**: [`EfsVolume`](#efs-volume)

___

### vpc

• `Readonly` **vpc**: `IVpc`

# Database Props

[@cloudcomponents/cdk-wordpress](#readme) / DatabaseProps

# Interface: DatabaseProps

## Table of contents

### Properties

- [allocatedStorage](#allocatedstorage)
- [databaseName](#databasename)
- [engine](#engine)
- [instanceType](#instancetype)
- [removalPolicy](#removalpolicy)
- [vpc](#vpc)

## Properties

### allocatedStorage

• `Optional` `Readonly` **allocatedStorage**: `number`

___

### databaseName

• `Optional` `Readonly` **databaseName**: `string`

___

### engine

• `Optional` `Readonly` **engine**: `IInstanceEngine`

___

### instanceType

• `Optional` `Readonly` **instanceType**: `InstanceType`

___

### removalPolicy

• `Optional` `Readonly` **removalPolicy**: `RemovalPolicy`

___

### vpc

• `Readonly` **vpc**: `IVpc`

# Dns Props

[@cloudcomponents/cdk-wordpress](#readme) / DnsProps

# Interface: DnsProps

## Table of contents

### Properties

- [distribution](#distribution)
- [domainName](#domainname)
- [domainZone](#domainzone)

## Properties

### distribution

• `Readonly` **distribution**: `IDistribution`

___

### domainName

• `Readonly` **domainName**: `string`

___

### domainZone

• `Readonly` **domainZone**: `IHostedZone`

# Efs Volume Props

[@cloudcomponents/cdk-wordpress](#readme) / EfsVolumeProps

# Interface: EfsVolumeProps

## Table of contents

### Properties

- [name](#name)
- [removalPolicy](#removalpolicy)
- [vpc](#vpc)

## Properties

### name

• `Optional` `Readonly` **name**: `string`

___

### removalPolicy

• `Optional` `Readonly` **removalPolicy**: `RemovalPolicy`

___

### vpc

• `Readonly` **vpc**: `IVpc`

# Static Content Offload

[@cloudcomponents/cdk-wordpress](#readme) / StaticContentOffload

# Interface: StaticContentOffload

## Table of contents

### Properties

- [distribution](#distribution)
- [domainName](#domainname)

## Properties

### distribution

• `Readonly` **distribution**: `IDistribution`

___

### domainName

• `Readonly` **domainName**: `string`

# Wordpress Props

[@cloudcomponents/cdk-wordpress](#readme) / WordpressProps

# Interface: WordpressProps

## Table of contents

### Properties

- [backupPlan](#backupplan)
- [cloudFrontHashHeader](#cloudfronthashheader)
- [database](#database)
- [domainName](#domainname)
- [domainZone](#domainzone)
- [environment](#environment)
- [image](#image)
- [logDriver](#logdriver)
- [memoryLimitMiB](#memorylimitmib)
- [offloadStaticContent](#offloadstaticcontent)
- [removalPolicy](#removalpolicy)
- [secrets](#secrets)
- [serviceName](#servicename)
- [subjectAlternativeNames](#subjectalternativenames)
- [volume](#volume)
- [vpc](#vpc)

## Properties

### backupPlan

• `Optional` `Readonly` **backupPlan**: `BackupPlan`

___

### cloudFrontHashHeader

• `Optional` `Readonly` **cloudFrontHashHeader**: `string`

___

### database

• `Optional` `Readonly` **database**: [`Database`](#database)

___

### domainName

• `Readonly` **domainName**: `string`

___

### domainZone

• `Readonly` **domainZone**: `IHostedZone`

___

### environment

• `Optional` `Readonly` **environment**: `Record`<`string`, `string`\>

___

### image

• `Optional` `Readonly` **image**: `ContainerImage`

___

### logDriver

• `Optional` `Readonly` **logDriver**: `LogDriver`

___

### memoryLimitMiB

• `Optional` `Readonly` **memoryLimitMiB**: `number`

___

### offloadStaticContent

• `Optional` `Readonly` **offloadStaticContent**: `boolean`

___

### removalPolicy

• `Optional` `Readonly` **removalPolicy**: `RemovalPolicy`

___

### secrets

• `Optional` `Readonly` **secrets**: `Record`<`string`, `Secret`\>

___

### serviceName

• `Optional` `Readonly` **serviceName**: `string`

___

### subjectAlternativeNames

• `Optional` `Readonly` **subjectAlternativeNames**: `string`[]

___

### volume

• `Optional` `Readonly` **volume**: [`EfsVolume`](#efs-volume)

___

### vpc

• `Optional` `Readonly` **vpc**: `IVpc`
