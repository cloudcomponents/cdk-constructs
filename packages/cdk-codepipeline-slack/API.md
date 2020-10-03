# API Reference

**Classes**

Name|Description
----|-----------
[SlackApprovalAction](#cloudcomponents-cdk-codepipeline-slack-slackapprovalaction)|*No description*
[SlackNotifier](#cloudcomponents-cdk-codepipeline-slack-slacknotifier)|*No description*


**Structs**

Name|Description
----|-----------
[SlackApprovalActionProps](#cloudcomponents-cdk-codepipeline-slack-slackapprovalactionprops)|*No description*
[SlackNotifierProps](#cloudcomponents-cdk-codepipeline-slack-slacknotifierprops)|*No description*


**Enums**

Name|Description
----|-----------
[ChannelTypes](#cloudcomponents-cdk-codepipeline-slack-channeltypes)|*No description*



## class SlackApprovalAction  <a id="cloudcomponents-cdk-codepipeline-slack-slackapprovalaction"></a>



__Implements__: [IAction](#aws-cdk-aws-codepipeline-iaction)
__Extends__: [Action](#aws-cdk-aws-codepipeline-actions-action)

### Initializer




```ts
new SlackApprovalAction(props: SlackApprovalActionProps)
```

* **props** (<code>[SlackApprovalActionProps](#cloudcomponents-cdk-codepipeline-slack-slackapprovalactionprops)</code>)  *No description*
  * **actionName** (<code>string</code>)  The physical, human-readable name of the Action. 
  * **runOrder** (<code>number</code>)  The runOrder property for this Action. __*Default*__: 1
  * **variablesNamespace** (<code>string</code>)  The name of the namespace to use for variables emitted by this action. __*Default*__: a name will be generated, based on the stage and action names, if any of the action's variables were referenced - otherwise, no namespace will be set
  * **slackBotToken** (<code>string</code>)  *No description* 
  * **slackSigningSecret** (<code>string</code>)  *No description* 
  * **additionalInformation** (<code>string</code>)  *No description* __*Optional*__
  * **externalEntityLink** (<code>string</code>)  *No description* __*Optional*__
  * **slackBotIcon** (<code>string</code>)  *No description* __*Optional*__
  * **slackBotName** (<code>string</code>)  *No description* __*Optional*__
  * **slackChannel** (<code>string</code>)  *No description* __*Optional*__
  * **slackChannelId** (<code>string</code>)  *No description* __*Optional*__
  * **slackChannelTypes** (<code>Array<[ChannelTypes](#cloudcomponents-cdk-codepipeline-slack-channeltypes)></code>)  *No description* __*Optional*__


### Methods


#### protected bound(scope, stage, options) <a id="cloudcomponents-cdk-codepipeline-slack-slackapprovalaction-bound"></a>

(experimental) The method called when an Action is attached to a Pipeline.

This method is guaranteed to be called only once for each Action instance.

```ts
protected bound(scope: Construct, stage: IStage, options: ActionBindOptions): ActionConfig
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **stage** (<code>[IStage](#aws-cdk-aws-codepipeline-istage)</code>)  *No description*
* **options** (<code>[ActionBindOptions](#aws-cdk-aws-codepipeline-actionbindoptions)</code>)  *No description*
  * **bucket** (<code>[IBucket](#aws-cdk-aws-s3-ibucket)</code>)  *No description* 
  * **role** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  *No description* 

__Returns__:
* <code>[ActionConfig](#aws-cdk-aws-codepipeline-actionconfig)</code>



## class SlackNotifier  <a id="cloudcomponents-cdk-codepipeline-slack-slacknotifier"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new SlackNotifier(scope: Construct, id: string, props: SlackNotifierProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[SlackNotifierProps](#cloudcomponents-cdk-codepipeline-slack-slacknotifierprops)</code>)  *No description*
  * **pipeline** (<code>[IPipeline](#aws-cdk-aws-codepipeline-ipipeline)</code>)  *No description* 
  * **slackBotToken** (<code>string</code>)  *No description* 
  * **slackSigningSecret** (<code>string</code>)  *No description* 
  * **slackBotIcon** (<code>string</code>)  *No description* __*Optional*__
  * **slackBotName** (<code>string</code>)  *No description* __*Optional*__
  * **slackChannel** (<code>string</code>)  *No description* __*Optional*__
  * **slackChannelId** (<code>string</code>)  *No description* __*Optional*__
  * **slackChannelTypes** (<code>Array<[ChannelTypes](#cloudcomponents-cdk-codepipeline-slack-channeltypes)></code>)  *No description* __*Optional*__
  * **stageNames** (<code>Array<string></code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**environment** | <code>Map<string, string></code> | <span></span>

### Methods


#### protected validate() <a id="cloudcomponents-cdk-codepipeline-slack-slacknotifier-validate"></a>

Validate the current construct.

This method can be implemented by derived constructs in order to perform
validation logic. It is called on all constructs before synthesis.

```ts
protected validate(): Array<string>
```


__Returns__:
* <code>Array<string></code>



## struct SlackApprovalActionProps  <a id="cloudcomponents-cdk-codepipeline-slack-slackapprovalactionprops"></a>






Name | Type | Description 
-----|------|-------------
**actionName** | <code>string</code> | The physical, human-readable name of the Action.
**slackBotToken** | <code>string</code> | <span></span>
**slackSigningSecret** | <code>string</code> | <span></span>
**additionalInformation**? | <code>string</code> | __*Optional*__
**externalEntityLink**? | <code>string</code> | __*Optional*__
**runOrder**? | <code>number</code> | The runOrder property for this Action.<br/>__*Default*__: 1
**slackBotIcon**? | <code>string</code> | __*Optional*__
**slackBotName**? | <code>string</code> | __*Optional*__
**slackChannel**? | <code>string</code> | __*Optional*__
**slackChannelId**? | <code>string</code> | __*Optional*__
**slackChannelTypes**? | <code>Array<[ChannelTypes](#cloudcomponents-cdk-codepipeline-slack-channeltypes)></code> | __*Optional*__
**variablesNamespace**? | <code>string</code> | The name of the namespace to use for variables emitted by this action.<br/>__*Default*__: a name will be generated, based on the stage and action names, if any of the action's variables were referenced - otherwise, no namespace will be set



## struct SlackNotifierProps  <a id="cloudcomponents-cdk-codepipeline-slack-slacknotifierprops"></a>






Name | Type | Description 
-----|------|-------------
**pipeline** | <code>[IPipeline](#aws-cdk-aws-codepipeline-ipipeline)</code> | <span></span>
**slackBotToken** | <code>string</code> | <span></span>
**slackSigningSecret** | <code>string</code> | <span></span>
**slackBotIcon**? | <code>string</code> | __*Optional*__
**slackBotName**? | <code>string</code> | __*Optional*__
**slackChannel**? | <code>string</code> | __*Optional*__
**slackChannelId**? | <code>string</code> | __*Optional*__
**slackChannelTypes**? | <code>Array<[ChannelTypes](#cloudcomponents-cdk-codepipeline-slack-channeltypes)></code> | __*Optional*__
**stageNames**? | <code>Array<string></code> | __*Optional*__



## enum ChannelTypes  <a id="cloudcomponents-cdk-codepipeline-slack-channeltypes"></a>



Name | Description
-----|-----
**PUBLIC** |
**PRIVATE** |


