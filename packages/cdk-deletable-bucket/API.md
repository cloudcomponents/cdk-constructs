# API Reference

**Classes**

Name|Description
----|-----------
[DeletableBucket](#cloudcomponents-cdk-deletable-bucket-deletablebucket)|*No description*
[EmptyBucket](#cloudcomponents-cdk-deletable-bucket-emptybucket)|*No description*


**Structs**

Name|Description
----|-----------
[DeletableBucketProps](#cloudcomponents-cdk-deletable-bucket-deletablebucketprops)|*No description*
[EmptyBucketProps](#cloudcomponents-cdk-deletable-bucket-emptybucketprops)|*No description*



## class DeletableBucket  <a id="cloudcomponents-cdk-deletable-bucket-deletablebucket"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IResource](#aws-cdk-core-iresource), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IBucket](#aws-cdk-aws-s3-ibucket), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IResource](#aws-cdk-core-iresource)
__Extends__: [Bucket](#aws-cdk-aws-s3-bucket)

### Initializer




```ts
new DeletableBucket(scope: Construct, id: string, props?: DeletableBucketProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[DeletableBucketProps](#cloudcomponents-cdk-deletable-bucket-deletablebucketprops)</code>)  *No description*
  * **accessControl** (<code>[BucketAccessControl](#aws-cdk-aws-s3-bucketaccesscontrol)</code>)  Specifies a canned ACL that grants predefined permissions to the bucket. __*Default*__: BucketAccessControl.PRIVATE
  * **blockPublicAccess** (<code>[BlockPublicAccess](#aws-cdk-aws-s3-blockpublicaccess)</code>)  The block public access configuration of this bucket. __*Default*__: false New buckets and objects don't allow public access, but users can modify bucket policies or object permissions to allow public access.
  * **bucketName** (<code>string</code>)  Physical name of this bucket. __*Default*__: Assigned by CloudFormation (recommended).
  * **cors** (<code>Array<[CorsRule](#aws-cdk-aws-s3-corsrule)></code>)  The CORS configuration of this bucket. __*Default*__: No CORS configuration.
  * **encryption** (<code>[BucketEncryption](#aws-cdk-aws-s3-bucketencryption)</code>)  The kind of server-side encryption to apply to this bucket. __*Default*__: `Kms` if `encryptionKey` is specified, or `Unencrypted` otherwise.
  * **encryptionKey** (<code>[IKey](#aws-cdk-aws-kms-ikey)</code>)  External KMS key to use for bucket encryption. __*Default*__: If encryption is set to "Kms" and this property is undefined, a new KMS key will be created and associated with this bucket.
  * **inventories** (<code>Array<[Inventory](#aws-cdk-aws-s3-inventory)></code>)  The inventory configuration of the bucket. __*Default*__: No inventory configuration
  * **lifecycleRules** (<code>Array<[LifecycleRule](#aws-cdk-aws-s3-lifecyclerule)></code>)  Rules that define how Amazon S3 manages objects during their lifetime. __*Default*__: No lifecycle rules.
  * **metrics** (<code>Array<[BucketMetrics](#aws-cdk-aws-s3-bucketmetrics)></code>)  The metrics configuration of this bucket. __*Default*__: No metrics configuration.
  * **objectOwnership** (<code>[ObjectOwnership](#aws-cdk-aws-s3-objectownership)</code>)  The objectOwnership of the bucket. __*Default*__: No ObjectOwnership configuration, uploading account will own the object.
  * **publicReadAccess** (<code>boolean</code>)  Grants public read access to all objects in the bucket. __*Default*__: false
  * **removalPolicy** (<code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code>)  Policy to apply when the bucket is removed from this stack. __*Default*__: The bucket will be orphaned.
  * **serverAccessLogsBucket** (<code>[IBucket](#aws-cdk-aws-s3-ibucket)</code>)  Destination bucket for the server access logs. __*Default*__: If "serverAccessLogsPrefix" undefined - access logs disabled, otherwise - log to current bucket.
  * **serverAccessLogsPrefix** (<code>string</code>)  Optional log file prefix to use for the bucket's access logs. __*Default*__: No log file prefix
  * **versioned** (<code>boolean</code>)  Whether this bucket should have versioning turned on or not. __*Default*__: false
  * **websiteErrorDocument** (<code>string</code>)  The name of the error document (e.g. "404.html") for the website. `websiteIndexDocument` must also be set if this is set. __*Default*__: No error document.
  * **websiteIndexDocument** (<code>string</code>)  The name of the index document (e.g. "index.html") for the website. Enables static website hosting for this bucket. __*Default*__: No index document.
  * **websiteRedirect** (<code>[RedirectTarget](#aws-cdk-aws-s3-redirecttarget)</code>)  Specifies the redirect behavior of all requests to a website endpoint of a bucket. __*Default*__: No redirection.
  * **websiteRoutingRules** (<code>Array<[RoutingRule](#aws-cdk-aws-s3-routingrule)></code>)  Rules that define when a redirect is applied and the redirect behavior. __*Default*__: No redirection rules.
  * **forceDelete** (<code>boolean</code>)  If the buckets contains objects, forces the deletion during stack deletion. __*Default*__: false




## class EmptyBucket  <a id="cloudcomponents-cdk-deletable-bucket-emptybucket"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new EmptyBucket(scope: Construct, id: string, props: EmptyBucketProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[EmptyBucketProps](#cloudcomponents-cdk-deletable-bucket-emptybucketprops)</code>)  *No description*
  * **bucket** (<code>[IBucket](#aws-cdk-aws-s3-ibucket)</code>)  *No description* 




## struct DeletableBucketProps  <a id="cloudcomponents-cdk-deletable-bucket-deletablebucketprops"></a>






Name | Type | Description 
-----|------|-------------
**accessControl**? | <code>[BucketAccessControl](#aws-cdk-aws-s3-bucketaccesscontrol)</code> | Specifies a canned ACL that grants predefined permissions to the bucket.<br/>__*Default*__: BucketAccessControl.PRIVATE
**blockPublicAccess**? | <code>[BlockPublicAccess](#aws-cdk-aws-s3-blockpublicaccess)</code> | The block public access configuration of this bucket.<br/>__*Default*__: false New buckets and objects don't allow public access, but users can modify bucket policies or object permissions to allow public access.
**bucketName**? | <code>string</code> | Physical name of this bucket.<br/>__*Default*__: Assigned by CloudFormation (recommended).
**cors**? | <code>Array<[CorsRule](#aws-cdk-aws-s3-corsrule)></code> | The CORS configuration of this bucket.<br/>__*Default*__: No CORS configuration.
**encryption**? | <code>[BucketEncryption](#aws-cdk-aws-s3-bucketencryption)</code> | The kind of server-side encryption to apply to this bucket.<br/>__*Default*__: `Kms` if `encryptionKey` is specified, or `Unencrypted` otherwise.
**encryptionKey**? | <code>[IKey](#aws-cdk-aws-kms-ikey)</code> | External KMS key to use for bucket encryption.<br/>__*Default*__: If encryption is set to "Kms" and this property is undefined, a new KMS key will be created and associated with this bucket.
**forceDelete**? | <code>boolean</code> | If the buckets contains objects, forces the deletion during stack deletion.<br/>__*Default*__: false
**inventories**? | <code>Array<[Inventory](#aws-cdk-aws-s3-inventory)></code> | The inventory configuration of the bucket.<br/>__*Default*__: No inventory configuration
**lifecycleRules**? | <code>Array<[LifecycleRule](#aws-cdk-aws-s3-lifecyclerule)></code> | Rules that define how Amazon S3 manages objects during their lifetime.<br/>__*Default*__: No lifecycle rules.
**metrics**? | <code>Array<[BucketMetrics](#aws-cdk-aws-s3-bucketmetrics)></code> | The metrics configuration of this bucket.<br/>__*Default*__: No metrics configuration.
**objectOwnership**? | <code>[ObjectOwnership](#aws-cdk-aws-s3-objectownership)</code> | The objectOwnership of the bucket.<br/>__*Default*__: No ObjectOwnership configuration, uploading account will own the object.
**publicReadAccess**? | <code>boolean</code> | Grants public read access to all objects in the bucket.<br/>__*Default*__: false
**removalPolicy**? | <code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code> | Policy to apply when the bucket is removed from this stack.<br/>__*Default*__: The bucket will be orphaned.
**serverAccessLogsBucket**? | <code>[IBucket](#aws-cdk-aws-s3-ibucket)</code> | Destination bucket for the server access logs.<br/>__*Default*__: If "serverAccessLogsPrefix" undefined - access logs disabled, otherwise - log to current bucket.
**serverAccessLogsPrefix**? | <code>string</code> | Optional log file prefix to use for the bucket's access logs.<br/>__*Default*__: No log file prefix
**versioned**? | <code>boolean</code> | Whether this bucket should have versioning turned on or not.<br/>__*Default*__: false
**websiteErrorDocument**? | <code>string</code> | The name of the error document (e.g. "404.html") for the website. `websiteIndexDocument` must also be set if this is set.<br/>__*Default*__: No error document.
**websiteIndexDocument**? | <code>string</code> | The name of the index document (e.g. "index.html") for the website. Enables static website hosting for this bucket.<br/>__*Default*__: No index document.
**websiteRedirect**? | <code>[RedirectTarget](#aws-cdk-aws-s3-redirecttarget)</code> | Specifies the redirect behavior of all requests to a website endpoint of a bucket.<br/>__*Default*__: No redirection.
**websiteRoutingRules**? | <code>Array<[RoutingRule](#aws-cdk-aws-s3-routingrule)></code> | Rules that define when a redirect is applied and the redirect behavior.<br/>__*Default*__: No redirection rules.



## struct EmptyBucketProps  <a id="cloudcomponents-cdk-deletable-bucket-emptybucketprops"></a>






Name | Type | Description 
-----|------|-------------
**bucket** | <code>[IBucket](#aws-cdk-aws-s3-ibucket)</code> | <span></span>



