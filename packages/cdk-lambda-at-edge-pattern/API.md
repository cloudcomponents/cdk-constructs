# API Reference

**Classes**

Name|Description
----|-----------
[EdgeFunction](#cloudcomponents-cdk-lambda-at-edge-pattern-edgefunction)|*No description*
[HttpHeaders](#cloudcomponents-cdk-lambda-at-edge-pattern-httpheaders)|*No description*
[WithConfiguration](#cloudcomponents-cdk-lambda-at-edge-pattern-withconfiguration)|*No description*


**Structs**

Name|Description
----|-----------
[CommonEdgeFunctionProps](#cloudcomponents-cdk-lambda-at-edge-pattern-commonedgefunctionprops)|*No description*
[Configuration](#cloudcomponents-cdk-lambda-at-edge-pattern-configuration)|*No description*
[EdgeFunctionProps](#cloudcomponents-cdk-lambda-at-edge-pattern-edgefunctionprops)|*No description*
[HttpHeadersProps](#cloudcomponents-cdk-lambda-at-edge-pattern-httpheadersprops)|*No description*
[WithConfigurationProps](#cloudcomponents-cdk-lambda-at-edge-pattern-withconfigurationprops)|*No description*


**Interfaces**

Name|Description
----|-----------
[ILambdaFunctionAssociation](#cloudcomponents-cdk-lambda-at-edge-pattern-ilambdafunctionassociation)|*No description*


**Enums**

Name|Description
----|-----------
[LogLevel](#cloudcomponents-cdk-lambda-at-edge-pattern-loglevel)|*No description*



## class EdgeFunction  <a id="cloudcomponents-cdk-lambda-at-edge-pattern-edgefunction"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new EdgeFunction(scope: Construct, id: string, props: EdgeFunctionProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[EdgeFunctionProps](#cloudcomponents-cdk-lambda-at-edge-pattern-edgefunctionprops)</code>)  *No description*
  * **logLevel** (<code>[LogLevel](#cloudcomponents-cdk-lambda-at-edge-pattern-loglevel)</code>)  *No description* __*Optional*__
  * **parameterName** (<code>string</code>)  The name of the parameter. __*Optional*__
  * **role** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  *No description* __*Optional*__
  * **code** (<code>[Code](#aws-cdk-aws-lambda-code)</code>)  *No description* 
  * **name** (<code>string</code>)  *No description* 



### Properties


Name | Type | Description 
-----|------|-------------
**role** | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | <span></span>

### Methods


#### retrieveEdgeFunction(scope) <a id="cloudcomponents-cdk-lambda-at-edge-pattern-edgefunction-retrieveedgefunction"></a>



```ts
retrieveEdgeFunction(scope: Construct): IFunction
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*

__Returns__:
* <code>[IFunction](#aws-cdk-aws-lambda-ifunction)</code>



## class HttpHeaders  <a id="cloudcomponents-cdk-lambda-at-edge-pattern-httpheaders"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [ILambdaFunctionAssociation](#cloudcomponents-cdk-lambda-at-edge-pattern-ilambdafunctionassociation)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new HttpHeaders(scope: Construct, id: string, props: HttpHeadersProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[HttpHeadersProps](#cloudcomponents-cdk-lambda-at-edge-pattern-httpheadersprops)</code>)  *No description*
  * **logLevel** (<code>[LogLevel](#cloudcomponents-cdk-lambda-at-edge-pattern-loglevel)</code>)  *No description* __*Optional*__
  * **parameterName** (<code>string</code>)  The name of the parameter. __*Optional*__
  * **role** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  *No description* __*Optional*__
  * **httpHeaders** (<code>Map<string, string></code>)  *No description* 



### Properties


Name | Type | Description 
-----|------|-------------
**eventType** | <code>[LambdaEdgeEventType](#aws-cdk-aws-cloudfront-lambdaedgeeventtype)</code> | <span></span>
**lambdaFunction** | <code>[IVersion](#aws-cdk-aws-lambda-iversion)</code> | <span></span>



## class WithConfiguration  <a id="cloudcomponents-cdk-lambda-at-edge-pattern-withconfiguration"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new WithConfiguration(scope: Construct, id: string, props: WithConfigurationProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[WithConfigurationProps](#cloudcomponents-cdk-lambda-at-edge-pattern-withconfigurationprops)</code>)  *No description*
  * **configuration** (<code>[Configuration](#cloudcomponents-cdk-lambda-at-edge-pattern-configuration)</code>)  *No description* 
  * **function** (<code>[IFunction](#aws-cdk-aws-lambda-ifunction)</code>)  *No description* 



### Properties


Name | Type | Description 
-----|------|-------------
**lambdaFunction** | <code>[IVersion](#aws-cdk-aws-lambda-iversion)</code> | <span></span>



## struct CommonEdgeFunctionProps  <a id="cloudcomponents-cdk-lambda-at-edge-pattern-commonedgefunctionprops"></a>






Name | Type | Description 
-----|------|-------------
**logLevel**? | <code>[LogLevel](#cloudcomponents-cdk-lambda-at-edge-pattern-loglevel)</code> | __*Optional*__
**parameterName**? | <code>string</code> | The name of the parameter.<br/>__*Optional*__
**role**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | __*Optional*__



## struct Configuration  <a id="cloudcomponents-cdk-lambda-at-edge-pattern-configuration"></a>






Name | Type | Description 
-----|------|-------------
**logLevel** | <code>[LogLevel](#cloudcomponents-cdk-lambda-at-edge-pattern-loglevel)</code> | <span></span>



## struct EdgeFunctionProps  <a id="cloudcomponents-cdk-lambda-at-edge-pattern-edgefunctionprops"></a>






Name | Type | Description 
-----|------|-------------
**code** | <code>[Code](#aws-cdk-aws-lambda-code)</code> | <span></span>
**name** | <code>string</code> | <span></span>
**logLevel**? | <code>[LogLevel](#cloudcomponents-cdk-lambda-at-edge-pattern-loglevel)</code> | __*Optional*__
**parameterName**? | <code>string</code> | The name of the parameter.<br/>__*Optional*__
**role**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | __*Optional*__



## struct HttpHeadersProps  <a id="cloudcomponents-cdk-lambda-at-edge-pattern-httpheadersprops"></a>






Name | Type | Description 
-----|------|-------------
**httpHeaders** | <code>Map<string, string></code> | <span></span>
**logLevel**? | <code>[LogLevel](#cloudcomponents-cdk-lambda-at-edge-pattern-loglevel)</code> | __*Optional*__
**parameterName**? | <code>string</code> | The name of the parameter.<br/>__*Optional*__
**role**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | __*Optional*__



## interface ILambdaFunctionAssociation  <a id="cloudcomponents-cdk-lambda-at-edge-pattern-ilambdafunctionassociation"></a>

__Implemented by__: [HttpHeaders](#cloudcomponents-cdk-lambda-at-edge-pattern-httpheaders)



### Properties


Name | Type | Description 
-----|------|-------------
**eventType** | <code>[LambdaEdgeEventType](#aws-cdk-aws-cloudfront-lambdaedgeeventtype)</code> | <span></span>
**lambdaFunction** | <code>[IVersion](#aws-cdk-aws-lambda-iversion)</code> | <span></span>



## struct WithConfigurationProps  <a id="cloudcomponents-cdk-lambda-at-edge-pattern-withconfigurationprops"></a>






Name | Type | Description 
-----|------|-------------
**configuration** | <code>[Configuration](#cloudcomponents-cdk-lambda-at-edge-pattern-configuration)</code> | <span></span>
**function** | <code>[IFunction](#aws-cdk-aws-lambda-ifunction)</code> | <span></span>



## enum LogLevel  <a id="cloudcomponents-cdk-lambda-at-edge-pattern-loglevel"></a>



Name | Description
-----|-----
**NONE** |
**INFO** |
**WARN** |
**ERROR** |
**DEBUG** |


