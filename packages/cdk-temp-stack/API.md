# README

@cloudcomponents/cdk-temp-stack

# @cloudcomponents/cdk-temp-stack

## Table of contents

### Classes

- [TempStack](#temp-stack)
- [TimeToLive](#time-to-live)

### Interfaces

- [TempStackProps](#temp-stack-props)
- [TimeToLiveProps](#time-to-live-props)

# Temp Stack

[@cloudcomponents/cdk-temp-stack](#readme) / TempStack

# Class: TempStack

## Hierarchy

- `Stack`

  ↳ **`TempStack`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [\_versionReportingEnabled](#_versionreportingenabled)
- [account](#account)
- [artifactId](#artifactid)
- [environment](#environment)
- [nestedStackResource](#nestedstackresource)
- [node](#node)
- [region](#region)
- [synthesizer](#synthesizer)
- [tags](#tags)
- [templateFile](#templatefile)
- [templateOptions](#templateoptions)
- [terminationProtection](#terminationprotection)

### Accessors

- [availabilityZones](#availabilityzones)
- [dependencies](#dependencies)
- [maxResources](#maxresources)
- [nested](#nested)
- [nestedStackParent](#nestedstackparent)
- [notificationArns](#notificationarns)
- [parentStack](#parentstack)
- [partition](#partition)
- [stackId](#stackid)
- [stackName](#stackname)
- [urlSuffix](#urlsuffix)

### Methods

- [\_addAssemblyDependency](#_addassemblydependency)
- [\_synthesizeTemplate](#_synthesizetemplate)
- [\_toCloudFormation](#_tocloudformation)
- [\_validateId](#_validateid)
- [addDependency](#adddependency)
- [addDockerImageAsset](#adddockerimageasset)
- [addFileAsset](#addfileasset)
- [addTransform](#addtransform)
- [allocateLogicalId](#allocatelogicalid)
- [exportValue](#exportvalue)
- [formatArn](#formatarn)
- [getLogicalId](#getlogicalid)
- [onPrepare](#onprepare)
- [onSynthesize](#onsynthesize)
- [onValidate](#onvalidate)
- [parseArn](#parsearn)
- [prepare](#prepare)
- [prepareCrossReference](#preparecrossreference)
- [renameLogicalId](#renamelogicalid)
- [reportMissingContext](#reportmissingcontext)
- [reportMissingContextKey](#reportmissingcontextkey)
- [resolve](#resolve)
- [splitArn](#splitarn)
- [synthesize](#synthesize)
- [toJsonString](#tojsonstring)
- [toString](#tostring)
- [validate](#validate)
- [isConstruct](#isconstruct)
- [isStack](#isstack)
- [of](#of)

## Constructors

### constructor

• **new TempStack**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`TempStackProps`](#temp-stack-props) |

#### Overrides

Stack.constructor

## Properties

### \_versionReportingEnabled

• `Readonly` **\_versionReportingEnabled**: `boolean`

Whether version reporting is enabled for this stack

Controls whether the CDK Metadata resource is injected

**`internal`**

#### Inherited from

Stack.\_versionReportingEnabled

___

### account

• `Readonly` **account**: `string`

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
    either be a concerete account (e.g. `585695031111`) or the
    `Aws.accountId` token.
3. `Aws.accountId`, which represents the CloudFormation intrinsic reference
    `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concerete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

**`stability`** stable

#### Inherited from

Stack.account

___

### artifactId

• `Readonly` **artifactId**: `string`

The ID of the cloud assembly artifact for this stack.

**`stability`** stable

#### Inherited from

Stack.artifactId

___

### environment

• `Readonly` **environment**: `string`

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.account` or `Aws.region`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

**`stability`** stable

#### Inherited from

Stack.environment

___

### nestedStackResource

• `Optional` `Readonly` **nestedStackResource**: `CfnResource`

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

**`stability`** stable

#### Inherited from

Stack.nestedStackResource

___

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

Stack.node

___

### region

• `Readonly` **region**: `string`

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
    either be a concerete region (e.g. `us-west-2`) or the `Aws.region`
    token.
3. `Aws.region`, which is represents the CloudFormation intrinsic reference
    `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concerete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

**`stability`** stable

#### Inherited from

Stack.region

___

### synthesizer

• `Readonly` **synthesizer**: `IStackSynthesizer`

Synthesis method for this stack.

**`stability`** stable

#### Inherited from

Stack.synthesizer

___

### tags

• `Readonly` **tags**: `TagManager`

Tags to be applied to the stack.

**`stability`** stable

#### Inherited from

Stack.tags

___

### templateFile

• `Readonly` **templateFile**: `string`

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

**`stability`** stable

#### Inherited from

Stack.templateFile

___

### templateOptions

• `Readonly` **templateOptions**: `ITemplateOptions`

Options for CloudFormation template (like version, transform, description).

**`stability`** stable

#### Inherited from

Stack.templateOptions

___

### terminationProtection

• `Optional` `Readonly` **terminationProtection**: `boolean`

Whether termination protection is enabled for this stack.

**`stability`** stable

#### Inherited from

Stack.terminationProtection

## Accessors

### availabilityZones

• `get` **availabilityZones**(): `string`[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

**`stability`** stable

#### Returns

`string`[]

#### Inherited from

Stack.availabilityZones

___

### dependencies

• `get` **dependencies**(): `Stack`[]

Return the stacks this stack depends on.

**`stability`** stable

#### Returns

`Stack`[]

#### Inherited from

Stack.dependencies

___

### maxResources

• `Private` `get` **maxResources**(): `any`

Maximum number of resources in the stack

Set to 0 to mean "unlimited".

#### Returns

`any`

#### Inherited from

Stack.maxResources

___

### nested

• `get` **nested**(): `boolean`

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

**`stability`** stable

#### Returns

`boolean`

#### Inherited from

Stack.nested

___

### nestedStackParent

• `get` **nestedStackParent**(): `undefined` \| `Stack`

If this is a nested stack, returns it's parent stack.

**`stability`** stable

#### Returns

`undefined` \| `Stack`

#### Inherited from

Stack.nestedStackParent

___

### notificationArns

• `get` **notificationArns**(): `string`[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

**`stability`** stable

#### Returns

`string`[]

#### Inherited from

Stack.notificationArns

___

### parentStack

• `get` **parentStack**(): `undefined` \| `Stack`

(deprecated) Returns the parent of a nested stack.

**`deprecated`** use `nestedStackParent`

#### Returns

`undefined` \| `Stack`

#### Inherited from

Stack.parentStack

___

### partition

• `get` **partition**(): `string`

The partition in which this stack is defined.

**`stability`** stable

#### Returns

`string`

#### Inherited from

Stack.partition

___

### stackId

• `get` **stackId**(): `string`

The ID of the stack.

**`stability`** stable

**`example`**

// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'

#### Returns

`string`

#### Inherited from

Stack.stackId

___

### stackName

• `get` **stackName**(): `string`

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.stackName` directly.

**`stability`** stable

#### Returns

`string`

#### Inherited from

Stack.stackName

___

### urlSuffix

• `get` **urlSuffix**(): `string`

The Amazon domain suffix for the region in which this stack is defined.

**`stability`** stable

#### Returns

`string`

#### Inherited from

Stack.urlSuffix

## Methods

### \_addAssemblyDependency

▸ **_addAssemblyDependency**(`target`, `reason?`): `void`

Called implicitly by the `addDependency` helper function in order to
realize a dependency between two top-level stacks at the assembly level.

Use `stack.addDependency` to define the dependency between any two stacks,
and take into account nested stack relationships.

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Stack` |
| `reason?` | `string` |

#### Returns

`void`

#### Inherited from

Stack.\_addAssemblyDependency

___

### \_synthesizeTemplate

▸ **_synthesizeTemplate**(`session`, `lookupRoleArn?`): `void`

Synthesizes the cloudformation template into a cloud assembly.

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `session` | `ISynthesisSession` |
| `lookupRoleArn?` | `string` |

#### Returns

`void`

#### Inherited from

Stack.\_synthesizeTemplate

___

### \_toCloudFormation

▸ `Protected` **_toCloudFormation**(): `any`

Returns the CloudFormation template for this stack by traversing
the tree and invoking _toCloudFormation() on all Entity objects.

**`internal`**

#### Returns

`any`

#### Inherited from

Stack.\_toCloudFormation

___

### \_validateId

▸ `Protected` **_validateId**(`name`): `void`

Validate stack name

CloudFormation stack names can include dashes in addition to the regular identifier
character classes, and we don't allow one of the magic markers.

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

#### Inherited from

Stack.\_validateId

___

### addDependency

▸ **addDependency**(`target`, `reason?`): `void`

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Stack` |
| `reason?` | `string` |

#### Returns

`void`

#### Inherited from

Stack.addDependency

___

### addDockerImageAsset

▸ **addDockerImageAsset**(`asset`): `DockerImageAssetLocation`

(deprecated) Register a docker image asset on this Stack.

**`deprecated`** Use `stack.synthesizer.addDockerImageAsset()` if you are calling,
and a different `IStackSynthesizer` class if you are implementing.

#### Parameters

| Name | Type |
| :------ | :------ |
| `asset` | `DockerImageAssetSource` |

#### Returns

`DockerImageAssetLocation`

#### Inherited from

Stack.addDockerImageAsset

___

### addFileAsset

▸ **addFileAsset**(`asset`): `FileAssetLocation`

(deprecated) Register a file asset on this Stack.

**`deprecated`** Use `stack.synthesizer.addFileAsset()` if you are calling,
and a different IStackSynthesizer class if you are implementing.

#### Parameters

| Name | Type |
| :------ | :------ |
| `asset` | `FileAssetSource` |

#### Returns

`FileAssetLocation`

#### Inherited from

Stack.addFileAsset

___

### addTransform

▸ **addTransform**(`transform`): `void`

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

**`see`** https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html

**`stability`** stable

**`example`**

declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transform` | `string` | The transform to add. |

#### Returns

`void`

#### Inherited from

Stack.addTransform

___

### allocateLogicalId

▸ `Protected` **allocateLogicalId**(`cfnElement`): `string`

Returns the naming scheme used to allocate logical IDs.

By default, uses
the `HashedAddressingScheme` but this method can be overridden to customize
this behavior.

In order to make sure logical IDs are unique and stable, we hash the resource
construct tree path (i.e. toplevel/secondlevel/.../myresource) and add it as
a suffix to the path components joined without a separator (CloudFormation
IDs only allow alphanumeric characters).

The result will be:

   <path.join('')><md5(path.join('/')>
     "human"      "hash"

If the "human" part of the ID exceeds 240 characters, we simply trim it so
the total ID doesn't exceed CloudFormation's 255 character limit.

We only take 8 characters from the md5 hash (0.000005 chance of collision).

Special cases:

- If the path only contains a single component (i.e. it's a top-level
   resource), we won't add the hash to it. The hash is not needed for
   disamiguation and also, it allows for a more straightforward migration an
   existing CloudFormation template to a CDK stack without logical ID changes
   (or renames).
- For aesthetic reasons, if the last components of the path are the same
   (i.e. `L1/L2/Pipeline/Pipeline`), they will be de-duplicated to make the
   resulting human portion of the ID more pleasing: `L1L2Pipeline<HASH>`
   instead of `L1L2PipelinePipeline<HASH>`
- If a component is named "Default" it will be omitted from the path. This
   allows refactoring higher level abstractions around constructs without affecting
   the IDs of already deployed resources.
- If a component is named "Resource" it will be omitted from the user-visible
   path, but included in the hash. This reduces visual noise in the human readable
   part of the identifier.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cfnElement` | `CfnElement` | The element for which the logical ID is allocated. |

#### Returns

`string`

#### Inherited from

Stack.allocateLogicalId

___

### exportValue

▸ **exportValue**(`exportedValue`, `options?`): `string`

Create a CloudFormation Export for a value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
   stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
   remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
   will make sure the CloudFormation Export continues to exist while the relationship
   between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `exportedValue` | `any` |
| `options?` | `ExportValueOptions` |

#### Returns

`string`

#### Inherited from

Stack.exportValue

___

### formatArn

▸ **formatArn**(`components`): `string`

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

   arn:{partition}:{service}:{region}:{account}:{resource}{sep}}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `components` | `ArnComponents` |

#### Returns

`string`

#### Inherited from

Stack.formatArn

___

### getLogicalId

▸ **getLogicalId**(`element`): `string`

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `CfnElement` | The CloudFormation element for which a logical identity is needed. |

#### Returns

`string`

#### Inherited from

Stack.getLogicalId

___

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

Stack.onPrepare

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

Stack.onSynthesize

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

Stack.onValidate

___

### parseArn

▸ **parseArn**(`arn`, `sepIfToken?`, `hasName?`): `ArnComponents`

(deprecated) Given an ARN, parses it and returns components.

IF THE ARN IS A CONCRETE STRING...

...it will be parsed and validated. The separator (`sep`) will be set to '/'
if the 6th component includes a '/', in which case, `resource` will be set
to the value before the '/' and `resourceName` will be the rest. In case
there is no '/', `resource` will be set to the 6th components and
`resourceName` will be set to the rest of the string.

IF THE ARN IS A TOKEN...

...it cannot be validated, since we don't have the actual value yet at the
time of this function call. You will have to supply `sepIfToken` and
whether or not ARNs of the expected format usually have resource names
in order to parse it properly. The resulting `ArnComponents` object will
contain tokens for the subexpressions of the ARN, not string literals.

If the resource name could possibly contain the separator char, the actual
resource name cannot be properly parsed. This only occurs if the separator
char is '/', and happens for example for S3 object ARNs, IAM Role ARNs,
IAM OIDC Provider ARNs, etc. To properly extract the resource name from a
Tokenized ARN, you must know the resource type and call
`Arn.extractResourceName`.

**`deprecated`** use splitArn instead

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arn` | `string` | The ARN string to parse. |
| `sepIfToken?` | `string` | The separator used to separate resource from resourceName. |
| `hasName?` | `boolean` | Whether there is a name component in the ARN at all. |

#### Returns

`ArnComponents`

an ArnComponents object which allows access to the various
components of the ARN.

#### Inherited from

Stack.parseArn

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

Stack.prepare

___

### prepareCrossReference

▸ `Protected` **prepareCrossReference**(`_sourceStack`, `reference`): `IResolvable`

(deprecated) Deprecated.

**`see`** https://github.com/aws/aws-cdk/pull/7187

**`deprecated`** cross reference handling has been moved to `App.prepare()`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_sourceStack` | `Stack` |
| `reference` | `Reference` |

#### Returns

`IResolvable`

reference itself without any change

#### Inherited from

Stack.prepareCrossReference

___

### renameLogicalId

▸ **renameLogicalId**(`oldId`, `newId`): `void`

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldId` | `string` |
| `newId` | `string` |

#### Returns

`void`

#### Inherited from

Stack.renameLogicalId

___

### reportMissingContext

▸ **reportMissingContext**(`report`): `void`

(deprecated) DEPRECATED.

**`deprecated`** use `reportMissingContextKey()`

#### Parameters

| Name | Type |
| :------ | :------ |
| `report` | `MissingContext` |

#### Returns

`void`

#### Inherited from

Stack.reportMissingContext

___

### reportMissingContextKey

▸ **reportMissingContextKey**(`report`): `void`

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `report` | `MissingContext` | The set of parameters needed to obtain the context. |

#### Returns

`void`

#### Inherited from

Stack.reportMissingContextKey

___

### resolve

▸ **resolve**(`obj`): `any`

Resolve a tokenized value in the context of the current stack.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

`any`

#### Inherited from

Stack.resolve

___

### splitArn

▸ **splitArn**(`arn`, `arnFormat`): `ArnComponents`

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arn` | `string` | the ARN to split into its components. |
| `arnFormat` | `ArnFormat` | the expected format of 'arn' - depends on what format the service 'arn' represents uses. |

#### Returns

`ArnComponents`

#### Inherited from

Stack.splitArn

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

Stack.synthesize

___

### toJsonString

▸ **toJsonString**(`obj`, `space?`): `string`

Convert an object, potentially containing tokens, to a JSON string.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |
| `space?` | `number` |

#### Returns

`string`

#### Inherited from

Stack.toJsonString

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

Stack.toString

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

Stack.validate

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

Stack.isConstruct

___

### isStack

▸ `Static` **isStack**(`x`): x is Stack

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `any` |

#### Returns

x is Stack

#### Inherited from

Stack.isStack

___

### of

▸ `Static` **of**(`construct`): `Stack`

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `construct` | `IConstruct` | The construct to start the search from. |

#### Returns

`Stack`

#### Inherited from

Stack.of

# Time To Live

[@cloudcomponents/cdk-temp-stack](#readme) / TimeToLive

# Class: TimeToLive

## Hierarchy

- `Construct`

  ↳ **`TimeToLive`**

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

• **new TimeToLive**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`TimeToLiveProps`](#time-to-live-props) |

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

#### Returns

`void`

#### Overrides

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

#### Returns

`string`[]

#### Overrides

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

# Temp Stack Props

[@cloudcomponents/cdk-temp-stack](#readme) / TempStackProps

# Interface: TempStackProps

## Hierarchy

- `StackProps`

  ↳ **`TempStackProps`**

## Table of contents

### Properties

- [analyticsReporting](#analyticsreporting)
- [description](#description)
- [env](#env)
- [stackName](#stackname)
- [synthesizer](#synthesizer)
- [tags](#tags)
- [terminationProtection](#terminationprotection)
- [ttl](#ttl)

## Properties

### analyticsReporting

• `Optional` `Readonly` **analyticsReporting**: `boolean`

Include runtime versioning information in this Stack.

**`default`** `analyticsReporting` setting of containing `App`, or value of
'aws:cdk:version-reporting' context key

**`stability`** stable

#### Inherited from

StackProps.analyticsReporting

___

### description

• `Optional` `Readonly` **description**: `string`

A description of the stack.

**`default`** - No description.

**`stability`** stable

#### Inherited from

StackProps.description

___

### env

• `Optional` `Readonly` **env**: `Environment`

The AWS environment (account/region) where this stack will be deployed.

Set the `region`/`account` fields of `env` to either a concrete value to
select the indicated environment (recommended for production stacks), or to
the values of environment variables
`CDK_DEFAULT_REGION`/`CDK_DEFAULT_ACCOUNT` to let the target environment
depend on the AWS credentials/configuration that the CDK CLI is executed
under (recommended for development stacks).

If the `Stack` is instantiated inside a `Stage`, any undefined
`region`/`account` fields from `env` will default to the same field on the
encompassing `Stage`, if configured there.

If either `region` or `account` are not set nor inherited from `Stage`, the
Stack will be considered "*environment-agnostic*"". Environment-agnostic
stacks can be deployed to any environment but may not be able to take
advantage of all features of the CDK. For example, they will not be able to
use environmental context lookups such as `ec2.Vpc.fromLookup` and will not
automatically translate Service Principals to the right format based on the
environment's AWS partition, and other such enhancements.

**`default`** - The environment of the containing `Stage` if available,
otherwise create the stack will be environment-agnostic.

**`stability`** stable

**`example`**

// Use a concrete account and region to deploy this stack to:
// `.account` and `.region` will simply return these values.
new Stack(app, 'Stack1', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  },
});

// Use the CLI's current credentials to determine the target environment:
// `.account` and `.region` will reflect the account+region the CLI
// is configured to use (based on the user CLI credentials)
new Stack(app, 'Stack2', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
});

// Define multiple stacks stage associated with an environment
const myStage = new Stage(app, 'MyStage', {
  env: {
    account: '123456789012',
    region: 'us-east-1'
  }
});

// both of these stacks will use the stage's account/region:
// `.account` and `.region` will resolve to the concrete values as above
new MyStack(myStage, 'Stack1');
new YourStack(myStage, 'Stack2');

// Define an environment-agnostic stack:
// `.account` and `.region` will resolve to `{ "Ref": "AWS::AccountId" }` and `{ "Ref": "AWS::Region" }` respectively.
// which will only resolve to actual values by CloudFormation during deployment.
new MyStack(app, 'Stack1');

#### Inherited from

StackProps.env

___

### stackName

• `Optional` `Readonly` **stackName**: `string`

Name to deploy the stack with.

**`default`** - Derived from construct path.

**`stability`** stable

#### Inherited from

StackProps.stackName

___

### synthesizer

• `Optional` `Readonly` **synthesizer**: `IStackSynthesizer`

Synthesis method to use while deploying this stack.

**`default`** - `DefaultStackSynthesizer` if the `@aws-cdk/core:newStyleStackSynthesis` feature flag
is set, `LegacyStackSynthesizer` otherwise.

**`stability`** stable

#### Inherited from

StackProps.synthesizer

___

### tags

• `Optional` `Readonly` **tags**: `Object`

Stack tags that will be applied to all the taggable resources and the stack itself.

**`default`** {}

**`stability`** stable

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

StackProps.tags

___

### terminationProtection

• `Optional` `Readonly` **terminationProtection**: `boolean`

Whether to enable termination protection for this stack.

**`default`** false

**`stability`** stable

#### Inherited from

StackProps.terminationProtection

___

### ttl

• `Readonly` **ttl**: `Duration`

Specifies the Time to Live (TTL) settings for the stack.

# Time To Live Props

[@cloudcomponents/cdk-temp-stack](#readme) / TimeToLiveProps

# Interface: TimeToLiveProps

## Table of contents

### Properties

- [ttl](#ttl)

## Properties

### ttl

• `Readonly` **ttl**: `Duration`

Specifies the Time to Live (TTL) settings for the stack.
