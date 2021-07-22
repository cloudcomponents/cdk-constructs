# API Reference

**Classes**

Name|Description
----|-----------
[ClamavLayer](#cloudcomponents-cdk-s3-antivirus-clamavlayer)|Clamav Lambda layer.
[DefinitionBucket](#cloudcomponents-cdk-s3-antivirus-definitionbucket)|*No description*
[DefinitionInitializer](#cloudcomponents-cdk-s3-antivirus-definitioninitializer)|*No description*
[Sandbox](#cloudcomponents-cdk-s3-antivirus-sandbox)|*No description*
[Scanner](#cloudcomponents-cdk-s3-antivirus-scanner)|*No description*


**Structs**

Name|Description
----|-----------
[DefinitionBucketProps](#cloudcomponents-cdk-s3-antivirus-definitionbucketprops)|*No description*
[DefinitionInitializerProps](#cloudcomponents-cdk-s3-antivirus-definitioninitializerprops)|*No description*
[SandboxProps](#cloudcomponents-cdk-s3-antivirus-sandboxprops)|*No description*
[ScannerProps](#cloudcomponents-cdk-s3-antivirus-scannerprops)|*No description*



## class ClamavLayer  <a id="cloudcomponents-cdk-s3-antivirus-clamavlayer"></a>

Clamav Lambda layer.

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IResource](#aws-cdk-core-iresource), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [ILayerVersion](#aws-cdk-aws-lambda-ilayerversion), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IResource](#aws-cdk-core-iresource)
__Extends__: [LayerVersion](#aws-cdk-aws-lambda-layerversion)

### Initializer




```ts
new ClamavLayer(scope: Construct, id: string)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*




## class DefinitionBucket  <a id="cloudcomponents-cdk-s3-antivirus-definitionbucket"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IResource](#aws-cdk-core-iresource), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IBucket](#aws-cdk-aws-s3-ibucket), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IResource](#aws-cdk-core-iresource)
__Extends__: [Bucket](#aws-cdk-aws-s3-bucket)

### Initializer




```ts
new DefinitionBucket(scope: Construct, id: string, props: DefinitionBucketProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[DefinitionBucketProps](#cloudcomponents-cdk-s3-antivirus-definitionbucketprops)</code>)  *No description*
  * **vpcEndpoint** (<code>string</code>)  *No description* 
  * **bucketName** (<code>string</code>)  *No description* __*Optional*__




## class DefinitionInitializer  <a id="cloudcomponents-cdk-s3-antivirus-definitioninitializer"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new DefinitionInitializer(scope: Construct, id: string, props: DefinitionInitializerProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[DefinitionInitializerProps](#cloudcomponents-cdk-s3-antivirus-definitioninitializerprops)</code>)  *No description*
  * **fn** (<code>[IFunction](#aws-cdk-aws-lambda-ifunction)</code>)  *No description* 




## class Sandbox  <a id="cloudcomponents-cdk-s3-antivirus-sandbox"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new Sandbox(scope: Construct, id: string, props?: SandboxProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[SandboxProps](#cloudcomponents-cdk-s3-antivirus-sandboxprops)</code>)  *No description*
  * **encryptedFileSystem** (<code>boolean</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**definitionBucket** | <code>[DefinitionBucket](#cloudcomponents-cdk-s3-antivirus-definitionbucket)</code> | <span></span>
**lambdaAccessPoint** | <code>[IAccessPoint](#aws-cdk-aws-efs-iaccesspoint)</code> | <span></span>
**s3Endpoint** | <code>[GatewayVpcEndpoint](#aws-cdk-aws-ec2-gatewayvpcendpoint)</code> | <span></span>
**vpc** | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | <span></span>

### Methods


#### addToS3EnpointPolicy(statement) <a id="cloudcomponents-cdk-s3-antivirus-sandbox-addtos3enpointpolicy"></a>



```ts
addToS3EnpointPolicy(statement: PolicyStatement): void
```

* **statement** (<code>[PolicyStatement](#aws-cdk-aws-iam-policystatement)</code>)  *No description*






## class Scanner  <a id="cloudcomponents-cdk-s3-antivirus-scanner"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new Scanner(scope: Construct, id: string, props?: ScannerProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ScannerProps](#cloudcomponents-cdk-s3-antivirus-scannerprops)</code>)  *No description*
  * **buckets** (<code>Array<[Bucket](#aws-cdk-aws-s3-bucket)></code>)  *No description* __*Optional*__
  * **onError** (<code>[IDestination](#aws-cdk-aws-lambda-idestination)</code>)  *No description* __*Optional*__
  * **onResult** (<code>[IDestination](#aws-cdk-aws-lambda-idestination)</code>)  *No description* __*Optional*__
  * **scanStatusTagName** (<code>string</code>)  *No description* __*Default*__: cc:scan-status
  * **updateSchedule** (<code>[Schedule](#aws-cdk-aws-events-schedule)</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**sandbox** | <code>[Sandbox](#cloudcomponents-cdk-s3-antivirus-sandbox)</code> | <span></span>
**scanFunction** | <code>[IFunction](#aws-cdk-aws-lambda-ifunction)</code> | <span></span>
**scanStatusTagName** | <code>string</code> | <span></span>
**updateFunction** | <code>[IFunction](#aws-cdk-aws-lambda-ifunction)</code> | <span></span>

### Methods


#### addSourceBucket(bucket) <a id="cloudcomponents-cdk-s3-antivirus-scanner-addsourcebucket"></a>



```ts
addSourceBucket(bucket: Bucket): void
```

* **bucket** (<code>[Bucket](#aws-cdk-aws-s3-bucket)</code>)  *No description*






## struct DefinitionBucketProps  <a id="cloudcomponents-cdk-s3-antivirus-definitionbucketprops"></a>






Name | Type | Description 
-----|------|-------------
**vpcEndpoint** | <code>string</code> | <span></span>
**bucketName**? | <code>string</code> | __*Optional*__



## struct DefinitionInitializerProps  <a id="cloudcomponents-cdk-s3-antivirus-definitioninitializerprops"></a>






Name | Type | Description 
-----|------|-------------
**fn** | <code>[IFunction](#aws-cdk-aws-lambda-ifunction)</code> | <span></span>



## struct SandboxProps  <a id="cloudcomponents-cdk-s3-antivirus-sandboxprops"></a>






Name | Type | Description 
-----|------|-------------
**encryptedFileSystem**? | <code>boolean</code> | __*Optional*__



## struct ScannerProps  <a id="cloudcomponents-cdk-s3-antivirus-scannerprops"></a>






Name | Type | Description 
-----|------|-------------
**buckets**? | <code>Array<[Bucket](#aws-cdk-aws-s3-bucket)></code> | __*Optional*__
**onError**? | <code>[IDestination](#aws-cdk-aws-lambda-idestination)</code> | __*Optional*__
**onResult**? | <code>[IDestination](#aws-cdk-aws-lambda-idestination)</code> | __*Optional*__
**scanStatusTagName**? | <code>string</code> | __*Default*__: cc:scan-status
**updateSchedule**? | <code>[Schedule](#aws-cdk-aws-events-schedule)</code> | __*Optional*__



