# README

@cloudcomponents/cdk-cloudfront-authorization

# @cloudcomponents/cdk-cloudfront-authorization

## Table of contents

### Enumerations

- [Mode](#mode)

### Classes

- [AuthFlow](#auth-flow)
- [Authorization](#authorization)
- [BaseDistribution](#base-distribution)
- [RetrieveUserPoolClientSecret](#retrieve-user-pool-client-secret)
- [SecretGenerator](#secret-generator)
- [SpaAuthorization](#spa-authorization)
- [SpaDistribution](#spa-distribution)
- [StaticSiteAuthorization](#static-site-authorization)
- [StaticSiteDistribution](#static-site-distribution)
- [UserPoolClientRedirects](#user-pool-client-redirects)

### Interfaces

- [AuthFlowProps](#auth-flow-props)
- [AuthorizationProps](#authorization-props)
- [BaseDistributionProps](#base-distribution-props)
- [CommonDistributionProps](#common-distribution-props)
- [IAuthorization](#i-authorization)
- [ISpaAuthorization](#i-spa-authorization)
- [IStaticSiteAuthorization](#i-static-site-authorization)
- [RedirectPaths](#redirect-paths)
- [RetrieveUserPoolClientSecretProps](#retrieve-user-pool-client-secret-props)
- [SecretGeneratorProps](#secret-generator-props)
- [SpaDistributionProps](#spa-distribution-props)
- [StaticSiteDistributionProps](#static-site-distribution-props)
- [UserPoolClientCallbackUrls](#user-pool-client-callback-urls)
- [UserPoolClientRedirectsProps](#user-pool-client-redirects-props)

### Type aliases

- [SpaAuthorizationProps](#spaauthorizationprops)
- [StaticSiteAuthorizationProps](#staticsiteauthorizationprops)

## Type aliases

### SpaAuthorizationProps

Ƭ **SpaAuthorizationProps**: [`AuthorizationProps`](#authorization-props)

___

### StaticSiteAuthorizationProps

Ƭ **StaticSiteAuthorizationProps**: [`AuthorizationProps`](#authorization-props)

# Auth Flow

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / AuthFlow

# Class: AuthFlow

## Hierarchy

- `Construct`

  ↳ **`AuthFlow`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [checkAuth](#checkauth)
- [node](#node)
- [parseAuth](#parseauth)
- [refreshAuth](#refreshauth)
- [signOut](#signout)

### Methods

- [toString](#tostring)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new AuthFlow**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`AuthFlowProps`](#auth-flow-props) |

#### Overrides

Construct.constructor

## Properties

### checkAuth

• `Readonly` **checkAuth**: `EdgeFunction`

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

Construct.node

___

### parseAuth

• `Readonly` **parseAuth**: `EdgeFunction`

___

### refreshAuth

• `Readonly` **refreshAuth**: `EdgeFunction`

___

### signOut

• `Readonly` **signOut**: `EdgeFunction`

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

# Authorization

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / Authorization

# Class: Authorization

## Hierarchy

- `Construct`

  ↳ **`Authorization`**

  ↳↳ [`SpaAuthorization`](#spa-authorization)

  ↳↳ [`StaticSiteAuthorization`](#static-site-authorization)

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [authFlow](#authflow)
- [cognitoAuthDomain](#cognitoauthdomain)
- [cookieSettings](#cookiesettings)
- [identityProviders](#identityproviders)
- [node](#node)
- [nonceSigningSecret](#noncesigningsecret)
- [oauthScopes](#oauthscopes)
- [redirectPaths](#redirectpaths)
- [responseHeaderPolicy](#responseheaderpolicy)
- [signOutUrlPath](#signouturlpath)
- [userPool](#userpool)
- [userPoolClient](#userpoolclient)

### Methods

- [createAdditionalBehaviors](#createadditionalbehaviors)
- [createAuthFlow](#createauthflow)
- [createDefaultBehavior](#createdefaultbehavior)
- [createUserPoolClient](#createuserpoolclient)
- [generateNonceSigningSecret](#generatenoncesigningsecret)
- [retrieveCognitoAuthDomain](#retrievecognitoauthdomain)
- [toString](#tostring)
- [updateUserPoolClientCallbacks](#updateuserpoolclientcallbacks)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new Authorization**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`AuthorizationProps`](#authorization-props) |

#### Overrides

Construct.constructor

## Properties

### authFlow

• `Readonly` **authFlow**: [`AuthFlow`](#auth-flow)

___

### cognitoAuthDomain

• `Protected` `Readonly` **cognitoAuthDomain**: `string`

___

### cookieSettings

• `Protected` `Readonly` **cookieSettings**: `undefined` \| `Record`<`string`, `string`\>

___

### identityProviders

• `Protected` `Readonly` **identityProviders**: `UserPoolClientIdentityProvider`[]

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

Construct.node

___

### nonceSigningSecret

• `Protected` `Readonly` **nonceSigningSecret**: `string`

___

### oauthScopes

• `Protected` `Readonly` **oauthScopes**: `OAuthScope`[]

___

### redirectPaths

• `Readonly` **redirectPaths**: [`RedirectPaths`](#redirect-paths)

___

### responseHeaderPolicy

• `Protected` `Readonly` **responseHeaderPolicy**: `IResponseHeadersPolicy`

___

### signOutUrlPath

• `Readonly` **signOutUrlPath**: `string`

___

### userPool

• `Protected` `Readonly` **userPool**: `IUserPool`

___

### userPoolClient

• `Readonly` **userPoolClient**: `IUserPoolClient`

## Methods

### createAdditionalBehaviors

▸ **createAdditionalBehaviors**(`origin`, `options?`): `Record`<`string`, `BehaviorOptions`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `IOrigin` |
| `options?` | `AddBehaviorOptions` |

#### Returns

`Record`<`string`, `BehaviorOptions`\>

___

### createAuthFlow

▸ `Protected` `Abstract` **createAuthFlow**(`logLevel`): [`AuthFlow`](#auth-flow)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logLevel` | `LogLevel` |

#### Returns

[`AuthFlow`](#auth-flow)

___

### createDefaultBehavior

▸ **createDefaultBehavior**(`origin`, `options?`): `BehaviorOptions`

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `IOrigin` |
| `options?` | `AddBehaviorOptions` |

#### Returns

`BehaviorOptions`

___

### createUserPoolClient

▸ `Protected` `Abstract` **createUserPoolClient**(): `IUserPoolClient`

#### Returns

`IUserPoolClient`

___

### generateNonceSigningSecret

▸ `Private` **generateNonceSigningSecret**(): `string`

#### Returns

`string`

___

### retrieveCognitoAuthDomain

▸ `Private` **retrieveCognitoAuthDomain**(): `string`

#### Returns

`string`

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

### updateUserPoolClientCallbacks

▸ **updateUserPoolClientCallbacks**(`redirects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `redirects` | [`UserPoolClientCallbackUrls`](#user-pool-client-callback-urls) |

#### Returns

`void`

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

# Base Distribution

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / BaseDistribution

# Class: BaseDistribution

## Hierarchy

- `Construct`

  ↳ **`BaseDistribution`**

  ↳↳ [`StaticSiteDistribution`](#static-site-distribution)

  ↳↳ [`SpaDistribution`](#spa-distribution)

## Implements

- `IDistribution`

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [distributionDomainName](#distributiondomainname)
- [distributionId](#distributionid)
- [domainName](#domainname)
- [env](#env)
- [node](#node)
- [stack](#stack)

### Methods

- [applyRemovalPolicy](#applyremovalpolicy)
- [defaultOrigin](#defaultorigin)
- [renderAdditionalBehaviors](#renderadditionalbehaviors)
- [renderDefaultBehaviour](#renderdefaultbehaviour)
- [toString](#tostring)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new BaseDistribution**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`BaseDistributionProps`](#base-distribution-props) |

#### Overrides

Construct.constructor

## Properties

### distributionDomainName

• `Readonly` **distributionDomainName**: `string`

#### Implementation of

aws\_cloudfront.IDistribution.distributionDomainName

___

### distributionId

• `Readonly` **distributionId**: `string`

#### Implementation of

aws\_cloudfront.IDistribution.distributionId

___

### domainName

• `Readonly` **domainName**: `string`

___

### env

• `Readonly` **env**: `ResourceEnvironment`

#### Implementation of

aws\_cloudfront.IDistribution.env

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Implementation of

aws\_cloudfront.IDistribution.node

#### Inherited from

Construct.node

___

### stack

• `Readonly` **stack**: `Stack`

#### Implementation of

aws\_cloudfront.IDistribution.stack

## Methods

### applyRemovalPolicy

▸ **applyRemovalPolicy**(`policy`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `policy` | `RemovalPolicy` |

#### Returns

`void`

#### Implementation of

aws\_cloudfront.IDistribution.applyRemovalPolicy

___

### defaultOrigin

▸ `Private` **defaultOrigin**(`removalPolicy`): `IOrigin`

#### Parameters

| Name | Type |
| :------ | :------ |
| `removalPolicy` | `RemovalPolicy` |

#### Returns

`IOrigin`

___

### renderAdditionalBehaviors

▸ `Protected` **renderAdditionalBehaviors**(`origin`, `authorization`): `Record`<`string`, `BehaviorOptions`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `IOrigin` |
| `authorization` | [`IAuthorization`](#i-authorization) |

#### Returns

`Record`<`string`, `BehaviorOptions`\>

___

### renderDefaultBehaviour

▸ `Protected` **renderDefaultBehaviour**(`origin`, `authorization`): `BehaviorOptions`

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `IOrigin` |
| `authorization` | [`IAuthorization`](#i-authorization) |

#### Returns

`BehaviorOptions`

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

# Retrieve User Pool Client Secret

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / RetrieveUserPoolClientSecret

# Class: RetrieveUserPoolClientSecret

## Hierarchy

- `Construct`

  ↳ **`RetrieveUserPoolClientSecret`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [clientSecret](#clientsecret)
- [node](#node)

### Methods

- [toString](#tostring)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new RetrieveUserPoolClientSecret**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`RetrieveUserPoolClientSecretProps`](#retrieve-user-pool-client-secret-props) |

#### Overrides

Construct.constructor

## Properties

### clientSecret

• **clientSecret**: `string`

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

# Secret Generator

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / SecretGenerator

# Class: SecretGenerator

## Hierarchy

- `Construct`

  ↳ **`SecretGenerator`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [node](#node)
- [secret](#secret)

### Methods

- [toString](#tostring)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new SecretGenerator**(`scope`, `id`, `props?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`SecretGeneratorProps`](#secret-generator-props) |

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

### secret

• `Readonly` **secret**: `string`

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

# Spa Authorization

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / SpaAuthorization

# Class: SpaAuthorization

## Hierarchy

- [`Authorization`](#authorization)

  ↳ **`SpaAuthorization`**

## Implements

- [`ISpaAuthorization`](#i-spa-authorization)

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [authFlow](#authflow)
- [cognitoAuthDomain](#cognitoauthdomain)
- [cookieSettings](#cookiesettings)
- [identityProviders](#identityproviders)
- [mode](#mode)
- [node](#node)
- [nonceSigningSecret](#noncesigningsecret)
- [oauthScopes](#oauthscopes)
- [redirectPaths](#redirectpaths)
- [responseHeaderPolicy](#responseheaderpolicy)
- [signOutUrlPath](#signouturlpath)
- [userPool](#userpool)
- [userPoolClient](#userpoolclient)

### Methods

- [createAdditionalBehaviors](#createadditionalbehaviors)
- [createAuthFlow](#createauthflow)
- [createDefaultBehavior](#createdefaultbehavior)
- [createUserPoolClient](#createuserpoolclient)
- [toString](#tostring)
- [updateUserPoolClientCallbacks](#updateuserpoolclientcallbacks)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new SpaAuthorization**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`AuthorizationProps`](#authorization-props) |

#### Overrides

[Authorization](#authorization).[constructor](#constructor)

## Properties

### authFlow

• `Readonly` **authFlow**: [`AuthFlow`](#auth-flow)

#### Inherited from

[Authorization](#authorization).[authFlow](#authflow)

___

### cognitoAuthDomain

• `Protected` `Readonly` **cognitoAuthDomain**: `string`

#### Inherited from

[Authorization](#authorization).[cognitoAuthDomain](#cognitoauthdomain)

___

### cookieSettings

• `Protected` `Readonly` **cookieSettings**: `undefined` \| `Record`<`string`, `string`\>

#### Inherited from

[Authorization](#authorization).[cookieSettings](#cookiesettings)

___

### identityProviders

• `Protected` `Readonly` **identityProviders**: `UserPoolClientIdentityProvider`[]

#### Inherited from

[Authorization](#authorization).[identityProviders](#identityproviders)

___

### mode

• `Readonly` **mode**: [`SPA`](#spa) = `Mode.SPA`

#### Implementation of

[ISpaAuthorization](#i-spa-authorization).[mode](#mode)

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

[Authorization](#authorization).[node](#node)

___

### nonceSigningSecret

• `Protected` `Readonly` **nonceSigningSecret**: `string`

#### Inherited from

[Authorization](#authorization).[nonceSigningSecret](#noncesigningsecret)

___

### oauthScopes

• `Protected` `Readonly` **oauthScopes**: `OAuthScope`[]

#### Inherited from

[Authorization](#authorization).[oauthScopes](#oauthscopes)

___

### redirectPaths

• `Readonly` **redirectPaths**: [`RedirectPaths`](#redirect-paths)

#### Implementation of

[ISpaAuthorization](#i-spa-authorization).[redirectPaths](#redirectpaths)

#### Inherited from

[Authorization](#authorization).[redirectPaths](#redirectpaths)

___

### responseHeaderPolicy

• `Protected` `Readonly` **responseHeaderPolicy**: `IResponseHeadersPolicy`

#### Inherited from

[Authorization](#authorization).[responseHeaderPolicy](#responseheaderpolicy)

___

### signOutUrlPath

• `Readonly` **signOutUrlPath**: `string`

#### Implementation of

[ISpaAuthorization](#i-spa-authorization).[signOutUrlPath](#signouturlpath)

#### Inherited from

[Authorization](#authorization).[signOutUrlPath](#signouturlpath)

___

### userPool

• `Protected` `Readonly` **userPool**: `IUserPool`

#### Inherited from

[Authorization](#authorization).[userPool](#userpool)

___

### userPoolClient

• `Readonly` **userPoolClient**: `IUserPoolClient`

#### Inherited from

[Authorization](#authorization).[userPoolClient](#userpoolclient)

## Methods

### createAdditionalBehaviors

▸ **createAdditionalBehaviors**(`origin`, `options?`): `Record`<`string`, `BehaviorOptions`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `IOrigin` |
| `options?` | `AddBehaviorOptions` |

#### Returns

`Record`<`string`, `BehaviorOptions`\>

#### Implementation of

[ISpaAuthorization](#i-spa-authorization).[createAdditionalBehaviors](#createadditionalbehaviors)

#### Inherited from

[Authorization](#authorization).[createAdditionalBehaviors](#createadditionalbehaviors)

___

### createAuthFlow

▸ `Protected` **createAuthFlow**(`logLevel`): [`AuthFlow`](#auth-flow)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logLevel` | `LogLevel` |

#### Returns

[`AuthFlow`](#auth-flow)

#### Overrides

[Authorization](#authorization).[createAuthFlow](#createauthflow)

___

### createDefaultBehavior

▸ **createDefaultBehavior**(`origin`, `options?`): `BehaviorOptions`

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `IOrigin` |
| `options?` | `AddBehaviorOptions` |

#### Returns

`BehaviorOptions`

#### Implementation of

[ISpaAuthorization](#i-spa-authorization).[createDefaultBehavior](#createdefaultbehavior)

#### Inherited from

[Authorization](#authorization).[createDefaultBehavior](#createdefaultbehavior)

___

### createUserPoolClient

▸ `Protected` **createUserPoolClient**(): `IUserPoolClient`

#### Returns

`IUserPoolClient`

#### Overrides

[Authorization](#authorization).[createUserPoolClient](#createuserpoolclient)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

[Authorization](#authorization).[toString](#tostring)

___

### updateUserPoolClientCallbacks

▸ **updateUserPoolClientCallbacks**(`redirects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `redirects` | [`UserPoolClientCallbackUrls`](#user-pool-client-callback-urls) |

#### Returns

`void`

#### Implementation of

[ISpaAuthorization](#i-spa-authorization).[updateUserPoolClientCallbacks](#updateuserpoolclientcallbacks)

#### Inherited from

[Authorization](#authorization).[updateUserPoolClientCallbacks](#updateuserpoolclientcallbacks)

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

[Authorization](#authorization).[isConstruct](#isconstruct)

# Spa Distribution

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / SpaDistribution

# Class: SpaDistribution

## Hierarchy

- [`BaseDistribution`](#base-distribution)

  ↳ **`SpaDistribution`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [distributionDomainName](#distributiondomainname)
- [distributionId](#distributionid)
- [domainName](#domainname)
- [env](#env)
- [node](#node)
- [stack](#stack)

### Methods

- [applyRemovalPolicy](#applyremovalpolicy)
- [renderAdditionalBehaviors](#renderadditionalbehaviors)
- [renderDefaultBehaviour](#renderdefaultbehaviour)
- [toString](#tostring)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new SpaDistribution**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`SpaDistributionProps`](#spa-distribution-props) |

#### Overrides

[BaseDistribution](#base-distribution).[constructor](#constructor)

## Properties

### distributionDomainName

• `Readonly` **distributionDomainName**: `string`

#### Inherited from

[BaseDistribution](#base-distribution).[distributionDomainName](#distributiondomainname)

___

### distributionId

• `Readonly` **distributionId**: `string`

#### Inherited from

[BaseDistribution](#base-distribution).[distributionId](#distributionid)

___

### domainName

• `Readonly` **domainName**: `string`

#### Inherited from

[BaseDistribution](#base-distribution).[domainName](#domainname)

___

### env

• `Readonly` **env**: `ResourceEnvironment`

#### Inherited from

[BaseDistribution](#base-distribution).[env](#env)

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

[BaseDistribution](#base-distribution).[node](#node)

___

### stack

• `Readonly` **stack**: `Stack`

#### Inherited from

[BaseDistribution](#base-distribution).[stack](#stack)

## Methods

### applyRemovalPolicy

▸ **applyRemovalPolicy**(`policy`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `policy` | `RemovalPolicy` |

#### Returns

`void`

#### Inherited from

[BaseDistribution](#base-distribution).[applyRemovalPolicy](#applyremovalpolicy)

___

### renderAdditionalBehaviors

▸ `Protected` **renderAdditionalBehaviors**(`origin`, `authorization`): `Record`<`string`, `BehaviorOptions`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `IOrigin` |
| `authorization` | [`IAuthorization`](#i-authorization) |

#### Returns

`Record`<`string`, `BehaviorOptions`\>

#### Inherited from

[BaseDistribution](#base-distribution).[renderAdditionalBehaviors](#renderadditionalbehaviors)

___

### renderDefaultBehaviour

▸ `Protected` **renderDefaultBehaviour**(`origin`, `authorization`): `BehaviorOptions`

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `IOrigin` |
| `authorization` | [`IAuthorization`](#i-authorization) |

#### Returns

`BehaviorOptions`

#### Inherited from

[BaseDistribution](#base-distribution).[renderDefaultBehaviour](#renderdefaultbehaviour)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

[BaseDistribution](#base-distribution).[toString](#tostring)

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

[BaseDistribution](#base-distribution).[isConstruct](#isconstruct)

# Static Site Authorization

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / StaticSiteAuthorization

# Class: StaticSiteAuthorization

## Hierarchy

- [`Authorization`](#authorization)

  ↳ **`StaticSiteAuthorization`**

## Implements

- [`IStaticSiteAuthorization`](#i-static-site-authorization)

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [authFlow](#authflow)
- [cognitoAuthDomain](#cognitoauthdomain)
- [cookieSettings](#cookiesettings)
- [identityProviders](#identityproviders)
- [mode](#mode)
- [node](#node)
- [nonceSigningSecret](#noncesigningsecret)
- [oauthScopes](#oauthscopes)
- [redirectPaths](#redirectpaths)
- [responseHeaderPolicy](#responseheaderpolicy)
- [signOutUrlPath](#signouturlpath)
- [userPool](#userpool)
- [userPoolClient](#userpoolclient)

### Methods

- [createAdditionalBehaviors](#createadditionalbehaviors)
- [createAuthFlow](#createauthflow)
- [createDefaultBehavior](#createdefaultbehavior)
- [createUserPoolClient](#createuserpoolclient)
- [retrieveUserPoolClientSecret](#retrieveuserpoolclientsecret)
- [toString](#tostring)
- [updateUserPoolClientCallbacks](#updateuserpoolclientcallbacks)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new StaticSiteAuthorization**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`AuthorizationProps`](#authorization-props) |

#### Overrides

[Authorization](#authorization).[constructor](#constructor)

## Properties

### authFlow

• `Readonly` **authFlow**: [`AuthFlow`](#auth-flow)

#### Inherited from

[Authorization](#authorization).[authFlow](#authflow)

___

### cognitoAuthDomain

• `Protected` `Readonly` **cognitoAuthDomain**: `string`

#### Inherited from

[Authorization](#authorization).[cognitoAuthDomain](#cognitoauthdomain)

___

### cookieSettings

• `Protected` `Readonly` **cookieSettings**: `undefined` \| `Record`<`string`, `string`\>

#### Inherited from

[Authorization](#authorization).[cookieSettings](#cookiesettings)

___

### identityProviders

• `Protected` `Readonly` **identityProviders**: `UserPoolClientIdentityProvider`[]

#### Inherited from

[Authorization](#authorization).[identityProviders](#identityproviders)

___

### mode

• `Readonly` **mode**: [`STATIC_SITE`](#static_site) = `Mode.STATIC_SITE`

#### Implementation of

[IStaticSiteAuthorization](#i-static-site-authorization).[mode](#mode)

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

[Authorization](#authorization).[node](#node)

___

### nonceSigningSecret

• `Protected` `Readonly` **nonceSigningSecret**: `string`

#### Inherited from

[Authorization](#authorization).[nonceSigningSecret](#noncesigningsecret)

___

### oauthScopes

• `Protected` `Readonly` **oauthScopes**: `OAuthScope`[]

#### Inherited from

[Authorization](#authorization).[oauthScopes](#oauthscopes)

___

### redirectPaths

• `Readonly` **redirectPaths**: [`RedirectPaths`](#redirect-paths)

#### Implementation of

[IStaticSiteAuthorization](#i-static-site-authorization).[redirectPaths](#redirectpaths)

#### Inherited from

[Authorization](#authorization).[redirectPaths](#redirectpaths)

___

### responseHeaderPolicy

• `Protected` `Readonly` **responseHeaderPolicy**: `IResponseHeadersPolicy`

#### Inherited from

[Authorization](#authorization).[responseHeaderPolicy](#responseheaderpolicy)

___

### signOutUrlPath

• `Readonly` **signOutUrlPath**: `string`

#### Implementation of

[IStaticSiteAuthorization](#i-static-site-authorization).[signOutUrlPath](#signouturlpath)

#### Inherited from

[Authorization](#authorization).[signOutUrlPath](#signouturlpath)

___

### userPool

• `Protected` `Readonly` **userPool**: `IUserPool`

#### Inherited from

[Authorization](#authorization).[userPool](#userpool)

___

### userPoolClient

• `Readonly` **userPoolClient**: `IUserPoolClient`

#### Inherited from

[Authorization](#authorization).[userPoolClient](#userpoolclient)

## Methods

### createAdditionalBehaviors

▸ **createAdditionalBehaviors**(`origin`, `options?`): `Record`<`string`, `BehaviorOptions`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `IOrigin` |
| `options?` | `AddBehaviorOptions` |

#### Returns

`Record`<`string`, `BehaviorOptions`\>

#### Implementation of

[IStaticSiteAuthorization](#i-static-site-authorization).[createAdditionalBehaviors](#createadditionalbehaviors)

#### Inherited from

[Authorization](#authorization).[createAdditionalBehaviors](#createadditionalbehaviors)

___

### createAuthFlow

▸ `Protected` **createAuthFlow**(`logLevel`): [`AuthFlow`](#auth-flow)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logLevel` | `LogLevel` |

#### Returns

[`AuthFlow`](#auth-flow)

#### Overrides

[Authorization](#authorization).[createAuthFlow](#createauthflow)

___

### createDefaultBehavior

▸ **createDefaultBehavior**(`origin`, `options?`): `BehaviorOptions`

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `IOrigin` |
| `options?` | `AddBehaviorOptions` |

#### Returns

`BehaviorOptions`

#### Implementation of

[IStaticSiteAuthorization](#i-static-site-authorization).[createDefaultBehavior](#createdefaultbehavior)

#### Inherited from

[Authorization](#authorization).[createDefaultBehavior](#createdefaultbehavior)

___

### createUserPoolClient

▸ `Protected` **createUserPoolClient**(): `IUserPoolClient`

#### Returns

`IUserPoolClient`

#### Overrides

[Authorization](#authorization).[createUserPoolClient](#createuserpoolclient)

___

### retrieveUserPoolClientSecret

▸ `Private` **retrieveUserPoolClientSecret**(): `string`

#### Returns

`string`

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

[Authorization](#authorization).[toString](#tostring)

___

### updateUserPoolClientCallbacks

▸ **updateUserPoolClientCallbacks**(`redirects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `redirects` | [`UserPoolClientCallbackUrls`](#user-pool-client-callback-urls) |

#### Returns

`void`

#### Implementation of

[IStaticSiteAuthorization](#i-static-site-authorization).[updateUserPoolClientCallbacks](#updateuserpoolclientcallbacks)

#### Inherited from

[Authorization](#authorization).[updateUserPoolClientCallbacks](#updateuserpoolclientcallbacks)

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

[Authorization](#authorization).[isConstruct](#isconstruct)

# Static Site Distribution

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / StaticSiteDistribution

# Class: StaticSiteDistribution

## Hierarchy

- [`BaseDistribution`](#base-distribution)

  ↳ **`StaticSiteDistribution`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [distributionDomainName](#distributiondomainname)
- [distributionId](#distributionid)
- [domainName](#domainname)
- [env](#env)
- [node](#node)
- [stack](#stack)

### Methods

- [applyRemovalPolicy](#applyremovalpolicy)
- [renderAdditionalBehaviors](#renderadditionalbehaviors)
- [renderDefaultBehaviour](#renderdefaultbehaviour)
- [toString](#tostring)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new StaticSiteDistribution**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`StaticSiteDistributionProps`](#static-site-distribution-props) |

#### Overrides

[BaseDistribution](#base-distribution).[constructor](#constructor)

## Properties

### distributionDomainName

• `Readonly` **distributionDomainName**: `string`

#### Inherited from

[BaseDistribution](#base-distribution).[distributionDomainName](#distributiondomainname)

___

### distributionId

• `Readonly` **distributionId**: `string`

#### Inherited from

[BaseDistribution](#base-distribution).[distributionId](#distributionid)

___

### domainName

• `Readonly` **domainName**: `string`

#### Inherited from

[BaseDistribution](#base-distribution).[domainName](#domainname)

___

### env

• `Readonly` **env**: `ResourceEnvironment`

#### Inherited from

[BaseDistribution](#base-distribution).[env](#env)

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

[BaseDistribution](#base-distribution).[node](#node)

___

### stack

• `Readonly` **stack**: `Stack`

#### Inherited from

[BaseDistribution](#base-distribution).[stack](#stack)

## Methods

### applyRemovalPolicy

▸ **applyRemovalPolicy**(`policy`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `policy` | `RemovalPolicy` |

#### Returns

`void`

#### Inherited from

[BaseDistribution](#base-distribution).[applyRemovalPolicy](#applyremovalpolicy)

___

### renderAdditionalBehaviors

▸ `Protected` **renderAdditionalBehaviors**(`origin`, `authorization`): `Record`<`string`, `BehaviorOptions`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `IOrigin` |
| `authorization` | [`IAuthorization`](#i-authorization) |

#### Returns

`Record`<`string`, `BehaviorOptions`\>

#### Inherited from

[BaseDistribution](#base-distribution).[renderAdditionalBehaviors](#renderadditionalbehaviors)

___

### renderDefaultBehaviour

▸ `Protected` **renderDefaultBehaviour**(`origin`, `authorization`): `BehaviorOptions`

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `IOrigin` |
| `authorization` | [`IAuthorization`](#i-authorization) |

#### Returns

`BehaviorOptions`

#### Inherited from

[BaseDistribution](#base-distribution).[renderDefaultBehaviour](#renderdefaultbehaviour)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

[BaseDistribution](#base-distribution).[toString](#tostring)

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

[BaseDistribution](#base-distribution).[isConstruct](#isconstruct)

# User Pool Client Redirects

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / UserPoolClientRedirects

# Class: UserPoolClientRedirects

## Hierarchy

- `Construct`

  ↳ **`UserPoolClientRedirects`**

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

• **new UserPoolClientRedirects**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`UserPoolClientRedirectsProps`](#user-pool-client-redirects-props) |

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

# Mode

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / Mode

# Enumeration: Mode

## Table of contents

### Enumeration members

- [SPA](#spa)
- [STATIC\_SITE](#static_site)

## Enumeration members

### SPA

• **SPA** = `"SPA"`

___

### STATIC\_SITE

• **STATIC\_SITE** = `"STATIC_SITE"`

# Auth Flow Props

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / AuthFlowProps

# Interface: AuthFlowProps

## Table of contents

### Properties

- [clientSecret](#clientsecret)
- [cognitoAuthDomain](#cognitoauthdomain)
- [cookieSettings](#cookiesettings)
- [logLevel](#loglevel)
- [nonceSigningSecret](#noncesigningsecret)
- [oauthScopes](#oauthscopes)
- [redirectPaths](#redirectpaths)
- [userPool](#userpool)
- [userPoolClient](#userpoolclient)

## Properties

### clientSecret

• `Optional` `Readonly` **clientSecret**: `string`

___

### cognitoAuthDomain

• `Readonly` **cognitoAuthDomain**: `string`

___

### cookieSettings

• `Readonly` **cookieSettings**: `Record`<`string`, `string`\>

___

### logLevel

• `Readonly` **logLevel**: `LogLevel`

___

### nonceSigningSecret

• `Readonly` **nonceSigningSecret**: `string`

___

### oauthScopes

• `Readonly` **oauthScopes**: `OAuthScope`[]

___

### redirectPaths

• `Readonly` **redirectPaths**: [`RedirectPaths`](#redirect-paths)

___

### userPool

• `Readonly` **userPool**: `IUserPool`

___

### userPoolClient

• `Readonly` **userPoolClient**: `IUserPoolClient`

# Authorization Props

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / AuthorizationProps

# Interface: AuthorizationProps

## Table of contents

### Properties

- [cookieSettings](#cookiesettings)
- [customHeaders](#customheaders)
- [identityProviders](#identityproviders)
- [logLevel](#loglevel)
- [oauthScopes](#oauthscopes)
- [redirectPaths](#redirectpaths)
- [securityHeadersBehavior](#securityheadersbehavior)
- [signOutUrl](#signouturl)
- [userPool](#userpool)

## Properties

### cookieSettings

• `Optional` `Readonly` **cookieSettings**: `Record`<`string`, `string`\>

___

### customHeaders

• `Optional` `Readonly` **customHeaders**: `ResponseCustomHeader`[]

___

### identityProviders

• `Optional` `Readonly` **identityProviders**: `UserPoolClientIdentityProvider`[]

___

### logLevel

• `Optional` `Readonly` **logLevel**: `LogLevel`

___

### oauthScopes

• `Optional` `Readonly` **oauthScopes**: `OAuthScope`[]

___

### redirectPaths

• `Optional` `Readonly` **redirectPaths**: [`RedirectPaths`](#redirect-paths)

___

### securityHeadersBehavior

• `Optional` `Readonly` **securityHeadersBehavior**: `ResponseSecurityHeadersBehavior`

___

### signOutUrl

• `Optional` `Readonly` **signOutUrl**: `string`

___

### userPool

• `Readonly` **userPool**: `IUserPool`

# Base Distribution Props

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / BaseDistributionProps

# Interface: BaseDistributionProps

## Hierarchy

- [`CommonDistributionProps`](#common-distribution-props)

  ↳ **`BaseDistributionProps`**

## Table of contents

### Properties

- [authorization](#authorization)
- [certificate](#certificate)
- [comment](#comment)
- [defaultRootObject](#defaultrootobject)
- [domainNames](#domainnames)
- [enableIpv6](#enableipv6)
- [enableLogging](#enablelogging)
- [enabled](#enabled)
- [errorResponses](#errorresponses)
- [geoRestriction](#georestriction)
- [httpVersion](#httpversion)
- [logBucket](#logbucket)
- [logFilePrefix](#logfileprefix)
- [logIncludesCookies](#logincludescookies)
- [minimumProtocolVersion](#minimumprotocolversion)
- [origin](#origin)
- [priceClass](#priceclass)
- [removalPolicy](#removalpolicy)
- [webAclId](#webaclid)

## Properties

### authorization

• `Readonly` **authorization**: [`IAuthorization`](#i-authorization)

___

### certificate

• `Optional` `Readonly` **certificate**: `ICertificate`

A certificate to associate with the distribution. The certificate must be located in N. Virginia (us-east-1).

**`default`** - the CloudFront wildcard certificate (*.cloudfront.net) will be used.

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[certificate](#certificate)

___

### comment

• `Optional` `Readonly` **comment**: `string`

Any comments you want to include about the distribution.

**`default`** - no comment

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[comment](#comment)

___

### defaultRootObject

• `Optional` `Readonly` **defaultRootObject**: `string`

The object that you want CloudFront to request from your origin (for example, index.html)
when a viewer requests the root URL for your distribution. If no default object is set, the
request goes to the origin's root (e.g., example.com/).

**`default`** - index.html

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[defaultRootObject](#defaultrootobject)

___

### domainNames

• `Optional` `Readonly` **domainNames**: `string`[]

Alternative domain names for this distribution.

If you want to use your own domain name, such as www.example.com, instead of the cloudfront.net domain name,
you can add an alternate domain name to your distribution. If you attach a certificate to the distribution,
you must add (at least one of) the domain names of the certificate to this list.

**`default`** - The distribution will only support the default generated name (e.g., d111111abcdef8.cloudfront.net)

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[domainNames](#domainnames)

___

### enableIpv6

• `Optional` `Readonly` **enableIpv6**: `boolean`

Whether CloudFront will respond to IPv6 DNS requests with an IPv6 address.

If you specify false, CloudFront responds to IPv6 DNS requests with the DNS response code NOERROR and with no IP addresses.
This allows viewers to submit a second request, for an IPv4 address for your distribution.

**`default`** true

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[enableIpv6](#enableipv6)

___

### enableLogging

• `Optional` `Readonly` **enableLogging**: `boolean`

Enable access logging for the distribution.

**`default`** - false, unless `logBucket` is specified.

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[enableLogging](#enablelogging)

___

### enabled

• `Optional` `Readonly` **enabled**: `boolean`

Enable or disable the distribution.

**`default`** true

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[enabled](#enabled)

___

### errorResponses

• `Optional` `Readonly` **errorResponses**: `ErrorResponse`[]

___

### geoRestriction

• `Optional` `Readonly` **geoRestriction**: `GeoRestriction`

Controls the countries in which your content is distributed.

**`default`** - No geographic restrictions

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[geoRestriction](#georestriction)

___

### httpVersion

• `Optional` `Readonly` **httpVersion**: `HttpVersion`

Specify the maximum HTTP version that you want viewers to use to communicate with CloudFront.

For viewers and CloudFront to use HTTP/2, viewers must support TLS 1.2 or later, and must support server name identification (SNI).

**`default`** HttpVersion.HTTP2

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[httpVersion](#httpversion)

___

### logBucket

• `Optional` `Readonly` **logBucket**: `IBucket`

The Amazon S3 bucket to store the access logs in.

**`default`** - A bucket is created if `enableLogging` is true

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[logBucket](#logbucket)

___

### logFilePrefix

• `Optional` `Readonly` **logFilePrefix**: `string`

An optional string that you want CloudFront to prefix to the access log filenames for this distribution.

**`default`** - no prefix

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[logFilePrefix](#logfileprefix)

___

### logIncludesCookies

• `Optional` `Readonly` **logIncludesCookies**: `boolean`

Specifies whether you want CloudFront to include cookies in access logs

**`default`** false

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[logIncludesCookies](#logincludescookies)

___

### minimumProtocolVersion

• `Optional` `Readonly` **minimumProtocolVersion**: `SecurityPolicyProtocol`

The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections.

CloudFront serves your objects only to browsers or devices that support at
least the SSL version that you specify.

**`default`** SecurityPolicyProtocol.TLS_V1_2_2019

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[minimumProtocolVersion](#minimumprotocolversion)

___

### origin

• `Optional` `Readonly` **origin**: `IOrigin`

The origin that you want CloudFront to route requests

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[origin](#origin)

___

### priceClass

• `Optional` `Readonly` **priceClass**: `PriceClass`

The price class that corresponds with the maximum price that you want to pay for CloudFront service.
If you specify PriceClass_All, CloudFront responds to requests for your objects from all CloudFront edge locations.
If you specify a price class other than PriceClass_All, CloudFront serves your objects from the CloudFront edge location
that has the lowest latency among the edge locations in your price class.

**`default`** PriceClass.PRICE_CLASS_100

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[priceClass](#priceclass)

___

### removalPolicy

• `Optional` `Readonly` **removalPolicy**: `RemovalPolicy`

**`default`** Destroy

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[removalPolicy](#removalpolicy)

___

### webAclId

• `Optional` `Readonly` **webAclId**: `string`

Unique identifier that specifies the AWS WAF web ACL to associate with this CloudFront distribution.

To specify a web ACL created using the latest version of AWS WAF, use the ACL ARN, for example
`arn:aws:wafv2:us-east-1:123456789012:global/webacl/ExampleWebACL/473e64fd-f30b-4765-81a0-62ad96dd167a`.
To specify a web ACL created using AWS WAF Classic, use the ACL ID, for example `473e64fd-f30b-4765-81a0-62ad96dd167a`.

**`see`** https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html

**`see`** https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CreateDistribution.html#API_CreateDistribution_RequestParameters.

**`default`** - No AWS Web Application Firewall web access control list (web ACL).

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[webAclId](#webaclid)

# Common Distribution Props

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / CommonDistributionProps

# Interface: CommonDistributionProps

## Hierarchy

- **`CommonDistributionProps`**

  ↳ [`BaseDistributionProps`](#base-distribution-props)

  ↳ [`StaticSiteDistributionProps`](#static-site-distribution-props)

  ↳ [`SpaDistributionProps`](#spa-distribution-props)

## Table of contents

### Properties

- [certificate](#certificate)
- [comment](#comment)
- [defaultRootObject](#defaultrootobject)
- [domainNames](#domainnames)
- [enableIpv6](#enableipv6)
- [enableLogging](#enablelogging)
- [enabled](#enabled)
- [geoRestriction](#georestriction)
- [httpVersion](#httpversion)
- [logBucket](#logbucket)
- [logFilePrefix](#logfileprefix)
- [logIncludesCookies](#logincludescookies)
- [minimumProtocolVersion](#minimumprotocolversion)
- [origin](#origin)
- [priceClass](#priceclass)
- [removalPolicy](#removalpolicy)
- [webAclId](#webaclid)

## Properties

### certificate

• `Optional` `Readonly` **certificate**: `ICertificate`

A certificate to associate with the distribution. The certificate must be located in N. Virginia (us-east-1).

**`default`** - the CloudFront wildcard certificate (*.cloudfront.net) will be used.

___

### comment

• `Optional` `Readonly` **comment**: `string`

Any comments you want to include about the distribution.

**`default`** - no comment

___

### defaultRootObject

• `Optional` `Readonly` **defaultRootObject**: `string`

The object that you want CloudFront to request from your origin (for example, index.html)
when a viewer requests the root URL for your distribution. If no default object is set, the
request goes to the origin's root (e.g., example.com/).

**`default`** - index.html

___

### domainNames

• `Optional` `Readonly` **domainNames**: `string`[]

Alternative domain names for this distribution.

If you want to use your own domain name, such as www.example.com, instead of the cloudfront.net domain name,
you can add an alternate domain name to your distribution. If you attach a certificate to the distribution,
you must add (at least one of) the domain names of the certificate to this list.

**`default`** - The distribution will only support the default generated name (e.g., d111111abcdef8.cloudfront.net)

___

### enableIpv6

• `Optional` `Readonly` **enableIpv6**: `boolean`

Whether CloudFront will respond to IPv6 DNS requests with an IPv6 address.

If you specify false, CloudFront responds to IPv6 DNS requests with the DNS response code NOERROR and with no IP addresses.
This allows viewers to submit a second request, for an IPv4 address for your distribution.

**`default`** true

___

### enableLogging

• `Optional` `Readonly` **enableLogging**: `boolean`

Enable access logging for the distribution.

**`default`** - false, unless `logBucket` is specified.

___

### enabled

• `Optional` `Readonly` **enabled**: `boolean`

Enable or disable the distribution.

**`default`** true

___

### geoRestriction

• `Optional` `Readonly` **geoRestriction**: `GeoRestriction`

Controls the countries in which your content is distributed.

**`default`** - No geographic restrictions

___

### httpVersion

• `Optional` `Readonly` **httpVersion**: `HttpVersion`

Specify the maximum HTTP version that you want viewers to use to communicate with CloudFront.

For viewers and CloudFront to use HTTP/2, viewers must support TLS 1.2 or later, and must support server name identification (SNI).

**`default`** HttpVersion.HTTP2

___

### logBucket

• `Optional` `Readonly` **logBucket**: `IBucket`

The Amazon S3 bucket to store the access logs in.

**`default`** - A bucket is created if `enableLogging` is true

___

### logFilePrefix

• `Optional` `Readonly` **logFilePrefix**: `string`

An optional string that you want CloudFront to prefix to the access log filenames for this distribution.

**`default`** - no prefix

___

### logIncludesCookies

• `Optional` `Readonly` **logIncludesCookies**: `boolean`

Specifies whether you want CloudFront to include cookies in access logs

**`default`** false

___

### minimumProtocolVersion

• `Optional` `Readonly` **minimumProtocolVersion**: `SecurityPolicyProtocol`

The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections.

CloudFront serves your objects only to browsers or devices that support at
least the SSL version that you specify.

**`default`** SecurityPolicyProtocol.TLS_V1_2_2019

___

### origin

• `Optional` `Readonly` **origin**: `IOrigin`

The origin that you want CloudFront to route requests

___

### priceClass

• `Optional` `Readonly` **priceClass**: `PriceClass`

The price class that corresponds with the maximum price that you want to pay for CloudFront service.
If you specify PriceClass_All, CloudFront responds to requests for your objects from all CloudFront edge locations.
If you specify a price class other than PriceClass_All, CloudFront serves your objects from the CloudFront edge location
that has the lowest latency among the edge locations in your price class.

**`default`** PriceClass.PRICE_CLASS_100

___

### removalPolicy

• `Optional` `Readonly` **removalPolicy**: `RemovalPolicy`

**`default`** Destroy

___

### webAclId

• `Optional` `Readonly` **webAclId**: `string`

Unique identifier that specifies the AWS WAF web ACL to associate with this CloudFront distribution.

To specify a web ACL created using the latest version of AWS WAF, use the ACL ARN, for example
`arn:aws:wafv2:us-east-1:123456789012:global/webacl/ExampleWebACL/473e64fd-f30b-4765-81a0-62ad96dd167a`.
To specify a web ACL created using AWS WAF Classic, use the ACL ID, for example `473e64fd-f30b-4765-81a0-62ad96dd167a`.

**`see`** https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html

**`see`** https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CreateDistribution.html#API_CreateDistribution_RequestParameters.

**`default`** - No AWS Web Application Firewall web access control list (web ACL).

# I Authorization

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / IAuthorization

# Interface: IAuthorization

## Hierarchy

- **`IAuthorization`**

  ↳ [`ISpaAuthorization`](#i-spa-authorization)

  ↳ [`IStaticSiteAuthorization`](#i-static-site-authorization)

## Table of contents

### Properties

- [redirectPaths](#redirectpaths)
- [signOutUrlPath](#signouturlpath)

### Methods

- [createAdditionalBehaviors](#createadditionalbehaviors)
- [createDefaultBehavior](#createdefaultbehavior)
- [updateUserPoolClientCallbacks](#updateuserpoolclientcallbacks)

## Properties

### redirectPaths

• `Readonly` **redirectPaths**: [`RedirectPaths`](#redirect-paths)

___

### signOutUrlPath

• `Readonly` **signOutUrlPath**: `string`

## Methods

### createAdditionalBehaviors

▸ **createAdditionalBehaviors**(`origin`, `options?`): `Record`<`string`, `BehaviorOptions`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `IOrigin` |
| `options?` | `AddBehaviorOptions` |

#### Returns

`Record`<`string`, `BehaviorOptions`\>

___

### createDefaultBehavior

▸ **createDefaultBehavior**(`origin`, `options?`): `BehaviorOptions`

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `IOrigin` |
| `options?` | `AddBehaviorOptions` |

#### Returns

`BehaviorOptions`

___

### updateUserPoolClientCallbacks

▸ **updateUserPoolClientCallbacks**(`redirects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `redirects` | [`UserPoolClientCallbackUrls`](#user-pool-client-callback-urls) |

#### Returns

`void`

# I Spa Authorization

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / ISpaAuthorization

# Interface: ISpaAuthorization

## Hierarchy

- [`IAuthorization`](#i-authorization)

  ↳ **`ISpaAuthorization`**

## Implemented by

- [`SpaAuthorization`](#spa-authorization)

## Table of contents

### Properties

- [mode](#mode)
- [redirectPaths](#redirectpaths)
- [signOutUrlPath](#signouturlpath)

### Methods

- [createAdditionalBehaviors](#createadditionalbehaviors)
- [createDefaultBehavior](#createdefaultbehavior)
- [updateUserPoolClientCallbacks](#updateuserpoolclientcallbacks)

## Properties

### mode

• `Readonly` **mode**: [`SPA`](#spa)

___

### redirectPaths

• `Readonly` **redirectPaths**: [`RedirectPaths`](#redirect-paths)

#### Inherited from

[IAuthorization](#i-authorization).[redirectPaths](#redirectpaths)

___

### signOutUrlPath

• `Readonly` **signOutUrlPath**: `string`

#### Inherited from

[IAuthorization](#i-authorization).[signOutUrlPath](#signouturlpath)

## Methods

### createAdditionalBehaviors

▸ **createAdditionalBehaviors**(`origin`, `options?`): `Record`<`string`, `BehaviorOptions`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `IOrigin` |
| `options?` | `AddBehaviorOptions` |

#### Returns

`Record`<`string`, `BehaviorOptions`\>

#### Inherited from

[IAuthorization](#i-authorization).[createAdditionalBehaviors](#createadditionalbehaviors)

___

### createDefaultBehavior

▸ **createDefaultBehavior**(`origin`, `options?`): `BehaviorOptions`

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `IOrigin` |
| `options?` | `AddBehaviorOptions` |

#### Returns

`BehaviorOptions`

#### Inherited from

[IAuthorization](#i-authorization).[createDefaultBehavior](#createdefaultbehavior)

___

### updateUserPoolClientCallbacks

▸ **updateUserPoolClientCallbacks**(`redirects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `redirects` | [`UserPoolClientCallbackUrls`](#user-pool-client-callback-urls) |

#### Returns

`void`

#### Inherited from

[IAuthorization](#i-authorization).[updateUserPoolClientCallbacks](#updateuserpoolclientcallbacks)

# I Static Site Authorization

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / IStaticSiteAuthorization

# Interface: IStaticSiteAuthorization

## Hierarchy

- [`IAuthorization`](#i-authorization)

  ↳ **`IStaticSiteAuthorization`**

## Implemented by

- [`StaticSiteAuthorization`](#static-site-authorization)

## Table of contents

### Properties

- [mode](#mode)
- [redirectPaths](#redirectpaths)
- [signOutUrlPath](#signouturlpath)

### Methods

- [createAdditionalBehaviors](#createadditionalbehaviors)
- [createDefaultBehavior](#createdefaultbehavior)
- [updateUserPoolClientCallbacks](#updateuserpoolclientcallbacks)

## Properties

### mode

• `Readonly` **mode**: [`STATIC_SITE`](#static_site)

___

### redirectPaths

• `Readonly` **redirectPaths**: [`RedirectPaths`](#redirect-paths)

#### Inherited from

[IAuthorization](#i-authorization).[redirectPaths](#redirectpaths)

___

### signOutUrlPath

• `Readonly` **signOutUrlPath**: `string`

#### Inherited from

[IAuthorization](#i-authorization).[signOutUrlPath](#signouturlpath)

## Methods

### createAdditionalBehaviors

▸ **createAdditionalBehaviors**(`origin`, `options?`): `Record`<`string`, `BehaviorOptions`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `IOrigin` |
| `options?` | `AddBehaviorOptions` |

#### Returns

`Record`<`string`, `BehaviorOptions`\>

#### Inherited from

[IAuthorization](#i-authorization).[createAdditionalBehaviors](#createadditionalbehaviors)

___

### createDefaultBehavior

▸ **createDefaultBehavior**(`origin`, `options?`): `BehaviorOptions`

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | `IOrigin` |
| `options?` | `AddBehaviorOptions` |

#### Returns

`BehaviorOptions`

#### Inherited from

[IAuthorization](#i-authorization).[createDefaultBehavior](#createdefaultbehavior)

___

### updateUserPoolClientCallbacks

▸ **updateUserPoolClientCallbacks**(`redirects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `redirects` | [`UserPoolClientCallbackUrls`](#user-pool-client-callback-urls) |

#### Returns

`void`

#### Inherited from

[IAuthorization](#i-authorization).[updateUserPoolClientCallbacks](#updateuserpoolclientcallbacks)

# Redirect Paths

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / RedirectPaths

# Interface: RedirectPaths

## Table of contents

### Properties

- [authRefresh](#authrefresh)
- [signIn](#signin)
- [signOut](#signout)

## Properties

### authRefresh

• `Readonly` **authRefresh**: `string`

___

### signIn

• `Readonly` **signIn**: `string`

___

### signOut

• `Readonly` **signOut**: `string`

# Retrieve User Pool Client Secret Props

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / RetrieveUserPoolClientSecretProps

# Interface: RetrieveUserPoolClientSecretProps

## Table of contents

### Properties

- [userPool](#userpool)
- [userPoolClient](#userpoolclient)

## Properties

### userPool

• `Readonly` **userPool**: `IUserPool`

___

### userPoolClient

• `Readonly` **userPoolClient**: `IUserPoolClient`

# Secret Generator Props

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / SecretGeneratorProps

# Interface: SecretGeneratorProps

## Table of contents

### Properties

- [allowedCharacters](#allowedcharacters)
- [length](#length)

## Properties

### allowedCharacters

• `Optional` `Readonly` **allowedCharacters**: `string`

___

### length

• `Optional` `Readonly` **length**: `number`

# Spa Distribution Props

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / SpaDistributionProps

# Interface: SpaDistributionProps

## Hierarchy

- [`CommonDistributionProps`](#common-distribution-props)

  ↳ **`SpaDistributionProps`**

## Table of contents

### Properties

- [authorization](#authorization)
- [certificate](#certificate)
- [comment](#comment)
- [defaultRootObject](#defaultrootobject)
- [domainNames](#domainnames)
- [enableIpv6](#enableipv6)
- [enableLogging](#enablelogging)
- [enabled](#enabled)
- [geoRestriction](#georestriction)
- [httpVersion](#httpversion)
- [logBucket](#logbucket)
- [logFilePrefix](#logfileprefix)
- [logIncludesCookies](#logincludescookies)
- [minimumProtocolVersion](#minimumprotocolversion)
- [origin](#origin)
- [priceClass](#priceclass)
- [removalPolicy](#removalpolicy)
- [ttl](#ttl)
- [webAclId](#webaclid)

## Properties

### authorization

• `Readonly` **authorization**: [`ISpaAuthorization`](#i-spa-authorization)

___

### certificate

• `Optional` `Readonly` **certificate**: `ICertificate`

A certificate to associate with the distribution. The certificate must be located in N. Virginia (us-east-1).

**`default`** - the CloudFront wildcard certificate (*.cloudfront.net) will be used.

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[certificate](#certificate)

___

### comment

• `Optional` `Readonly` **comment**: `string`

Any comments you want to include about the distribution.

**`default`** - no comment

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[comment](#comment)

___

### defaultRootObject

• `Optional` `Readonly` **defaultRootObject**: `string`

The object that you want CloudFront to request from your origin (for example, index.html)
when a viewer requests the root URL for your distribution. If no default object is set, the
request goes to the origin's root (e.g., example.com/).

**`default`** - index.html

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[defaultRootObject](#defaultrootobject)

___

### domainNames

• `Optional` `Readonly` **domainNames**: `string`[]

Alternative domain names for this distribution.

If you want to use your own domain name, such as www.example.com, instead of the cloudfront.net domain name,
you can add an alternate domain name to your distribution. If you attach a certificate to the distribution,
you must add (at least one of) the domain names of the certificate to this list.

**`default`** - The distribution will only support the default generated name (e.g., d111111abcdef8.cloudfront.net)

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[domainNames](#domainnames)

___

### enableIpv6

• `Optional` `Readonly` **enableIpv6**: `boolean`

Whether CloudFront will respond to IPv6 DNS requests with an IPv6 address.

If you specify false, CloudFront responds to IPv6 DNS requests with the DNS response code NOERROR and with no IP addresses.
This allows viewers to submit a second request, for an IPv4 address for your distribution.

**`default`** true

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[enableIpv6](#enableipv6)

___

### enableLogging

• `Optional` `Readonly` **enableLogging**: `boolean`

Enable access logging for the distribution.

**`default`** - false, unless `logBucket` is specified.

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[enableLogging](#enablelogging)

___

### enabled

• `Optional` `Readonly` **enabled**: `boolean`

Enable or disable the distribution.

**`default`** true

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[enabled](#enabled)

___

### geoRestriction

• `Optional` `Readonly` **geoRestriction**: `GeoRestriction`

Controls the countries in which your content is distributed.

**`default`** - No geographic restrictions

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[geoRestriction](#georestriction)

___

### httpVersion

• `Optional` `Readonly` **httpVersion**: `HttpVersion`

Specify the maximum HTTP version that you want viewers to use to communicate with CloudFront.

For viewers and CloudFront to use HTTP/2, viewers must support TLS 1.2 or later, and must support server name identification (SNI).

**`default`** HttpVersion.HTTP2

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[httpVersion](#httpversion)

___

### logBucket

• `Optional` `Readonly` **logBucket**: `IBucket`

The Amazon S3 bucket to store the access logs in.

**`default`** - A bucket is created if `enableLogging` is true

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[logBucket](#logbucket)

___

### logFilePrefix

• `Optional` `Readonly` **logFilePrefix**: `string`

An optional string that you want CloudFront to prefix to the access log filenames for this distribution.

**`default`** - no prefix

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[logFilePrefix](#logfileprefix)

___

### logIncludesCookies

• `Optional` `Readonly` **logIncludesCookies**: `boolean`

Specifies whether you want CloudFront to include cookies in access logs

**`default`** false

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[logIncludesCookies](#logincludescookies)

___

### minimumProtocolVersion

• `Optional` `Readonly` **minimumProtocolVersion**: `SecurityPolicyProtocol`

The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections.

CloudFront serves your objects only to browsers or devices that support at
least the SSL version that you specify.

**`default`** SecurityPolicyProtocol.TLS_V1_2_2019

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[minimumProtocolVersion](#minimumprotocolversion)

___

### origin

• `Optional` `Readonly` **origin**: `IOrigin`

The origin that you want CloudFront to route requests

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[origin](#origin)

___

### priceClass

• `Optional` `Readonly` **priceClass**: `PriceClass`

The price class that corresponds with the maximum price that you want to pay for CloudFront service.
If you specify PriceClass_All, CloudFront responds to requests for your objects from all CloudFront edge locations.
If you specify a price class other than PriceClass_All, CloudFront serves your objects from the CloudFront edge location
that has the lowest latency among the edge locations in your price class.

**`default`** PriceClass.PRICE_CLASS_100

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[priceClass](#priceclass)

___

### removalPolicy

• `Optional` `Readonly` **removalPolicy**: `RemovalPolicy`

**`default`** Destroy

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[removalPolicy](#removalpolicy)

___

### ttl

• `Optional` `Readonly` **ttl**: `Duration`

The minimum amount of time, in seconds, that you want CloudFront
to cache the HTTP status code specified in ErrorCode.

**`default`** 300 seconds

___

### webAclId

• `Optional` `Readonly` **webAclId**: `string`

Unique identifier that specifies the AWS WAF web ACL to associate with this CloudFront distribution.

To specify a web ACL created using the latest version of AWS WAF, use the ACL ARN, for example
`arn:aws:wafv2:us-east-1:123456789012:global/webacl/ExampleWebACL/473e64fd-f30b-4765-81a0-62ad96dd167a`.
To specify a web ACL created using AWS WAF Classic, use the ACL ID, for example `473e64fd-f30b-4765-81a0-62ad96dd167a`.

**`see`** https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html

**`see`** https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CreateDistribution.html#API_CreateDistribution_RequestParameters.

**`default`** - No AWS Web Application Firewall web access control list (web ACL).

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[webAclId](#webaclid)

# Static Site Distribution Props

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / StaticSiteDistributionProps

# Interface: StaticSiteDistributionProps

## Hierarchy

- [`CommonDistributionProps`](#common-distribution-props)

  ↳ **`StaticSiteDistributionProps`**

## Table of contents

### Properties

- [authorization](#authorization)
- [certificate](#certificate)
- [comment](#comment)
- [defaultRootObject](#defaultrootobject)
- [domainNames](#domainnames)
- [enableIpv6](#enableipv6)
- [enableLogging](#enablelogging)
- [enabled](#enabled)
- [errorResponses](#errorresponses)
- [geoRestriction](#georestriction)
- [httpVersion](#httpversion)
- [logBucket](#logbucket)
- [logFilePrefix](#logfileprefix)
- [logIncludesCookies](#logincludescookies)
- [minimumProtocolVersion](#minimumprotocolversion)
- [origin](#origin)
- [priceClass](#priceclass)
- [removalPolicy](#removalpolicy)
- [webAclId](#webaclid)

## Properties

### authorization

• `Readonly` **authorization**: [`IStaticSiteAuthorization`](#i-static-site-authorization)

___

### certificate

• `Optional` `Readonly` **certificate**: `ICertificate`

A certificate to associate with the distribution. The certificate must be located in N. Virginia (us-east-1).

**`default`** - the CloudFront wildcard certificate (*.cloudfront.net) will be used.

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[certificate](#certificate)

___

### comment

• `Optional` `Readonly` **comment**: `string`

Any comments you want to include about the distribution.

**`default`** - no comment

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[comment](#comment)

___

### defaultRootObject

• `Optional` `Readonly` **defaultRootObject**: `string`

The object that you want CloudFront to request from your origin (for example, index.html)
when a viewer requests the root URL for your distribution. If no default object is set, the
request goes to the origin's root (e.g., example.com/).

**`default`** - index.html

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[defaultRootObject](#defaultrootobject)

___

### domainNames

• `Optional` `Readonly` **domainNames**: `string`[]

Alternative domain names for this distribution.

If you want to use your own domain name, such as www.example.com, instead of the cloudfront.net domain name,
you can add an alternate domain name to your distribution. If you attach a certificate to the distribution,
you must add (at least one of) the domain names of the certificate to this list.

**`default`** - The distribution will only support the default generated name (e.g., d111111abcdef8.cloudfront.net)

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[domainNames](#domainnames)

___

### enableIpv6

• `Optional` `Readonly` **enableIpv6**: `boolean`

Whether CloudFront will respond to IPv6 DNS requests with an IPv6 address.

If you specify false, CloudFront responds to IPv6 DNS requests with the DNS response code NOERROR and with no IP addresses.
This allows viewers to submit a second request, for an IPv4 address for your distribution.

**`default`** true

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[enableIpv6](#enableipv6)

___

### enableLogging

• `Optional` `Readonly` **enableLogging**: `boolean`

Enable access logging for the distribution.

**`default`** - false, unless `logBucket` is specified.

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[enableLogging](#enablelogging)

___

### enabled

• `Optional` `Readonly` **enabled**: `boolean`

Enable or disable the distribution.

**`default`** true

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[enabled](#enabled)

___

### errorResponses

• `Optional` `Readonly` **errorResponses**: `ErrorResponse`[]

___

### geoRestriction

• `Optional` `Readonly` **geoRestriction**: `GeoRestriction`

Controls the countries in which your content is distributed.

**`default`** - No geographic restrictions

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[geoRestriction](#georestriction)

___

### httpVersion

• `Optional` `Readonly` **httpVersion**: `HttpVersion`

Specify the maximum HTTP version that you want viewers to use to communicate with CloudFront.

For viewers and CloudFront to use HTTP/2, viewers must support TLS 1.2 or later, and must support server name identification (SNI).

**`default`** HttpVersion.HTTP2

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[httpVersion](#httpversion)

___

### logBucket

• `Optional` `Readonly` **logBucket**: `IBucket`

The Amazon S3 bucket to store the access logs in.

**`default`** - A bucket is created if `enableLogging` is true

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[logBucket](#logbucket)

___

### logFilePrefix

• `Optional` `Readonly` **logFilePrefix**: `string`

An optional string that you want CloudFront to prefix to the access log filenames for this distribution.

**`default`** - no prefix

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[logFilePrefix](#logfileprefix)

___

### logIncludesCookies

• `Optional` `Readonly` **logIncludesCookies**: `boolean`

Specifies whether you want CloudFront to include cookies in access logs

**`default`** false

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[logIncludesCookies](#logincludescookies)

___

### minimumProtocolVersion

• `Optional` `Readonly` **minimumProtocolVersion**: `SecurityPolicyProtocol`

The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections.

CloudFront serves your objects only to browsers or devices that support at
least the SSL version that you specify.

**`default`** SecurityPolicyProtocol.TLS_V1_2_2019

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[minimumProtocolVersion](#minimumprotocolversion)

___

### origin

• `Optional` `Readonly` **origin**: `IOrigin`

The origin that you want CloudFront to route requests

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[origin](#origin)

___

### priceClass

• `Optional` `Readonly` **priceClass**: `PriceClass`

The price class that corresponds with the maximum price that you want to pay for CloudFront service.
If you specify PriceClass_All, CloudFront responds to requests for your objects from all CloudFront edge locations.
If you specify a price class other than PriceClass_All, CloudFront serves your objects from the CloudFront edge location
that has the lowest latency among the edge locations in your price class.

**`default`** PriceClass.PRICE_CLASS_100

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[priceClass](#priceclass)

___

### removalPolicy

• `Optional` `Readonly` **removalPolicy**: `RemovalPolicy`

**`default`** Destroy

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[removalPolicy](#removalpolicy)

___

### webAclId

• `Optional` `Readonly` **webAclId**: `string`

Unique identifier that specifies the AWS WAF web ACL to associate with this CloudFront distribution.

To specify a web ACL created using the latest version of AWS WAF, use the ACL ARN, for example
`arn:aws:wafv2:us-east-1:123456789012:global/webacl/ExampleWebACL/473e64fd-f30b-4765-81a0-62ad96dd167a`.
To specify a web ACL created using AWS WAF Classic, use the ACL ID, for example `473e64fd-f30b-4765-81a0-62ad96dd167a`.

**`see`** https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html

**`see`** https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CreateDistribution.html#API_CreateDistribution_RequestParameters.

**`default`** - No AWS Web Application Firewall web access control list (web ACL).

#### Inherited from

[CommonDistributionProps](#common-distribution-props).[webAclId](#webaclid)

# User Pool Client Callback Urls

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / UserPoolClientCallbackUrls

# Interface: UserPoolClientCallbackUrls

## Table of contents

### Properties

- [callbackUrls](#callbackurls)
- [logoutUrls](#logouturls)

## Properties

### callbackUrls

• `Readonly` **callbackUrls**: `string`[]

A list of allowed redirect (callback) URLs for the identity providers.

___

### logoutUrls

• `Readonly` **logoutUrls**: `string`[]

A list of allowed logout URLs for the identity providers.

# User Pool Client Redirects Props

[@cloudcomponents/cdk-cloudfront-authorization](#readme) / UserPoolClientRedirectsProps

# Interface: UserPoolClientRedirectsProps

## Table of contents

### Properties

- [callbackUrls](#callbackurls)
- [identityProviders](#identityproviders)
- [logoutUrls](#logouturls)
- [oauthScopes](#oauthscopes)
- [userPool](#userpool)
- [userPoolClient](#userpoolclient)

## Properties

### callbackUrls

• `Readonly` **callbackUrls**: `string`[]

___

### identityProviders

• `Readonly` **identityProviders**: `UserPoolClientIdentityProvider`[]

___

### logoutUrls

• `Readonly` **logoutUrls**: `string`[]

___

### oauthScopes

• `Readonly` **oauthScopes**: `OAuthScope`[]

___

### userPool

• `Readonly` **userPool**: `IUserPool`

___

### userPoolClient

• `Readonly` **userPoolClient**: `IUserPoolClient`
