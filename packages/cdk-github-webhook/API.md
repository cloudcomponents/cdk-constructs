# README

@cloudcomponents/cdk-github-webhook

# @cloudcomponents/cdk-github-webhook

## Table of contents

### Classes

- [GithubWebhook](#github-webhook)

### Interfaces

- [GithubWebhookProps](#github-webhook-props)

# Github Webhook

[@cloudcomponents/cdk-github-webhook](#readme) / GithubWebhook

# Class: GithubWebhook

## Hierarchy

- `Construct`

  ↳ **`GithubWebhook`**

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

• **new GithubWebhook**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`GithubWebhookProps`](#github-webhook-props) |

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

# Github Webhook Props

[@cloudcomponents/cdk-github-webhook](#readme) / GithubWebhookProps

# Interface: GithubWebhookProps

## Table of contents

### Properties

- [events](#events)
- [githubApiToken](#githubapitoken)
- [githubRepoUrl](#githubrepourl)
- [logLevel](#loglevel)
- [payloadUrl](#payloadurl)

## Properties

### events

• `Readonly` **events**: `string`[]

Determines what events the hook is triggered for.

**`see`** https://developer.github.com/v3/activity/events/types/

___

### githubApiToken

• `Readonly` **githubApiToken**: `string` \| `SecretKey`

The OAuth access token

___

### githubRepoUrl

• `Readonly` **githubRepoUrl**: `string`

The Github repo url

___

### logLevel

• `Optional` `Readonly` **logLevel**: ``"debug"`` \| ``"info"`` \| ``"warning"`` \| ``"error"``

___

### payloadUrl

• `Readonly` **payloadUrl**: `string`

The URL to which the payloads will be delivered.
