# API Reference

**Classes**

Name|Description
----|-----------
[StaticWebsite](#cloudcomponents-cdk-static-website-staticwebsite)|*No description*
[WebsiteAliasRecord](#cloudcomponents-cdk-static-website-websitealiasrecord)|*No description*
[WebsiteBucket](#cloudcomponents-cdk-static-website-websitebucket)|*No description*


**Structs**

Name|Description
----|-----------
[AliasProps](#cloudcomponents-cdk-static-website-aliasprops)|*No description*
[StaticWebsiteProps](#cloudcomponents-cdk-static-website-staticwebsiteprops)|*No description*
[WebsiteAliasRecordProps](#cloudcomponents-cdk-static-website-websitealiasrecordprops)|*No description*
[WebsiteBucketProps](#cloudcomponents-cdk-static-website-websitebucketprops)|*No description*



## class StaticWebsite  <a id="cloudcomponents-cdk-static-website-staticwebsite"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new StaticWebsite(scope: Construct, id: string, props?: StaticWebsiteProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[StaticWebsiteProps](#cloudcomponents-cdk-static-website-staticwebsiteprops)</code>)  *No description*
  * **bucketName** (<code>string</code>)  Name of the bucket. __*Default*__: Assigned by CloudFormation (recommended).
  * **disableUpload** (<code>boolean</code>)  Disable website deployment. __*Default*__: false
  * **removalPolicy** (<code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code>)  Policy to apply when the bucket is removed from this stack. __*Default*__: The bucket will be orphaned.
  * **source** (<code>string</code>)  The source from which to deploy the website. __*Default*__: Dummy placeholder
  * **websiteErrorDocument** (<code>string</code>)  The error page for the site like 'error.html'. __*Default*__: error.html
  * **websiteIndexDocument** (<code>string</code>)  The index page for the site like 'index.html'. __*Default*__: index.html
  * **aliasConfiguration** (<code>[AliasProps](#cloudcomponents-cdk-static-website-aliasprops)</code>)  AliasConfiguration is used to configured CloudFront to respond to requests on custom domain names. __*Default*__: No custom domain names are set up
  * **bucketConfiguration** (<code>[WebsiteBucketProps](#cloudcomponents-cdk-static-website-websitebucketprops)</code>)  BucketConfiguration is used to configured the S3 website bucket. __*Default*__: The website bucket is provided with default values
  * **disableIPv6** (<code>boolean</code>)  An override flag that allows you to turn off support for IPv6 if required. __*Default*__: Cloudfront IPv6 support is enabled and if you've supplied an aliasConfiguration, an AAAA record will be created for your service, set this to true to switch this off.
  * **errorConfigurations** (<code>Array<[CfnDistribution.CustomErrorResponseProperty](#aws-cdk-aws-cloudfront-cfndistribution-customerrorresponseproperty)></code>)  How CloudFront should handle requests that are not successful (e.g., PageNotFound). __*Default*__: No custom error responses.
  * **webACLId** (<code>string</code>)  AWS WAF WebACL to associate with this CloudFront distribution. __*Default*__: No AWS Web Application Firewall web access control list (web ACL)


### Methods


#### addLambdaFunctionAssociation(assosiation) <a id="cloudcomponents-cdk-static-website-staticwebsite-addlambdafunctionassociation"></a>



```ts
addLambdaFunctionAssociation(assosiation: LambdaFunctionAssociation): void
```

* **assosiation** (<code>[LambdaFunctionAssociation](#aws-cdk-aws-cloudfront-lambdafunctionassociation)</code>)  *No description*
  * **eventType** (<code>[LambdaEdgeEventType](#aws-cdk-aws-cloudfront-lambdaedgeeventtype)</code>)  The lambda event type defines at which event the lambda is called during the request lifecycle. 
  * **lambdaFunction** (<code>[IVersion](#aws-cdk-aws-lambda-iversion)</code>)  A version of the lambda to associate. 
  * **includeBody** (<code>boolean</code>)  Allows a Lambda function to have read access to the body content. __*Default*__: false




#### addLambdaFunctionAssociations(assosiations) <a id="cloudcomponents-cdk-static-website-staticwebsite-addlambdafunctionassociations"></a>



```ts
addLambdaFunctionAssociations(assosiations: Array<LambdaFunctionAssociation>): void
```

* **assosiations** (<code>Array<[LambdaFunctionAssociation](#aws-cdk-aws-cloudfront-lambdafunctionassociation)></code>)  *No description*






## class WebsiteAliasRecord  <a id="cloudcomponents-cdk-static-website-websitealiasrecord"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new WebsiteAliasRecord(scope: Construct, id: string, props: WebsiteAliasRecordProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[WebsiteAliasRecordProps](#cloudcomponents-cdk-static-website-websitealiasrecordprops)</code>)  *No description*
  * **domainName** (<code>string</code>)  The domain name for the site like 'example.com'. 
  * **recordNames** (<code>Array<string></code>)  Names for the records. 
  * **target** (<code>[IAliasRecordTarget](#aws-cdk-aws-route53-ialiasrecordtarget)</code>)  Target for the alias record. 
  * **disableIPv6** (<code>boolean</code>)  We support IPv6 and add an AAAA record by default, but you can turn it off. __*Optional*__




## class WebsiteBucket  <a id="cloudcomponents-cdk-static-website-websitebucket"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new WebsiteBucket(scope: Construct, id: string, props?: WebsiteBucketProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[WebsiteBucketProps](#cloudcomponents-cdk-static-website-websitebucketprops)</code>)  *No description*
  * **bucketName** (<code>string</code>)  Name of the bucket. __*Default*__: Assigned by CloudFormation (recommended).
  * **disableUpload** (<code>boolean</code>)  Disable website deployment. __*Default*__: false
  * **removalPolicy** (<code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code>)  Policy to apply when the bucket is removed from this stack. __*Default*__: The bucket will be orphaned.
  * **source** (<code>string</code>)  The source from which to deploy the website. __*Default*__: Dummy placeholder
  * **websiteErrorDocument** (<code>string</code>)  The error page for the site like 'error.html'. __*Default*__: error.html
  * **websiteIndexDocument** (<code>string</code>)  The index page for the site like 'index.html'. __*Default*__: index.html



### Properties


Name | Type | Description 
-----|------|-------------
**s3OriginConfig** | <code>[S3OriginConfig](#aws-cdk-aws-cloudfront-s3originconfig)</code> | <span></span>



## struct AliasProps  <a id="cloudcomponents-cdk-static-website-aliasprops"></a>






Name | Type | Description 
-----|------|-------------
**acmCertRef** | <code>string</code> | ARN of an AWS Certificate Manager (ACM) certificate.
**domainName** | <code>string</code> | The domain name for the site like 'example.com'.
**names** | <code>Array<string></code> | Domain names on the certificate.
**securityPolicy**? | <code>[SecurityPolicyProtocol](#aws-cdk-aws-cloudfront-securitypolicyprotocol)</code> | The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections.<br/>__*Default*__: SSLv3 if sslMethod VIP, TLSv1 if sslMethod SNI
**sslMethod**? | <code>[SSLMethod](#aws-cdk-aws-cloudfront-sslmethod)</code> | How CloudFront should serve HTTPS requests.<br/>__*Default*__: SSLMethod.SNI



## struct StaticWebsiteProps  <a id="cloudcomponents-cdk-static-website-staticwebsiteprops"></a>






Name | Type | Description 
-----|------|-------------
**aliasConfiguration**? | <code>[AliasProps](#cloudcomponents-cdk-static-website-aliasprops)</code> | AliasConfiguration is used to configured CloudFront to respond to requests on custom domain names.<br/>__*Default*__: No custom domain names are set up
**bucketConfiguration**? | <code>[WebsiteBucketProps](#cloudcomponents-cdk-static-website-websitebucketprops)</code> | BucketConfiguration is used to configured the S3 website bucket.<br/>__*Default*__: The website bucket is provided with default values
**bucketName**? | <code>string</code> | Name of the bucket.<br/>__*Default*__: Assigned by CloudFormation (recommended).
**disableIPv6**? | <code>boolean</code> | An override flag that allows you to turn off support for IPv6 if required.<br/>__*Default*__: Cloudfront IPv6 support is enabled and if you've supplied an aliasConfiguration, an AAAA record will be created for your service, set this to true to switch this off.
**disableUpload**? | <code>boolean</code> | Disable website deployment.<br/>__*Default*__: false
**errorConfigurations**? | <code>Array<[CfnDistribution.CustomErrorResponseProperty](#aws-cdk-aws-cloudfront-cfndistribution-customerrorresponseproperty)></code> | How CloudFront should handle requests that are not successful (e.g., PageNotFound).<br/>__*Default*__: No custom error responses.
**removalPolicy**? | <code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code> | Policy to apply when the bucket is removed from this stack.<br/>__*Default*__: The bucket will be orphaned.
**source**? | <code>string</code> | The source from which to deploy the website.<br/>__*Default*__: Dummy placeholder
**webACLId**? | <code>string</code> | AWS WAF WebACL to associate with this CloudFront distribution.<br/>__*Default*__: No AWS Web Application Firewall web access control list (web ACL)
**websiteErrorDocument**? | <code>string</code> | The error page for the site like 'error.html'.<br/>__*Default*__: error.html
**websiteIndexDocument**? | <code>string</code> | The index page for the site like 'index.html'.<br/>__*Default*__: index.html



## struct WebsiteAliasRecordProps  <a id="cloudcomponents-cdk-static-website-websitealiasrecordprops"></a>






Name | Type | Description 
-----|------|-------------
**domainName** | <code>string</code> | The domain name for the site like 'example.com'.
**recordNames** | <code>Array<string></code> | Names for the records.
**target** | <code>[IAliasRecordTarget](#aws-cdk-aws-route53-ialiasrecordtarget)</code> | Target for the alias record.
**disableIPv6**? | <code>boolean</code> | We support IPv6 and add an AAAA record by default, but you can turn it off.<br/>__*Optional*__



## struct WebsiteBucketProps  <a id="cloudcomponents-cdk-static-website-websitebucketprops"></a>






Name | Type | Description 
-----|------|-------------
**bucketName**? | <code>string</code> | Name of the bucket.<br/>__*Default*__: Assigned by CloudFormation (recommended).
**disableUpload**? | <code>boolean</code> | Disable website deployment.<br/>__*Default*__: false
**removalPolicy**? | <code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code> | Policy to apply when the bucket is removed from this stack.<br/>__*Default*__: The bucket will be orphaned.
**source**? | <code>string</code> | The source from which to deploy the website.<br/>__*Default*__: Dummy placeholder
**websiteErrorDocument**? | <code>string</code> | The error page for the site like 'error.html'.<br/>__*Default*__: error.html
**websiteIndexDocument**? | <code>string</code> | The index page for the site like 'index.html'.<br/>__*Default*__: index.html



