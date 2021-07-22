# API Reference

**Classes**

Name|Description
----|-----------
[DynamoDBSeeder](#cloudcomponents-cdk-dynamodb-seeder-dynamodbseeder)|*No description*
[InlineSeeds](#cloudcomponents-cdk-dynamodb-seeder-inlineseeds)|Seeds from an inline json object (limited to 4KiB).
[JsonFileSeeds](#cloudcomponents-cdk-dynamodb-seeder-jsonfileseeds)|Seeds from a local json file.
[S3Seeds](#cloudcomponents-cdk-dynamodb-seeder-s3seeds)|Seeds from an S3 archive.
[Seeds](#cloudcomponents-cdk-dynamodb-seeder-seeds)|*No description*


**Structs**

Name|Description
----|-----------
[DynamoDBSeederProps](#cloudcomponents-cdk-dynamodb-seeder-dynamodbseederprops)|*No description*
[SeedsConfig](#cloudcomponents-cdk-dynamodb-seeder-seedsconfig)|*No description*



## class DynamoDBSeeder  <a id="cloudcomponents-cdk-dynamodb-seeder-dynamodbseeder"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new DynamoDBSeeder(scope: Construct, id: string, props: DynamoDBSeederProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[DynamoDBSeederProps](#cloudcomponents-cdk-dynamodb-seeder-dynamodbseederprops)</code>)  *No description*
  * **seeds** (<code>[Seeds](#cloudcomponents-cdk-dynamodb-seeder-seeds)</code>)  *No description* 
  * **table** (<code>[ITable](#aws-cdk-aws-dynamodb-itable)</code>)  *No description* 
  * **timeout** (<code>[Duration](#aws-cdk-core-duration)</code>)  The function execution time (in seconds) after which Lambda terminates the function. __*Default*__: Duration.minutes(15)




## class InlineSeeds  <a id="cloudcomponents-cdk-dynamodb-seeder-inlineseeds"></a>

Seeds from an inline json object (limited to 4KiB).

__Extends__: [Seeds](#cloudcomponents-cdk-dynamodb-seeder-seeds)

### Initializer




```ts
new InlineSeeds(seeds: string)
```

* **seeds** (<code>string</code>)  *No description*


### Methods


#### bind(_scope) <a id="cloudcomponents-cdk-dynamodb-seeder-inlineseeds-bind"></a>

Called when the seeder is initialized to allow this object to bind to the stack.

```ts
bind(_scope: Construct): SeedsConfig
```

* **_scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*

__Returns__:
* <code>[SeedsConfig](#cloudcomponents-cdk-dynamodb-seeder-seedsconfig)</code>



## class JsonFileSeeds  <a id="cloudcomponents-cdk-dynamodb-seeder-jsonfileseeds"></a>

Seeds from a local json file.

__Extends__: [Seeds](#cloudcomponents-cdk-dynamodb-seeder-seeds)

### Initializer




```ts
new JsonFileSeeds(path: string, options?: AssetOptions)
```

* **path** (<code>string</code>)  *No description*
* **options** (<code>[AssetOptions](#aws-cdk-aws-s3-assets-assetoptions)</code>)  *No description*
  * **exclude** (<code>Array<string></code>)  Glob patterns to exclude from the copy. __*Default*__: nothing is excluded
  * **follow** (<code>[FollowMode](#aws-cdk-assets-followmode)</code>)  A strategy for how to handle symlinks. __*Default*__: Never
  * **ignoreMode** (<code>[IgnoreMode](#aws-cdk-core-ignoremode)</code>)  The ignore behavior to use for exclude patterns. __*Default*__: IgnoreMode.GLOB
  * **followSymlinks** (<code>[SymlinkFollowMode](#aws-cdk-core-symlinkfollowmode)</code>)  A strategy for how to handle symlinks. __*Default*__: SymlinkFollowMode.NEVER
  * **assetHash** (<code>string</code>)  Specify a custom hash for this asset. __*Default*__: based on `assetHashType`
  * **assetHashType** (<code>[AssetHashType](#aws-cdk-core-assethashtype)</code>)  Specifies the type of hash to calculate for this asset. __*Default*__: the default is `AssetHashType.SOURCE`, but if `assetHash` is explicitly specified this value defaults to `AssetHashType.CUSTOM`.
  * **bundling** (<code>[BundlingOptions](#aws-cdk-core-bundlingoptions)</code>)  Bundle the asset by executing a command in a Docker container or a custom bundling provider. __*Default*__: uploaded as-is to S3 if the asset is a regular file or a .zip file, archived into a .zip file and uploaded to S3 otherwise
  * **readers** (<code>Array<[IGrantable](#aws-cdk-aws-iam-igrantable)></code>)  A list of principals that should be able to read this asset from S3. __*Default*__: No principals that can read file asset.
  * **sourceHash** (<code>string</code>)  Custom hash to use when identifying the specific version of the asset. __*Default*__: automatically calculate source hash based on the contents of the source file or directory.



### Properties


Name | Type | Description 
-----|------|-------------
**path** | <code>string</code> | <span></span>

### Methods


#### bind(scope) <a id="cloudcomponents-cdk-dynamodb-seeder-jsonfileseeds-bind"></a>

Called when the seeder is initialized to allow this object to bind to the stack.

```ts
bind(scope: Construct): SeedsConfig
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*

__Returns__:
* <code>[SeedsConfig](#cloudcomponents-cdk-dynamodb-seeder-seedsconfig)</code>



## class S3Seeds  <a id="cloudcomponents-cdk-dynamodb-seeder-s3seeds"></a>

Seeds from an S3 archive.

__Extends__: [Seeds](#cloudcomponents-cdk-dynamodb-seeder-seeds)

### Initializer




```ts
new S3Seeds(bucket: IBucket, key: string, objectVersion?: string)
```

* **bucket** (<code>[IBucket](#aws-cdk-aws-s3-ibucket)</code>)  *No description*
* **key** (<code>string</code>)  *No description*
* **objectVersion** (<code>string</code>)  *No description*


### Methods


#### bind(_scope) <a id="cloudcomponents-cdk-dynamodb-seeder-s3seeds-bind"></a>

Called when the seeder is initialized to allow this object to bind to the stack.

```ts
bind(_scope: Construct): SeedsConfig
```

* **_scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*

__Returns__:
* <code>[SeedsConfig](#cloudcomponents-cdk-dynamodb-seeder-seedsconfig)</code>



## class Seeds  <a id="cloudcomponents-cdk-dynamodb-seeder-seeds"></a>



__Implemented by__: [InlineSeeds](#cloudcomponents-cdk-dynamodb-seeder-inlineseeds), [JsonFileSeeds](#cloudcomponents-cdk-dynamodb-seeder-jsonfileseeds), [S3Seeds](#cloudcomponents-cdk-dynamodb-seeder-s3seeds)

### Initializer




```ts
new Seeds()
```



### Methods


#### bind(scope) <a id="cloudcomponents-cdk-dynamodb-seeder-seeds-bind"></a>

Called when the seeder is initialized to allow this object to bind to the stack.

```ts
bind(scope: Construct): SeedsConfig
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  The binding scope.

__Returns__:
* <code>[SeedsConfig](#cloudcomponents-cdk-dynamodb-seeder-seedsconfig)</code>

#### *static* fromBucket(bucket, key, objectVersion?) <a id="cloudcomponents-cdk-dynamodb-seeder-seeds-frombucket"></a>



```ts
static fromBucket(bucket: IBucket, key: string, objectVersion?: string): S3Seeds
```

* **bucket** (<code>[IBucket](#aws-cdk-aws-s3-ibucket)</code>)  The S3 bucket.
* **key** (<code>string</code>)  The object key.
* **objectVersion** (<code>string</code>)  Optional S3 object version.

__Returns__:
* <code>[S3Seeds](#cloudcomponents-cdk-dynamodb-seeder-s3seeds)</code>

#### *static* fromInline(seeds) <a id="cloudcomponents-cdk-dynamodb-seeder-seeds-frominline"></a>



```ts
static fromInline(seeds: Array<Map<string, any>>): InlineSeeds
```

* **seeds** (<code>Array<Map<string, any>></code>)  The actual json code (limited to 4KiB).

__Returns__:
* <code>[InlineSeeds](#cloudcomponents-cdk-dynamodb-seeder-inlineseeds)</code>

#### *static* fromJsonFile(path, options?) <a id="cloudcomponents-cdk-dynamodb-seeder-seeds-fromjsonfile"></a>

Loads the seeds from a local disk path and uploads it to s3.

```ts
static fromJsonFile(path: string, options?: AssetOptions): JsonFileSeeds
```

* **path** (<code>string</code>)  Path to json seeds file.
* **options** (<code>[AssetOptions](#aws-cdk-aws-s3-assets-assetoptions)</code>)  *No description*
  * **exclude** (<code>Array<string></code>)  Glob patterns to exclude from the copy. __*Default*__: nothing is excluded
  * **follow** (<code>[FollowMode](#aws-cdk-assets-followmode)</code>)  A strategy for how to handle symlinks. __*Default*__: Never
  * **ignoreMode** (<code>[IgnoreMode](#aws-cdk-core-ignoremode)</code>)  The ignore behavior to use for exclude patterns. __*Default*__: IgnoreMode.GLOB
  * **followSymlinks** (<code>[SymlinkFollowMode](#aws-cdk-core-symlinkfollowmode)</code>)  A strategy for how to handle symlinks. __*Default*__: SymlinkFollowMode.NEVER
  * **assetHash** (<code>string</code>)  Specify a custom hash for this asset. __*Default*__: based on `assetHashType`
  * **assetHashType** (<code>[AssetHashType](#aws-cdk-core-assethashtype)</code>)  Specifies the type of hash to calculate for this asset. __*Default*__: the default is `AssetHashType.SOURCE`, but if `assetHash` is explicitly specified this value defaults to `AssetHashType.CUSTOM`.
  * **bundling** (<code>[BundlingOptions](#aws-cdk-core-bundlingoptions)</code>)  Bundle the asset by executing a command in a Docker container or a custom bundling provider. __*Default*__: uploaded as-is to S3 if the asset is a regular file or a .zip file, archived into a .zip file and uploaded to S3 otherwise
  * **readers** (<code>Array<[IGrantable](#aws-cdk-aws-iam-igrantable)></code>)  A list of principals that should be able to read this asset from S3. __*Default*__: No principals that can read file asset.
  * **sourceHash** (<code>string</code>)  Custom hash to use when identifying the specific version of the asset. __*Default*__: automatically calculate source hash based on the contents of the source file or directory.

__Returns__:
* <code>[JsonFileSeeds](#cloudcomponents-cdk-dynamodb-seeder-jsonfileseeds)</code>



## struct DynamoDBSeederProps  <a id="cloudcomponents-cdk-dynamodb-seeder-dynamodbseederprops"></a>






Name | Type | Description 
-----|------|-------------
**seeds** | <code>[Seeds](#cloudcomponents-cdk-dynamodb-seeder-seeds)</code> | <span></span>
**table** | <code>[ITable](#aws-cdk-aws-dynamodb-itable)</code> | <span></span>
**timeout**? | <code>[Duration](#aws-cdk-core-duration)</code> | The function execution time (in seconds) after which Lambda terminates the function.<br/>__*Default*__: Duration.minutes(15)



## struct SeedsConfig  <a id="cloudcomponents-cdk-dynamodb-seeder-seedsconfig"></a>

__Obtainable from__: [InlineSeeds](#cloudcomponents-cdk-dynamodb-seeder-inlineseeds).[bind](#cloudcomponents-cdk-dynamodb-seeder-inlineseeds#cloudcomponents-cdk-dynamodb-seeder-inlineseeds-bind)(), [JsonFileSeeds](#cloudcomponents-cdk-dynamodb-seeder-jsonfileseeds).[bind](#cloudcomponents-cdk-dynamodb-seeder-jsonfileseeds#cloudcomponents-cdk-dynamodb-seeder-jsonfileseeds-bind)(), [S3Seeds](#cloudcomponents-cdk-dynamodb-seeder-s3seeds).[bind](#cloudcomponents-cdk-dynamodb-seeder-s3seeds#cloudcomponents-cdk-dynamodb-seeder-s3seeds-bind)(), [Seeds](#cloudcomponents-cdk-dynamodb-seeder-seeds).[bind](#cloudcomponents-cdk-dynamodb-seeder-seeds#cloudcomponents-cdk-dynamodb-seeder-seeds-bind)()





Name | Type | Description 
-----|------|-------------
**inlineSeeds**? | <code>string</code> | Inline seeds.<br/>__*Optional*__
**s3Location**? | <code>[Location](#aws-cdk-aws-s3-location)</code> | The location of the seeds in S3.<br/>__*Optional*__



