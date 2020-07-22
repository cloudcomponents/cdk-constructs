# API Reference

**Classes**

Name|Description
----|-----------
[MSTeamsIncomingWebhookConfiguration](#cloudcomponents-cdk-chatops-msteamsincomingwebhookconfiguration)|*No description*
[SlackChannelConfiguration](#cloudcomponents-cdk-chatops-slackchannelconfiguration)|*No description*


**Structs**

Name|Description
----|-----------
[MSTeamsIncomingWebhookConfigurationProps](#cloudcomponents-cdk-chatops-msteamsincomingwebhookconfigurationprops)|*No description*
[SlackChannelConfigurationProps](#cloudcomponents-cdk-chatops-slackchannelconfigurationprops)|*No description*


**Interfaces**

Name|Description
----|-----------
[ISlackChannelConfiguration](#cloudcomponents-cdk-chatops-islackchannelconfiguration)|*No description*


**Enums**

Name|Description
----|-----------
[AccountLabelMode](#cloudcomponents-cdk-chatops-accountlabelmode)|*No description*
[LoggingLevel](#cloudcomponents-cdk-chatops-logginglevel)|*No description*



## class MSTeamsIncomingWebhookConfiguration  <a id="cloudcomponents-cdk-chatops-msteamsincomingwebhookconfiguration"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new MSTeamsIncomingWebhookConfiguration(scope: Construct, id: string, props: MSTeamsIncomingWebhookConfigurationProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[MSTeamsIncomingWebhookConfigurationProps](#cloudcomponents-cdk-chatops-msteamsincomingwebhookconfigurationprops)</code>)  *No description*
  * **url** (<code>string</code>)  The url of the incoming webhook for a channel. 
  * **accountLabelMode** (<code>[AccountLabelMode](#cloudcomponents-cdk-chatops-accountlabelmode)</code>)  *No description* __*Default*__: ACCOUNT_LABEL_MODE.ID_AND_ALIAS
  * **notificationTopics** (<code>Array<[ITopic](#aws-cdk-aws-sns-itopic)></code>)  The SNS topics that deliver notifications to MS Teams. __*Optional*__
  * **themeColor** (<code>string</code>)  Specifies a custom brand color for the card. __*Default*__: `#CEDB56`


### Methods


#### addEventSource(snsEventSource) <a id="cloudcomponents-cdk-chatops-msteamsincomingwebhookconfiguration-addeventsource"></a>



```ts
addEventSource(snsEventSource: SnsEventSource): void
```

* **snsEventSource** (<code>[SnsEventSource](#aws-cdk-aws-lambda-event-sources-snseventsource)</code>)  *No description*






## class SlackChannelConfiguration  <a id="cloudcomponents-cdk-chatops-slackchannelconfiguration"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new SlackChannelConfiguration(scope: Construct, id: string, props: SlackChannelConfigurationProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[SlackChannelConfigurationProps](#cloudcomponents-cdk-chatops-slackchannelconfigurationprops)</code>)  *No description*
  * **configurationName** (<code>string</code>)  The name of the configuration. 
  * **slackChannelId** (<code>string</code>)  The ID of the Slack channel. 
  * **slackWorkspaceId** (<code>string</code>)  The ID of the Slack workspace authorized with AWS Chatbot. 
  * **loggingLevel** (<code>[LoggingLevel](#cloudcomponents-cdk-chatops-logginglevel)</code>)  Specifies the logging level for this configuration. This property affects the log entries pushed to Amazon CloudWatch Logs. __*Default*__: NONE
  * **notificationTopics** (<code>Array<[ITopic](#aws-cdk-aws-sns-itopic)></code>)  The SNS topics that deliver notifications to AWS Chatbot. __*Optional*__
  * **role** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  The iam role that defines the permissions for AWS Chatbot. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**configurationArn** | <code>string</code> | <span></span>
**role** | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | <span></span>

### Methods


#### addLambdaInvokeCommandPermissions(lambda?) <a id="cloudcomponents-cdk-chatops-slackchannelconfiguration-addlambdainvokecommandpermissions"></a>

Allows Lambda-invoke commands in supported clients.

```ts
addLambdaInvokeCommandPermissions(lambda?: IFunction): void
```

* **lambda** (<code>[IFunction](#aws-cdk-aws-lambda-ifunction)</code>)  *No description*




#### addNotificationPermissions() <a id="cloudcomponents-cdk-chatops-slackchannelconfiguration-addnotificationpermissions"></a>

Allows AWS Chatbot to retreive metric graphs from Amazon Cloudwatch.

```ts
addNotificationPermissions(): void
```





#### addReadOnlyCommandPermissions() <a id="cloudcomponents-cdk-chatops-slackchannelconfiguration-addreadonlycommandpermissions"></a>



```ts
addReadOnlyCommandPermissions(): void
```





#### addSupportCommandPermissions() <a id="cloudcomponents-cdk-chatops-slackchannelconfiguration-addsupportcommandpermissions"></a>

Allows calling AWS Support APIs in supportzed clients.

```ts
addSupportCommandPermissions(): void
```





#### addToRolePolicy(statement) <a id="cloudcomponents-cdk-chatops-slackchannelconfiguration-addtorolepolicy"></a>

Adds a statement to the IAM role assumed by the instance.

```ts
addToRolePolicy(statement: PolicyStatement): void
```

* **statement** (<code>[PolicyStatement](#aws-cdk-aws-iam-policystatement)</code>)  *No description*






## interface ISlackChannelConfiguration  <a id="cloudcomponents-cdk-chatops-islackchannelconfiguration"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**configurationArn** | <code>string</code> | <span></span>



## struct MSTeamsIncomingWebhookConfigurationProps  <a id="cloudcomponents-cdk-chatops-msteamsincomingwebhookconfigurationprops"></a>






Name | Type | Description 
-----|------|-------------
**url** | <code>string</code> | The url of the incoming webhook for a channel.
**accountLabelMode**? | <code>[AccountLabelMode](#cloudcomponents-cdk-chatops-accountlabelmode)</code> | __*Default*__: ACCOUNT_LABEL_MODE.ID_AND_ALIAS
**notificationTopics**? | <code>Array<[ITopic](#aws-cdk-aws-sns-itopic)></code> | The SNS topics that deliver notifications to MS Teams.<br/>__*Optional*__
**themeColor**? | <code>string</code> | Specifies a custom brand color for the card.<br/>__*Default*__: `#CEDB56`



## struct SlackChannelConfigurationProps  <a id="cloudcomponents-cdk-chatops-slackchannelconfigurationprops"></a>






Name | Type | Description 
-----|------|-------------
**configurationName** | <code>string</code> | The name of the configuration.
**slackChannelId** | <code>string</code> | The ID of the Slack channel.
**slackWorkspaceId** | <code>string</code> | The ID of the Slack workspace authorized with AWS Chatbot.
**loggingLevel**? | <code>[LoggingLevel](#cloudcomponents-cdk-chatops-logginglevel)</code> | Specifies the logging level for this configuration. This property affects the log entries pushed to Amazon CloudWatch Logs.<br/>__*Default*__: NONE
**notificationTopics**? | <code>Array<[ITopic](#aws-cdk-aws-sns-itopic)></code> | The SNS topics that deliver notifications to AWS Chatbot.<br/>__*Optional*__
**role**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | The iam role that defines the permissions for AWS Chatbot.<br/>__*Optional*__



## enum AccountLabelMode  <a id="cloudcomponents-cdk-chatops-accountlabelmode"></a>



Name | Description
-----|-----
**ID** |
**ALIAS** |
**ID_AND_ALIAS** |


## enum LoggingLevel  <a id="cloudcomponents-cdk-chatops-logginglevel"></a>



Name | Description
-----|-----
**ERROR** |
**INFO** |
**NONE** |


