# API Reference

**Classes**

Name|Description
----|-----------
[BackupBucket](#cloudcomponents-cdk-codecommit-backup-backupbucket)|*No description*
[FullRegionS3CodeCommitBackup](#cloudcomponents-cdk-codecommit-backup-fullregions3codecommitbackup)|*No description*
[S3CodeCommitBackup](#cloudcomponents-cdk-codecommit-backup-s3codecommitbackup)|*No description*


**Structs**

Name|Description
----|-----------
[BackupBucketProps](#cloudcomponents-cdk-codecommit-backup-backupbucketprops)|*No description*
[FullRegionS3CodeCommitBackupProps](#cloudcomponents-cdk-codecommit-backup-fullregions3codecommitbackupprops)|*No description*
[S3CodeCommitBackupProps](#cloudcomponents-cdk-codecommit-backup-s3codecommitbackupprops)|*No description*



## class BackupBucket  <a id="cloudcomponents-cdk-codecommit-backup-backupbucket"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IResource](#aws-cdk-core-iresource), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IBucket](#aws-cdk-aws-s3-ibucket), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IResource](#aws-cdk-core-iresource)
__Extends__: [Bucket](#aws-cdk-aws-s3-bucket)

### Initializer




```ts
new BackupBucket(scope: Construct, id: string, props?: BackupBucketProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[BackupBucketProps](#cloudcomponents-cdk-codecommit-backup-backupbucketprops)</code>)  *No description*
  * **accessControl** (<code>[BucketAccessControl](#aws-cdk-aws-s3-bucketaccesscontrol)</code>)  Specifies a canned ACL that grants predefined permissions to the bucket. __*Default*__: BucketAccessControl.PRIVATE
  * **blockPublicAccess** (<code>[BlockPublicAccess](#aws-cdk-aws-s3-blockpublicaccess)</code>)  The block public access configuration of this bucket. __*Default*__: false New buckets and objects don't allow public access, but users can modify bucket policies or object permissions to allow public access.
  * **bucketName** (<code>string</code>)  Physical name of this bucket. __*Default*__: Assigned by CloudFormation (recommended).
  * **cors** (<code>Array<[CorsRule](#aws-cdk-aws-s3-corsrule)></code>)  The CORS configuration of this bucket. __*Default*__: No CORS configuration.
  * **encryption** (<code>[BucketEncryption](#aws-cdk-aws-s3-bucketencryption)</code>)  The kind of server-side encryption to apply to this bucket. __*Default*__: `Kms` if `encryptionKey` is specified, or `Unencrypted` otherwise.
  * **encryptionKey** (<code>[IKey](#aws-cdk-aws-kms-ikey)</code>)  External KMS key to use for bucket encryption. __*Default*__: If encryption is set to "Kms" and this property is undefined, a new KMS key will be created and associated with this bucket.
  * **inventories** (<code>Array<[Inventory](#aws-cdk-aws-s3-inventory)></code>)  The inventory configuration of the bucket. __*Default*__: No inventory configuration
  * **lifecycleRules** (<code>Array<[LifecycleRule](#aws-cdk-aws-s3-lifecyclerule)></code>)  Rules that define how Amazon S3 manages objects during their lifetime. __*Default*__: No lifecycle rules.
  * **metrics** (<code>Array<[BucketMetrics](#aws-cdk-aws-s3-bucketmetrics)></code>)  The metrics configuration of this bucket. __*Default*__: No metrics configuration.
  * **publicReadAccess** (<code>boolean</code>)  Grants public read access to all objects in the bucket. __*Default*__: false
  * **removalPolicy** (<code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code>)  Policy to apply when the bucket is removed from this stack. __*Default*__: The bucket will be orphaned.
  * **serverAccessLogsBucket** (<code>[IBucket](#aws-cdk-aws-s3-ibucket)</code>)  Destination bucket for the server access logs. __*Default*__: If "serverAccessLogsPrefix" undefined - access logs disabled, otherwise - log to current bucket.
  * **serverAccessLogsPrefix** (<code>string</code>)  Optional log file prefix to use for the bucket's access logs. __*Default*__: No log file prefix
  * **versioned** (<code>boolean</code>)  Whether this bucket should have versioning turned on or not. __*Default*__: false
  * **websiteErrorDocument** (<code>string</code>)  The name of the error document (e.g. "404.html") for the website. `websiteIndexDocument` must also be set if this is set. __*Default*__: No error document.
  * **websiteIndexDocument** (<code>string</code>)  The name of the index document (e.g. "index.html") for the website. Enables static website hosting for this bucket. __*Default*__: No index document.
  * **websiteRedirect** (<code>[RedirectTarget](#aws-cdk-aws-s3-redirecttarget)</code>)  Specifies the redirect behavior of all requests to a website endpoint of a bucket. __*Default*__: No redirection.
  * **websiteRoutingRules** (<code>Array<[RoutingRule](#aws-cdk-aws-s3-routingrule)></code>)  Rules that define when a redirect is applied and the redirect behavior. __*Default*__: No redirection rules.
  * **retentionPeriod** (<code>[Duration](#aws-cdk-core-duration)</code>)  *No description* __*Optional*__




## class FullRegionS3CodeCommitBackup  <a id="cloudcomponents-cdk-codecommit-backup-fullregions3codecommitbackup"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new FullRegionS3CodeCommitBackup(scope: Construct, id: string, props: FullRegionS3CodeCommitBackupProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[FullRegionS3CodeCommitBackupProps](#cloudcomponents-cdk-codecommit-backup-fullregions3codecommitbackupprops)</code>)  *No description*
  * **backupBucket** (<code>[Bucket](#aws-cdk-aws-s3-bucket)</code>)  Bucket for storing the backups. 
  * **schedule** (<code>[Schedule](#aws-cdk-aws-events-schedule)</code>)  Schedule for backups. 
  * **computeType** (<code>[ComputeType](#aws-cdk-aws-codebuild-computetype)</code>)  The type of compute to use for backup the repositories. __*Default*__: taken from {@link #buildImage#defaultComputeType}
  * **repositoryNames** (<code>Array<string></code>)  The names of the repositories in the region to be backed up. __*Default*__: All repositories in the region


### Methods


#### onBackupFailed(id, options?) <a id="cloudcomponents-cdk-codecommit-backup-fullregions3codecommitbackup-onbackupfailed"></a>

Defines an event rule which triggers when a backup fails.

```ts
onBackupFailed(id: string, options?: OnEventOptions): Rule
```

* **id** (<code>string</code>)  *No description*
* **options** (<code>[OnEventOptions](#aws-cdk-aws-events-oneventoptions)</code>)  *No description*
  * **description** (<code>string</code>)  A description of the rule's purpose. __*Default*__: No description
  * **eventPattern** (<code>[EventPattern](#aws-cdk-aws-events-eventpattern)</code>)  Additional restrictions for the event to route to the specified target. __*Default*__: No additional filtering based on an event pattern.
  * **ruleName** (<code>string</code>)  A name for the rule. __*Default*__: AWS CloudFormation generates a unique physical ID.
  * **target** (<code>[IRuleTarget](#aws-cdk-aws-events-iruletarget)</code>)  The target to register for the event. __*Default*__: No target is added to the rule. Use `addTarget()` to add a target.

__Returns__:
* <code>[Rule](#aws-cdk-aws-events-rule)</code>

#### onBackupStarted(id, options?) <a id="cloudcomponents-cdk-codecommit-backup-fullregions3codecommitbackup-onbackupstarted"></a>

Defines an event rule which triggers when a backup starts.

```ts
onBackupStarted(id: string, options?: OnEventOptions): Rule
```

* **id** (<code>string</code>)  *No description*
* **options** (<code>[OnEventOptions](#aws-cdk-aws-events-oneventoptions)</code>)  *No description*
  * **description** (<code>string</code>)  A description of the rule's purpose. __*Default*__: No description
  * **eventPattern** (<code>[EventPattern](#aws-cdk-aws-events-eventpattern)</code>)  Additional restrictions for the event to route to the specified target. __*Default*__: No additional filtering based on an event pattern.
  * **ruleName** (<code>string</code>)  A name for the rule. __*Default*__: AWS CloudFormation generates a unique physical ID.
  * **target** (<code>[IRuleTarget](#aws-cdk-aws-events-iruletarget)</code>)  The target to register for the event. __*Default*__: No target is added to the rule. Use `addTarget()` to add a target.

__Returns__:
* <code>[Rule](#aws-cdk-aws-events-rule)</code>

#### onBackupSucceeded(id, options?) <a id="cloudcomponents-cdk-codecommit-backup-fullregions3codecommitbackup-onbackupsucceeded"></a>

Defines an event rule which triggers when a backup complets successfully.

```ts
onBackupSucceeded(id: string, options?: OnEventOptions): Rule
```

* **id** (<code>string</code>)  *No description*
* **options** (<code>[OnEventOptions](#aws-cdk-aws-events-oneventoptions)</code>)  *No description*
  * **description** (<code>string</code>)  A description of the rule's purpose. __*Default*__: No description
  * **eventPattern** (<code>[EventPattern](#aws-cdk-aws-events-eventpattern)</code>)  Additional restrictions for the event to route to the specified target. __*Default*__: No additional filtering based on an event pattern.
  * **ruleName** (<code>string</code>)  A name for the rule. __*Default*__: AWS CloudFormation generates a unique physical ID.
  * **target** (<code>[IRuleTarget](#aws-cdk-aws-events-iruletarget)</code>)  The target to register for the event. __*Default*__: No target is added to the rule. Use `addTarget()` to add a target.

__Returns__:
* <code>[Rule](#aws-cdk-aws-events-rule)</code>



## class S3CodeCommitBackup  <a id="cloudcomponents-cdk-codecommit-backup-s3codecommitbackup"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new S3CodeCommitBackup(scope: Construct, id: string, props: S3CodeCommitBackupProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[S3CodeCommitBackupProps](#cloudcomponents-cdk-codecommit-backup-s3codecommitbackupprops)</code>)  *No description*
  * **backupBucket** (<code>[Bucket](#aws-cdk-aws-s3-bucket)</code>)  Bucket for storing the backups. 
  * **repository** (<code>[IRepository](#aws-cdk-aws-codecommit-irepository)</code>)  Repository to be backed up. 
  * **schedule** (<code>[Schedule](#aws-cdk-aws-events-schedule)</code>)  Schedule for backups. 
  * **computeType** (<code>[ComputeType](#aws-cdk-aws-codebuild-computetype)</code>)  The type of compute to use for backup the repositories. __*Default*__: taken from {@link #buildImage#defaultComputeType}


### Methods


#### onBackupFailed(id, options?) <a id="cloudcomponents-cdk-codecommit-backup-s3codecommitbackup-onbackupfailed"></a>

Defines an event rule which triggers when a backup fails.

```ts
onBackupFailed(id: string, options?: OnEventOptions): Rule
```

* **id** (<code>string</code>)  *No description*
* **options** (<code>[OnEventOptions](#aws-cdk-aws-events-oneventoptions)</code>)  *No description*
  * **description** (<code>string</code>)  A description of the rule's purpose. __*Default*__: No description
  * **eventPattern** (<code>[EventPattern](#aws-cdk-aws-events-eventpattern)</code>)  Additional restrictions for the event to route to the specified target. __*Default*__: No additional filtering based on an event pattern.
  * **ruleName** (<code>string</code>)  A name for the rule. __*Default*__: AWS CloudFormation generates a unique physical ID.
  * **target** (<code>[IRuleTarget](#aws-cdk-aws-events-iruletarget)</code>)  The target to register for the event. __*Default*__: No target is added to the rule. Use `addTarget()` to add a target.

__Returns__:
* <code>[Rule](#aws-cdk-aws-events-rule)</code>

#### onBackupStarted(id, options?) <a id="cloudcomponents-cdk-codecommit-backup-s3codecommitbackup-onbackupstarted"></a>

Defines an event rule which triggers when a backup starts.

```ts
onBackupStarted(id: string, options?: OnEventOptions): Rule
```

* **id** (<code>string</code>)  *No description*
* **options** (<code>[OnEventOptions](#aws-cdk-aws-events-oneventoptions)</code>)  *No description*
  * **description** (<code>string</code>)  A description of the rule's purpose. __*Default*__: No description
  * **eventPattern** (<code>[EventPattern](#aws-cdk-aws-events-eventpattern)</code>)  Additional restrictions for the event to route to the specified target. __*Default*__: No additional filtering based on an event pattern.
  * **ruleName** (<code>string</code>)  A name for the rule. __*Default*__: AWS CloudFormation generates a unique physical ID.
  * **target** (<code>[IRuleTarget](#aws-cdk-aws-events-iruletarget)</code>)  The target to register for the event. __*Default*__: No target is added to the rule. Use `addTarget()` to add a target.

__Returns__:
* <code>[Rule](#aws-cdk-aws-events-rule)</code>

#### onBackupSucceeded(id, options?) <a id="cloudcomponents-cdk-codecommit-backup-s3codecommitbackup-onbackupsucceeded"></a>

Defines an event rule which triggers when a backup complets successfully.

```ts
onBackupSucceeded(id: string, options?: OnEventOptions): Rule
```

* **id** (<code>string</code>)  *No description*
* **options** (<code>[OnEventOptions](#aws-cdk-aws-events-oneventoptions)</code>)  *No description*
  * **description** (<code>string</code>)  A description of the rule's purpose. __*Default*__: No description
  * **eventPattern** (<code>[EventPattern](#aws-cdk-aws-events-eventpattern)</code>)  Additional restrictions for the event to route to the specified target. __*Default*__: No additional filtering based on an event pattern.
  * **ruleName** (<code>string</code>)  A name for the rule. __*Default*__: AWS CloudFormation generates a unique physical ID.
  * **target** (<code>[IRuleTarget](#aws-cdk-aws-events-iruletarget)</code>)  The target to register for the event. __*Default*__: No target is added to the rule. Use `addTarget()` to add a target.

__Returns__:
* <code>[Rule](#aws-cdk-aws-events-rule)</code>



## struct BackupBucketProps  <a id="cloudcomponents-cdk-codecommit-backup-backupbucketprops"></a>






Name | Type | Description 
-----|------|-------------
**accessControl**? | <code>[BucketAccessControl](#aws-cdk-aws-s3-bucketaccesscontrol)</code> | Specifies a canned ACL that grants predefined permissions to the bucket.<br/>__*Default*__: BucketAccessControl.PRIVATE
**blockPublicAccess**? | <code>[BlockPublicAccess](#aws-cdk-aws-s3-blockpublicaccess)</code> | The block public access configuration of this bucket.<br/>__*Default*__: false New buckets and objects don't allow public access, but users can modify bucket policies or object permissions to allow public access.
**bucketName**? | <code>string</code> | Physical name of this bucket.<br/>__*Default*__: Assigned by CloudFormation (recommended).
**cors**? | <code>Array<[CorsRule](#aws-cdk-aws-s3-corsrule)></code> | The CORS configuration of this bucket.<br/>__*Default*__: No CORS configuration.
**encryption**? | <code>[BucketEncryption](#aws-cdk-aws-s3-bucketencryption)</code> | The kind of server-side encryption to apply to this bucket.<br/>__*Default*__: `Kms` if `encryptionKey` is specified, or `Unencrypted` otherwise.
**encryptionKey**? | <code>[IKey](#aws-cdk-aws-kms-ikey)</code> | External KMS key to use for bucket encryption.<br/>__*Default*__: If encryption is set to "Kms" and this property is undefined, a new KMS key will be created and associated with this bucket.
**inventories**? | <code>Array<[Inventory](#aws-cdk-aws-s3-inventory)></code> | The inventory configuration of the bucket.<br/>__*Default*__: No inventory configuration
**lifecycleRules**? | <code>Array<[LifecycleRule](#aws-cdk-aws-s3-lifecyclerule)></code> | Rules that define how Amazon S3 manages objects during their lifetime.<br/>__*Default*__: No lifecycle rules.
**metrics**? | <code>Array<[BucketMetrics](#aws-cdk-aws-s3-bucketmetrics)></code> | The metrics configuration of this bucket.<br/>__*Default*__: No metrics configuration.
**publicReadAccess**? | <code>boolean</code> | Grants public read access to all objects in the bucket.<br/>__*Default*__: false
**removalPolicy**? | <code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code> | Policy to apply when the bucket is removed from this stack.<br/>__*Default*__: The bucket will be orphaned.
**retentionPeriod**? | <code>[Duration](#aws-cdk-core-duration)</code> | __*Optional*__
**serverAccessLogsBucket**? | <code>[IBucket](#aws-cdk-aws-s3-ibucket)</code> | Destination bucket for the server access logs.<br/>__*Default*__: If "serverAccessLogsPrefix" undefined - access logs disabled, otherwise - log to current bucket.
**serverAccessLogsPrefix**? | <code>string</code> | Optional log file prefix to use for the bucket's access logs.<br/>__*Default*__: No log file prefix
**versioned**? | <code>boolean</code> | Whether this bucket should have versioning turned on or not.<br/>__*Default*__: false
**websiteErrorDocument**? | <code>string</code> | The name of the error document (e.g. "404.html") for the website. `websiteIndexDocument` must also be set if this is set.<br/>__*Default*__: No error document.
**websiteIndexDocument**? | <code>string</code> | The name of the index document (e.g. "index.html") for the website. Enables static website hosting for this bucket.<br/>__*Default*__: No index document.
**websiteRedirect**? | <code>[RedirectTarget](#aws-cdk-aws-s3-redirecttarget)</code> | Specifies the redirect behavior of all requests to a website endpoint of a bucket.<br/>__*Default*__: No redirection.
**websiteRoutingRules**? | <code>Array<[RoutingRule](#aws-cdk-aws-s3-routingrule)></code> | Rules that define when a redirect is applied and the redirect behavior.<br/>__*Default*__: No redirection rules.



## struct FullRegionS3CodeCommitBackupProps  <a id="cloudcomponents-cdk-codecommit-backup-fullregions3codecommitbackupprops"></a>






Name | Type | Description 
-----|------|-------------
**backupBucket** | <code>[Bucket](#aws-cdk-aws-s3-bucket)</code> | Bucket for storing the backups.
**schedule** | <code>[Schedule](#aws-cdk-aws-events-schedule)</code> | Schedule for backups.
**computeType**? | <code>[ComputeType](#aws-cdk-aws-codebuild-computetype)</code> | The type of compute to use for backup the repositories.<br/>__*Default*__: taken from {@link #buildImage#defaultComputeType}
**repositoryNames**? | <code>Array<string></code> | The names of the repositories in the region to be backed up.<br/>__*Default*__: All repositories in the region



## struct S3CodeCommitBackupProps  <a id="cloudcomponents-cdk-codecommit-backup-s3codecommitbackupprops"></a>






Name | Type | Description 
-----|------|-------------
**backupBucket** | <code>[Bucket](#aws-cdk-aws-s3-bucket)</code> | Bucket for storing the backups.
**repository** | <code>[IRepository](#aws-cdk-aws-codecommit-irepository)</code> | Repository to be backed up.
**schedule** | <code>[Schedule](#aws-cdk-aws-events-schedule)</code> | Schedule for backups.
**computeType**? | <code>[ComputeType](#aws-cdk-aws-codebuild-computetype)</code> | The type of compute to use for backup the repositories.<br/>__*Default*__: taken from {@link #buildImage#defaultComputeType}



