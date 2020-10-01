# API Reference

**Classes**

Name|Description
----|-----------
[TempStack](#cloudcomponents-cdk-temp-stack-tempstack)|*No description*
[TimeToLive](#cloudcomponents-cdk-temp-stack-timetolive)|*No description*


**Structs**

Name|Description
----|-----------
[TempStackProps](#cloudcomponents-cdk-temp-stack-tempstackprops)|*No description*
[TimeToLiveProps](#cloudcomponents-cdk-temp-stack-timetoliveprops)|*No description*



## class TempStack  <a id="cloudcomponents-cdk-temp-stack-tempstack"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [ITaggable](#aws-cdk-core-itaggable)
__Extends__: [Stack](#aws-cdk-core-stack)

### Initializer




```ts
new TempStack(scope: Construct, id: string, props: TempStackProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[TempStackProps](#cloudcomponents-cdk-temp-stack-tempstackprops)</code>)  *No description*
  * **analyticsReporting** (<code>boolean</code>)  Include runtime versioning information in this Stack. __*Default*__: `analyticsReporting` setting of containing `App`, or value of 'aws:cdk:version-reporting' context key
  * **description** (<code>string</code>)  A description of the stack. __*Default*__: No description.
  * **env** (<code>[Environment](#aws-cdk-core-environment)</code>)  The AWS environment (account/region) where this stack will be deployed. __*Default*__: The environment of the containing `Stage` if available, otherwise create the stack will be environment-agnostic.
  * **stackName** (<code>string</code>)  Name to deploy the stack with. __*Default*__: Derived from construct path.
  * **synthesizer** (<code>[IStackSynthesizer](#aws-cdk-core-istacksynthesizer)</code>)  Synthesis method to use while deploying this stack. __*Default*__: `DefaultStackSynthesizer` if the `@aws-cdk/core:newStyleStackSynthesis` feature flag is set, `LegacyStackSynthesizer` otherwise.
  * **tags** (<code>Map<string, string></code>)  Stack tags that will be applied to all the taggable resources and the stack itself. __*Default*__: {}
  * **terminationProtection** (<code>boolean</code>)  Whether to enable termination protection for this stack. __*Default*__: false
  * **ttl** (<code>[Duration](#aws-cdk-core-duration)</code>)  Specifies the Time to Live (TTL) settings for the stack. 




## class TimeToLive  <a id="cloudcomponents-cdk-temp-stack-timetolive"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new TimeToLive(scope: Construct, id: string, props: TimeToLiveProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[TimeToLiveProps](#cloudcomponents-cdk-temp-stack-timetoliveprops)</code>)  *No description*
  * **ttl** (<code>[Duration](#aws-cdk-core-duration)</code>)  Specifies the Time to Live (TTL) settings for the stack. 


### Methods


#### protected onPrepare() <a id="cloudcomponents-cdk-temp-stack-timetolive-onprepare"></a>

Perform final modifications before synthesis.

This method can be implemented by derived constructs in order to perform
final changes before synthesis. prepare() will be called after child
constructs have been prepared.

This is an advanced framework feature. Only use this if you
understand the implications.

```ts
protected onPrepare(): void
```





#### protected validate() <a id="cloudcomponents-cdk-temp-stack-timetolive-validate"></a>

Validate the current construct.

This method can be implemented by derived constructs in order to perform
validation logic. It is called on all constructs before synthesis.

```ts
protected validate(): Array<string>
```


__Returns__:
* <code>Array<string></code>



## struct TempStackProps  <a id="cloudcomponents-cdk-temp-stack-tempstackprops"></a>






Name | Type | Description 
-----|------|-------------
**ttl** | <code>[Duration](#aws-cdk-core-duration)</code> | Specifies the Time to Live (TTL) settings for the stack.
**analyticsReporting**? | <code>boolean</code> | Include runtime versioning information in this Stack.<br/>__*Default*__: `analyticsReporting` setting of containing `App`, or value of 'aws:cdk:version-reporting' context key
**description**? | <code>string</code> | A description of the stack.<br/>__*Default*__: No description.
**env**? | <code>[Environment](#aws-cdk-core-environment)</code> | The AWS environment (account/region) where this stack will be deployed.<br/>__*Default*__: The environment of the containing `Stage` if available, otherwise create the stack will be environment-agnostic.
**stackName**? | <code>string</code> | Name to deploy the stack with.<br/>__*Default*__: Derived from construct path.
**synthesizer**? | <code>[IStackSynthesizer](#aws-cdk-core-istacksynthesizer)</code> | Synthesis method to use while deploying this stack.<br/>__*Default*__: `DefaultStackSynthesizer` if the `@aws-cdk/core:newStyleStackSynthesis` feature flag is set, `LegacyStackSynthesizer` otherwise.
**tags**? | <code>Map<string, string></code> | Stack tags that will be applied to all the taggable resources and the stack itself.<br/>__*Default*__: {}
**terminationProtection**? | <code>boolean</code> | Whether to enable termination protection for this stack.<br/>__*Default*__: false



## struct TimeToLiveProps  <a id="cloudcomponents-cdk-temp-stack-timetoliveprops"></a>






Name | Type | Description 
-----|------|-------------
**ttl** | <code>[Duration](#aws-cdk-core-duration)</code> | Specifies the Time to Live (TTL) settings for the stack.



