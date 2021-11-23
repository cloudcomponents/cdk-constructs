# README

@cloudcomponents/cdk-static-website

# @cloudcomponents/cdk-static-website

## Table of contents

### Classes

- [StaticWebsite](#static-website)
- [WebsiteAliasRecord](#website-alias-record)
- [WebsiteBucket](#website-bucket)

### Interfaces

- [AliasProps](#alias-props)
- [StaticWebsiteProps](#static-website-props)
- [WebsiteAliasRecordProps](#website-alias-record-props)
- [WebsiteBucketProps](#website-bucket-props)

# Static Website

[@cloudcomponents/cdk-static-website](#readme) / StaticWebsite

# Class: StaticWebsite

## Hierarchy

- `Construct`

  ↳ **`StaticWebsite`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [distribution](#distribution)
- [node](#node)

### Methods

- [addLambdaFunctionAssociation](#addlambdafunctionassociation)
- [addLambdaFunctionAssociations](#addlambdafunctionassociations)
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

• **new StaticWebsite**(`scope`, `id`, `props?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`StaticWebsiteProps`](#static-website-props) |

#### Overrides

Construct.constructor

## Properties

### distribution

• `Readonly` **distribution**: `CloudFrontWebDistribution`

___

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

Construct.node

## Methods

### addLambdaFunctionAssociation

▸ **addLambdaFunctionAssociation**(`assosiation`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `assosiation` | `LambdaFunctionAssociation` |

#### Returns

`void`

___

### addLambdaFunctionAssociations

▸ **addLambdaFunctionAssociations**(`assosiations`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `assosiations` | `LambdaFunctionAssociation`[] |

#### Returns

`void`

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

# Website Alias Record

[@cloudcomponents/cdk-static-website](#readme) / WebsiteAliasRecord

# Class: WebsiteAliasRecord

## Hierarchy

- `Construct`

  ↳ **`WebsiteAliasRecord`**

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

• **new WebsiteAliasRecord**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`WebsiteAliasRecordProps`](#website-alias-record-props) |

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

# Website Bucket

[@cloudcomponents/cdk-static-website](#readme) / WebsiteBucket

# Class: WebsiteBucket

## Hierarchy

- `Construct`

  ↳ **`WebsiteBucket`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [node](#node)
- [s3OriginConfig](#s3originconfig)

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

• **new WebsiteBucket**(`scope`, `id`, `props?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`WebsiteBucketProps`](#website-bucket-props) |

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

### s3OriginConfig

• `Readonly` **s3OriginConfig**: `S3OriginConfig`

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

# Alias Props

[@cloudcomponents/cdk-static-website](#readme) / AliasProps

# Interface: AliasProps

## Hierarchy

- `AliasConfiguration`

  ↳ **`AliasProps`**

## Table of contents

### Properties

- [acmCertRef](#acmcertref)
- [domainName](#domainname)
- [names](#names)
- [privateZone](#privatezone)
- [securityPolicy](#securitypolicy)
- [sslMethod](#sslmethod)
- [vpcId](#vpcid)

## Properties

### acmCertRef

• `Readonly` **acmCertRef**: `string`

(deprecated) ARN of an AWS Certificate Manager (ACM) certificate.

**`deprecated`**

#### Inherited from

AliasConfiguration.acmCertRef

___

### domainName

• `Readonly` **domainName**: `string`

The domain name for the site like 'example.com'

___

### names

• `Readonly` **names**: `string`[]

(deprecated) Domain names on the certificate.

Both main domain name and Subject Alternative Names.

**`deprecated`**

#### Inherited from

AliasConfiguration.names

___

### privateZone

• `Optional` `Readonly` **privateZone**: `boolean`

Allow searching a private hosted zone.

**`default`** false

___

### securityPolicy

• `Optional` `Readonly` **securityPolicy**: `SecurityPolicyProtocol`

(deprecated) The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections.

CloudFront serves your objects only to browsers or devices that support at
least the SSL version that you specify.

**`default`** - SSLv3 if sslMethod VIP, TLSv1 if sslMethod SNI

**`deprecated`**

#### Inherited from

AliasConfiguration.securityPolicy

___

### sslMethod

• `Optional` `Readonly` **sslMethod**: `SSLMethod`

(deprecated) How CloudFront should serve HTTPS requests.

See the notes on SSLMethod if you wish to use other SSL termination types.

**`default`** SSLMethod.SNI

**`see`** https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_ViewerCertificate.html

**`deprecated`**

#### Inherited from

AliasConfiguration.sslMethod

___

### vpcId

• `Optional` `Readonly` **vpcId**: `string`

Specifies the ID of the VPC associated with a private hosted zone.

If a VPC ID is provided and privateZone is false, no results will be returned
and an error will be raised

**`default`** - No VPC ID

# Static Website Props

[@cloudcomponents/cdk-static-website](#readme) / StaticWebsiteProps

# Interface: StaticWebsiteProps

## Hierarchy

- [`WebsiteBucketProps`](#website-bucket-props)

  ↳ **`StaticWebsiteProps`**

## Table of contents

### Properties

- [aliasConfiguration](#aliasconfiguration)
- [bucketConfiguration](#bucketconfiguration)
- [bucketName](#bucketname)
- [disableIPv6](#disableipv6)
- [disableUpload](#disableupload)
- [errorConfigurations](#errorconfigurations)
- [removalPolicy](#removalpolicy)
- [source](#source)
- [webACLId](#webaclid)
- [websiteErrorDocument](#websiteerrordocument)
- [websiteIndexDocument](#websiteindexdocument)

## Properties

### aliasConfiguration

• `Optional` `Readonly` **aliasConfiguration**: [`AliasProps`](#alias-props)

AliasConfiguration is used to configured CloudFront to respond to requests on custom domain names.

**`default`** - No custom domain names are set up

___

### bucketConfiguration

• `Optional` `Readonly` **bucketConfiguration**: [`WebsiteBucketProps`](#website-bucket-props)

BucketConfiguration is used to configured the S3 website bucket

**`default`** - The website bucket is provided with default values

___

### bucketName

• `Optional` `Readonly` **bucketName**: `string`

Name of the bucket

**`default`** - Assigned by CloudFormation (recommended).

#### Inherited from

[WebsiteBucketProps](#website-bucket-props).[bucketName](#bucketname)

___

### disableIPv6

• `Optional` `Readonly` **disableIPv6**: `boolean`

An override flag that allows you to turn off support for IPv6 if required.

**`default`** - Cloudfront IPv6 support is enabled and if you've supplied an aliasConfiguration, an
AAAA record will be created for your service, set this to true to switch this off.

___

### disableUpload

• `Optional` `Readonly` **disableUpload**: `boolean`

Disable website deployment

**`default`** - false

#### Inherited from

[WebsiteBucketProps](#website-bucket-props).[disableUpload](#disableupload)

___

### errorConfigurations

• `Optional` `Readonly` **errorConfigurations**: `CustomErrorResponseProperty`[]

How CloudFront should handle requests that are not successful (e.g., PageNotFound).

**`default`** - No custom error responses.

___

### removalPolicy

• `Optional` `Readonly` **removalPolicy**: `RemovalPolicy`

Policy to apply when the bucket is removed from this stack.

**`default`** - The bucket will be orphaned.

#### Inherited from

[WebsiteBucketProps](#website-bucket-props).[removalPolicy](#removalpolicy)

___

### source

• `Optional` `Readonly` **source**: `string`

The source from which to deploy the website

**`default`** - Dummy placeholder

#### Inherited from

[WebsiteBucketProps](#website-bucket-props).[source](#source)

___

### webACLId

• `Optional` `Readonly` **webACLId**: `string`

AWS WAF WebACL to associate with this CloudFront distribution

**`default`** - No AWS Web Application Firewall web access control list (web ACL)

___

### websiteErrorDocument

• `Optional` `Readonly` **websiteErrorDocument**: `string`

 The error page for the site like 'error.html'

**`default`** - error.html

#### Inherited from

[WebsiteBucketProps](#website-bucket-props).[websiteErrorDocument](#websiteerrordocument)

___

### websiteIndexDocument

• `Optional` `Readonly` **websiteIndexDocument**: `string`

The index page for the site like 'index.html'

**`default`** - index.html

#### Inherited from

[WebsiteBucketProps](#website-bucket-props).[websiteIndexDocument](#websiteindexdocument)

# Website Alias Record Props

[@cloudcomponents/cdk-static-website](#readme) / WebsiteAliasRecordProps

# Interface: WebsiteAliasRecordProps

## Table of contents

### Properties

- [disableIPv6](#disableipv6)
- [domainName](#domainname)
- [privateZone](#privatezone)
- [recordNames](#recordnames)
- [target](#target)
- [vpcId](#vpcid)

## Properties

### disableIPv6

• `Optional` `Readonly` **disableIPv6**: `boolean`

We support IPv6 and add an AAAA record by default, but you can turn it off

___

### domainName

• `Readonly` **domainName**: `string`

The domain name for the site like 'example.com'

___

### privateZone

• `Optional` `Readonly` **privateZone**: `boolean`

Allow searching a private hosted zone.

**`default`** false

___

### recordNames

• `Readonly` **recordNames**: `string`[]

Names for the records.

___

### target

• `Readonly` **target**: `IAliasRecordTarget`

Target for the alias record

___

### vpcId

• `Optional` `Readonly` **vpcId**: `string`

Specifies the ID of the VPC associated with a private hosted zone.

If a VPC ID is provided and privateZone is false, no results will be returned
and an error will be raised

**`default`** - No VPC ID

# Website Bucket Props

[@cloudcomponents/cdk-static-website](#readme) / WebsiteBucketProps

# Interface: WebsiteBucketProps

## Hierarchy

- **`WebsiteBucketProps`**

  ↳ [`StaticWebsiteProps`](#static-website-props)

## Table of contents

### Properties

- [bucketName](#bucketname)
- [disableUpload](#disableupload)
- [removalPolicy](#removalpolicy)
- [source](#source)
- [websiteErrorDocument](#websiteerrordocument)
- [websiteIndexDocument](#websiteindexdocument)

## Properties

### bucketName

• `Optional` `Readonly` **bucketName**: `string`

Name of the bucket

**`default`** - Assigned by CloudFormation (recommended).

___

### disableUpload

• `Optional` `Readonly` **disableUpload**: `boolean`

Disable website deployment

**`default`** - false

___

### removalPolicy

• `Optional` `Readonly` **removalPolicy**: `RemovalPolicy`

Policy to apply when the bucket is removed from this stack.

**`default`** - The bucket will be orphaned.

___

### source

• `Optional` `Readonly` **source**: `string`

The source from which to deploy the website

**`default`** - Dummy placeholder

___

### websiteErrorDocument

• `Optional` `Readonly` **websiteErrorDocument**: `string`

 The error page for the site like 'error.html'

**`default`** - error.html

___

### websiteIndexDocument

• `Optional` `Readonly` **websiteIndexDocument**: `string`

The index page for the site like 'index.html'

**`default`** - index.html
