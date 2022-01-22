# README

@cloudcomponents/cdk-stripe-webhook

# @cloudcomponents/cdk-stripe-webhook

## Table of contents

### Classes

- [StripeEventBusProducer](#stripe-event-bus-producer)
- [StripeWebhook](#stripe-webhook)

### Interfaces

- [StripeEventBusProducerProps](#stripe-event-bus-producer-props)
- [StripeWebhookProps](#stripe-webhook-props)

# Stripe Event Bus Producer

[@cloudcomponents/cdk-stripe-webhook](#readme) / StripeEventBusProducer

# Class: StripeEventBusProducer

## Hierarchy

- `Construct`

  ↳ **`StripeEventBusProducer`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [node](#node)
- [url](#url)

### Methods

- [toString](#tostring)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new StripeEventBusProducer**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`StripeEventBusProducerProps`](#stripe-event-bus-producer-props) |

#### Overrides

Construct.constructor

## Properties

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

Construct.node

___

### url

• `Readonly` **url**: `string`

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

# Stripe Webhook

[@cloudcomponents/cdk-stripe-webhook](#readme) / StripeWebhook

# Class: StripeWebhook

## Hierarchy

- `Construct`

  ↳ **`StripeWebhook`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [id](#id)
- [node](#node)

### Methods

- [toString](#tostring)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new StripeWebhook**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`StripeWebhookProps`](#stripe-webhook-props) |

#### Overrides

Construct.constructor

## Properties

### id

• `Readonly` **id**: `string`

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

# Stripe Event Bus Producer Props

[@cloudcomponents/cdk-stripe-webhook](#readme) / StripeEventBusProducerProps

# Interface: StripeEventBusProducerProps

## Table of contents

### Properties

- [endpointSecret](#endpointsecret)
- [eventBus](#eventbus)
- [secretKey](#secretkey)
- [source](#source)
- [throttlingBurstLimit](#throttlingburstlimit)
- [throttlingRateLimit](#throttlingratelimit)

## Properties

### endpointSecret

• `Readonly` **endpointSecret**: `SecretKey`

___

### eventBus

• `Optional` `Readonly` **eventBus**: `IEventBus`

___

### secretKey

• `Readonly` **secretKey**: `SecretKey`

___

### source

• `Optional` `Readonly` **source**: `string`

___

### throttlingBurstLimit

• `Optional` `Readonly` **throttlingBurstLimit**: `number`

___

### throttlingRateLimit

• `Optional` `Readonly` **throttlingRateLimit**: `number`

# Stripe Webhook Props

[@cloudcomponents/cdk-stripe-webhook](#readme) / StripeWebhookProps

# Interface: StripeWebhookProps

## Table of contents

### Properties

- [description](#description)
- [endpointSecretStore](#endpointsecretstore)
- [events](#events)
- [logLevel](#loglevel)
- [secretKey](#secretkey)
- [url](#url)

## Properties

### description

• `Optional` `Readonly` **description**: `string`

___

### endpointSecretStore

• `Optional` `Readonly` **endpointSecretStore**: `SecretKeyStore`

___

### events

• `Readonly` **events**: `string`[]

___

### logLevel

• `Optional` `Readonly` **logLevel**: ``"debug"`` \| ``"info"`` \| ``"warning"`` \| ``"error"``

___

### secretKey

• `Readonly` **secretKey**: `string` \| `SecretKey`

___

### url

• `Readonly` **url**: `string`
