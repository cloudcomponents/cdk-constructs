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

- [toString](#tostring)
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
