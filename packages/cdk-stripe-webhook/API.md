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

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

Construct.node

___

### url

• `Readonly` **url**: `string`

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
