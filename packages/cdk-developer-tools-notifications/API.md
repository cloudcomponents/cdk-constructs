# API Reference

**Classes**

Name|Description
----|-----------
[ApplicationNotificationRule](#cloudcomponents-cdk-developer-tools-notifications-applicationnotificationrule)|*No description*
[MSTeamsIncomingWebhook](#cloudcomponents-cdk-developer-tools-notifications-msteamsincomingwebhook)|*No description*
[NotificationRule](#cloudcomponents-cdk-developer-tools-notifications-notificationrule)|*No description*
[PipelineNotificationRule](#cloudcomponents-cdk-developer-tools-notifications-pipelinenotificationrule)|*No description*
[ProjectNotificationRule](#cloudcomponents-cdk-developer-tools-notifications-projectnotificationrule)|*No description*
[RepositoryNotificationRule](#cloudcomponents-cdk-developer-tools-notifications-repositorynotificationrule)|*No description*
[SlackChannel](#cloudcomponents-cdk-developer-tools-notifications-slackchannel)|*No description*
[SnsTopic](#cloudcomponents-cdk-developer-tools-notifications-snstopic)|*No description*


**Structs**

Name|Description
----|-----------
[ApplicationNotificationRuleProps](#cloudcomponents-cdk-developer-tools-notifications-applicationnotificationruleprops)|*No description*
[CommonNotificationRuleProps](#cloudcomponents-cdk-developer-tools-notifications-commonnotificationruleprops)|*No description*
[NotificationRuleProps](#cloudcomponents-cdk-developer-tools-notifications-notificationruleprops)|*No description*
[NotificationTargetProperty](#cloudcomponents-cdk-developer-tools-notifications-notificationtargetproperty)|*No description*
[PipelineNotificationRuleProps](#cloudcomponents-cdk-developer-tools-notifications-pipelinenotificationruleprops)|*No description*
[ProjectNotificationRuleProps](#cloudcomponents-cdk-developer-tools-notifications-projectnotificationruleprops)|*No description*
[RepositoryNotificationRuleProps](#cloudcomponents-cdk-developer-tools-notifications-repositorynotificationruleprops)|*No description*


**Interfaces**

Name|Description
----|-----------
[INotificationRule](#cloudcomponents-cdk-developer-tools-notifications-inotificationrule)|*No description*
[INotificationTarget](#cloudcomponents-cdk-developer-tools-notifications-inotificationtarget)|*No description*


**Enums**

Name|Description
----|-----------
[ApplicationEvent](#cloudcomponents-cdk-developer-tools-notifications-applicationevent)|*No description*
[DetailType](#cloudcomponents-cdk-developer-tools-notifications-detailtype)|*No description*
[PipelineEvent](#cloudcomponents-cdk-developer-tools-notifications-pipelineevent)|*No description*
[ProjectEvent](#cloudcomponents-cdk-developer-tools-notifications-projectevent)|*No description*
[RepositoryEvent](#cloudcomponents-cdk-developer-tools-notifications-repositoryevent)|*No description*
[Status](#cloudcomponents-cdk-developer-tools-notifications-status)|*No description*
[TargetType](#cloudcomponents-cdk-developer-tools-notifications-targettype)|*No description*



## class ApplicationNotificationRule  <a id="cloudcomponents-cdk-developer-tools-notifications-applicationnotificationrule"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [INotificationRule](#cloudcomponents-cdk-developer-tools-notifications-inotificationrule)
__Extends__: [NotificationRule](#cloudcomponents-cdk-developer-tools-notifications-notificationrule)

### Initializer




```ts
new ApplicationNotificationRule(scope: Construct, id: string, props: ApplicationNotificationRuleProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ApplicationNotificationRuleProps](#cloudcomponents-cdk-developer-tools-notifications-applicationnotificationruleprops)</code>)  *No description*
  * **name** (<code>string</code>)  The name for the notification rule. 
  * **detailType** (<code>[DetailType](#cloudcomponents-cdk-developer-tools-notifications-detailtype)</code>)  The level of detail to include in the notifications for this resource. __*Default*__: FULL
  * **status** (<code>[Status](#cloudcomponents-cdk-developer-tools-notifications-status)</code>)  The status of the notification rule. __*Default*__: ENABLED
  * **targets** (<code>Array<[INotificationTarget](#cloudcomponents-cdk-developer-tools-notifications-inotificationtarget)></code>)  SNS topics or AWS Chatbot clients to associate with the notification rule. __*Optional*__
  * **application** (<code>[IServerApplication](#aws-cdk-aws-codedeploy-iserverapplication) &#124; [ILambdaApplication](#aws-cdk-aws-codedeploy-ilambdaapplication) &#124; [IEcsApplication](#aws-cdk-aws-codedeploy-iecsapplication)</code>)  *No description* 
  * **events** (<code>Array<[ApplicationEvent](#cloudcomponents-cdk-developer-tools-notifications-applicationevent)></code>)  *No description* 




## class MSTeamsIncomingWebhook  <a id="cloudcomponents-cdk-developer-tools-notifications-msteamsincomingwebhook"></a>



__Implements__: [INotificationTarget](#cloudcomponents-cdk-developer-tools-notifications-inotificationtarget)

### Initializer




```ts
new MSTeamsIncomingWebhook(webhook: MSTeamsIncomingWebhookConfiguration)
```

* **webhook** (<code>[MSTeamsIncomingWebhookConfiguration](#cloudcomponents-cdk-chatops-msteamsincomingwebhookconfiguration)</code>)  *No description*


### Methods


#### bind(scope, _rule) <a id="cloudcomponents-cdk-developer-tools-notifications-msteamsincomingwebhook-bind"></a>



```ts
bind(scope: Construct, _rule: INotificationRule): NotificationTargetProperty
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **_rule** (<code>[INotificationRule](#cloudcomponents-cdk-developer-tools-notifications-inotificationrule)</code>)  *No description*

__Returns__:
* <code>[NotificationTargetProperty](#cloudcomponents-cdk-developer-tools-notifications-notificationtargetproperty)</code>



## class NotificationRule  <a id="cloudcomponents-cdk-developer-tools-notifications-notificationrule"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [INotificationRule](#cloudcomponents-cdk-developer-tools-notifications-inotificationrule)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new NotificationRule(scope: Construct, id: string, props: NotificationRuleProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[NotificationRuleProps](#cloudcomponents-cdk-developer-tools-notifications-notificationruleprops)</code>)  *No description*
  * **name** (<code>string</code>)  The name for the notification rule. 
  * **detailType** (<code>[DetailType](#cloudcomponents-cdk-developer-tools-notifications-detailtype)</code>)  The level of detail to include in the notifications for this resource. __*Default*__: FULL
  * **status** (<code>[Status](#cloudcomponents-cdk-developer-tools-notifications-status)</code>)  The status of the notification rule. __*Default*__: ENABLED
  * **targets** (<code>Array<[INotificationTarget](#cloudcomponents-cdk-developer-tools-notifications-inotificationtarget)></code>)  SNS topics or AWS Chatbot clients to associate with the notification rule. __*Optional*__
  * **events** (<code>Array<[RepositoryEvent](#cloudcomponents-cdk-developer-tools-notifications-repositoryevent) &#124; [ProjectEvent](#cloudcomponents-cdk-developer-tools-notifications-projectevent) &#124; [ApplicationEvent](#cloudcomponents-cdk-developer-tools-notifications-applicationevent) &#124; [PipelineEvent](#cloudcomponents-cdk-developer-tools-notifications-pipelineevent)></code>)  A list of events associated with this notification rule. 
  * **resource** (<code>string</code>)  The Amazon Resource Name (ARN) of the resource to associate with the notification rule. 



### Properties


Name | Type | Description 
-----|------|-------------
**notificationRuleArn** | <code>string</code> | <span></span>

### Methods


#### addTarget(target) <a id="cloudcomponents-cdk-developer-tools-notifications-notificationrule-addtarget"></a>



```ts
addTarget(target: INotificationTarget): void
```

* **target** (<code>[INotificationTarget](#cloudcomponents-cdk-developer-tools-notifications-inotificationtarget)</code>)  *No description*




#### protected validate() <a id="cloudcomponents-cdk-developer-tools-notifications-notificationrule-validate"></a>

Validate the current construct.

This method can be implemented by derived constructs in order to perform
validation logic. It is called on all constructs before synthesis.

```ts
protected validate(): Array<string>
```


__Returns__:
* <code>Array<string></code>



## class PipelineNotificationRule  <a id="cloudcomponents-cdk-developer-tools-notifications-pipelinenotificationrule"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [INotificationRule](#cloudcomponents-cdk-developer-tools-notifications-inotificationrule)
__Extends__: [NotificationRule](#cloudcomponents-cdk-developer-tools-notifications-notificationrule)

### Initializer




```ts
new PipelineNotificationRule(scope: Construct, id: string, props: PipelineNotificationRuleProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[PipelineNotificationRuleProps](#cloudcomponents-cdk-developer-tools-notifications-pipelinenotificationruleprops)</code>)  *No description*
  * **name** (<code>string</code>)  The name for the notification rule. 
  * **detailType** (<code>[DetailType](#cloudcomponents-cdk-developer-tools-notifications-detailtype)</code>)  The level of detail to include in the notifications for this resource. __*Default*__: FULL
  * **status** (<code>[Status](#cloudcomponents-cdk-developer-tools-notifications-status)</code>)  The status of the notification rule. __*Default*__: ENABLED
  * **targets** (<code>Array<[INotificationTarget](#cloudcomponents-cdk-developer-tools-notifications-inotificationtarget)></code>)  SNS topics or AWS Chatbot clients to associate with the notification rule. __*Optional*__
  * **events** (<code>Array<[PipelineEvent](#cloudcomponents-cdk-developer-tools-notifications-pipelineevent)></code>)  *No description* 
  * **pipeline** (<code>[IPipeline](#aws-cdk-aws-codepipeline-ipipeline)</code>)  *No description* 




## class ProjectNotificationRule  <a id="cloudcomponents-cdk-developer-tools-notifications-projectnotificationrule"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [INotificationRule](#cloudcomponents-cdk-developer-tools-notifications-inotificationrule)
__Extends__: [NotificationRule](#cloudcomponents-cdk-developer-tools-notifications-notificationrule)

### Initializer




```ts
new ProjectNotificationRule(scope: Construct, id: string, props: ProjectNotificationRuleProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ProjectNotificationRuleProps](#cloudcomponents-cdk-developer-tools-notifications-projectnotificationruleprops)</code>)  *No description*
  * **name** (<code>string</code>)  The name for the notification rule. 
  * **detailType** (<code>[DetailType](#cloudcomponents-cdk-developer-tools-notifications-detailtype)</code>)  The level of detail to include in the notifications for this resource. __*Default*__: FULL
  * **status** (<code>[Status](#cloudcomponents-cdk-developer-tools-notifications-status)</code>)  The status of the notification rule. __*Default*__: ENABLED
  * **targets** (<code>Array<[INotificationTarget](#cloudcomponents-cdk-developer-tools-notifications-inotificationtarget)></code>)  SNS topics or AWS Chatbot clients to associate with the notification rule. __*Optional*__
  * **events** (<code>Array<[ProjectEvent](#cloudcomponents-cdk-developer-tools-notifications-projectevent)></code>)  *No description* 
  * **project** (<code>[IProject](#aws-cdk-aws-codebuild-iproject)</code>)  *No description* 




## class RepositoryNotificationRule  <a id="cloudcomponents-cdk-developer-tools-notifications-repositorynotificationrule"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [INotificationRule](#cloudcomponents-cdk-developer-tools-notifications-inotificationrule)
__Extends__: [NotificationRule](#cloudcomponents-cdk-developer-tools-notifications-notificationrule)

### Initializer




```ts
new RepositoryNotificationRule(scope: Construct, id: string, props: RepositoryNotificationRuleProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[RepositoryNotificationRuleProps](#cloudcomponents-cdk-developer-tools-notifications-repositorynotificationruleprops)</code>)  *No description*
  * **name** (<code>string</code>)  The name for the notification rule. 
  * **detailType** (<code>[DetailType](#cloudcomponents-cdk-developer-tools-notifications-detailtype)</code>)  The level of detail to include in the notifications for this resource. __*Default*__: FULL
  * **status** (<code>[Status](#cloudcomponents-cdk-developer-tools-notifications-status)</code>)  The status of the notification rule. __*Default*__: ENABLED
  * **targets** (<code>Array<[INotificationTarget](#cloudcomponents-cdk-developer-tools-notifications-inotificationtarget)></code>)  SNS topics or AWS Chatbot clients to associate with the notification rule. __*Optional*__
  * **events** (<code>Array<[RepositoryEvent](#cloudcomponents-cdk-developer-tools-notifications-repositoryevent)></code>)  *No description* 
  * **repository** (<code>[IRepository](#aws-cdk-aws-codecommit-irepository)</code>)  *No description* 




## class SlackChannel  <a id="cloudcomponents-cdk-developer-tools-notifications-slackchannel"></a>



__Implements__: [INotificationTarget](#cloudcomponents-cdk-developer-tools-notifications-inotificationtarget)

### Initializer




```ts
new SlackChannel(channel: ISlackChannelConfiguration)
```

* **channel** (<code>[ISlackChannelConfiguration](#cloudcomponents-cdk-chatops-islackchannelconfiguration)</code>)  *No description*


### Methods


#### bind(_scope, _rule) <a id="cloudcomponents-cdk-developer-tools-notifications-slackchannel-bind"></a>



```ts
bind(_scope: Construct, _rule: INotificationRule): NotificationTargetProperty
```

* **_scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **_rule** (<code>[INotificationRule](#cloudcomponents-cdk-developer-tools-notifications-inotificationrule)</code>)  *No description*

__Returns__:
* <code>[NotificationTargetProperty](#cloudcomponents-cdk-developer-tools-notifications-notificationtargetproperty)</code>



## class SnsTopic  <a id="cloudcomponents-cdk-developer-tools-notifications-snstopic"></a>



__Implements__: [INotificationTarget](#cloudcomponents-cdk-developer-tools-notifications-inotificationtarget)

### Initializer




```ts
new SnsTopic(topic: ITopic)
```

* **topic** (<code>[ITopic](#aws-cdk-aws-sns-itopic)</code>)  *No description*


### Methods


#### bind(_scope, _rule) <a id="cloudcomponents-cdk-developer-tools-notifications-snstopic-bind"></a>



```ts
bind(_scope: Construct, _rule: INotificationRule): NotificationTargetProperty
```

* **_scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **_rule** (<code>[INotificationRule](#cloudcomponents-cdk-developer-tools-notifications-inotificationrule)</code>)  *No description*

__Returns__:
* <code>[NotificationTargetProperty](#cloudcomponents-cdk-developer-tools-notifications-notificationtargetproperty)</code>



## struct ApplicationNotificationRuleProps  <a id="cloudcomponents-cdk-developer-tools-notifications-applicationnotificationruleprops"></a>






Name | Type | Description 
-----|------|-------------
**application** | <code>[IServerApplication](#aws-cdk-aws-codedeploy-iserverapplication) &#124; [ILambdaApplication](#aws-cdk-aws-codedeploy-ilambdaapplication) &#124; [IEcsApplication](#aws-cdk-aws-codedeploy-iecsapplication)</code> | <span></span>
**events** | <code>Array<[ApplicationEvent](#cloudcomponents-cdk-developer-tools-notifications-applicationevent)></code> | <span></span>
**name** | <code>string</code> | The name for the notification rule.
**detailType**? | <code>[DetailType](#cloudcomponents-cdk-developer-tools-notifications-detailtype)</code> | The level of detail to include in the notifications for this resource.<br/>__*Default*__: FULL
**status**? | <code>[Status](#cloudcomponents-cdk-developer-tools-notifications-status)</code> | The status of the notification rule.<br/>__*Default*__: ENABLED
**targets**? | <code>Array<[INotificationTarget](#cloudcomponents-cdk-developer-tools-notifications-inotificationtarget)></code> | SNS topics or AWS Chatbot clients to associate with the notification rule.<br/>__*Optional*__



## struct CommonNotificationRuleProps  <a id="cloudcomponents-cdk-developer-tools-notifications-commonnotificationruleprops"></a>






Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | The name for the notification rule.
**detailType**? | <code>[DetailType](#cloudcomponents-cdk-developer-tools-notifications-detailtype)</code> | The level of detail to include in the notifications for this resource.<br/>__*Default*__: FULL
**status**? | <code>[Status](#cloudcomponents-cdk-developer-tools-notifications-status)</code> | The status of the notification rule.<br/>__*Default*__: ENABLED
**targets**? | <code>Array<[INotificationTarget](#cloudcomponents-cdk-developer-tools-notifications-inotificationtarget)></code> | SNS topics or AWS Chatbot clients to associate with the notification rule.<br/>__*Optional*__



## interface INotificationRule  <a id="cloudcomponents-cdk-developer-tools-notifications-inotificationrule"></a>

__Implemented by__: [ApplicationNotificationRule](#cloudcomponents-cdk-developer-tools-notifications-applicationnotificationrule), [NotificationRule](#cloudcomponents-cdk-developer-tools-notifications-notificationrule), [PipelineNotificationRule](#cloudcomponents-cdk-developer-tools-notifications-pipelinenotificationrule), [ProjectNotificationRule](#cloudcomponents-cdk-developer-tools-notifications-projectnotificationrule), [RepositoryNotificationRule](#cloudcomponents-cdk-developer-tools-notifications-repositorynotificationrule)



### Properties


Name | Type | Description 
-----|------|-------------
**notificationRuleArn** | <code>string</code> | <span></span>



## interface INotificationTarget  <a id="cloudcomponents-cdk-developer-tools-notifications-inotificationtarget"></a>

__Implemented by__: [MSTeamsIncomingWebhook](#cloudcomponents-cdk-developer-tools-notifications-msteamsincomingwebhook), [SlackChannel](#cloudcomponents-cdk-developer-tools-notifications-slackchannel), [SnsTopic](#cloudcomponents-cdk-developer-tools-notifications-snstopic)


### Methods


#### bind(scope, rule) <a id="cloudcomponents-cdk-developer-tools-notifications-inotificationtarget-bind"></a>



```ts
bind(scope: Construct, rule: INotificationRule): NotificationTargetProperty
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **rule** (<code>[INotificationRule](#cloudcomponents-cdk-developer-tools-notifications-inotificationrule)</code>)  *No description*

__Returns__:
* <code>[NotificationTargetProperty](#cloudcomponents-cdk-developer-tools-notifications-notificationtargetproperty)</code>



## struct NotificationRuleProps  <a id="cloudcomponents-cdk-developer-tools-notifications-notificationruleprops"></a>






Name | Type | Description 
-----|------|-------------
**events** | <code>Array<[RepositoryEvent](#cloudcomponents-cdk-developer-tools-notifications-repositoryevent) &#124; [ProjectEvent](#cloudcomponents-cdk-developer-tools-notifications-projectevent) &#124; [ApplicationEvent](#cloudcomponents-cdk-developer-tools-notifications-applicationevent) &#124; [PipelineEvent](#cloudcomponents-cdk-developer-tools-notifications-pipelineevent)></code> | A list of events associated with this notification rule.
**name** | <code>string</code> | The name for the notification rule.
**resource** | <code>string</code> | The Amazon Resource Name (ARN) of the resource to associate with the notification rule.
**detailType**? | <code>[DetailType](#cloudcomponents-cdk-developer-tools-notifications-detailtype)</code> | The level of detail to include in the notifications for this resource.<br/>__*Default*__: FULL
**status**? | <code>[Status](#cloudcomponents-cdk-developer-tools-notifications-status)</code> | The status of the notification rule.<br/>__*Default*__: ENABLED
**targets**? | <code>Array<[INotificationTarget](#cloudcomponents-cdk-developer-tools-notifications-inotificationtarget)></code> | SNS topics or AWS Chatbot clients to associate with the notification rule.<br/>__*Optional*__



## struct NotificationTargetProperty  <a id="cloudcomponents-cdk-developer-tools-notifications-notificationtargetproperty"></a>

__Obtainable from__: [MSTeamsIncomingWebhook](#cloudcomponents-cdk-developer-tools-notifications-msteamsincomingwebhook).[bind](#cloudcomponents-cdk-developer-tools-notifications-msteamsincomingwebhook#cloudcomponents-cdk-developer-tools-notifications-msteamsincomingwebhook-bind)(), [SlackChannel](#cloudcomponents-cdk-developer-tools-notifications-slackchannel).[bind](#cloudcomponents-cdk-developer-tools-notifications-slackchannel#cloudcomponents-cdk-developer-tools-notifications-slackchannel-bind)(), [SnsTopic](#cloudcomponents-cdk-developer-tools-notifications-snstopic).[bind](#cloudcomponents-cdk-developer-tools-notifications-snstopic#cloudcomponents-cdk-developer-tools-notifications-snstopic-bind)()





Name | Type | Description 
-----|------|-------------
**targetAddress** | <code>string</code> | <span></span>
**targetType** | <code>[TargetType](#cloudcomponents-cdk-developer-tools-notifications-targettype)</code> | <span></span>



## struct PipelineNotificationRuleProps  <a id="cloudcomponents-cdk-developer-tools-notifications-pipelinenotificationruleprops"></a>






Name | Type | Description 
-----|------|-------------
**events** | <code>Array<[PipelineEvent](#cloudcomponents-cdk-developer-tools-notifications-pipelineevent)></code> | <span></span>
**name** | <code>string</code> | The name for the notification rule.
**pipeline** | <code>[IPipeline](#aws-cdk-aws-codepipeline-ipipeline)</code> | <span></span>
**detailType**? | <code>[DetailType](#cloudcomponents-cdk-developer-tools-notifications-detailtype)</code> | The level of detail to include in the notifications for this resource.<br/>__*Default*__: FULL
**status**? | <code>[Status](#cloudcomponents-cdk-developer-tools-notifications-status)</code> | The status of the notification rule.<br/>__*Default*__: ENABLED
**targets**? | <code>Array<[INotificationTarget](#cloudcomponents-cdk-developer-tools-notifications-inotificationtarget)></code> | SNS topics or AWS Chatbot clients to associate with the notification rule.<br/>__*Optional*__



## struct ProjectNotificationRuleProps  <a id="cloudcomponents-cdk-developer-tools-notifications-projectnotificationruleprops"></a>






Name | Type | Description 
-----|------|-------------
**events** | <code>Array<[ProjectEvent](#cloudcomponents-cdk-developer-tools-notifications-projectevent)></code> | <span></span>
**name** | <code>string</code> | The name for the notification rule.
**project** | <code>[IProject](#aws-cdk-aws-codebuild-iproject)</code> | <span></span>
**detailType**? | <code>[DetailType](#cloudcomponents-cdk-developer-tools-notifications-detailtype)</code> | The level of detail to include in the notifications for this resource.<br/>__*Default*__: FULL
**status**? | <code>[Status](#cloudcomponents-cdk-developer-tools-notifications-status)</code> | The status of the notification rule.<br/>__*Default*__: ENABLED
**targets**? | <code>Array<[INotificationTarget](#cloudcomponents-cdk-developer-tools-notifications-inotificationtarget)></code> | SNS topics or AWS Chatbot clients to associate with the notification rule.<br/>__*Optional*__



## struct RepositoryNotificationRuleProps  <a id="cloudcomponents-cdk-developer-tools-notifications-repositorynotificationruleprops"></a>






Name | Type | Description 
-----|------|-------------
**events** | <code>Array<[RepositoryEvent](#cloudcomponents-cdk-developer-tools-notifications-repositoryevent)></code> | <span></span>
**name** | <code>string</code> | The name for the notification rule.
**repository** | <code>[IRepository](#aws-cdk-aws-codecommit-irepository)</code> | <span></span>
**detailType**? | <code>[DetailType](#cloudcomponents-cdk-developer-tools-notifications-detailtype)</code> | The level of detail to include in the notifications for this resource.<br/>__*Default*__: FULL
**status**? | <code>[Status](#cloudcomponents-cdk-developer-tools-notifications-status)</code> | The status of the notification rule.<br/>__*Default*__: ENABLED
**targets**? | <code>Array<[INotificationTarget](#cloudcomponents-cdk-developer-tools-notifications-inotificationtarget)></code> | SNS topics or AWS Chatbot clients to associate with the notification rule.<br/>__*Optional*__



## enum ApplicationEvent  <a id="cloudcomponents-cdk-developer-tools-notifications-applicationevent"></a>



Name | Description
-----|-----
**DEPLOYMENT_FAILED** |
**DEPLOYMENT_SUCCEEDED** |
**DEPLOYMENT_STARTED** |


## enum DetailType  <a id="cloudcomponents-cdk-developer-tools-notifications-detailtype"></a>



Name | Description
-----|-----
**FULL** |
**BASIC** |


## enum PipelineEvent  <a id="cloudcomponents-cdk-developer-tools-notifications-pipelineevent"></a>



Name | Description
-----|-----
**ACTION_EXECUTION_SUCCEEDED** |
**ACTION_EXECUTION_FAILED** |
**ACTION_EXECUTION_CANCELED** |
**ACTION_EXECUTION_STARTED** |
**STAGE_EXECUTION_STARTED** |
**STAGE_EXECUTION_SUCCEEDED** |
**STAGE_EXECUTION_RESUMED** |
**STAGE_EXECUTION_CANCELED** |
**STAGE_EXECUTION_FAILED** |
**PIPELINE_EXECUTION_FAILED** |
**PIPELINE_EXECUTION_CANCELED** |
**PIPELINE_EXECUTION_STARTED** |
**PIPELINE_EXECUTION_RESUMED** |
**PIPELINE_EXECUTION_SUCCEEDED** |
**PIPELINE_EXECUTION_SUPERSEDED** |
**MANUAL_APPROVAL_FAILED** |
**MANUAL_APPROVAL_NEEDED** |
**MANUAL_APPROVAL_SUCCEEDED** |


## enum ProjectEvent  <a id="cloudcomponents-cdk-developer-tools-notifications-projectevent"></a>



Name | Description
-----|-----
**BUILD_STATE_FAILED** |
**BUILD_STATE_SUCCEEDED** |
**BUILD_STATE_IN_PROGRESS** |
**BUILD_STATE_STOPPED** |
**BUILD_PHASE_FAILURE** |
**BUILD_PHASE_SUCCESS** |


## enum RepositoryEvent  <a id="cloudcomponents-cdk-developer-tools-notifications-repositoryevent"></a>



Name | Description
-----|-----
**COMMENTS_ON_COMMITS** |
**COMMENTS_ON_PULL_REQUEST** |
**APPROVAL_STATUS_CHANGED** |
**APPROVAL_RULE_OVERRIDE** |
**PULL_REQUEST_CREATED** |
**PULL_REQUEST_SOURCE_UPDATED** |
**PULL_REQUEST_STATUS_CHANGED** |
**PULL_REQUEST_MERGED** |
**BRANCHES_AND_TAGS_CREATED** |
**BRANCHES_AND_TAGS_DELETED** |
**BRANCHES_AND_TAGS_UPDATED** |


## enum Status  <a id="cloudcomponents-cdk-developer-tools-notifications-status"></a>



Name | Description
-----|-----
**DISABLED** |
**ENABLED** |


## enum TargetType  <a id="cloudcomponents-cdk-developer-tools-notifications-targettype"></a>



Name | Description
-----|-----
**SNS** |
**AWS_CHATBOT_SLACK** |


