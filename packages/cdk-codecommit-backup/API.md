# README

@cloudcomponents/cdk-codecommit-backup

# @cloudcomponents/cdk-codecommit-backup

## Table of contents

### Classes

- [BackupBucket](#backup-bucket)
- [FullRegionS3CodeCommitBackup](#full-region-s-3-code-commit-backup)
- [S3CodeCommitBackup](#s-3-code-commit-backup)

### Interfaces

- [BackupBucketProps](#backup-bucket-props)
- [FullRegionS3CodeCommitBackupProps](#full-region-s-3-code-commit-backup-props)
- [S3CodeCommitBackupProps](#s-3-code-commit-backup-props)

# Backup Bucket

[@cloudcomponents/cdk-codecommit-backup](#readme) / BackupBucket

# Class: BackupBucket

## Hierarchy

- `Bucket`

  ↳ **`BackupBucket`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [autoCreatePolicy](#autocreatepolicy)
- [bucketArn](#bucketarn)
- [bucketDomainName](#bucketdomainname)
- [bucketDualStackDomainName](#bucketdualstackdomainname)
- [bucketName](#bucketname)
- [bucketRegionalDomainName](#bucketregionaldomainname)
- [bucketWebsiteDomainName](#bucketwebsitedomainname)
- [bucketWebsiteUrl](#bucketwebsiteurl)
- [disallowPublicAccess](#disallowpublicaccess)
- [encryptionKey](#encryptionkey)
- [env](#env)
- [isWebsite](#iswebsite)
- [node](#node)
- [physicalName](#physicalname)
- [policy](#policy)
- [stack](#stack)

### Accessors

- [putActions](#putactions)
- [writeActions](#writeactions)

### Methods

- [\_enableCrossEnvironment](#_enablecrossenvironment)
- [addCorsRule](#addcorsrule)
- [addEventNotification](#addeventnotification)
- [addInventory](#addinventory)
- [addLifecycleRule](#addlifecyclerule)
- [addMetric](#addmetric)
- [addObjectCreatedNotification](#addobjectcreatednotification)
- [addObjectRemovedNotification](#addobjectremovednotification)
- [addToResourcePolicy](#addtoresourcepolicy)
- [applyRemovalPolicy](#applyremovalpolicy)
- [arnForObjects](#arnforobjects)
- [generatePhysicalName](#generatephysicalname)
- [getResourceArnAttribute](#getresourcearnattribute)
- [getResourceNameAttribute](#getresourcenameattribute)
- [grantDelete](#grantdelete)
- [grantPublicAccess](#grantpublicaccess)
- [grantPut](#grantput)
- [grantPutAcl](#grantputacl)
- [grantRead](#grantread)
- [grantReadWrite](#grantreadwrite)
- [grantWrite](#grantwrite)
- [onCloudTrailEvent](#oncloudtrailevent)
- [onCloudTrailPutObject](#oncloudtrailputobject)
- [onCloudTrailWriteObject](#oncloudtrailwriteobject)
- [onPrepare](#onprepare)
- [onSynthesize](#onsynthesize)
- [onValidate](#onvalidate)
- [prepare](#prepare)
- [s3UrlForObject](#s3urlforobject)
- [synthesize](#synthesize)
- [toString](#tostring)
- [transferAccelerationUrlForObject](#transferaccelerationurlforobject)
- [urlForObject](#urlforobject)
- [validate](#validate)
- [virtualHostedUrlForObject](#virtualhostedurlforobject)
- [fromBucketArn](#frombucketarn)
- [fromBucketAttributes](#frombucketattributes)
- [fromBucketName](#frombucketname)
- [isConstruct](#isconstruct)
- [isResource](#isresource)
- [validateBucketName](#validatebucketname)

## Constructors

### constructor

• **new BackupBucket**(`scope`, `id`, `props?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props?` | [`BackupBucketProps`](#backup-bucket-props) |

#### Overrides

Bucket.constructor

## Properties

### autoCreatePolicy

• `Protected` **autoCreatePolicy**: `boolean`

Indicates if a bucket resource policy should automatically created upon the first call to `addToResourcePolicy`.

**`stability`** stable

#### Inherited from

Bucket.autoCreatePolicy

___

### bucketArn

• `Readonly` **bucketArn**: `string`

The ARN of the bucket.

**`stability`** stable

#### Inherited from

Bucket.bucketArn

___

### bucketDomainName

• `Readonly` **bucketDomainName**: `string`

The IPv4 DNS name of the specified bucket.

**`stability`** stable

#### Inherited from

Bucket.bucketDomainName

___

### bucketDualStackDomainName

• `Readonly` **bucketDualStackDomainName**: `string`

The IPv6 DNS name of the specified bucket.

**`stability`** stable

#### Inherited from

Bucket.bucketDualStackDomainName

___

### bucketName

• `Readonly` **bucketName**: `string`

The name of the bucket.

**`stability`** stable

#### Inherited from

Bucket.bucketName

___

### bucketRegionalDomainName

• `Readonly` **bucketRegionalDomainName**: `string`

The regional domain name of the specified bucket.

**`stability`** stable

#### Inherited from

Bucket.bucketRegionalDomainName

___

### bucketWebsiteDomainName

• `Readonly` **bucketWebsiteDomainName**: `string`

The Domain name of the static website.

**`stability`** stable

#### Inherited from

Bucket.bucketWebsiteDomainName

___

### bucketWebsiteUrl

• `Readonly` **bucketWebsiteUrl**: `string`

The URL of the static website.

**`stability`** stable

#### Inherited from

Bucket.bucketWebsiteUrl

___

### disallowPublicAccess

• `Protected` `Optional` **disallowPublicAccess**: `boolean`

Whether to disallow public access.

**`stability`** stable

#### Inherited from

Bucket.disallowPublicAccess

___

### encryptionKey

• `Optional` `Readonly` **encryptionKey**: `IKey`

Optional KMS encryption key associated with this bucket.

**`stability`** stable

#### Inherited from

Bucket.encryptionKey

___

### env

• `Readonly` **env**: `ResourceEnvironment`

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

**`stability`** stable

#### Inherited from

Bucket.env

___

### isWebsite

• `Optional` `Readonly` **isWebsite**: `boolean`

If this bucket has been configured for static website hosting.

**`stability`** stable

#### Inherited from

Bucket.isWebsite

___

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

Bucket.node

___

### physicalName

• `Protected` `Readonly` **physicalName**: `string`

Returns a string-encoded token that resolves to the physical name that should be passed to the CloudFormation resource.

This value will resolve to one of the following:
- a concrete value (e.g. `"my-awesome-bucket"`)
- `undefined`, when a name should be generated by CloudFormation
- a concrete name generated automatically during synthesis, in
   cross-environment scenarios.

**`stability`** stable

#### Inherited from

Bucket.physicalName

___

### policy

• `Optional` **policy**: `BucketPolicy`

The resource policy associated with this bucket.

If `autoCreatePolicy` is true, a `BucketPolicy` will be created upon the
first call to addToResourcePolicy(s).

**`stability`** stable

#### Inherited from

Bucket.policy

___

### stack

• `Readonly` **stack**: `Stack`

The stack in which this resource is defined.

**`stability`** stable

#### Inherited from

Bucket.stack

## Accessors

### putActions

• `Private` `get` **putActions**(): `any`

#### Returns

`any`

#### Inherited from

Bucket.putActions

___

### writeActions

• `Private` `get` **writeActions**(): `any`

#### Returns

`any`

#### Inherited from

Bucket.writeActions

## Methods

### \_enableCrossEnvironment

▸ **_enableCrossEnvironment**(): `void`

Called when this resource is referenced across environments
(account/region) to order to request that a physical name will be generated
for this resource during synthesis, so the resource can be referenced
through it's absolute name/arn.

**`internal`**

#### Returns

`void`

#### Inherited from

Bucket.\_enableCrossEnvironment

___

### addCorsRule

▸ **addCorsRule**(`rule`): `void`

Adds a cross-origin access configuration for objects in an Amazon S3 bucket.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rule` | `CorsRule` | The CORS configuration rule to add. |

#### Returns

`void`

#### Inherited from

Bucket.addCorsRule

___

### addEventNotification

▸ **addEventNotification**(`event`, `dest`, ...`filters`): `void`

Adds a bucket notification event destination.

**`see`** https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html

**`stability`** stable

**`example`**

   declare const myLambda: lambda.Function;
   const bucket = new s3.Bucket(this, 'MyBucket');
   bucket.addEventNotification(s3.EventType.OBJECT_CREATED, new s3n.LambdaDestination(myLambda), {prefix: 'home/myusername/*'});

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `EventType` | The event to trigger the notification. |
| `dest` | `IBucketNotificationDestination` | The notification destination (Lambda, SNS Topic or SQS Queue). |
| `...filters` | `NotificationKeyFilter`[] | S3 object key filter rules to determine which objects trigger this event. |

#### Returns

`void`

#### Inherited from

Bucket.addEventNotification

___

### addInventory

▸ **addInventory**(`inventory`): `void`

Add an inventory configuration.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inventory` | `Inventory` | configuration to add. |

#### Returns

`void`

#### Inherited from

Bucket.addInventory

___

### addLifecycleRule

▸ **addLifecycleRule**(`rule`): `void`

Add a lifecycle rule to the bucket.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rule` | `LifecycleRule` | The rule to add. |

#### Returns

`void`

#### Inherited from

Bucket.addLifecycleRule

___

### addMetric

▸ **addMetric**(`metric`): `void`

Adds a metrics configuration for the CloudWatch request metrics from the bucket.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `metric` | `BucketMetrics` | The metric configuration to add. |

#### Returns

`void`

#### Inherited from

Bucket.addMetric

___

### addObjectCreatedNotification

▸ **addObjectCreatedNotification**(`dest`, ...`filters`): `void`

Subscribes a destination to receive notifications when an object is created in the bucket.

This is identical to calling
`onEvent(EventType.OBJECT_CREATED)`.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dest` | `IBucketNotificationDestination` | The notification destination (see onEvent). |
| `...filters` | `NotificationKeyFilter`[] | Filters (see onEvent). |

#### Returns

`void`

#### Inherited from

Bucket.addObjectCreatedNotification

___

### addObjectRemovedNotification

▸ **addObjectRemovedNotification**(`dest`, ...`filters`): `void`

Subscribes a destination to receive notifications when an object is removed from the bucket.

This is identical to calling
`onEvent(EventType.OBJECT_REMOVED)`.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dest` | `IBucketNotificationDestination` | The notification destination (see onEvent). |
| `...filters` | `NotificationKeyFilter`[] | Filters (see onEvent). |

#### Returns

`void`

#### Inherited from

Bucket.addObjectRemovedNotification

___

### addToResourcePolicy

▸ **addToResourcePolicy**(`permission`): `AddToResourcePolicyResult`

Adds a statement to the resource policy for a principal (i.e. account/role/service) to perform actions on this bucket and/or its contents. Use `bucketArn` and `arnForObjects(keys)` to obtain ARNs for this bucket or objects.

Note that the policy statement may or may not be added to the policy.
For example, when an `IBucket` is created from an existing bucket,
it's not possible to tell whether the bucket already has a policy
attached, let alone to re-use that policy to add more statements to it.
So it's safest to do nothing in these cases.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `permission` | `PolicyStatement` | the policy statement to be added to the bucket's policy. |

#### Returns

`AddToResourcePolicyResult`

metadata about the execution of this method. If the policy
was not added, the value of `statementAdded` will be `false`. You
should always check this value to make sure that the operation was
actually carried out. Otherwise, synthesis and deploy will terminate
silently, which may be confusing.

#### Inherited from

Bucket.addToResourcePolicy

___

### applyRemovalPolicy

▸ **applyRemovalPolicy**(`policy`): `void`

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `policy` | `RemovalPolicy` |

#### Returns

`void`

#### Inherited from

Bucket.applyRemovalPolicy

___

### arnForObjects

▸ **arnForObjects**(`keyPattern`): `string`

Returns an ARN that represents all objects within the bucket that match the key pattern specified.

To represent all keys, specify ``"*"``.

If you need to specify a keyPattern with multiple components, concatenate them into a single string, e.g.:

   arnForObjects(`home/${team}/${user}/*`)

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyPattern` | `string` |

#### Returns

`string`

#### Inherited from

Bucket.arnForObjects

___

### generatePhysicalName

▸ `Protected` **generatePhysicalName**(): `string`

**`stability`** stable

#### Returns

`string`

#### Inherited from

Bucket.generatePhysicalName

___

### getResourceArnAttribute

▸ `Protected` **getResourceArnAttribute**(`arnAttr`, `arnComponents`): `string`

Returns an environment-sensitive token that should be used for the resource's "ARN" attribute (e.g. `bucket.bucketArn`).

Normally, this token will resolve to `arnAttr`, but if the resource is
referenced across environments, `arnComponents` will be used to synthesize
a concrete ARN with the resource's physical name. Make sure to reference
`this.physicalName` in `arnComponents`.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arnAttr` | `string` | The CFN attribute which resolves to the ARN of the resource. |
| `arnComponents` | `ArnComponents` | The format of the ARN of this resource. |

#### Returns

`string`

#### Inherited from

Bucket.getResourceArnAttribute

___

### getResourceNameAttribute

▸ `Protected` **getResourceNameAttribute**(`nameAttr`): `string`

Returns an environment-sensitive token that should be used for the resource's "name" attribute (e.g. `bucket.bucketName`).

Normally, this token will resolve to `nameAttr`, but if the resource is
referenced across environments, it will be resolved to `this.physicalName`,
which will be a concrete name.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nameAttr` | `string` | The CFN attribute which resolves to the resource's name. |

#### Returns

`string`

#### Inherited from

Bucket.getResourceNameAttribute

___

### grantDelete

▸ **grantDelete**(`identity`, `objectsKeyPattern?`): `Grant`

Grants s3:DeleteObject* permission to an IAM principal for objects in this bucket.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identity` | `IGrantable` | The principal. |
| `objectsKeyPattern?` | `any` | Restrict the permission to a certain key pattern (default '*'). |

#### Returns

`Grant`

#### Inherited from

Bucket.grantDelete

___

### grantPublicAccess

▸ **grantPublicAccess**(`keyPrefix?`, ...`allowedActions`): `Grant`

Allows unrestricted access to objects from this bucket.

IMPORTANT: This permission allows anyone to perform actions on S3 objects
in this bucket, which is useful for when you configure your bucket as a
website and want everyone to be able to read objects in the bucket without
needing to authenticate.

Without arguments, this method will grant read ("s3:GetObject") access to
all objects ("*") in the bucket.

The method returns the `iam.Grant` object, which can then be modified
as needed. For example, you can add a condition that will restrict access only
to an IPv4 range like this:

     const grant = bucket.grantPublicAccess();
     grant.resourceStatement!.addCondition(‘IpAddress’, { “aws:SourceIp”: “54.240.143.0/24” });

Note that if this `IBucket` refers to an existing bucket, possibly not
managed by CloudFormation, this method will have no effect, since it's
impossible to modify the policy of an existing bucket.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyPrefix?` | `string` | the prefix of S3 object keys (e.g. `home/*`). Default is "*". |
| `...allowedActions` | `string`[] | the set of S3 actions to allow. |

#### Returns

`Grant`

#### Inherited from

Bucket.grantPublicAccess

___

### grantPut

▸ **grantPut**(`identity`, `objectsKeyPattern?`): `Grant`

Grants s3:PutObject* and s3:Abort* permissions for this bucket to an IAM principal.

If encryption is used, permission to use the key to encrypt the contents
of written files will also be granted to the same principal.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identity` | `IGrantable` | The principal. |
| `objectsKeyPattern?` | `any` | Restrict the permission to a certain key pattern (default '*'). |

#### Returns

`Grant`

#### Inherited from

Bucket.grantPut

___

### grantPutAcl

▸ **grantPutAcl**(`identity`, `objectsKeyPattern?`): `Grant`

Grant the given IAM identity permissions to modify the ACLs of objects in the given Bucket.

If your application has the '@aws-cdk/aws-s3:grantWriteWithoutAcl' feature flag set,
calling [grantWrite](#grantwrite) or [grantReadWrite](#grantreadwrite) no longer grants permissions to modify the ACLs of the objects;
in this case, if you need to modify object ACLs, call this method explicitly.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `IGrantable` |
| `objectsKeyPattern?` | `string` |

#### Returns

`Grant`

#### Inherited from

Bucket.grantPutAcl

___

### grantRead

▸ **grantRead**(`identity`, `objectsKeyPattern?`): `Grant`

Grant read permissions for this bucket and it's contents to an IAM principal (Role/Group/User).

If encryption is used, permission to use the key to decrypt the contents
of the bucket will also be granted to the same principal.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identity` | `IGrantable` | The principal. |
| `objectsKeyPattern?` | `any` | Restrict the permission to a certain key pattern (default '*'). |

#### Returns

`Grant`

#### Inherited from

Bucket.grantRead

___

### grantReadWrite

▸ **grantReadWrite**(`identity`, `objectsKeyPattern?`): `Grant`

Grants read/write permissions for this bucket and it's contents to an IAM principal (Role/Group/User).

If an encryption key is used, permission to use the key for
encrypt/decrypt will also be granted.

Before CDK version 1.85.0, this method granted the `s3:PutObject*` permission that included `s3:PutObjectAcl`,
which could be used to grant read/write object access to IAM principals in other accounts.
If you want to get rid of that behavior, update your CDK version to 1.85.0 or later,
and make sure the `@aws-cdk/aws-s3:grantWriteWithoutAcl` feature flag is set to `true`
in the `context` key of your cdk.json file.
If you've already updated, but still need the principal to have permissions to modify the ACLs,
use the [grantPutAcl](#grantputacl) method.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `IGrantable` |
| `objectsKeyPattern?` | `any` |

#### Returns

`Grant`

#### Inherited from

Bucket.grantReadWrite

___

### grantWrite

▸ **grantWrite**(`identity`, `objectsKeyPattern?`): `Grant`

Grant write permissions to this bucket to an IAM principal.

If encryption is used, permission to use the key to encrypt the contents
of written files will also be granted to the same principal.

Before CDK version 1.85.0, this method granted the `s3:PutObject*` permission that included `s3:PutObjectAcl`,
which could be used to grant read/write object access to IAM principals in other accounts.
If you want to get rid of that behavior, update your CDK version to 1.85.0 or later,
and make sure the `@aws-cdk/aws-s3:grantWriteWithoutAcl` feature flag is set to `true`
in the `context` key of your cdk.json file.
If you've already updated, but still need the principal to have permissions to modify the ACLs,
use the [grantPutAcl](#grantputacl) method.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `identity` | `IGrantable` |
| `objectsKeyPattern?` | `any` |

#### Returns

`Grant`

#### Inherited from

Bucket.grantWrite

___

### onCloudTrailEvent

▸ **onCloudTrailEvent**(`id`, `options?`): `Rule`

Define a CloudWatch event that triggers when something happens to this repository.

Requires that there exists at least one CloudTrail Trail in your account
that captures the event. This method will not create the Trail.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The id of the rule. |
| `options?` | `OnCloudTrailBucketEventOptions` | Options for adding the rule. |

#### Returns

`Rule`

#### Inherited from

Bucket.onCloudTrailEvent

___

### onCloudTrailPutObject

▸ **onCloudTrailPutObject**(`id`, `options?`): `Rule`

Defines an AWS CloudWatch event that triggers when an object is uploaded to the specified paths (keys) in this bucket using the PutObject API call.

Note that some tools like `aws s3 cp` will automatically use either
PutObject or the multipart upload API depending on the file size,
so using `onCloudTrailWriteObject` may be preferable.

Requires that there exists at least one CloudTrail Trail in your account
that captures the event. This method will not create the Trail.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The id of the rule. |
| `options?` | `OnCloudTrailBucketEventOptions` | Options for adding the rule. |

#### Returns

`Rule`

#### Inherited from

Bucket.onCloudTrailPutObject

___

### onCloudTrailWriteObject

▸ **onCloudTrailWriteObject**(`id`, `options?`): `Rule`

Defines an AWS CloudWatch event that triggers when an object at the specified paths (keys) in this bucket are written to.

This includes
the events PutObject, CopyObject, and CompleteMultipartUpload.

Note that some tools like `aws s3 cp` will automatically use either
PutObject or the multipart upload API depending on the file size,
so using this method may be preferable to `onCloudTrailPutObject`.

Requires that there exists at least one CloudTrail Trail in your account
that captures the event. This method will not create the Trail.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The id of the rule. |
| `options?` | `OnCloudTrailBucketEventOptions` | Options for adding the rule. |

#### Returns

`Rule`

#### Inherited from

Bucket.onCloudTrailWriteObject

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

Bucket.onPrepare

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

Bucket.onSynthesize

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

Bucket.onValidate

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

Bucket.prepare

___

### s3UrlForObject

▸ **s3UrlForObject**(`key?`): `string`

The S3 URL of an S3 object. For example:.

- `s3://onlybucket`
- `s3://bucket/key`

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key?` | `string` | The S3 key of the object. |

#### Returns

`string`

an ObjectS3Url token

#### Inherited from

Bucket.s3UrlForObject

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

Bucket.synthesize

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

Bucket.toString

___

### transferAccelerationUrlForObject

▸ **transferAccelerationUrlForObject**(`key?`, `options?`): `string`

The https Transfer Acceleration URL of an S3 object.

Specify `dualStack: true` at the options
for dual-stack endpoint (connect to the bucket over IPv6). For example:

- `https://bucket.s3-accelerate.amazonaws.com`
- `https://bucket.s3-accelerate.amazonaws.com/key`

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key?` | `string` | The S3 key of the object. |
| `options?` | `TransferAccelerationUrlOptions` | Options for generating URL. |

#### Returns

`string`

an TransferAccelerationUrl token

#### Inherited from

Bucket.transferAccelerationUrlForObject

___

### urlForObject

▸ **urlForObject**(`key?`): `string`

The https URL of an S3 object. Specify `regional: false` at the options for non-regional URLs. For example:.

- `https://s3.us-west-1.amazonaws.com/onlybucket`
- `https://s3.us-west-1.amazonaws.com/bucket/key`
- `https://s3.cn-north-1.amazonaws.com.cn/china-bucket/mykey`

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key?` | `string` | The S3 key of the object. |

#### Returns

`string`

an ObjectS3Url token

#### Inherited from

Bucket.urlForObject

___

### validate

▸ `Protected` **validate**(): `string`[]

Validate the current construct.

This method can be implemented by derived constructs in order to perform
validation logic. It is called on all constructs before synthesis.

**`stability`** stable

#### Returns

`string`[]

#### Inherited from

Bucket.validate

___

### virtualHostedUrlForObject

▸ **virtualHostedUrlForObject**(`key?`, `options?`): `string`

The virtual hosted-style URL of an S3 object. Specify `regional: false` at the options for non-regional URL. For example:.

- `https://only-bucket.s3.us-west-1.amazonaws.com`
- `https://bucket.s3.us-west-1.amazonaws.com/key`
- `https://bucket.s3.amazonaws.com/key`
- `https://china-bucket.s3.cn-north-1.amazonaws.com.cn/mykey`

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key?` | `string` | The S3 key of the object. |
| `options?` | `VirtualHostedStyleUrlOptions` | Options for generating URL. |

#### Returns

`string`

an ObjectS3Url token

#### Inherited from

Bucket.virtualHostedUrlForObject

___

### fromBucketArn

▸ `Static` **fromBucketArn**(`scope`, `id`, `bucketArn`): `IBucket`

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `bucketArn` | `string` |

#### Returns

`IBucket`

#### Inherited from

Bucket.fromBucketArn

___

### fromBucketAttributes

▸ `Static` **fromBucketAttributes**(`scope`, `id`, `attrs`): `IBucket`

Creates a Bucket construct that represents an external bucket.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | The parent creating construct (usually `this`). |
| `id` | `string` | The construct's name. |
| `attrs` | `BucketAttributes` | A `BucketAttributes` object. |

#### Returns

`IBucket`

#### Inherited from

Bucket.fromBucketAttributes

___

### fromBucketName

▸ `Static` **fromBucketName**(`scope`, `id`, `bucketName`): `IBucket`

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `bucketName` | `string` |

#### Returns

`IBucket`

#### Inherited from

Bucket.fromBucketName

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

Bucket.isConstruct

___

### isResource

▸ `Static` **isResource**(`construct`): construct is CfnResource

Check whether the given construct is a Resource.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `construct` | `IConstruct` |

#### Returns

construct is CfnResource

#### Inherited from

Bucket.isResource

___

### validateBucketName

▸ `Static` **validateBucketName**(`physicalName`): `void`

Thrown an exception if the given bucket name is not valid.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `physicalName` | `string` | name of the bucket. |

#### Returns

`void`

#### Inherited from

Bucket.validateBucketName

# Full Region S 3 Code Commit Backup

[@cloudcomponents/cdk-codecommit-backup](#readme) / FullRegionS3CodeCommitBackup

# Class: FullRegionS3CodeCommitBackup

## Hierarchy

- `Construct`

  ↳ **`FullRegionS3CodeCommitBackup`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [backupProject](#backupproject)
- [node](#node)

### Methods

- [onBackupFailed](#onbackupfailed)
- [onBackupStarted](#onbackupstarted)
- [onBackupSucceeded](#onbackupsucceeded)
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

• **new FullRegionS3CodeCommitBackup**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`FullRegionS3CodeCommitBackupProps`](#full-region-s-3-code-commit-backup-props) |

#### Overrides

Construct.constructor

## Properties

### backupProject

• `Private` `Readonly` **backupProject**: `Project`

___

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

Construct.node

## Methods

### onBackupFailed

▸ **onBackupFailed**(`id`, `options?`): `Rule`

Defines an event rule which triggers when a backup fails.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `OnEventOptions` |

#### Returns

`Rule`

___

### onBackupStarted

▸ **onBackupStarted**(`id`, `options?`): `Rule`

Defines an event rule which triggers when a backup starts.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `OnEventOptions` |

#### Returns

`Rule`

___

### onBackupSucceeded

▸ **onBackupSucceeded**(`id`, `options?`): `Rule`

Defines an event rule which triggers when a backup complets successfully.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `OnEventOptions` |

#### Returns

`Rule`

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

# S 3 Code Commit Backup

[@cloudcomponents/cdk-codecommit-backup](#readme) / S3CodeCommitBackup

# Class: S3CodeCommitBackup

## Hierarchy

- `Construct`

  ↳ **`S3CodeCommitBackup`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [backupProject](#backupproject)
- [node](#node)

### Methods

- [onBackupFailed](#onbackupfailed)
- [onBackupStarted](#onbackupstarted)
- [onBackupSucceeded](#onbackupsucceeded)
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

• **new S3CodeCommitBackup**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`S3CodeCommitBackupProps`](#s-3-code-commit-backup-props) |

#### Overrides

Construct.constructor

## Properties

### backupProject

• `Private` `Readonly` **backupProject**: `Project`

___

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

Construct.node

## Methods

### onBackupFailed

▸ **onBackupFailed**(`id`, `options?`): `Rule`

Defines an event rule which triggers when a backup fails.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `OnEventOptions` |

#### Returns

`Rule`

___

### onBackupStarted

▸ **onBackupStarted**(`id`, `options?`): `Rule`

Defines an event rule which triggers when a backup starts.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `OnEventOptions` |

#### Returns

`Rule`

___

### onBackupSucceeded

▸ **onBackupSucceeded**(`id`, `options?`): `Rule`

Defines an event rule which triggers when a backup complets successfully.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options?` | `OnEventOptions` |

#### Returns

`Rule`

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

# Backup Bucket Props

[@cloudcomponents/cdk-codecommit-backup](#readme) / BackupBucketProps

# Interface: BackupBucketProps

## Hierarchy

- `BucketProps`

  ↳ **`BackupBucketProps`**

## Table of contents

### Properties

- [accessControl](#accesscontrol)
- [autoDeleteObjects](#autodeleteobjects)
- [blockPublicAccess](#blockpublicaccess)
- [bucketKeyEnabled](#bucketkeyenabled)
- [bucketName](#bucketname)
- [cors](#cors)
- [encryption](#encryption)
- [encryptionKey](#encryptionkey)
- [enforceSSL](#enforcessl)
- [intelligentTieringConfigurations](#intelligenttieringconfigurations)
- [inventories](#inventories)
- [lifecycleRules](#lifecyclerules)
- [metrics](#metrics)
- [objectOwnership](#objectownership)
- [publicReadAccess](#publicreadaccess)
- [removalPolicy](#removalpolicy)
- [retentionPeriod](#retentionperiod)
- [serverAccessLogsBucket](#serveraccesslogsbucket)
- [serverAccessLogsPrefix](#serveraccesslogsprefix)
- [transferAcceleration](#transferacceleration)
- [versioned](#versioned)
- [websiteErrorDocument](#websiteerrordocument)
- [websiteIndexDocument](#websiteindexdocument)
- [websiteRedirect](#websiteredirect)
- [websiteRoutingRules](#websiteroutingrules)

## Properties

### accessControl

• `Optional` `Readonly` **accessControl**: `BucketAccessControl`

Specifies a canned ACL that grants predefined permissions to the bucket.

**`default`** BucketAccessControl.PRIVATE

**`stability`** stable

#### Inherited from

BucketProps.accessControl

___

### autoDeleteObjects

• `Optional` `Readonly` **autoDeleteObjects**: `boolean`

Whether all objects should be automatically deleted when the bucket is removed from the stack or when the stack is deleted.

Requires the `removalPolicy` to be set to `RemovalPolicy.DESTROY`.

**Warning** if you have deployed a bucket with `autoDeleteObjects: true`,
switching this to `false` in a CDK version *before* `1.126.0` will lead to
all objects in the bucket being deleted. Be sure to update your bucket resources
by deploying with CDK version `1.126.0` or later **before** switching this value to `false`.

**`default`** false

**`stability`** stable

#### Inherited from

BucketProps.autoDeleteObjects

___

### blockPublicAccess

• `Optional` `Readonly` **blockPublicAccess**: `BlockPublicAccess`

The block public access configuration of this bucket.

**`default`** - CloudFormation defaults will apply. New buckets and objects don't allow public access, but users can modify bucket policies or object permissions to allow public access

**`see`** https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-block-public-access.html

**`stability`** stable

#### Inherited from

BucketProps.blockPublicAccess

___

### bucketKeyEnabled

• `Optional` `Readonly` **bucketKeyEnabled**: `boolean`

Specifies whether Amazon S3 should use an S3 Bucket Key with server-side encryption using KMS (SSE-KMS) for new objects in the bucket.

Only relevant, when Encryption is set to {@link BucketEncryption.KMS}

**`default`** - false

**`stability`** stable

#### Inherited from

BucketProps.bucketKeyEnabled

___

### bucketName

• `Optional` `Readonly` **bucketName**: `string`

Physical name of this bucket.

**`default`** - Assigned by CloudFormation (recommended).

**`stability`** stable

#### Inherited from

BucketProps.bucketName

___

### cors

• `Optional` `Readonly` **cors**: `CorsRule`[]

The CORS configuration of this bucket.

**`default`** - No CORS configuration.

**`see`** https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-cors.html

**`stability`** stable

#### Inherited from

BucketProps.cors

___

### encryption

• `Optional` `Readonly` **encryption**: `BucketEncryption`

The kind of server-side encryption to apply to this bucket.

If you choose KMS, you can specify a KMS key via `encryptionKey`. If
encryption key is not specified, a key will automatically be created.

**`default`** - `Kms` if `encryptionKey` is specified, or `Unencrypted` otherwise.

**`stability`** stable

#### Inherited from

BucketProps.encryption

___

### encryptionKey

• `Optional` `Readonly` **encryptionKey**: `IKey`

External KMS key to use for bucket encryption.

The 'encryption' property must be either not specified or set to "Kms".
An error will be emitted if encryption is set to "Unencrypted" or
"Managed".

**`default`** - If encryption is set to "Kms" and this property is undefined,
a new KMS key will be created and associated with this bucket.

**`stability`** stable

#### Inherited from

BucketProps.encryptionKey

___

### enforceSSL

• `Optional` `Readonly` **enforceSSL**: `boolean`

Enforces SSL for requests.

S3.5 of the AWS Foundational Security Best Practices Regarding S3.

**`default`** false

**`see`** https://docs.aws.amazon.com/config/latest/developerguide/s3-bucket-ssl-requests-only.html

**`stability`** stable

#### Inherited from

BucketProps.enforceSSL

___

### intelligentTieringConfigurations

• `Optional` `Readonly` **intelligentTieringConfigurations**: `IntelligentTieringConfiguration`[]

Inteligent Tiering Configurations.

**`default`** No Intelligent Tiiering Configurations.

**`see`** https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering.html

**`stability`** stable

#### Inherited from

BucketProps.intelligentTieringConfigurations

___

### inventories

• `Optional` `Readonly` **inventories**: `Inventory`[]

The inventory configuration of the bucket.

**`default`** - No inventory configuration

**`see`** https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-inventory.html

**`stability`** stable

#### Inherited from

BucketProps.inventories

___

### lifecycleRules

• `Optional` `Readonly` **lifecycleRules**: `LifecycleRule`[]

Rules that define how Amazon S3 manages objects during their lifetime.

**`default`** - No lifecycle rules.

**`stability`** stable

#### Inherited from

BucketProps.lifecycleRules

___

### metrics

• `Optional` `Readonly` **metrics**: `BucketMetrics`[]

The metrics configuration of this bucket.

**`default`** - No metrics configuration.

**`see`** https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-metricsconfiguration.html

**`stability`** stable

#### Inherited from

BucketProps.metrics

___

### objectOwnership

• `Optional` `Readonly` **objectOwnership**: `ObjectOwnership`

The objectOwnership of the bucket.

**`default`** - No ObjectOwnership configuration, uploading account will own the object.

**`see`** https://docs.aws.amazon.com/AmazonS3/latest/dev/about-object-ownership.html

**`stability`** stable

#### Inherited from

BucketProps.objectOwnership

___

### publicReadAccess

• `Optional` `Readonly` **publicReadAccess**: `boolean`

Grants public read access to all objects in the bucket.

Similar to calling `bucket.grantPublicAccess()`

**`default`** false

**`stability`** stable

#### Inherited from

BucketProps.publicReadAccess

___

### removalPolicy

• `Optional` `Readonly` **removalPolicy**: `RemovalPolicy`

Policy to apply when the bucket is removed from this stack.

**`default`** - The bucket will be orphaned.

**`stability`** stable

#### Inherited from

BucketProps.removalPolicy

___

### retentionPeriod

• `Optional` `Readonly` **retentionPeriod**: `Duration`

___

### serverAccessLogsBucket

• `Optional` `Readonly` **serverAccessLogsBucket**: `IBucket`

Destination bucket for the server access logs.

**`default`** - If "serverAccessLogsPrefix" undefined - access logs disabled, otherwise - log to current bucket.

**`stability`** stable

#### Inherited from

BucketProps.serverAccessLogsBucket

___

### serverAccessLogsPrefix

• `Optional` `Readonly` **serverAccessLogsPrefix**: `string`

Optional log file prefix to use for the bucket's access logs.

If defined without "serverAccessLogsBucket", enables access logs to current bucket with this prefix.

**`default`** - No log file prefix

**`stability`** stable

#### Inherited from

BucketProps.serverAccessLogsPrefix

___

### transferAcceleration

• `Optional` `Readonly` **transferAcceleration**: `boolean`

Whether this bucket should have transfer acceleration turned on or not.

**`default`** false

**`stability`** stable

#### Inherited from

BucketProps.transferAcceleration

___

### versioned

• `Optional` `Readonly` **versioned**: `boolean`

Whether this bucket should have versioning turned on or not.

**`default`** false

**`stability`** stable

#### Inherited from

BucketProps.versioned

___

### websiteErrorDocument

• `Optional` `Readonly` **websiteErrorDocument**: `string`

The name of the error document (e.g. "404.html") for the website. `websiteIndexDocument` must also be set if this is set.

**`default`** - No error document.

**`stability`** stable

#### Inherited from

BucketProps.websiteErrorDocument

___

### websiteIndexDocument

• `Optional` `Readonly` **websiteIndexDocument**: `string`

The name of the index document (e.g. "index.html") for the website. Enables static website hosting for this bucket.

**`default`** - No index document.

**`stability`** stable

#### Inherited from

BucketProps.websiteIndexDocument

___

### websiteRedirect

• `Optional` `Readonly` **websiteRedirect**: `RedirectTarget`

Specifies the redirect behavior of all requests to a website endpoint of a bucket.

If you specify this property, you can't specify "websiteIndexDocument", "websiteErrorDocument" nor , "websiteRoutingRules".

**`default`** - No redirection.

**`stability`** stable

#### Inherited from

BucketProps.websiteRedirect

___

### websiteRoutingRules

• `Optional` `Readonly` **websiteRoutingRules**: `RoutingRule`[]

Rules that define when a redirect is applied and the redirect behavior.

**`default`** - No redirection rules.

**`stability`** stable

#### Inherited from

BucketProps.websiteRoutingRules

# Full Region S 3 Code Commit Backup Props

[@cloudcomponents/cdk-codecommit-backup](#readme) / FullRegionS3CodeCommitBackupProps

# Interface: FullRegionS3CodeCommitBackupProps

## Table of contents

### Properties

- [backupBucket](#backupbucket)
- [computeType](#computetype)
- [repositoryNames](#repositorynames)
- [schedule](#schedule)

## Properties

### backupBucket

• `Readonly` **backupBucket**: `Bucket`

Bucket for storing the backups.

___

### computeType

• `Optional` `Readonly` **computeType**: `ComputeType`

The type of compute to use for backup the repositories.
See the {@link ComputeType} enum for the possible values.

**`default`** taken from {@link #buildImage#defaultComputeType}

___

### repositoryNames

• `Optional` `Readonly` **repositoryNames**: `string`[]

The names of the repositories in the region to be backed up.

**`default`** - All repositories in the region

___

### schedule

• `Readonly` **schedule**: `Schedule`

Schedule for backups.

# S 3 Code Commit Backup Props

[@cloudcomponents/cdk-codecommit-backup](#readme) / S3CodeCommitBackupProps

# Interface: S3CodeCommitBackupProps

## Table of contents

### Properties

- [backupBucket](#backupbucket)
- [computeType](#computetype)
- [repository](#repository)
- [schedule](#schedule)

## Properties

### backupBucket

• `Readonly` **backupBucket**: `Bucket`

Bucket for storing the backups.

___

### computeType

• `Optional` `Readonly` **computeType**: `ComputeType`

The type of compute to use for backup the repositories.
See the {@link ComputeType} enum for the possible values.

**`default`** taken from {@link #buildImage#defaultComputeType}

___

### repository

• `Readonly` **repository**: `IRepository`

Repository to be backed up

___

### schedule

• `Readonly` **schedule**: `Schedule`

Schedule for backups.
