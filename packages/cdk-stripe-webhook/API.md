# API Reference

**Classes**

Name|Description
----|-----------
[StripeWebhook](#cloudcomponents-cdk-stripe-webhook-stripewebhook)|*No description*


**Structs**

Name|Description
----|-----------
[StripeWebhookProps](#cloudcomponents-cdk-stripe-webhook-stripewebhookprops)|*No description*



## class StripeWebhook  <a id="cloudcomponents-cdk-stripe-webhook-stripewebhook"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new StripeWebhook(scope: Construct, id: string, props: StripeWebhookProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[StripeWebhookProps](#cloudcomponents-cdk-stripe-webhook-stripewebhookprops)</code>)  *No description*
  * **events** (<code>Array<string></code>)  *No description* 
  * **secretKey** (<code>string</code>)  *No description* 
  * **url** (<code>string</code>)  *No description* 
  * **logLevel** (<code>string</code>)  *No description* __*Optional*__




## struct StripeWebhookProps  <a id="cloudcomponents-cdk-stripe-webhook-stripewebhookprops"></a>






Name | Type | Description 
-----|------|-------------
**events** | <code>Array<string></code> | <span></span>
**secretKey** | <code>string</code> | <span></span>
**url** | <code>string</code> | <span></span>
**logLevel**? | <code>string</code> | __*Optional*__



