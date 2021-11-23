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
