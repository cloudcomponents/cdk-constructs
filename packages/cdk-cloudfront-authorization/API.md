# API Reference

**Classes**

Name|Description
----|-----------
[AuthFlow](#cloudcomponents-cdk-cloudfront-authorization-authflow)|*No description*
[Authorization](#cloudcomponents-cdk-cloudfront-authorization-authorization)|*No description*
[BaseDistribution](#cloudcomponents-cdk-cloudfront-authorization-basedistribution)|*No description*
[RetrieveUserPoolClientSecret](#cloudcomponents-cdk-cloudfront-authorization-retrieveuserpoolclientsecret)|*No description*
[SecretGenerator](#cloudcomponents-cdk-cloudfront-authorization-secretgenerator)|*No description*
[SpaAuthorization](#cloudcomponents-cdk-cloudfront-authorization-spaauthorization)|*No description*
[SpaDistribution](#cloudcomponents-cdk-cloudfront-authorization-spadistribution)|*No description*
[StaticSiteAuthorization](#cloudcomponents-cdk-cloudfront-authorization-staticsiteauthorization)|*No description*
[StaticSiteDistribution](#cloudcomponents-cdk-cloudfront-authorization-staticsitedistribution)|*No description*
[UserPoolClientRedirects](#cloudcomponents-cdk-cloudfront-authorization-userpoolclientredirects)|*No description*


**Structs**

Name|Description
----|-----------
[AuthFlowProps](#cloudcomponents-cdk-cloudfront-authorization-authflowprops)|*No description*
[AuthorizationProps](#cloudcomponents-cdk-cloudfront-authorization-authorizationprops)|*No description*
[BaseDistributionProps](#cloudcomponents-cdk-cloudfront-authorization-basedistributionprops)|*No description*
[CommonDistributionProps](#cloudcomponents-cdk-cloudfront-authorization-commondistributionprops)|*No description*
[RedirectPaths](#cloudcomponents-cdk-cloudfront-authorization-redirectpaths)|*No description*
[RetrieveUserPoolClientSecretProps](#cloudcomponents-cdk-cloudfront-authorization-retrieveuserpoolclientsecretprops)|*No description*
[SecretGeneratorProps](#cloudcomponents-cdk-cloudfront-authorization-secretgeneratorprops)|*No description*
[SpaDistributionProps](#cloudcomponents-cdk-cloudfront-authorization-spadistributionprops)|*No description*
[StaticSiteDistributionProps](#cloudcomponents-cdk-cloudfront-authorization-staticsitedistributionprops)|*No description*
[UserPoolClientCallbackUrls](#cloudcomponents-cdk-cloudfront-authorization-userpoolclientcallbackurls)|*No description*
[UserPoolClientRedirectsProps](#cloudcomponents-cdk-cloudfront-authorization-userpoolclientredirectsprops)|*No description*


**Interfaces**

Name|Description
----|-----------
[IAuthorization](#cloudcomponents-cdk-cloudfront-authorization-iauthorization)|*No description*
[ISpaAuthorization](#cloudcomponents-cdk-cloudfront-authorization-ispaauthorization)|*No description*
[IStaticSiteAuthorization](#cloudcomponents-cdk-cloudfront-authorization-istaticsiteauthorization)|*No description*


**Enums**

Name|Description
----|-----------
[Mode](#cloudcomponents-cdk-cloudfront-authorization-mode)|*No description*



## class AuthFlow  <a id="cloudcomponents-cdk-cloudfront-authorization-authflow"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new AuthFlow(scope: Construct, id: string, props: AuthFlowProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[AuthFlowProps](#cloudcomponents-cdk-cloudfront-authorization-authflowprops)</code>)  *No description*
  * **cognitoAuthDomain** (<code>string</code>)  *No description* 
  * **cookieSettings** (<code>Map<string, string></code>)  *No description* 
  * **httpHeaders** (<code>Map<string, string></code>)  *No description* 
  * **logLevel** (<code>[LogLevel](#cloudcomponents-cdk-lambda-at-edge-pattern-loglevel)</code>)  *No description* 
  * **nonceSigningSecret** (<code>string</code>)  *No description* 
  * **oauthScopes** (<code>Array<[OAuthScope](#aws-cdk-aws-cognito-oauthscope)></code>)  *No description* 
  * **redirectPaths** (<code>[RedirectPaths](#cloudcomponents-cdk-cloudfront-authorization-redirectpaths)</code>)  *No description* 
  * **userPool** (<code>[IUserPool](#aws-cdk-aws-cognito-iuserpool)</code>)  *No description* 
  * **userPoolClient** (<code>[IUserPoolClient](#aws-cdk-aws-cognito-iuserpoolclient)</code>)  *No description* 
  * **clientSecret** (<code>string</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**checkAuth** | <code>[EdgeLambda](#aws-cdk-aws-cloudfront-edgelambda)</code> | <span></span>
**httpHeaders** | <code>[EdgeLambda](#aws-cdk-aws-cloudfront-edgelambda)</code> | <span></span>
**parseAuth** | <code>[EdgeLambda](#aws-cdk-aws-cloudfront-edgelambda)</code> | <span></span>
**refreshAuth** | <code>[EdgeLambda](#aws-cdk-aws-cloudfront-edgelambda)</code> | <span></span>
**signOut** | <code>[EdgeLambda](#aws-cdk-aws-cloudfront-edgelambda)</code> | <span></span>



## class Authorization  <a id="cloudcomponents-cdk-cloudfront-authorization-authorization"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)
__Implemented by__: [SpaAuthorization](#cloudcomponents-cdk-cloudfront-authorization-spaauthorization), [StaticSiteAuthorization](#cloudcomponents-cdk-cloudfront-authorization-staticsiteauthorization)

### Initializer




```ts
new Authorization(scope: Construct, id: string, props: AuthorizationProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[AuthorizationProps](#cloudcomponents-cdk-cloudfront-authorization-authorizationprops)</code>)  *No description*
  * **userPool** (<code>[IUserPool](#aws-cdk-aws-cognito-iuserpool)</code>)  *No description* 
  * **httpHeaders** (<code>Map<string, string></code>)  *No description* __*Optional*__
  * **logLevel** (<code>[LogLevel](#cloudcomponents-cdk-lambda-at-edge-pattern-loglevel)</code>)  *No description* __*Optional*__
  * **oauthScopes** (<code>Array<[OAuthScope](#aws-cdk-aws-cognito-oauthscope)></code>)  *No description* __*Optional*__
  * **redirectPaths** (<code>[RedirectPaths](#cloudcomponents-cdk-cloudfront-authorization-redirectpaths)</code>)  *No description* __*Optional*__
  * **signOutUrl** (<code>string</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**cognitoAuthDomain** | <code>string</code> | <span></span>
**httpHeaders** | <code>Map<string, string></code> | <span></span>
**nonceSigningSecret** | <code>string</code> | <span></span>
**oauthScopes** | <code>Array<[OAuthScope](#aws-cdk-aws-cognito-oauthscope)></code> | <span></span>
**redirectPaths** | <code>[RedirectPaths](#cloudcomponents-cdk-cloudfront-authorization-redirectpaths)</code> | <span></span>
**signOutUrlPath** | <code>string</code> | <span></span>
**userPool** | <code>[IUserPool](#aws-cdk-aws-cognito-iuserpool)</code> | <span></span>
**userPoolClient** | <code>[IUserPoolClient](#aws-cdk-aws-cognito-iuserpoolclient)</code> | <span></span>

### Methods


#### createAdditionalBehaviors(origin) <a id="cloudcomponents-cdk-cloudfront-authorization-authorization-createadditionalbehaviors"></a>



```ts
createAdditionalBehaviors(origin: IOrigin): Map<string, BehaviorOptions>
```

* **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description*

__Returns__:
* <code>Map<string, [BehaviorOptions](#aws-cdk-aws-cloudfront-behavioroptions)></code>

#### createDefaultBehavior(origin) <a id="cloudcomponents-cdk-cloudfront-authorization-authorization-createdefaultbehavior"></a>



```ts
createDefaultBehavior(origin: IOrigin): BehaviorOptions
```

* **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description*

__Returns__:
* <code>[BehaviorOptions](#aws-cdk-aws-cloudfront-behavioroptions)</code>

#### updateUserPoolClientCallbacks(redirects) <a id="cloudcomponents-cdk-cloudfront-authorization-authorization-updateuserpoolclientcallbacks"></a>



```ts
updateUserPoolClientCallbacks(redirects: UserPoolClientCallbackUrls): void
```

* **redirects** (<code>[UserPoolClientCallbackUrls](#cloudcomponents-cdk-cloudfront-authorization-userpoolclientcallbackurls)</code>)  *No description*
  * **callbackUrls** (<code>Array<string></code>)  A list of allowed redirect (callback) URLs for the identity providers. 
  * **logoutUrls** (<code>Array<string></code>)  A list of allowed logout URLs for the identity providers. 




#### protected createAuthFlow(logLevel) <a id="cloudcomponents-cdk-cloudfront-authorization-authorization-createauthflow"></a>



```ts
protected createAuthFlow(logLevel: LogLevel): AuthFlow
```

* **logLevel** (<code>[LogLevel](#cloudcomponents-cdk-lambda-at-edge-pattern-loglevel)</code>)  *No description*

__Returns__:
* <code>[AuthFlow](#cloudcomponents-cdk-cloudfront-authorization-authflow)</code>

#### protected createUserPoolClient() <a id="cloudcomponents-cdk-cloudfront-authorization-authorization-createuserpoolclient"></a>



```ts
protected createUserPoolClient(): IUserPoolClient
```


__Returns__:
* <code>[IUserPoolClient](#aws-cdk-aws-cognito-iuserpoolclient)</code>



## class BaseDistribution  <a id="cloudcomponents-cdk-cloudfront-authorization-basedistribution"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new BaseDistribution(scope: Construct, id: string, props: BaseDistributionProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[BaseDistributionProps](#cloudcomponents-cdk-cloudfront-authorization-basedistributionprops)</code>)  *No description*
  * **certificate** (<code>[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)</code>)  *No description* __*Optional*__
  * **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description* __*Optional*__
  * **priceClass** (<code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code>)  *No description* __*Optional*__
  * **removalPolicy** (<code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code>)  *No description* __*Optional*__
  * **authorization** (<code>[IAuthorization](#cloudcomponents-cdk-cloudfront-authorization-iauthorization)</code>)  *No description* 
  * **errorResponses** (<code>Array<[ErrorResponse](#aws-cdk-aws-cloudfront-errorresponse)></code>)  *No description* __*Optional*__




## class RetrieveUserPoolClientSecret  <a id="cloudcomponents-cdk-cloudfront-authorization-retrieveuserpoolclientsecret"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new RetrieveUserPoolClientSecret(scope: Construct, id: string, props: RetrieveUserPoolClientSecretProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[RetrieveUserPoolClientSecretProps](#cloudcomponents-cdk-cloudfront-authorization-retrieveuserpoolclientsecretprops)</code>)  *No description*
  * **userPool** (<code>[IUserPool](#aws-cdk-aws-cognito-iuserpool)</code>)  *No description* 
  * **userPoolClient** (<code>[IUserPoolClient](#aws-cdk-aws-cognito-iuserpoolclient)</code>)  *No description* 



### Properties


Name | Type | Description 
-----|------|-------------
**clientSecret** | <code>string</code> | <span></span>



## class SecretGenerator  <a id="cloudcomponents-cdk-cloudfront-authorization-secretgenerator"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new SecretGenerator(scope: Construct, id: string, props?: SecretGeneratorProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[SecretGeneratorProps](#cloudcomponents-cdk-cloudfront-authorization-secretgeneratorprops)</code>)  *No description*
  * **allowedCharacters** (<code>string</code>)  *No description* __*Optional*__
  * **length** (<code>number</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**secret** | <code>string</code> | <span></span>



## class SpaAuthorization  <a id="cloudcomponents-cdk-cloudfront-authorization-spaauthorization"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [ISpaAuthorization](#cloudcomponents-cdk-cloudfront-authorization-ispaauthorization), [IAuthorization](#cloudcomponents-cdk-cloudfront-authorization-iauthorization)
__Extends__: [Authorization](#cloudcomponents-cdk-cloudfront-authorization-authorization)

### Initializer




```ts
new SpaAuthorization(scope: Construct, id: string, props: AuthorizationProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[AuthorizationProps](#cloudcomponents-cdk-cloudfront-authorization-authorizationprops)</code>)  *No description*
  * **userPool** (<code>[IUserPool](#aws-cdk-aws-cognito-iuserpool)</code>)  *No description* 
  * **httpHeaders** (<code>Map<string, string></code>)  *No description* __*Optional*__
  * **logLevel** (<code>[LogLevel](#cloudcomponents-cdk-lambda-at-edge-pattern-loglevel)</code>)  *No description* __*Optional*__
  * **oauthScopes** (<code>Array<[OAuthScope](#aws-cdk-aws-cognito-oauthscope)></code>)  *No description* __*Optional*__
  * **redirectPaths** (<code>[RedirectPaths](#cloudcomponents-cdk-cloudfront-authorization-redirectpaths)</code>)  *No description* __*Optional*__
  * **signOutUrl** (<code>string</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**mode** | <code>[Mode](#cloudcomponents-cdk-cloudfront-authorization-mode)</code> | <span></span>

### Methods


#### protected createAuthFlow(logLevel) <a id="cloudcomponents-cdk-cloudfront-authorization-spaauthorization-createauthflow"></a>



```ts
protected createAuthFlow(logLevel: LogLevel): AuthFlow
```

* **logLevel** (<code>[LogLevel](#cloudcomponents-cdk-lambda-at-edge-pattern-loglevel)</code>)  *No description*

__Returns__:
* <code>[AuthFlow](#cloudcomponents-cdk-cloudfront-authorization-authflow)</code>

#### protected createUserPoolClient() <a id="cloudcomponents-cdk-cloudfront-authorization-spaauthorization-createuserpoolclient"></a>



```ts
protected createUserPoolClient(): IUserPoolClient
```


__Returns__:
* <code>[IUserPoolClient](#aws-cdk-aws-cognito-iuserpoolclient)</code>



## class SpaDistribution  <a id="cloudcomponents-cdk-cloudfront-authorization-spadistribution"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [BaseDistribution](#cloudcomponents-cdk-cloudfront-authorization-basedistribution)

### Initializer




```ts
new SpaDistribution(scope: Construct, id: string, props: SpaDistributionProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[SpaDistributionProps](#cloudcomponents-cdk-cloudfront-authorization-spadistributionprops)</code>)  *No description*
  * **certificate** (<code>[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)</code>)  *No description* __*Optional*__
  * **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description* __*Optional*__
  * **priceClass** (<code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code>)  *No description* __*Optional*__
  * **removalPolicy** (<code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code>)  *No description* __*Optional*__
  * **authorization** (<code>[ISpaAuthorization](#cloudcomponents-cdk-cloudfront-authorization-ispaauthorization)</code>)  *No description* 
  * **ttl** (<code>[Duration](#aws-cdk-core-duration)</code>)  The minimum amount of time, in seconds, that you want CloudFront to cache the HTTP status code specified in ErrorCode. __*Default*__: 300 seconds




## class StaticSiteAuthorization  <a id="cloudcomponents-cdk-cloudfront-authorization-staticsiteauthorization"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IStaticSiteAuthorization](#cloudcomponents-cdk-cloudfront-authorization-istaticsiteauthorization), [IAuthorization](#cloudcomponents-cdk-cloudfront-authorization-iauthorization)
__Extends__: [Authorization](#cloudcomponents-cdk-cloudfront-authorization-authorization)

### Initializer




```ts
new StaticSiteAuthorization(scope: Construct, id: string, props: AuthorizationProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[AuthorizationProps](#cloudcomponents-cdk-cloudfront-authorization-authorizationprops)</code>)  *No description*
  * **userPool** (<code>[IUserPool](#aws-cdk-aws-cognito-iuserpool)</code>)  *No description* 
  * **httpHeaders** (<code>Map<string, string></code>)  *No description* __*Optional*__
  * **logLevel** (<code>[LogLevel](#cloudcomponents-cdk-lambda-at-edge-pattern-loglevel)</code>)  *No description* __*Optional*__
  * **oauthScopes** (<code>Array<[OAuthScope](#aws-cdk-aws-cognito-oauthscope)></code>)  *No description* __*Optional*__
  * **redirectPaths** (<code>[RedirectPaths](#cloudcomponents-cdk-cloudfront-authorization-redirectpaths)</code>)  *No description* __*Optional*__
  * **signOutUrl** (<code>string</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**mode** | <code>[Mode](#cloudcomponents-cdk-cloudfront-authorization-mode)</code> | <span></span>

### Methods


#### protected createAuthFlow(logLevel) <a id="cloudcomponents-cdk-cloudfront-authorization-staticsiteauthorization-createauthflow"></a>



```ts
protected createAuthFlow(logLevel: LogLevel): AuthFlow
```

* **logLevel** (<code>[LogLevel](#cloudcomponents-cdk-lambda-at-edge-pattern-loglevel)</code>)  *No description*

__Returns__:
* <code>[AuthFlow](#cloudcomponents-cdk-cloudfront-authorization-authflow)</code>

#### protected createUserPoolClient() <a id="cloudcomponents-cdk-cloudfront-authorization-staticsiteauthorization-createuserpoolclient"></a>



```ts
protected createUserPoolClient(): IUserPoolClient
```


__Returns__:
* <code>[IUserPoolClient](#aws-cdk-aws-cognito-iuserpoolclient)</code>



## class StaticSiteDistribution  <a id="cloudcomponents-cdk-cloudfront-authorization-staticsitedistribution"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [BaseDistribution](#cloudcomponents-cdk-cloudfront-authorization-basedistribution)

### Initializer




```ts
new StaticSiteDistribution(scope: Construct, id: string, props: StaticSiteDistributionProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[StaticSiteDistributionProps](#cloudcomponents-cdk-cloudfront-authorization-staticsitedistributionprops)</code>)  *No description*
  * **certificate** (<code>[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)</code>)  *No description* __*Optional*__
  * **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description* __*Optional*__
  * **priceClass** (<code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code>)  *No description* __*Optional*__
  * **removalPolicy** (<code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code>)  *No description* __*Optional*__
  * **authorization** (<code>[IStaticSiteAuthorization](#cloudcomponents-cdk-cloudfront-authorization-istaticsiteauthorization)</code>)  *No description* 
  * **errorResponses** (<code>Array<[ErrorResponse](#aws-cdk-aws-cloudfront-errorresponse)></code>)  *No description* __*Optional*__




## class UserPoolClientRedirects  <a id="cloudcomponents-cdk-cloudfront-authorization-userpoolclientredirects"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new UserPoolClientRedirects(scope: Construct, id: string, props: UserPoolClientRedirectsProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[UserPoolClientRedirectsProps](#cloudcomponents-cdk-cloudfront-authorization-userpoolclientredirectsprops)</code>)  *No description*
  * **callbackUrls** (<code>Array<string></code>)  *No description* 
  * **logoutUrls** (<code>Array<string></code>)  *No description* 
  * **oauthScopes** (<code>Array<[OAuthScope](#aws-cdk-aws-cognito-oauthscope)></code>)  *No description* 
  * **userPool** (<code>[IUserPool](#aws-cdk-aws-cognito-iuserpool)</code>)  *No description* 
  * **userPoolClient** (<code>[IUserPoolClient](#aws-cdk-aws-cognito-iuserpoolclient)</code>)  *No description* 




## struct AuthFlowProps  <a id="cloudcomponents-cdk-cloudfront-authorization-authflowprops"></a>






Name | Type | Description 
-----|------|-------------
**cognitoAuthDomain** | <code>string</code> | <span></span>
**cookieSettings** | <code>Map<string, string></code> | <span></span>
**httpHeaders** | <code>Map<string, string></code> | <span></span>
**logLevel** | <code>[LogLevel](#cloudcomponents-cdk-lambda-at-edge-pattern-loglevel)</code> | <span></span>
**nonceSigningSecret** | <code>string</code> | <span></span>
**oauthScopes** | <code>Array<[OAuthScope](#aws-cdk-aws-cognito-oauthscope)></code> | <span></span>
**redirectPaths** | <code>[RedirectPaths](#cloudcomponents-cdk-cloudfront-authorization-redirectpaths)</code> | <span></span>
**userPool** | <code>[IUserPool](#aws-cdk-aws-cognito-iuserpool)</code> | <span></span>
**userPoolClient** | <code>[IUserPoolClient](#aws-cdk-aws-cognito-iuserpoolclient)</code> | <span></span>
**clientSecret**? | <code>string</code> | __*Optional*__



## struct AuthorizationProps  <a id="cloudcomponents-cdk-cloudfront-authorization-authorizationprops"></a>






Name | Type | Description 
-----|------|-------------
**userPool** | <code>[IUserPool](#aws-cdk-aws-cognito-iuserpool)</code> | <span></span>
**httpHeaders**? | <code>Map<string, string></code> | __*Optional*__
**logLevel**? | <code>[LogLevel](#cloudcomponents-cdk-lambda-at-edge-pattern-loglevel)</code> | __*Optional*__
**oauthScopes**? | <code>Array<[OAuthScope](#aws-cdk-aws-cognito-oauthscope)></code> | __*Optional*__
**redirectPaths**? | <code>[RedirectPaths](#cloudcomponents-cdk-cloudfront-authorization-redirectpaths)</code> | __*Optional*__
**signOutUrl**? | <code>string</code> | __*Optional*__



## struct BaseDistributionProps  <a id="cloudcomponents-cdk-cloudfront-authorization-basedistributionprops"></a>






Name | Type | Description 
-----|------|-------------
**authorization** | <code>[IAuthorization](#cloudcomponents-cdk-cloudfront-authorization-iauthorization)</code> | <span></span>
**certificate**? | <code>[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)</code> | __*Optional*__
**errorResponses**? | <code>Array<[ErrorResponse](#aws-cdk-aws-cloudfront-errorresponse)></code> | __*Optional*__
**origin**? | <code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code> | __*Optional*__
**priceClass**? | <code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code> | __*Optional*__
**removalPolicy**? | <code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code> | __*Optional*__



## struct CommonDistributionProps  <a id="cloudcomponents-cdk-cloudfront-authorization-commondistributionprops"></a>






Name | Type | Description 
-----|------|-------------
**certificate**? | <code>[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)</code> | __*Optional*__
**origin**? | <code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code> | __*Optional*__
**priceClass**? | <code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code> | __*Optional*__
**removalPolicy**? | <code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code> | __*Optional*__



## interface IAuthorization  <a id="cloudcomponents-cdk-cloudfront-authorization-iauthorization"></a>

__Implemented by__: [SpaAuthorization](#cloudcomponents-cdk-cloudfront-authorization-spaauthorization), [StaticSiteAuthorization](#cloudcomponents-cdk-cloudfront-authorization-staticsiteauthorization)



### Properties


Name | Type | Description 
-----|------|-------------
**redirectPaths** | <code>[RedirectPaths](#cloudcomponents-cdk-cloudfront-authorization-redirectpaths)</code> | <span></span>
**signOutUrlPath** | <code>string</code> | <span></span>

### Methods


#### createAdditionalBehaviors(origin) <a id="cloudcomponents-cdk-cloudfront-authorization-iauthorization-createadditionalbehaviors"></a>



```ts
createAdditionalBehaviors(origin: IOrigin): Map<string, BehaviorOptions>
```

* **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description*

__Returns__:
* <code>Map<string, [BehaviorOptions](#aws-cdk-aws-cloudfront-behavioroptions)></code>

#### createDefaultBehavior(origin) <a id="cloudcomponents-cdk-cloudfront-authorization-iauthorization-createdefaultbehavior"></a>



```ts
createDefaultBehavior(origin: IOrigin): BehaviorOptions
```

* **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description*

__Returns__:
* <code>[BehaviorOptions](#aws-cdk-aws-cloudfront-behavioroptions)</code>

#### updateUserPoolClientCallbacks(redirects) <a id="cloudcomponents-cdk-cloudfront-authorization-iauthorization-updateuserpoolclientcallbacks"></a>



```ts
updateUserPoolClientCallbacks(redirects: UserPoolClientCallbackUrls): void
```

* **redirects** (<code>[UserPoolClientCallbackUrls](#cloudcomponents-cdk-cloudfront-authorization-userpoolclientcallbackurls)</code>)  *No description*
  * **callbackUrls** (<code>Array<string></code>)  A list of allowed redirect (callback) URLs for the identity providers. 
  * **logoutUrls** (<code>Array<string></code>)  A list of allowed logout URLs for the identity providers. 






## interface ISpaAuthorization  <a id="cloudcomponents-cdk-cloudfront-authorization-ispaauthorization"></a>

__Implemented by__: [SpaAuthorization](#cloudcomponents-cdk-cloudfront-authorization-spaauthorization)



### Properties


Name | Type | Description 
-----|------|-------------
**mode** | <code>[Mode](#cloudcomponents-cdk-cloudfront-authorization-mode)</code> | <span></span>
**redirectPaths** | <code>[RedirectPaths](#cloudcomponents-cdk-cloudfront-authorization-redirectpaths)</code> | <span></span>
**signOutUrlPath** | <code>string</code> | <span></span>

### Methods


#### createAdditionalBehaviors(origin) <a id="cloudcomponents-cdk-cloudfront-authorization-ispaauthorization-createadditionalbehaviors"></a>



```ts
createAdditionalBehaviors(origin: IOrigin): Map<string, BehaviorOptions>
```

* **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description*

__Returns__:
* <code>Map<string, [BehaviorOptions](#aws-cdk-aws-cloudfront-behavioroptions)></code>

#### createDefaultBehavior(origin) <a id="cloudcomponents-cdk-cloudfront-authorization-ispaauthorization-createdefaultbehavior"></a>



```ts
createDefaultBehavior(origin: IOrigin): BehaviorOptions
```

* **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description*

__Returns__:
* <code>[BehaviorOptions](#aws-cdk-aws-cloudfront-behavioroptions)</code>

#### updateUserPoolClientCallbacks(redirects) <a id="cloudcomponents-cdk-cloudfront-authorization-ispaauthorization-updateuserpoolclientcallbacks"></a>



```ts
updateUserPoolClientCallbacks(redirects: UserPoolClientCallbackUrls): void
```

* **redirects** (<code>[UserPoolClientCallbackUrls](#cloudcomponents-cdk-cloudfront-authorization-userpoolclientcallbackurls)</code>)  *No description*
  * **callbackUrls** (<code>Array<string></code>)  A list of allowed redirect (callback) URLs for the identity providers. 
  * **logoutUrls** (<code>Array<string></code>)  A list of allowed logout URLs for the identity providers. 






## interface IStaticSiteAuthorization  <a id="cloudcomponents-cdk-cloudfront-authorization-istaticsiteauthorization"></a>

__Implemented by__: [StaticSiteAuthorization](#cloudcomponents-cdk-cloudfront-authorization-staticsiteauthorization)



### Properties


Name | Type | Description 
-----|------|-------------
**mode** | <code>[Mode](#cloudcomponents-cdk-cloudfront-authorization-mode)</code> | <span></span>
**redirectPaths** | <code>[RedirectPaths](#cloudcomponents-cdk-cloudfront-authorization-redirectpaths)</code> | <span></span>
**signOutUrlPath** | <code>string</code> | <span></span>

### Methods


#### createAdditionalBehaviors(origin) <a id="cloudcomponents-cdk-cloudfront-authorization-istaticsiteauthorization-createadditionalbehaviors"></a>



```ts
createAdditionalBehaviors(origin: IOrigin): Map<string, BehaviorOptions>
```

* **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description*

__Returns__:
* <code>Map<string, [BehaviorOptions](#aws-cdk-aws-cloudfront-behavioroptions)></code>

#### createDefaultBehavior(origin) <a id="cloudcomponents-cdk-cloudfront-authorization-istaticsiteauthorization-createdefaultbehavior"></a>



```ts
createDefaultBehavior(origin: IOrigin): BehaviorOptions
```

* **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description*

__Returns__:
* <code>[BehaviorOptions](#aws-cdk-aws-cloudfront-behavioroptions)</code>

#### updateUserPoolClientCallbacks(redirects) <a id="cloudcomponents-cdk-cloudfront-authorization-istaticsiteauthorization-updateuserpoolclientcallbacks"></a>



```ts
updateUserPoolClientCallbacks(redirects: UserPoolClientCallbackUrls): void
```

* **redirects** (<code>[UserPoolClientCallbackUrls](#cloudcomponents-cdk-cloudfront-authorization-userpoolclientcallbackurls)</code>)  *No description*
  * **callbackUrls** (<code>Array<string></code>)  A list of allowed redirect (callback) URLs for the identity providers. 
  * **logoutUrls** (<code>Array<string></code>)  A list of allowed logout URLs for the identity providers. 






## struct RedirectPaths  <a id="cloudcomponents-cdk-cloudfront-authorization-redirectpaths"></a>






Name | Type | Description 
-----|------|-------------
**authRefresh** | <code>string</code> | <span></span>
**signIn** | <code>string</code> | <span></span>
**signOut** | <code>string</code> | <span></span>



## struct RetrieveUserPoolClientSecretProps  <a id="cloudcomponents-cdk-cloudfront-authorization-retrieveuserpoolclientsecretprops"></a>






Name | Type | Description 
-----|------|-------------
**userPool** | <code>[IUserPool](#aws-cdk-aws-cognito-iuserpool)</code> | <span></span>
**userPoolClient** | <code>[IUserPoolClient](#aws-cdk-aws-cognito-iuserpoolclient)</code> | <span></span>



## struct SecretGeneratorProps  <a id="cloudcomponents-cdk-cloudfront-authorization-secretgeneratorprops"></a>






Name | Type | Description 
-----|------|-------------
**allowedCharacters**? | <code>string</code> | __*Optional*__
**length**? | <code>number</code> | __*Optional*__



## struct SpaDistributionProps  <a id="cloudcomponents-cdk-cloudfront-authorization-spadistributionprops"></a>






Name | Type | Description 
-----|------|-------------
**authorization** | <code>[ISpaAuthorization](#cloudcomponents-cdk-cloudfront-authorization-ispaauthorization)</code> | <span></span>
**certificate**? | <code>[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)</code> | __*Optional*__
**origin**? | <code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code> | __*Optional*__
**priceClass**? | <code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code> | __*Optional*__
**removalPolicy**? | <code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code> | __*Optional*__
**ttl**? | <code>[Duration](#aws-cdk-core-duration)</code> | The minimum amount of time, in seconds, that you want CloudFront to cache the HTTP status code specified in ErrorCode.<br/>__*Default*__: 300 seconds



## struct StaticSiteDistributionProps  <a id="cloudcomponents-cdk-cloudfront-authorization-staticsitedistributionprops"></a>






Name | Type | Description 
-----|------|-------------
**authorization** | <code>[IStaticSiteAuthorization](#cloudcomponents-cdk-cloudfront-authorization-istaticsiteauthorization)</code> | <span></span>
**certificate**? | <code>[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)</code> | __*Optional*__
**errorResponses**? | <code>Array<[ErrorResponse](#aws-cdk-aws-cloudfront-errorresponse)></code> | __*Optional*__
**origin**? | <code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code> | __*Optional*__
**priceClass**? | <code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code> | __*Optional*__
**removalPolicy**? | <code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code> | __*Optional*__



## struct UserPoolClientCallbackUrls  <a id="cloudcomponents-cdk-cloudfront-authorization-userpoolclientcallbackurls"></a>






Name | Type | Description 
-----|------|-------------
**callbackUrls** | <code>Array<string></code> | A list of allowed redirect (callback) URLs for the identity providers.
**logoutUrls** | <code>Array<string></code> | A list of allowed logout URLs for the identity providers.



## struct UserPoolClientRedirectsProps  <a id="cloudcomponents-cdk-cloudfront-authorization-userpoolclientredirectsprops"></a>






Name | Type | Description 
-----|------|-------------
**callbackUrls** | <code>Array<string></code> | <span></span>
**logoutUrls** | <code>Array<string></code> | <span></span>
**oauthScopes** | <code>Array<[OAuthScope](#aws-cdk-aws-cognito-oauthscope)></code> | <span></span>
**userPool** | <code>[IUserPool](#aws-cdk-aws-cognito-iuserpool)</code> | <span></span>
**userPoolClient** | <code>[IUserPoolClient](#aws-cdk-aws-cognito-iuserpoolclient)</code> | <span></span>



## enum Mode  <a id="cloudcomponents-cdk-cloudfront-authorization-mode"></a>



Name | Description
-----|-----
**SPA** |
**STATIC_SITE** |


