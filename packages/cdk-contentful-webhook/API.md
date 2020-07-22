# API Reference

**Classes**

Name|Description
----|-----------
[ContentfulWebhook](#cloudcomponents-cdk-contentful-webhook-contentfulwebhook)|*No description*


**Structs**

Name|Description
----|-----------
[ContentfulWebhookProps](#cloudcomponents-cdk-contentful-webhook-contentfulwebhookprops)|*No description*



## class ContentfulWebhook  <a id="cloudcomponents-cdk-contentful-webhook-contentfulwebhook"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new ContentfulWebhook(scope: Construct, id: string, props: ContentfulWebhookProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ContentfulWebhookProps](#cloudcomponents-cdk-contentful-webhook-contentfulwebhookprops)</code>)  *No description*
  * **accessToken** (<code>string</code>)  *No description* 
  * **name** (<code>string</code>)  *No description* 
  * **spaceId** (<code>string</code>)  *No description* 
  * **topics** (<code>Array<string></code>)  *No description* 
  * **url** (<code>string</code>)  *No description* 
  * **logLevel** (<code>string</code>)  *No description* __*Optional*__




## struct ContentfulWebhookProps  <a id="cloudcomponents-cdk-contentful-webhook-contentfulwebhookprops"></a>






Name | Type | Description 
-----|------|-------------
**accessToken** | <code>string</code> | <span></span>
**name** | <code>string</code> | <span></span>
**spaceId** | <code>string</code> | <span></span>
**topics** | <code>Array<string></code> | <span></span>
**url** | <code>string</code> | <span></span>
**logLevel**? | <code>string</code> | __*Optional*__



