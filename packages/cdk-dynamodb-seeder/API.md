# README

@cloudcomponents/cdk-dynamodb-seeder

# @cloudcomponents/cdk-dynamodb-seeder

## Table of contents

### Classes

- [DynamoDBSeeder](#dynamo-db-seeder)
- [InlineSeeds](#inline-seeds)
- [JsonFileSeeds](#json-file-seeds)
- [S3Seeds](#s-3-seeds)
- [Seeds](#seeds)

### Interfaces

- [DynamoDBSeederProps](#dynamo-db-seeder-props)
- [SeedsConfig](#seeds-config)

# Dynamo DB Seeder

[@cloudcomponents/cdk-dynamodb-seeder](#readme) / DynamoDBSeeder

# Class: DynamoDBSeeder

## Hierarchy

- `Construct`

  ↳ **`DynamoDBSeeder`**

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

• **new DynamoDBSeeder**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`DynamoDBSeederProps`](#dynamo-db-seeder-props) |

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

# Inline Seeds

[@cloudcomponents/cdk-dynamodb-seeder](#readme) / InlineSeeds

# Class: InlineSeeds

Seeds from an inline json object (limited to 4KiB).

## Hierarchy

- [`Seeds`](#seeds)

  ↳ **`InlineSeeds`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Methods

- [bind](#bind)
- [fromBucket](#frombucket)
- [fromInline](#frominline)
- [fromJsonFile](#fromjsonfile)

## Constructors

### constructor

• **new InlineSeeds**(`seeds`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `seeds` | `string` |

#### Overrides

[Seeds](#seeds).[constructor](#constructor)

## Methods

### bind

▸ **bind**(`_scope`): [`SeedsConfig`](#seeds-config)

Called when the seeder is initialized to allow this object to bind
to the stack.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_scope` | `Construct` |

#### Returns

[`SeedsConfig`](#seeds-config)

#### Overrides

[Seeds](#seeds).[bind](#bind)

___

### fromBucket

▸ `Static` **fromBucket**(`bucket`, `key`, `objectVersion?`): [`S3Seeds`](#s-3-seeds)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bucket` | `IBucket` | The S3 bucket |
| `key` | `string` | The object key |
| `objectVersion?` | `string` | Optional S3 object version |

#### Returns

[`S3Seeds`](#s-3-seeds)

`S3Seeds` associated with the specified S3 object.

#### Inherited from

[Seeds](#seeds).[fromBucket](#frombucket)

___

### fromInline

▸ `Static` **fromInline**(`seeds`): [`InlineSeeds`](#inline-seeds)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seeds` | `Record`<`string`, `unknown`\>[] | The actual json code (limited to 4KiB) |

#### Returns

[`InlineSeeds`](#inline-seeds)

`InlineSeeds` with inline seeds.

#### Inherited from

[Seeds](#seeds).[fromInline](#frominline)

___

### fromJsonFile

▸ `Static` **fromJsonFile**(`path`, `options?`): [`JsonFileSeeds`](#json-file-seeds)

Loads the seeds from a local disk path and uploads it to s3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path to json seeds file. |
| `options?` | `AssetOptions` | - |

#### Returns

[`JsonFileSeeds`](#json-file-seeds)

`JsonFileSeeds` associated with the specified S3 object.

#### Inherited from

[Seeds](#seeds).[fromJsonFile](#fromjsonfile)

# Json File Seeds

[@cloudcomponents/cdk-dynamodb-seeder](#readme) / JsonFileSeeds

# Class: JsonFileSeeds

Seeds from a local json file.

## Hierarchy

- [`Seeds`](#seeds)

  ↳ **`JsonFileSeeds`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [asset](#asset)
- [path](#path)

### Methods

- [bind](#bind)
- [fromBucket](#frombucket)
- [fromInline](#frominline)
- [fromJsonFile](#fromjsonfile)

## Constructors

### constructor

• **new JsonFileSeeds**(`path`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `options` | `AssetOptions` |

#### Overrides

[Seeds](#seeds).[constructor](#constructor)

## Properties

### asset

• `Private` `Optional` **asset**: `Asset`

___

### path

• `Readonly` **path**: `string`

## Methods

### bind

▸ **bind**(`scope`): [`SeedsConfig`](#seeds-config)

Called when the seeder is initialized to allow this object to bind
to the stack.

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |

#### Returns

[`SeedsConfig`](#seeds-config)

#### Overrides

[Seeds](#seeds).[bind](#bind)

___

### fromBucket

▸ `Static` **fromBucket**(`bucket`, `key`, `objectVersion?`): [`S3Seeds`](#s-3-seeds)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bucket` | `IBucket` | The S3 bucket |
| `key` | `string` | The object key |
| `objectVersion?` | `string` | Optional S3 object version |

#### Returns

[`S3Seeds`](#s-3-seeds)

`S3Seeds` associated with the specified S3 object.

#### Inherited from

[Seeds](#seeds).[fromBucket](#frombucket)

___

### fromInline

▸ `Static` **fromInline**(`seeds`): [`InlineSeeds`](#inline-seeds)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seeds` | `Record`<`string`, `unknown`\>[] | The actual json code (limited to 4KiB) |

#### Returns

[`InlineSeeds`](#inline-seeds)

`InlineSeeds` with inline seeds.

#### Inherited from

[Seeds](#seeds).[fromInline](#frominline)

___

### fromJsonFile

▸ `Static` **fromJsonFile**(`path`, `options?`): [`JsonFileSeeds`](#json-file-seeds)

Loads the seeds from a local disk path and uploads it to s3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path to json seeds file. |
| `options?` | `AssetOptions` | - |

#### Returns

[`JsonFileSeeds`](#json-file-seeds)

`JsonFileSeeds` associated with the specified S3 object.

#### Inherited from

[Seeds](#seeds).[fromJsonFile](#fromjsonfile)

# S 3 Seeds

[@cloudcomponents/cdk-dynamodb-seeder](#readme) / S3Seeds

# Class: S3Seeds

Seeds from an S3 archive.

## Hierarchy

- [`Seeds`](#seeds)

  ↳ **`S3Seeds`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [bucketName](#bucketname)

### Methods

- [bind](#bind)
- [fromBucket](#frombucket)
- [fromInline](#frominline)
- [fromJsonFile](#fromjsonfile)

## Constructors

### constructor

• **new S3Seeds**(`bucket`, `key`, `objectVersion?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `IBucket` |
| `key` | `string` |
| `objectVersion?` | `string` |

#### Overrides

[Seeds](#seeds).[constructor](#constructor)

## Properties

### bucketName

• `Private` **bucketName**: `string`

## Methods

### bind

▸ **bind**(`_scope`): [`SeedsConfig`](#seeds-config)

Called when the seeder is initialized to allow this object to bind
to the stack.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_scope` | `Construct` |

#### Returns

[`SeedsConfig`](#seeds-config)

#### Overrides

[Seeds](#seeds).[bind](#bind)

___

### fromBucket

▸ `Static` **fromBucket**(`bucket`, `key`, `objectVersion?`): [`S3Seeds`](#s-3-seeds)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bucket` | `IBucket` | The S3 bucket |
| `key` | `string` | The object key |
| `objectVersion?` | `string` | Optional S3 object version |

#### Returns

[`S3Seeds`](#s-3-seeds)

`S3Seeds` associated with the specified S3 object.

#### Inherited from

[Seeds](#seeds).[fromBucket](#frombucket)

___

### fromInline

▸ `Static` **fromInline**(`seeds`): [`InlineSeeds`](#inline-seeds)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seeds` | `Record`<`string`, `unknown`\>[] | The actual json code (limited to 4KiB) |

#### Returns

[`InlineSeeds`](#inline-seeds)

`InlineSeeds` with inline seeds.

#### Inherited from

[Seeds](#seeds).[fromInline](#frominline)

___

### fromJsonFile

▸ `Static` **fromJsonFile**(`path`, `options?`): [`JsonFileSeeds`](#json-file-seeds)

Loads the seeds from a local disk path and uploads it to s3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path to json seeds file. |
| `options?` | `AssetOptions` | - |

#### Returns

[`JsonFileSeeds`](#json-file-seeds)

`JsonFileSeeds` associated with the specified S3 object.

#### Inherited from

[Seeds](#seeds).[fromJsonFile](#fromjsonfile)

# Seeds

[@cloudcomponents/cdk-dynamodb-seeder](#readme) / Seeds

# Class: Seeds

## Hierarchy

- **`Seeds`**

  ↳ [`S3Seeds`](#s-3-seeds)

  ↳ [`InlineSeeds`](#inline-seeds)

  ↳ [`JsonFileSeeds`](#json-file-seeds)

## Table of contents

### Constructors

- [constructor](#constructor)

### Methods

- [bind](#bind)
- [fromBucket](#frombucket)
- [fromInline](#frominline)
- [fromJsonFile](#fromjsonfile)

## Constructors

### constructor

• **new Seeds**()

## Methods

### bind

▸ `Abstract` **bind**(`scope`): [`SeedsConfig`](#seeds-config)

Called when the seeder is initialized to allow this object to bind
to the stack.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | The binding scope. |

#### Returns

[`SeedsConfig`](#seeds-config)

___

### fromBucket

▸ `Static` **fromBucket**(`bucket`, `key`, `objectVersion?`): [`S3Seeds`](#s-3-seeds)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bucket` | `IBucket` | The S3 bucket |
| `key` | `string` | The object key |
| `objectVersion?` | `string` | Optional S3 object version |

#### Returns

[`S3Seeds`](#s-3-seeds)

`S3Seeds` associated with the specified S3 object.

___

### fromInline

▸ `Static` **fromInline**(`seeds`): [`InlineSeeds`](#inline-seeds)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seeds` | `Record`<`string`, `unknown`\>[] | The actual json code (limited to 4KiB) |

#### Returns

[`InlineSeeds`](#inline-seeds)

`InlineSeeds` with inline seeds.

___

### fromJsonFile

▸ `Static` **fromJsonFile**(`path`, `options?`): [`JsonFileSeeds`](#json-file-seeds)

Loads the seeds from a local disk path and uploads it to s3.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path to json seeds file. |
| `options?` | `AssetOptions` | - |

#### Returns

[`JsonFileSeeds`](#json-file-seeds)

`JsonFileSeeds` associated with the specified S3 object.

# Dynamo DB Seeder Props

[@cloudcomponents/cdk-dynamodb-seeder](#readme) / DynamoDBSeederProps

# Interface: DynamoDBSeederProps

## Table of contents

### Properties

- [seeds](#seeds)
- [table](#table)
- [timeout](#timeout)

## Properties

### seeds

• `Readonly` **seeds**: [`Seeds`](#seeds)

___

### table

• `Readonly` **table**: `ITable`

___

### timeout

• `Optional` `Readonly` **timeout**: `Duration`

The function execution time (in seconds) after which Lambda terminates
the function. Because the execution time affects cost, set this value
based on the function's expected execution time.

**`default`** Duration.minutes(15)

# Seeds Config

[@cloudcomponents/cdk-dynamodb-seeder](#readme) / SeedsConfig

# Interface: SeedsConfig

## Table of contents

### Properties

- [inlineSeeds](#inlineseeds)
- [s3Location](#s3location)

## Properties

### inlineSeeds

• `Optional` `Readonly` **inlineSeeds**: `string`

Inline seeds.

___

### s3Location

• `Optional` `Readonly` **s3Location**: `Location`

The location of the seeds in S3.
