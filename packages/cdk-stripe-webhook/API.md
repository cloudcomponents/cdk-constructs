# API Reference

**Classes**

Name|Description
----|-----------
[StripeEventBridgeProducer](#cloudcomponents-cdk-stripe-webhook-stripeeventbridgeproducer)|*No description*
[StripeWebhook](#cloudcomponents-cdk-stripe-webhook-stripewebhook)|*No description*


**Structs**

Name|Description
----|-----------
[StripeEventBridgeProducerProps](#cloudcomponents-cdk-stripe-webhook-stripeeventbridgeproducerprops)|*No description*
[StripeWebhookProps](#cloudcomponents-cdk-stripe-webhook-stripewebhookprops)|*No description*



## class StripeEventBridgeProducer  <a id="cloudcomponents-cdk-stripe-webhook-stripeeventbridgeproducer"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new StripeEventBridgeProducer(scope: Construct, id: string, props: StripeEventBridgeProducerProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[StripeEventBridgeProducerProps](#cloudcomponents-cdk-stripe-webhook-stripeeventbridgeproducerprops)</code>)  *No description*
  * **endpointSecret** (<code>[SecretKey](#cloudcomponents-cdk-secret-key-secretkey)</code>)  *No description* 
  * **eventBus** (<code>[IEventBus](#aws-cdk-aws-events-ieventbus)</code>)  *No description* __*Optional*__
  * **source** (<code>string</code>)  *No description* __*Optional*__
  * **throttlingBurstLimit** (<code>number</code>)  *No description* __*Optional*__
  * **throttlingRateLimit** (<code>number</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**url** | <code>string</code> | <span></span>



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
  * **secretKey** (<code>string &#124; [SecretKey](#cloudcomponents-cdk-secret-key-secretkey)</code>)  *No description* 
  * **url** (<code>string</code>)  *No description* 
  * **description** (<code>string</code>)  *No description* __*Optional*__
  * **endpointSecretStore** (<code>[SecretKeyStore](#cloudcomponents-cdk-secret-key-secretkeystore)</code>)  *No description* __*Optional*__
  * **logLevel** (<code>string</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**id** | <code>string</code> | <span></span>



## struct StripeEventBridgeProducerProps  <a id="cloudcomponents-cdk-stripe-webhook-stripeeventbridgeproducerprops"></a>






Name | Type | Description 
-----|------|-------------
**endpointSecret** | <code>[SecretKey](#cloudcomponents-cdk-secret-key-secretkey)</code> | <span></span>
**eventBus**? | <code>[IEventBus](#aws-cdk-aws-events-ieventbus)</code> | __*Optional*__
**source**? | <code>string</code> | __*Optional*__
**throttlingBurstLimit**? | <code>number</code> | __*Optional*__
**throttlingRateLimit**? | <code>number</code> | __*Optional*__



## struct StripeWebhookProps  <a id="cloudcomponents-cdk-stripe-webhook-stripewebhookprops"></a>






Name | Type | Description 
-----|------|-------------
**events** | <code>Array<string></code> | <span></span>
**secretKey** | <code>string &#124; [SecretKey](#cloudcomponents-cdk-secret-key-secretkey)</code> | <span></span>
**url** | <code>string</code> | <span></span>
**description**? | <code>string</code> | __*Optional*__
**endpointSecretStore**? | <code>[SecretKeyStore](#cloudcomponents-cdk-secret-key-secretkeystore)</code> | __*Optional*__
**logLevel**? | <code>string</code> | __*Optional*__



