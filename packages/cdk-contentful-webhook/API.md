# README

@cloudcomponents/cdk-contentful-webhook

# @cloudcomponents/cdk-contentful-webhook

## Table of contents

### Classes

- [ContentfulWebhook](#contentful-webhook)

### Interfaces

- [ContentfulWebhookProps](#contentful-webhook-props)

# Contentful Webhook

[@cloudcomponents/cdk-contentful-webhook](#readme) / ContentfulWebhook

# Class: ContentfulWebhook

## Hierarchy

- `Construct`

  ↳ **`ContentfulWebhook`**

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

• **new ContentfulWebhook**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`ContentfulWebhookProps`](#contentful-webhook-props) |

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

# Contentful Webhook Props

[@cloudcomponents/cdk-contentful-webhook](#readme) / ContentfulWebhookProps

# Interface: ContentfulWebhookProps

## Table of contents

### Properties

- [accessToken](#accesstoken)
- [logLevel](#loglevel)
- [name](#name)
- [spaceId](#spaceid)
- [topics](#topics)
- [url](#url)

## Properties

### accessToken

• `Readonly` **accessToken**: `string` \| `SecretKey`

___

### logLevel

• `Optional` `Readonly` **logLevel**: ``"debug"`` \| ``"info"`` \| ``"warning"`` \| ``"error"``

___

### name

• `Readonly` **name**: `string`

___

### spaceId

• `Readonly` **spaceId**: `string`

___

### topics

• `Readonly` **topics**: `string`[]

___

### url

• `Readonly` **url**: `string`
