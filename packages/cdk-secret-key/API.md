# README

@cloudcomponents/cdk-secret-key

# @cloudcomponents/cdk-secret-key

## Table of contents

### Enumerations

- [KeyType](#key-type)

### Classes

- [SecretKey](#secret-key)
- [SecretKeyStore](#secret-key-store)

# Secret Key

[@cloudcomponents/cdk-secret-key](#readme) / SecretKey

# Class: SecretKey

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [secretKeyType](#secretkeytype)

### Methods

- [grantRead](#grantread)
- [serialize](#serialize)
- [fromPlainText](#fromplaintext)
- [fromSSMParameter](#fromssmparameter)
- [fromSecretsManager](#fromsecretsmanager)

## Constructors

### constructor

• **new SecretKey**(`secretKeyType`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `secretKeyType` | [`KeyType`](#key-type) |

## Properties

### secretKeyType

• `Readonly` **secretKeyType**: [`KeyType`](#key-type)

## Methods

### grantRead

▸ `Optional` `Abstract` **grantRead**(`grantee`): `Grant`

#### Parameters

| Name | Type |
| :------ | :------ |
| `grantee` | `IGrantable` |

#### Returns

`Grant`

___

### serialize

▸ `Abstract` **serialize**(): `string`

#### Returns

`string`

___

### fromPlainText

▸ `Static` **fromPlainText**(`value`): [`SecretKey`](#secret-key)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

[`SecretKey`](#secret-key)

___

### fromSSMParameter

▸ `Static` **fromSSMParameter**(`secretKeyParameter`): [`SecretKey`](#secret-key)

#### Parameters

| Name | Type |
| :------ | :------ |
| `secretKeyParameter` | `IParameter` |

#### Returns

[`SecretKey`](#secret-key)

___

### fromSecretsManager

▸ `Static` **fromSecretsManager**(`secretKeySecret`, `fieldName?`): [`SecretKey`](#secret-key)

#### Parameters

| Name | Type |
| :------ | :------ |
| `secretKeySecret` | `ISecret` |
| `fieldName?` | `string` |

#### Returns

[`SecretKey`](#secret-key)

# Secret Key Store

[@cloudcomponents/cdk-secret-key](#readme) / SecretKeyStore

# Class: SecretKeyStore

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [secretKeyType](#secretkeytype)

### Methods

- [grantWrite](#grantwrite)
- [serialize](#serialize)
- [fromSSMParameter](#fromssmparameter)
- [fromSecretsManager](#fromsecretsmanager)

## Constructors

### constructor

• **new SecretKeyStore**(`secretKeyType`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `secretKeyType` | [`KeyType`](#key-type) |

## Properties

### secretKeyType

• `Readonly` **secretKeyType**: [`KeyType`](#key-type)

## Methods

### grantWrite

▸ `Abstract` **grantWrite**(`grantee`): `Grant`

#### Parameters

| Name | Type |
| :------ | :------ |
| `grantee` | `IGrantable` |

#### Returns

`Grant`

___

### serialize

▸ `Abstract` **serialize**(): `string`

#### Returns

`string`

___

### fromSSMParameter

▸ `Static` **fromSSMParameter**(`secretKeyParameter`): [`SecretKeyStore`](#secret-key-store)

#### Parameters

| Name | Type |
| :------ | :------ |
| `secretKeyParameter` | `IParameter` |

#### Returns

[`SecretKeyStore`](#secret-key-store)

___

### fromSecretsManager

▸ `Static` **fromSecretsManager**(`secretKeySecret`): [`SecretKeyStore`](#secret-key-store)

#### Parameters

| Name | Type |
| :------ | :------ |
| `secretKeySecret` | `ISecret` |

#### Returns

[`SecretKeyStore`](#secret-key-store)

# Key Type

[@cloudcomponents/cdk-secret-key](#readme) / KeyType

# Enumeration: KeyType

## Table of contents

### Enumeration members

- [PLAIN\_TEXT](#plain_text)
- [SECRETS\_MANAGER](#secrets_manager)
- [SSM\_PARAMETER](#ssm_parameter)

## Enumeration members

### PLAIN\_TEXT

• **PLAIN\_TEXT** = `"PLAIN_TEXT"`

___

### SECRETS\_MANAGER

• **SECRETS\_MANAGER** = `"SECRETS_MANAGER"`

___

### SSM\_PARAMETER

• **SSM\_PARAMETER** = `"SSM_PARAMETER"`
