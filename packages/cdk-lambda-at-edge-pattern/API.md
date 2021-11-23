# README

@cloudcomponents/cdk-lambda-at-edge-pattern

# @cloudcomponents/cdk-lambda-at-edge-pattern

## Table of contents

### Enumerations

- [LogLevel](#log-level)

### Classes

- [BaseEdgeConstruct](#base-edge-construct)
- [EdgeFunction](#edge-function)
- [EdgeRole](#edge-role)
- [HttpHeaders](#http-headers)
- [WithConfiguration](#with-configuration)

### Interfaces

- [CommonEdgeFunctionProps](#common-edge-function-props)
- [Configuration](#configuration)
- [EdgeFunctionProps](#edge-function-props)
- [EdgeRoleProps](#edge-role-props)
- [HttpHeadersProps](#http-headers-props)
- [IEdgeLambda](#i-edge-lambda)
- [IEdgeRole](#i-edge-role)
- [ILambdaFunctionAssociation](#i-lambda-function-association)
- [WithConfigurationProps](#with-configuration-props)

# Base Edge Construct

[@cloudcomponents/cdk-lambda-at-edge-pattern](#readme) / BaseEdgeConstruct

# Class: BaseEdgeConstruct

## Hierarchy

- `Construct`

  ↳ **`BaseEdgeConstruct`**

  ↳↳ [`EdgeFunction`](#edge-function)

  ↳↳ [`EdgeRole`](#edge-role)

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [edgeStack](#edgestack)
- [node](#node)
- [stack](#stack)

### Methods

- [getCrossRegionSupportSynthesizer](#getcrossregionsupportsynthesizer)
- [getOrCreateCrossRegionSupportStack](#getorcreatecrossregionsupportstack)
- [onPrepare](#onprepare)
- [onSynthesize](#onsynthesize)
- [onValidate](#onvalidate)
- [prepare](#prepare)
- [requireApp](#requireapp)
- [synthesize](#synthesize)
- [toString](#tostring)
- [validate](#validate)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new BaseEdgeConstruct**(`scope`, `id`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |

#### Overrides

Construct.constructor

## Properties

### edgeStack

• `Protected` `Readonly` **edgeStack**: `Stack`

___

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

Construct.node

___

### stack

• `Protected` `Readonly` **stack**: `Stack`

## Methods

### getCrossRegionSupportSynthesizer

▸ `Private` **getCrossRegionSupportSynthesizer**(): `undefined` \| `IStackSynthesizer`

#### Returns

`undefined` \| `IStackSynthesizer`

___

### getOrCreateCrossRegionSupportStack

▸ `Private` **getOrCreateCrossRegionSupportStack**(): `Stack`

#### Returns

`Stack`

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

### requireApp

▸ `Private` **requireApp**(): `App`

#### Returns

`App`

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

# Edge Function

[@cloudcomponents/cdk-lambda-at-edge-pattern](#readme) / EdgeFunction

# Class: EdgeFunction

## Hierarchy

- [`BaseEdgeConstruct`](#base-edge-construct)

  ↳ **`EdgeFunction`**

  ↳↳ [`HttpHeaders`](#http-headers)

## Implements

- [`ILambdaFunctionAssociation`](#i-lambda-function-association)
- [`IEdgeLambda`](#i-edge-lambda)

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [edgeRole](#edgerole)
- [edgeStack](#edgestack)
- [eventType](#eventtype)
- [functionVersion](#functionversion)
- [lambdaFunction](#lambdafunction)
- [node](#node)
- [stack](#stack)

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

• **new EdgeFunction**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`EdgeFunctionProps`](#edge-function-props) |

#### Overrides

[BaseEdgeConstruct](#base-edge-construct).[constructor](#constructor)

## Properties

### edgeRole

• `Readonly` **edgeRole**: [`IEdgeRole`](#i-edge-role)

___

### edgeStack

• `Protected` `Readonly` **edgeStack**: `Stack`

#### Inherited from

[BaseEdgeConstruct](#base-edge-construct).[edgeStack](#edgestack)

___

### eventType

• `Readonly` **eventType**: `LambdaEdgeEventType`

#### Implementation of

[IEdgeLambda](#i-edge-lambda).[eventType](#eventtype)

___

### functionVersion

• `Readonly` **functionVersion**: `IVersion`

#### Implementation of

[IEdgeLambda](#i-edge-lambda).[functionVersion](#functionversion)

___

### lambdaFunction

• `Readonly` **lambdaFunction**: `IVersion`

#### Implementation of

[ILambdaFunctionAssociation](#i-lambda-function-association).[lambdaFunction](#lambdafunction)

___

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

[BaseEdgeConstruct](#base-edge-construct).[node](#node)

___

### stack

• `Protected` `Readonly` **stack**: `Stack`

#### Inherited from

[BaseEdgeConstruct](#base-edge-construct).[stack](#stack)

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

[BaseEdgeConstruct](#base-edge-construct).[onPrepare](#onprepare)

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

[BaseEdgeConstruct](#base-edge-construct).[onSynthesize](#onsynthesize)

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

[BaseEdgeConstruct](#base-edge-construct).[onValidate](#onvalidate)

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

[BaseEdgeConstruct](#base-edge-construct).[prepare](#prepare)

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

[BaseEdgeConstruct](#base-edge-construct).[synthesize](#synthesize)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

[BaseEdgeConstruct](#base-edge-construct).[toString](#tostring)

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

[BaseEdgeConstruct](#base-edge-construct).[validate](#validate)

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

[BaseEdgeConstruct](#base-edge-construct).[isConstruct](#isconstruct)

# Edge Role

[@cloudcomponents/cdk-lambda-at-edge-pattern](#readme) / EdgeRole

# Class: EdgeRole

## Hierarchy

- [`BaseEdgeConstruct`](#base-edge-construct)

  ↳ **`EdgeRole`**

## Implements

- [`IEdgeRole`](#i-edge-role)

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [edgeStack](#edgestack)
- [node](#node)
- [role](#role)
- [stack](#stack)

### Methods

- [addToEdgeRolePolicy](#addtoedgerolepolicy)
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

• **new EdgeRole**(`scope`, `id`, `props?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`EdgeRoleProps`](#edge-role-props) |

#### Overrides

[BaseEdgeConstruct](#base-edge-construct).[constructor](#constructor)

## Properties

### edgeStack

• `Protected` `Readonly` **edgeStack**: `Stack`

#### Inherited from

[BaseEdgeConstruct](#base-edge-construct).[edgeStack](#edgestack)

___

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

[BaseEdgeConstruct](#base-edge-construct).[node](#node)

___

### role

• `Readonly` **role**: `IRole`

#### Implementation of

[IEdgeRole](#i-edge-role).[role](#role)

___

### stack

• `Protected` `Readonly` **stack**: `Stack`

#### Inherited from

[BaseEdgeConstruct](#base-edge-construct).[stack](#stack)

## Methods

### addToEdgeRolePolicy

▸ **addToEdgeRolePolicy**(`statement`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `statement` | `PolicyStatement` |

#### Returns

`void`

#### Implementation of

[IEdgeRole](#i-edge-role).[addToEdgeRolePolicy](#addtoedgerolepolicy)

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

[BaseEdgeConstruct](#base-edge-construct).[onPrepare](#onprepare)

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

[BaseEdgeConstruct](#base-edge-construct).[onSynthesize](#onsynthesize)

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

[BaseEdgeConstruct](#base-edge-construct).[onValidate](#onvalidate)

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

[BaseEdgeConstruct](#base-edge-construct).[prepare](#prepare)

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

[BaseEdgeConstruct](#base-edge-construct).[synthesize](#synthesize)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

[BaseEdgeConstruct](#base-edge-construct).[toString](#tostring)

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

[BaseEdgeConstruct](#base-edge-construct).[validate](#validate)

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

[BaseEdgeConstruct](#base-edge-construct).[isConstruct](#isconstruct)

# Http Headers

[@cloudcomponents/cdk-lambda-at-edge-pattern](#readme) / HttpHeaders

# Class: HttpHeaders

## Hierarchy

- [`EdgeFunction`](#edge-function)

  ↳ **`HttpHeaders`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [edgeRole](#edgerole)
- [edgeStack](#edgestack)
- [eventType](#eventtype)
- [functionVersion](#functionversion)
- [lambdaFunction](#lambdafunction)
- [node](#node)
- [stack](#stack)

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

• **new HttpHeaders**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`HttpHeadersProps`](#http-headers-props) |

#### Overrides

[EdgeFunction](#edge-function).[constructor](#constructor)

## Properties

### edgeRole

• `Readonly` **edgeRole**: [`IEdgeRole`](#i-edge-role)

#### Inherited from

[EdgeFunction](#edge-function).[edgeRole](#edgerole)

___

### edgeStack

• `Protected` `Readonly` **edgeStack**: `Stack`

#### Inherited from

[EdgeFunction](#edge-function).[edgeStack](#edgestack)

___

### eventType

• `Readonly` **eventType**: `LambdaEdgeEventType`

#### Inherited from

[EdgeFunction](#edge-function).[eventType](#eventtype)

___

### functionVersion

• `Readonly` **functionVersion**: `IVersion`

#### Inherited from

[EdgeFunction](#edge-function).[functionVersion](#functionversion)

___

### lambdaFunction

• `Readonly` **lambdaFunction**: `IVersion`

#### Inherited from

[EdgeFunction](#edge-function).[lambdaFunction](#lambdafunction)

___

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

[EdgeFunction](#edge-function).[node](#node)

___

### stack

• `Protected` `Readonly` **stack**: `Stack`

#### Inherited from

[EdgeFunction](#edge-function).[stack](#stack)

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

[EdgeFunction](#edge-function).[onPrepare](#onprepare)

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

[EdgeFunction](#edge-function).[onSynthesize](#onsynthesize)

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

[EdgeFunction](#edge-function).[onValidate](#onvalidate)

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

[EdgeFunction](#edge-function).[prepare](#prepare)

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

[EdgeFunction](#edge-function).[synthesize](#synthesize)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

[EdgeFunction](#edge-function).[toString](#tostring)

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

[EdgeFunction](#edge-function).[validate](#validate)

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

[EdgeFunction](#edge-function).[isConstruct](#isconstruct)

# With Configuration

[@cloudcomponents/cdk-lambda-at-edge-pattern](#readme) / WithConfiguration

# Class: WithConfiguration

## Hierarchy

- `Construct`

  ↳ **`WithConfiguration`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [functionVersion](#functionversion)
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

• **new WithConfiguration**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`WithConfigurationProps`](#with-configuration-props) |

#### Overrides

Construct.constructor

## Properties

### functionVersion

• `Readonly` **functionVersion**: `IVersion`

___

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

# Log Level

[@cloudcomponents/cdk-lambda-at-edge-pattern](#readme) / LogLevel

# Enumeration: LogLevel

## Table of contents

### Enumeration members

- [DEBUG](#debug)
- [ERROR](#error)
- [INFO](#info)
- [NONE](#none)
- [WARN](#warn)

## Enumeration members

### DEBUG

• **DEBUG** = `"debug"`

___

### ERROR

• **ERROR** = `"error"`

___

### INFO

• **INFO** = `"info"`

___

### NONE

• **NONE** = `"none"`

___

### WARN

• **WARN** = `"warn"`

# Common Edge Function Props

[@cloudcomponents/cdk-lambda-at-edge-pattern](#readme) / CommonEdgeFunctionProps

# Interface: CommonEdgeFunctionProps

## Hierarchy

- **`CommonEdgeFunctionProps`**

  ↳ [`HttpHeadersProps`](#http-headers-props)

  ↳ [`EdgeFunctionProps`](#edge-function-props)

## Table of contents

### Properties

- [edgeRole](#edgerole)
- [parameterName](#parametername)

## Properties

### edgeRole

• `Optional` `Readonly` **edgeRole**: [`IEdgeRole`](#i-edge-role)

___

### parameterName

• `Optional` `Readonly` **parameterName**: `string`

The name of the parameter.

# Configuration

[@cloudcomponents/cdk-lambda-at-edge-pattern](#readme) / Configuration

# Interface: Configuration

## Indexable

▪ [key: `string`]: `unknown`

## Table of contents

### Properties

- [logLevel](#loglevel)

## Properties

### logLevel

• `Readonly` **logLevel**: [`LogLevel`](#log-level)

# Edge Function Props

[@cloudcomponents/cdk-lambda-at-edge-pattern](#readme) / EdgeFunctionProps

# Interface: EdgeFunctionProps

## Hierarchy

- [`CommonEdgeFunctionProps`](#common-edge-function-props)

  ↳ **`EdgeFunctionProps`**

## Table of contents

### Properties

- [code](#code)
- [configuration](#configuration)
- [edgeRole](#edgerole)
- [eventType](#eventtype)
- [name](#name)
- [parameterName](#parametername)

## Properties

### code

• `Readonly` **code**: `Code`

___

### configuration

• `Readonly` **configuration**: [`Configuration`](#configuration)

___

### edgeRole

• `Optional` `Readonly` **edgeRole**: [`IEdgeRole`](#i-edge-role)

#### Inherited from

[CommonEdgeFunctionProps](#common-edge-function-props).[edgeRole](#edgerole)

___

### eventType

• `Readonly` **eventType**: `LambdaEdgeEventType`

___

### name

• `Readonly` **name**: `string`

___

### parameterName

• `Optional` `Readonly` **parameterName**: `string`

The name of the parameter.

#### Inherited from

[CommonEdgeFunctionProps](#common-edge-function-props).[parameterName](#parametername)

# Edge Role Props

[@cloudcomponents/cdk-lambda-at-edge-pattern](#readme) / EdgeRoleProps

# Interface: EdgeRoleProps

## Table of contents

### Properties

- [roleName](#rolename)

## Properties

### roleName

• `Optional` `Readonly` **roleName**: `string`

# Http Headers Props

[@cloudcomponents/cdk-lambda-at-edge-pattern](#readme) / HttpHeadersProps

# Interface: HttpHeadersProps

## Hierarchy

- [`CommonEdgeFunctionProps`](#common-edge-function-props)

  ↳ **`HttpHeadersProps`**

## Table of contents

### Properties

- [edgeRole](#edgerole)
- [httpHeaders](#httpheaders)
- [logLevel](#loglevel)
- [parameterName](#parametername)

## Properties

### edgeRole

• `Optional` `Readonly` **edgeRole**: [`IEdgeRole`](#i-edge-role)

#### Inherited from

[CommonEdgeFunctionProps](#common-edge-function-props).[edgeRole](#edgerole)

___

### httpHeaders

• `Readonly` **httpHeaders**: `Record`<`string`, `string`\>

___

### logLevel

• `Optional` `Readonly` **logLevel**: [`LogLevel`](#log-level)

___

### parameterName

• `Optional` `Readonly` **parameterName**: `string`

The name of the parameter.

#### Inherited from

[CommonEdgeFunctionProps](#common-edge-function-props).[parameterName](#parametername)

# I Edge Lambda

[@cloudcomponents/cdk-lambda-at-edge-pattern](#readme) / IEdgeLambda

# Interface: IEdgeLambda

## Implemented by

- [`EdgeFunction`](#edge-function)

## Table of contents

### Properties

- [eventType](#eventtype)
- [functionVersion](#functionversion)

## Properties

### eventType

• `Readonly` **eventType**: `LambdaEdgeEventType`

___

### functionVersion

• `Readonly` **functionVersion**: `IVersion`

# I Edge Role

[@cloudcomponents/cdk-lambda-at-edge-pattern](#readme) / IEdgeRole

# Interface: IEdgeRole

## Implemented by

- [`EdgeRole`](#edge-role)

## Table of contents

### Properties

- [role](#role)

### Methods

- [addToEdgeRolePolicy](#addtoedgerolepolicy)

## Properties

### role

• `Readonly` **role**: `IRole`

## Methods

### addToEdgeRolePolicy

▸ **addToEdgeRolePolicy**(`statement`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `statement` | `PolicyStatement` |

#### Returns

`void`

# I Lambda Function Association

[@cloudcomponents/cdk-lambda-at-edge-pattern](#readme) / ILambdaFunctionAssociation

# Interface: ILambdaFunctionAssociation

## Implemented by

- [`EdgeFunction`](#edge-function)

## Table of contents

### Properties

- [eventType](#eventtype)
- [lambdaFunction](#lambdafunction)

## Properties

### eventType

• `Readonly` **eventType**: `LambdaEdgeEventType`

___

### lambdaFunction

• `Readonly` **lambdaFunction**: `IVersion`

# With Configuration Props

[@cloudcomponents/cdk-lambda-at-edge-pattern](#readme) / WithConfigurationProps

# Interface: WithConfigurationProps

## Table of contents

### Properties

- [configuration](#configuration)
- [function](#function)

## Properties

### configuration

• `Readonly` **configuration**: [`Configuration`](#configuration)

___

### function

• `Readonly` **function**: `IFunction`
