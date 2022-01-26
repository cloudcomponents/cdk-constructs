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

- [getOrCreateCrossRegionSupportStack](#getorcreatecrossregionsupportstack)
- [requireApp](#requireapp)
- [toString](#tostring)
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

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

Construct.node

___

### stack

• `Protected` `Readonly` **stack**: `Stack`

## Methods

### getOrCreateCrossRegionSupportStack

▸ `Private` **getOrCreateCrossRegionSupportStack**(): `Stack`

#### Returns

`Stack`

___

### requireApp

▸ `Private` **requireApp**(): `App`

#### Returns

`App`

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

# Edge Function

[@cloudcomponents/cdk-lambda-at-edge-pattern](#readme) / EdgeFunction

# Class: EdgeFunction

## Hierarchy

- [`BaseEdgeConstruct`](#base-edge-construct)

  ↳ **`EdgeFunction`**

  ↳↳ [`HttpHeaders`](#http-headers)

## Implements

- [`IEdgeLambda`](#i-edge-lambda)

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [edgeRole](#edgerole)
- [edgeStack](#edgestack)
- [eventType](#eventtype)
- [functionVersion](#functionversion)
- [node](#node)
- [stack](#stack)

### Methods

- [toString](#tostring)
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

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

[BaseEdgeConstruct](#base-edge-construct).[node](#node)

___

### stack

• `Protected` `Readonly` **stack**: `Stack`

#### Inherited from

[BaseEdgeConstruct](#base-edge-construct).[stack](#stack)

## Methods

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

[BaseEdgeConstruct](#base-edge-construct).[toString](#tostring)

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
- [toString](#tostring)
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

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

[BaseEdgeConstruct](#base-edge-construct).[node](#node)

___

### role

• `Readonly` **role**: `Role`

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

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

[BaseEdgeConstruct](#base-edge-construct).[toString](#tostring)

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
- [node](#node)
- [stack](#stack)

### Methods

- [toString](#tostring)
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

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

[EdgeFunction](#edge-function).[node](#node)

___

### stack

• `Protected` `Readonly` **stack**: `Stack`

#### Inherited from

[EdgeFunction](#edge-function).[stack](#stack)

## Methods

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

[EdgeFunction](#edge-function).[toString](#tostring)

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

- [toString](#tostring)
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

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

Construct.node

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

• `Readonly` **role**: `Role`

## Methods

### addToEdgeRolePolicy

▸ **addToEdgeRolePolicy**(`statement`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `statement` | `PolicyStatement` |

#### Returns

`void`

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
