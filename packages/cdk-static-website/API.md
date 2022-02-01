# README

@cloudcomponents/cdk-static-website

# @cloudcomponents/cdk-static-website

## Table of contents

### Classes

- [StaticWebsite](#static-website)

### Interfaces

- [StaticWebsiteProps](#static-website-props)

### Variables

- [DefaultSecurityHeadersBehavior](#defaultsecurityheadersbehavior)

## Variables

### DefaultSecurityHeadersBehavior

• **DefaultSecurityHeadersBehavior**: `aws_cloudfront.ResponseSecurityHeadersBehavior`

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

- [bucket](#bucket)
- [distribution](#distribution)
- [node](#node)

### Methods

- [addBehaviour](#addbehaviour)
- [createCertificate](#createcertificate)
- [createResponseHeadersPolicy](#createresponseheaderspolicy)
- [toString](#tostring)
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

### bucket

• `Readonly` **bucket**: `Bucket`

___

### distribution

• `Readonly` **distribution**: `Distribution`

___

### node

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

Construct.node

## Methods

### addBehaviour

▸ **addBehaviour**(`pathPattern`, `origin`, `behaviorOptions?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathPattern` | `string` |
| `origin` | `IOrigin` |
| `behaviorOptions?` | `AddBehaviorOptions` |

#### Returns

`void`

___

### createCertificate

▸ `Private` **createCertificate**(`hostedZone?`, `domainNames?`): `undefined` \| `ICertificate`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hostedZone?` | `IHostedZone` |
| `domainNames?` | `string`[] |

#### Returns

`undefined` \| `ICertificate`

___

### createResponseHeadersPolicy

▸ `Protected` **createResponseHeadersPolicy**(`securityHeadersBehavior?`, `customHeaders?`): `ResponseHeadersPolicy`

#### Parameters

| Name | Type |
| :------ | :------ |
| `securityHeadersBehavior?` | `ResponseSecurityHeadersBehavior` |
| `customHeaders?` | `ResponseCustomHeader`[] |

#### Returns

`ResponseHeadersPolicy`

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

# Static Website Props

[@cloudcomponents/cdk-static-website](#readme) / StaticWebsiteProps

# Interface: StaticWebsiteProps

## Table of contents

### Properties

- [certificate](#certificate)
- [comment](#comment)
- [customHeaders](#customheaders)
- [defaultRootObject](#defaultrootobject)
- [disableUpload](#disableupload)
- [domainNames](#domainnames)
- [edgeLambdas](#edgelambdas)
- [enableIpv6](#enableipv6)
- [enableLogging](#enablelogging)
- [enabled](#enabled)
- [errorResponses](#errorresponses)
- [geoRestriction](#georestriction)
- [hostedZone](#hostedzone)
- [httpVersion](#httpversion)
- [logBucket](#logbucket)
- [logFilePrefix](#logfileprefix)
- [logIncludesCookies](#logincludescookies)
- [minimumProtocolVersion](#minimumprotocolversion)
- [priceClass](#priceclass)
- [removalPolicy](#removalpolicy)
- [securityHeadersBehavior](#securityheadersbehavior)
- [source](#source)
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

### customHeaders

• `Optional` `Readonly` **customHeaders**: `ResponseCustomHeader`[]

A configuration for a set of custom HTTP response headers.

**`default`** - no custom headers behavior

___

### defaultRootObject

• `Optional` `Readonly` **defaultRootObject**: `string`

The object that you want CloudFront to request from your origin (for example, index.html)
when a viewer requests the root URL for your distribution. If no default object is set, the
request goes to the origin's root (e.g., example.com/).

**`default`** - index.html

___

### disableUpload

• `Optional` `Readonly` **disableUpload**: `boolean`

Disable website deployment

**`default`** - false

___

### domainNames

• `Optional` `Readonly` **domainNames**: `string`[]

Alternative domain names for this distribution.

If you want to use your own domain name, such as www.example.com, instead of the cloudfront.net domain name,
you can add an alternate domain name to your distribution. If you attach a certificate to the distribution,
you must add (at least one of) the domain names of the certificate to this list.

**`default`** - The distribution will only support the default generated name (e.g., d111111abcdef8.cloudfront.net)

___

### edgeLambdas

• `Optional` `Readonly` **edgeLambdas**: `EdgeLambda`[]

The Lambda@Edge functions to invoke before serving the contents.

**`default`** - no Lambda functions will be invoked

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

### errorResponses

• `Optional` `Readonly` **errorResponses**: `ErrorResponse`[]

How CloudFront should handle requests that are not successful (e.g., PageNotFound).

**`default`** - 403 and 404 are routed as 404 to error.html.

___

### geoRestriction

• `Optional` `Readonly` **geoRestriction**: `GeoRestriction`

Controls the countries in which your content is distributed.

**`default`** - No geographic restrictions

___

### hostedZone

• `Optional` `Readonly` **hostedZone**: `IHostedZone`

Hosted zone of the domain which will be used to create alias record(s) from
domain names in the hosted zone to the destination.

Domain names in the hosted zone can include a specific domain (example.com)
and its subdomains (acme.example.com, zenith.example.com).

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

**`default`** SecurityPolicyProtocol.TLS_V1_2_2021

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

### securityHeadersBehavior

• `Optional` `Readonly` **securityHeadersBehavior**: `ResponseSecurityHeadersBehavior`

Configuration for a set of security-related HTTP response headers.

**`default`** - DefaultSecurityHeadersBehavior

___

### source

• `Optional` `Readonly` **source**: `string`

The source from which to deploy the website

**`default`** - Dummy placeholder

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
