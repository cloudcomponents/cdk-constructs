# API Reference

**Classes**

Name|Description
----|-----------
[ImageRepository](#cloudcomponents-cdk-container-registry-imagerepository)|*No description*


**Structs**

Name|Description
----|-----------
[ImageRepositoryProps](#cloudcomponents-cdk-container-registry-imagerepositoryprops)|*No description*
[OnFindingOptions](#cloudcomponents-cdk-container-registry-onfindingoptions)|*No description*


**Enums**

Name|Description
----|-----------
[Severity](#cloudcomponents-cdk-container-registry-severity)|*No description*



## class ImageRepository  <a id="cloudcomponents-cdk-container-registry-imagerepository"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IResource](#aws-cdk-core-iresource), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IRepository](#aws-cdk-aws-ecr-irepository), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IResource](#aws-cdk-core-iresource)
__Extends__: [Repository](#aws-cdk-aws-ecr-repository)

### Initializer




```ts
new ImageRepository(scope: Construct, id: string, props?: ImageRepositoryProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ImageRepositoryProps](#cloudcomponents-cdk-container-registry-imagerepositoryprops)</code>)  *No description*
  * **imageScanOnPush** (<code>boolean</code>)  Enable the scan on push when creating the repository. __*Default*__: false
  * **imageTagMutability** (<code>[TagMutability](#aws-cdk-aws-ecr-tagmutability)</code>)  The tag mutability setting for the repository. __*Default*__: TagMutability.MUTABLE
  * **lifecycleRegistryId** (<code>string</code>)  The AWS account ID associated with the registry that contains the repository. __*Default*__: The default registry is assumed.
  * **lifecycleRules** (<code>Array<[LifecycleRule](#aws-cdk-aws-ecr-lifecyclerule)></code>)  Life cycle rules to apply to this registry. __*Default*__: No life cycle rules
  * **removalPolicy** (<code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code>)  Determine what happens to the repository when the resource/stack is deleted. __*Default*__: RemovalPolicy.Retain
  * **repositoryName** (<code>string</code>)  Name for this repository. __*Default*__: Automatically generated name.
  * **forceDelete** (<code>boolean</code>)  If a repository contains images, forces the deletion during stack deletion. __*Default*__: false


### Methods


#### onFinding(id, options) <a id="cloudcomponents-cdk-container-registry-imagerepository-onfinding"></a>



```ts
onFinding(id: string, options: OnFindingOptions): Rule
```

* **id** (<code>string</code>)  *No description*
* **options** (<code>[OnFindingOptions](#cloudcomponents-cdk-container-registry-onfindingoptions)</code>)  *No description*
  * **alarmTopic** (<code>[ITopic](#aws-cdk-aws-sns-itopic)</code>)  *No description* 
  * **severity** (<code>[Severity](#cloudcomponents-cdk-container-registry-severity)</code>)  *No description* 
  * **imageTags** (<code>Array<string></code>)  Only watch changes to the image tags specified. __*Default*__: Watch the changes to the repository with all image tags

__Returns__:
* <code>[Rule](#aws-cdk-aws-events-rule)</code>



## struct ImageRepositoryProps  <a id="cloudcomponents-cdk-container-registry-imagerepositoryprops"></a>






Name | Type | Description 
-----|------|-------------
**forceDelete**? | <code>boolean</code> | If a repository contains images, forces the deletion during stack deletion.<br/>__*Default*__: false
**imageScanOnPush**? | <code>boolean</code> | Enable the scan on push when creating the repository.<br/>__*Default*__: false
**imageTagMutability**? | <code>[TagMutability](#aws-cdk-aws-ecr-tagmutability)</code> | The tag mutability setting for the repository.<br/>__*Default*__: TagMutability.MUTABLE
**lifecycleRegistryId**? | <code>string</code> | The AWS account ID associated with the registry that contains the repository.<br/>__*Default*__: The default registry is assumed.
**lifecycleRules**? | <code>Array<[LifecycleRule](#aws-cdk-aws-ecr-lifecyclerule)></code> | Life cycle rules to apply to this registry.<br/>__*Default*__: No life cycle rules
**removalPolicy**? | <code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code> | Determine what happens to the repository when the resource/stack is deleted.<br/>__*Default*__: RemovalPolicy.Retain
**repositoryName**? | <code>string</code> | Name for this repository.<br/>__*Default*__: Automatically generated name.



## struct OnFindingOptions  <a id="cloudcomponents-cdk-container-registry-onfindingoptions"></a>






Name | Type | Description 
-----|------|-------------
**alarmTopic** | <code>[ITopic](#aws-cdk-aws-sns-itopic)</code> | <span></span>
**severity** | <code>[Severity](#cloudcomponents-cdk-container-registry-severity)</code> | <span></span>
**imageTags**? | <code>Array<string></code> | Only watch changes to the image tags specified.<br/>__*Default*__: Watch the changes to the repository with all image tags



## enum Severity  <a id="cloudcomponents-cdk-container-registry-severity"></a>



Name | Description
-----|-----
**CRITICAL** |
**HIGH** |
**MEDIUM** |
**LOW** |
**INFORMATIONAL** |
**UNDEFINED** |


