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
**checkAuth** | <code>[EdgeFunction](#cloudcomponents-cdk-lambda-at-edge-pattern-edgefunction)</code> | <span></span>
**httpHeaders** | <code>[EdgeFunction](#cloudcomponents-cdk-lambda-at-edge-pattern-edgefunction)</code> | <span></span>
**parseAuth** | <code>[EdgeFunction](#cloudcomponents-cdk-lambda-at-edge-pattern-edgefunction)</code> | <span></span>
**refreshAuth** | <code>[EdgeFunction](#cloudcomponents-cdk-lambda-at-edge-pattern-edgefunction)</code> | <span></span>
**signOut** | <code>[EdgeFunction](#cloudcomponents-cdk-lambda-at-edge-pattern-edgefunction)</code> | <span></span>



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
  * **cookieSettings** (<code>Map<string, string></code>)  *No description* __*Optional*__
  * **httpHeaders** (<code>Map<string, string></code>)  *No description* __*Optional*__
  * **identityProviders** (<code>Array<[UserPoolClientIdentityProvider](#aws-cdk-aws-cognito-userpoolclientidentityprovider)></code>)  *No description* __*Optional*__
  * **logLevel** (<code>[LogLevel](#cloudcomponents-cdk-lambda-at-edge-pattern-loglevel)</code>)  *No description* __*Optional*__
  * **oauthScopes** (<code>Array<[OAuthScope](#aws-cdk-aws-cognito-oauthscope)></code>)  *No description* __*Optional*__
  * **redirectPaths** (<code>[RedirectPaths](#cloudcomponents-cdk-cloudfront-authorization-redirectpaths)</code>)  *No description* __*Optional*__
  * **signOutUrl** (<code>string</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**authFlow** | <code>[AuthFlow](#cloudcomponents-cdk-cloudfront-authorization-authflow)</code> | <span></span>
**cognitoAuthDomain** | <code>string</code> | <span></span>
**httpHeaders** | <code>Map<string, string></code> | <span></span>
**identityProviders** | <code>Array<[UserPoolClientIdentityProvider](#aws-cdk-aws-cognito-userpoolclientidentityprovider)></code> | <span></span>
**nonceSigningSecret** | <code>string</code> | <span></span>
**oauthScopes** | <code>Array<[OAuthScope](#aws-cdk-aws-cognito-oauthscope)></code> | <span></span>
**redirectPaths** | <code>[RedirectPaths](#cloudcomponents-cdk-cloudfront-authorization-redirectpaths)</code> | <span></span>
**signOutUrlPath** | <code>string</code> | <span></span>
**userPool** | <code>[IUserPool](#aws-cdk-aws-cognito-iuserpool)</code> | <span></span>
**userPoolClient** | <code>[IUserPoolClient](#aws-cdk-aws-cognito-iuserpoolclient)</code> | <span></span>
**cookieSettings**? | <code>Map<string, string></code> | __*Optional*__

### Methods


#### createAdditionalBehaviors(origin, options?) <a id="cloudcomponents-cdk-cloudfront-authorization-authorization-createadditionalbehaviors"></a>



```ts
createAdditionalBehaviors(origin: IOrigin, options?: AddBehaviorOptions): Map<string, BehaviorOptions>
```

* **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description*
* **options** (<code>[AddBehaviorOptions](#aws-cdk-aws-cloudfront-addbehavioroptions)</code>)  *No description*
  * **allowedMethods** (<code>[AllowedMethods](#aws-cdk-aws-cloudfront-allowedmethods)</code>)  HTTP methods to allow for this behavior. __*Default*__: AllowedMethods.ALLOW_GET_HEAD
  * **cachedMethods** (<code>[CachedMethods](#aws-cdk-aws-cloudfront-cachedmethods)</code>)  HTTP methods to cache for this behavior. __*Default*__: CachedMethods.CACHE_GET_HEAD
  * **cachePolicy** (<code>[ICachePolicy](#aws-cdk-aws-cloudfront-icachepolicy)</code>)  The cache policy for this behavior. __*Default*__: CachePolicy.CACHING_OPTIMIZED
  * **compress** (<code>boolean</code>)  Whether you want CloudFront to automatically compress certain files for this cache behavior. __*Default*__: true
  * **edgeLambdas** (<code>Array<[EdgeLambda](#aws-cdk-aws-cloudfront-edgelambda)></code>)  The Lambda@Edge functions to invoke before serving the contents. __*Default*__: no Lambda functions will be invoked
  * **functionAssociations** (<code>Array<[FunctionAssociation](#aws-cdk-aws-cloudfront-functionassociation)></code>)  The CloudFront functions to invoke before serving the contents. __*Default*__: no functions will be invoked
  * **originRequestPolicy** (<code>[IOriginRequestPolicy](#aws-cdk-aws-cloudfront-ioriginrequestpolicy)</code>)  The origin request policy for this behavior. __*Default*__: none
  * **smoothStreaming** (<code>boolean</code>)  Set this to true to indicate you want to distribute media files in the Microsoft Smooth Streaming format using this behavior. __*Default*__: false
  * **trustedKeyGroups** (<code>Array<[IKeyGroup](#aws-cdk-aws-cloudfront-ikeygroup)></code>)  A list of Key Groups that CloudFront can use to validate signed URLs or signed cookies. __*Default*__: no KeyGroups are associated with cache behavior
  * **viewerProtocolPolicy** (<code>[ViewerProtocolPolicy](#aws-cdk-aws-cloudfront-viewerprotocolpolicy)</code>)  The protocol that viewers can use to access the files controlled by this behavior. __*Default*__: ViewerProtocolPolicy.ALLOW_ALL

__Returns__:
* <code>Map<string, [BehaviorOptions](#aws-cdk-aws-cloudfront-behavioroptions)></code>

#### createDefaultBehavior(origin, options?) <a id="cloudcomponents-cdk-cloudfront-authorization-authorization-createdefaultbehavior"></a>



```ts
createDefaultBehavior(origin: IOrigin, options?: AddBehaviorOptions): BehaviorOptions
```

* **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description*
* **options** (<code>[AddBehaviorOptions](#aws-cdk-aws-cloudfront-addbehavioroptions)</code>)  *No description*
  * **allowedMethods** (<code>[AllowedMethods](#aws-cdk-aws-cloudfront-allowedmethods)</code>)  HTTP methods to allow for this behavior. __*Default*__: AllowedMethods.ALLOW_GET_HEAD
  * **cachedMethods** (<code>[CachedMethods](#aws-cdk-aws-cloudfront-cachedmethods)</code>)  HTTP methods to cache for this behavior. __*Default*__: CachedMethods.CACHE_GET_HEAD
  * **cachePolicy** (<code>[ICachePolicy](#aws-cdk-aws-cloudfront-icachepolicy)</code>)  The cache policy for this behavior. __*Default*__: CachePolicy.CACHING_OPTIMIZED
  * **compress** (<code>boolean</code>)  Whether you want CloudFront to automatically compress certain files for this cache behavior. __*Default*__: true
  * **edgeLambdas** (<code>Array<[EdgeLambda](#aws-cdk-aws-cloudfront-edgelambda)></code>)  The Lambda@Edge functions to invoke before serving the contents. __*Default*__: no Lambda functions will be invoked
  * **functionAssociations** (<code>Array<[FunctionAssociation](#aws-cdk-aws-cloudfront-functionassociation)></code>)  The CloudFront functions to invoke before serving the contents. __*Default*__: no functions will be invoked
  * **originRequestPolicy** (<code>[IOriginRequestPolicy](#aws-cdk-aws-cloudfront-ioriginrequestpolicy)</code>)  The origin request policy for this behavior. __*Default*__: none
  * **smoothStreaming** (<code>boolean</code>)  Set this to true to indicate you want to distribute media files in the Microsoft Smooth Streaming format using this behavior. __*Default*__: false
  * **trustedKeyGroups** (<code>Array<[IKeyGroup](#aws-cdk-aws-cloudfront-ikeygroup)></code>)  A list of Key Groups that CloudFront can use to validate signed URLs or signed cookies. __*Default*__: no KeyGroups are associated with cache behavior
  * **viewerProtocolPolicy** (<code>[ViewerProtocolPolicy](#aws-cdk-aws-cloudfront-viewerprotocolpolicy)</code>)  The protocol that viewers can use to access the files controlled by this behavior. __*Default*__: ViewerProtocolPolicy.ALLOW_ALL

__Returns__:
* <code>[BehaviorOptions](#aws-cdk-aws-cloudfront-behavioroptions)</code>

#### createLegacyAdditionalBehaviors(options?) <a id="cloudcomponents-cdk-cloudfront-authorization-authorization-createlegacyadditionalbehaviors"></a>



```ts
createLegacyAdditionalBehaviors(options?: Behavior): Array<Behavior>
```

* **options** (<code>[Behavior](#aws-cdk-aws-cloudfront-behavior)</code>)  *No description*
  * **allowedMethods** (<code>[CloudFrontAllowedMethods](#aws-cdk-aws-cloudfront-cloudfrontallowedmethods)</code>)  The method this CloudFront distribution responds do. __*Default*__: GET_HEAD
  * **cachedMethods** (<code>[CloudFrontAllowedCachedMethods](#aws-cdk-aws-cloudfront-cloudfrontallowedcachedmethods)</code>)  Which methods are cached by CloudFront by default. __*Default*__: GET_HEAD
  * **compress** (<code>boolean</code>)  If CloudFront should automatically compress some content types. __*Default*__: true
  * **defaultTtl** (<code>[Duration](#aws-cdk-core-duration)</code>)  The default amount of time CloudFront will cache an object. __*Default*__: 86400 (1 day)
  * **forwardedValues** (<code>[CfnDistribution.ForwardedValuesProperty](#aws-cdk-aws-cloudfront-cfndistribution-forwardedvaluesproperty)</code>)  The values CloudFront will forward to the origin when making a request. __*Default*__: none (no cookies - no headers)
  * **functionAssociations** (<code>Array<[FunctionAssociation](#aws-cdk-aws-cloudfront-functionassociation)></code>)  The CloudFront functions to invoke before serving the contents. __*Default*__: no functions will be invoked
  * **isDefaultBehavior** (<code>boolean</code>)  If this behavior is the default behavior for the distribution. __*Optional*__
  * **lambdaFunctionAssociations** (<code>Array<[LambdaFunctionAssociation](#aws-cdk-aws-cloudfront-lambdafunctionassociation)></code>)  Declares associated lambda@edge functions for this distribution behaviour. __*Default*__: No lambda function associated
  * **maxTtl** (<code>[Duration](#aws-cdk-core-duration)</code>)  The max amount of time you want objects to stay in the cache before CloudFront queries your origin. __*Default*__: Duration.seconds(31536000) (one year)
  * **minTtl** (<code>[Duration](#aws-cdk-core-duration)</code>)  The minimum amount of time that you want objects to stay in the cache before CloudFront queries your origin. __*Optional*__
  * **pathPattern** (<code>string</code>)  The path this behavior responds to. __*Optional*__
  * **trustedKeyGroups** (<code>Array<[IKeyGroup](#aws-cdk-aws-cloudfront-ikeygroup)></code>)  A list of Key Groups that CloudFront can use to validate signed URLs or signed cookies. __*Default*__: no KeyGroups are associated with cache behavior
  * **trustedSigners** (<code>Array<string></code>)  Trusted signers is how CloudFront allows you to serve private content. __*Optional*__

__Returns__:
* <code>Array<[Behavior](#aws-cdk-aws-cloudfront-behavior)></code>

#### createLegacyDefaultBehavior(options?) <a id="cloudcomponents-cdk-cloudfront-authorization-authorization-createlegacydefaultbehavior"></a>



```ts
createLegacyDefaultBehavior(options?: Behavior): Behavior
```

* **options** (<code>[Behavior](#aws-cdk-aws-cloudfront-behavior)</code>)  *No description*
  * **allowedMethods** (<code>[CloudFrontAllowedMethods](#aws-cdk-aws-cloudfront-cloudfrontallowedmethods)</code>)  The method this CloudFront distribution responds do. __*Default*__: GET_HEAD
  * **cachedMethods** (<code>[CloudFrontAllowedCachedMethods](#aws-cdk-aws-cloudfront-cloudfrontallowedcachedmethods)</code>)  Which methods are cached by CloudFront by default. __*Default*__: GET_HEAD
  * **compress** (<code>boolean</code>)  If CloudFront should automatically compress some content types. __*Default*__: true
  * **defaultTtl** (<code>[Duration](#aws-cdk-core-duration)</code>)  The default amount of time CloudFront will cache an object. __*Default*__: 86400 (1 day)
  * **forwardedValues** (<code>[CfnDistribution.ForwardedValuesProperty](#aws-cdk-aws-cloudfront-cfndistribution-forwardedvaluesproperty)</code>)  The values CloudFront will forward to the origin when making a request. __*Default*__: none (no cookies - no headers)
  * **functionAssociations** (<code>Array<[FunctionAssociation](#aws-cdk-aws-cloudfront-functionassociation)></code>)  The CloudFront functions to invoke before serving the contents. __*Default*__: no functions will be invoked
  * **isDefaultBehavior** (<code>boolean</code>)  If this behavior is the default behavior for the distribution. __*Optional*__
  * **lambdaFunctionAssociations** (<code>Array<[LambdaFunctionAssociation](#aws-cdk-aws-cloudfront-lambdafunctionassociation)></code>)  Declares associated lambda@edge functions for this distribution behaviour. __*Default*__: No lambda function associated
  * **maxTtl** (<code>[Duration](#aws-cdk-core-duration)</code>)  The max amount of time you want objects to stay in the cache before CloudFront queries your origin. __*Default*__: Duration.seconds(31536000) (one year)
  * **minTtl** (<code>[Duration](#aws-cdk-core-duration)</code>)  The minimum amount of time that you want objects to stay in the cache before CloudFront queries your origin. __*Optional*__
  * **pathPattern** (<code>string</code>)  The path this behavior responds to. __*Optional*__
  * **trustedKeyGroups** (<code>Array<[IKeyGroup](#aws-cdk-aws-cloudfront-ikeygroup)></code>)  A list of Key Groups that CloudFront can use to validate signed URLs or signed cookies. __*Default*__: no KeyGroups are associated with cache behavior
  * **trustedSigners** (<code>Array<string></code>)  Trusted signers is how CloudFront allows you to serve private content. __*Optional*__

__Returns__:
* <code>[Behavior](#aws-cdk-aws-cloudfront-behavior)</code>

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



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IDistribution](#aws-cdk-aws-cloudfront-idistribution), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IResource](#aws-cdk-core-iresource)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new BaseDistribution(scope: Construct, id: string, props: BaseDistributionProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[BaseDistributionProps](#cloudcomponents-cdk-cloudfront-authorization-basedistributionprops)</code>)  *No description*
  * **certificate** (<code>[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)</code>)  A certificate to associate with the distribution. __*Default*__: the CloudFront wildcard certificate (*.cloudfront.net) will be used.
  * **comment** (<code>string</code>)  Any comments you want to include about the distribution. __*Default*__: no comment
  * **defaultRootObject** (<code>string</code>)  The object that you want CloudFront to request from your origin (for example, index.html) when a viewer requests the root URL for your distribution. If no default object is set, the request goes to the origin's root (e.g., example.com/). __*Default*__: index.html
  * **domainNames** (<code>Array<string></code>)  Alternative domain names for this distribution. __*Default*__: The distribution will only support the default generated name (e.g., d111111abcdef8.cloudfront.net)
  * **enabled** (<code>boolean</code>)  Enable or disable the distribution. __*Default*__: true
  * **enableIpv6** (<code>boolean</code>)  Whether CloudFront will respond to IPv6 DNS requests with an IPv6 address. __*Default*__: true
  * **enableLogging** (<code>boolean</code>)  Enable access logging for the distribution. __*Default*__: false, unless `logBucket` is specified.
  * **geoRestriction** (<code>[GeoRestriction](#aws-cdk-aws-cloudfront-georestriction)</code>)  Controls the countries in which your content is distributed. __*Default*__: No geographic restrictions
  * **httpVersion** (<code>[HttpVersion](#aws-cdk-aws-cloudfront-httpversion)</code>)  Specify the maximum HTTP version that you want viewers to use to communicate with CloudFront. __*Default*__: HttpVersion.HTTP2
  * **logBucket** (<code>[IBucket](#aws-cdk-aws-s3-ibucket)</code>)  The Amazon S3 bucket to store the access logs in. __*Default*__: A bucket is created if `enableLogging` is true
  * **logFilePrefix** (<code>string</code>)  An optional string that you want CloudFront to prefix to the access log filenames for this distribution. __*Default*__: no prefix
  * **logIncludesCookies** (<code>boolean</code>)  Specifies whether you want CloudFront to include cookies in access logs. __*Default*__: false
  * **minimumProtocolVersion** (<code>[SecurityPolicyProtocol](#aws-cdk-aws-cloudfront-securitypolicyprotocol)</code>)  The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections. __*Default*__: SecurityPolicyProtocol.TLS_V1_2_2019
  * **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  The origin that you want CloudFront to route requests. __*Optional*__
  * **priceClass** (<code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code>)  The price class that corresponds with the maximum price that you want to pay for CloudFront service. __*Default*__: PriceClass.PRICE_CLASS_100
  * **removalPolicy** (<code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code>)  *No description* __*Default*__: Destroy
  * **webAclId** (<code>string</code>)  Unique identifier that specifies the AWS WAF web ACL to associate with this CloudFront distribution. __*Default*__: No AWS Web Application Firewall web access control list (web ACL).
  * **authorization** (<code>[IAuthorization](#cloudcomponents-cdk-cloudfront-authorization-iauthorization)</code>)  *No description* 
  * **errorResponses** (<code>Array<[ErrorResponse](#aws-cdk-aws-cloudfront-errorresponse)></code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**distributionDomainName** | <code>string</code> | The domain name of the Distribution, such as d111111abcdef8.cloudfront.net.
**distributionId** | <code>string</code> | The distribution ID for this distribution.
**domainName** | <code>string</code> | (deprecated) The domain name of the Distribution, such as d111111abcdef8.cloudfront.net.
**env** | <code>[ResourceEnvironment](#aws-cdk-core-resourceenvironment)</code> | The environment this resource belongs to.
**stack** | <code>[Stack](#aws-cdk-core-stack)</code> | The stack in which this resource is defined.

### Methods


#### protected renderAdditionalBehaviors(origin, authorization) <a id="cloudcomponents-cdk-cloudfront-authorization-basedistribution-renderadditionalbehaviors"></a>



```ts
protected renderAdditionalBehaviors(origin: IOrigin, authorization: IAuthorization): Map<string, BehaviorOptions>
```

* **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description*
* **authorization** (<code>[IAuthorization](#cloudcomponents-cdk-cloudfront-authorization-iauthorization)</code>)  *No description*

__Returns__:
* <code>Map<string, [BehaviorOptions](#aws-cdk-aws-cloudfront-behavioroptions)></code>

#### protected renderDefaultBehaviour(origin, authorization) <a id="cloudcomponents-cdk-cloudfront-authorization-basedistribution-renderdefaultbehaviour"></a>



```ts
protected renderDefaultBehaviour(origin: IOrigin, authorization: IAuthorization): BehaviorOptions
```

* **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description*
* **authorization** (<code>[IAuthorization](#cloudcomponents-cdk-cloudfront-authorization-iauthorization)</code>)  *No description*

__Returns__:
* <code>[BehaviorOptions](#aws-cdk-aws-cloudfront-behavioroptions)</code>



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
  * **cookieSettings** (<code>Map<string, string></code>)  *No description* __*Optional*__
  * **httpHeaders** (<code>Map<string, string></code>)  *No description* __*Optional*__
  * **identityProviders** (<code>Array<[UserPoolClientIdentityProvider](#aws-cdk-aws-cognito-userpoolclientidentityprovider)></code>)  *No description* __*Optional*__
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



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IDistribution](#aws-cdk-aws-cloudfront-idistribution), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IResource](#aws-cdk-core-iresource)
__Extends__: [BaseDistribution](#cloudcomponents-cdk-cloudfront-authorization-basedistribution)

### Initializer




```ts
new SpaDistribution(scope: Construct, id: string, props: SpaDistributionProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[SpaDistributionProps](#cloudcomponents-cdk-cloudfront-authorization-spadistributionprops)</code>)  *No description*
  * **certificate** (<code>[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)</code>)  A certificate to associate with the distribution. __*Default*__: the CloudFront wildcard certificate (*.cloudfront.net) will be used.
  * **comment** (<code>string</code>)  Any comments you want to include about the distribution. __*Default*__: no comment
  * **defaultRootObject** (<code>string</code>)  The object that you want CloudFront to request from your origin (for example, index.html) when a viewer requests the root URL for your distribution. If no default object is set, the request goes to the origin's root (e.g., example.com/). __*Default*__: index.html
  * **domainNames** (<code>Array<string></code>)  Alternative domain names for this distribution. __*Default*__: The distribution will only support the default generated name (e.g., d111111abcdef8.cloudfront.net)
  * **enabled** (<code>boolean</code>)  Enable or disable the distribution. __*Default*__: true
  * **enableIpv6** (<code>boolean</code>)  Whether CloudFront will respond to IPv6 DNS requests with an IPv6 address. __*Default*__: true
  * **enableLogging** (<code>boolean</code>)  Enable access logging for the distribution. __*Default*__: false, unless `logBucket` is specified.
  * **geoRestriction** (<code>[GeoRestriction](#aws-cdk-aws-cloudfront-georestriction)</code>)  Controls the countries in which your content is distributed. __*Default*__: No geographic restrictions
  * **httpVersion** (<code>[HttpVersion](#aws-cdk-aws-cloudfront-httpversion)</code>)  Specify the maximum HTTP version that you want viewers to use to communicate with CloudFront. __*Default*__: HttpVersion.HTTP2
  * **logBucket** (<code>[IBucket](#aws-cdk-aws-s3-ibucket)</code>)  The Amazon S3 bucket to store the access logs in. __*Default*__: A bucket is created if `enableLogging` is true
  * **logFilePrefix** (<code>string</code>)  An optional string that you want CloudFront to prefix to the access log filenames for this distribution. __*Default*__: no prefix
  * **logIncludesCookies** (<code>boolean</code>)  Specifies whether you want CloudFront to include cookies in access logs. __*Default*__: false
  * **minimumProtocolVersion** (<code>[SecurityPolicyProtocol](#aws-cdk-aws-cloudfront-securitypolicyprotocol)</code>)  The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections. __*Default*__: SecurityPolicyProtocol.TLS_V1_2_2019
  * **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  The origin that you want CloudFront to route requests. __*Optional*__
  * **priceClass** (<code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code>)  The price class that corresponds with the maximum price that you want to pay for CloudFront service. __*Default*__: PriceClass.PRICE_CLASS_100
  * **removalPolicy** (<code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code>)  *No description* __*Default*__: Destroy
  * **webAclId** (<code>string</code>)  Unique identifier that specifies the AWS WAF web ACL to associate with this CloudFront distribution. __*Default*__: No AWS Web Application Firewall web access control list (web ACL).
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
  * **cookieSettings** (<code>Map<string, string></code>)  *No description* __*Optional*__
  * **httpHeaders** (<code>Map<string, string></code>)  *No description* __*Optional*__
  * **identityProviders** (<code>Array<[UserPoolClientIdentityProvider](#aws-cdk-aws-cognito-userpoolclientidentityprovider)></code>)  *No description* __*Optional*__
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



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IDistribution](#aws-cdk-aws-cloudfront-idistribution), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IResource](#aws-cdk-core-iresource)
__Extends__: [BaseDistribution](#cloudcomponents-cdk-cloudfront-authorization-basedistribution)

### Initializer




```ts
new StaticSiteDistribution(scope: Construct, id: string, props: StaticSiteDistributionProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[StaticSiteDistributionProps](#cloudcomponents-cdk-cloudfront-authorization-staticsitedistributionprops)</code>)  *No description*
  * **certificate** (<code>[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)</code>)  A certificate to associate with the distribution. __*Default*__: the CloudFront wildcard certificate (*.cloudfront.net) will be used.
  * **comment** (<code>string</code>)  Any comments you want to include about the distribution. __*Default*__: no comment
  * **defaultRootObject** (<code>string</code>)  The object that you want CloudFront to request from your origin (for example, index.html) when a viewer requests the root URL for your distribution. If no default object is set, the request goes to the origin's root (e.g., example.com/). __*Default*__: index.html
  * **domainNames** (<code>Array<string></code>)  Alternative domain names for this distribution. __*Default*__: The distribution will only support the default generated name (e.g., d111111abcdef8.cloudfront.net)
  * **enabled** (<code>boolean</code>)  Enable or disable the distribution. __*Default*__: true
  * **enableIpv6** (<code>boolean</code>)  Whether CloudFront will respond to IPv6 DNS requests with an IPv6 address. __*Default*__: true
  * **enableLogging** (<code>boolean</code>)  Enable access logging for the distribution. __*Default*__: false, unless `logBucket` is specified.
  * **geoRestriction** (<code>[GeoRestriction](#aws-cdk-aws-cloudfront-georestriction)</code>)  Controls the countries in which your content is distributed. __*Default*__: No geographic restrictions
  * **httpVersion** (<code>[HttpVersion](#aws-cdk-aws-cloudfront-httpversion)</code>)  Specify the maximum HTTP version that you want viewers to use to communicate with CloudFront. __*Default*__: HttpVersion.HTTP2
  * **logBucket** (<code>[IBucket](#aws-cdk-aws-s3-ibucket)</code>)  The Amazon S3 bucket to store the access logs in. __*Default*__: A bucket is created if `enableLogging` is true
  * **logFilePrefix** (<code>string</code>)  An optional string that you want CloudFront to prefix to the access log filenames for this distribution. __*Default*__: no prefix
  * **logIncludesCookies** (<code>boolean</code>)  Specifies whether you want CloudFront to include cookies in access logs. __*Default*__: false
  * **minimumProtocolVersion** (<code>[SecurityPolicyProtocol](#aws-cdk-aws-cloudfront-securitypolicyprotocol)</code>)  The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections. __*Default*__: SecurityPolicyProtocol.TLS_V1_2_2019
  * **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  The origin that you want CloudFront to route requests. __*Optional*__
  * **priceClass** (<code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code>)  The price class that corresponds with the maximum price that you want to pay for CloudFront service. __*Default*__: PriceClass.PRICE_CLASS_100
  * **removalPolicy** (<code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code>)  *No description* __*Default*__: Destroy
  * **webAclId** (<code>string</code>)  Unique identifier that specifies the AWS WAF web ACL to associate with this CloudFront distribution. __*Default*__: No AWS Web Application Firewall web access control list (web ACL).
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
  * **identityProviders** (<code>Array<[UserPoolClientIdentityProvider](#aws-cdk-aws-cognito-userpoolclientidentityprovider)></code>)  *No description* 
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
**cookieSettings**? | <code>Map<string, string></code> | __*Optional*__
**httpHeaders**? | <code>Map<string, string></code> | __*Optional*__
**identityProviders**? | <code>Array<[UserPoolClientIdentityProvider](#aws-cdk-aws-cognito-userpoolclientidentityprovider)></code> | __*Optional*__
**logLevel**? | <code>[LogLevel](#cloudcomponents-cdk-lambda-at-edge-pattern-loglevel)</code> | __*Optional*__
**oauthScopes**? | <code>Array<[OAuthScope](#aws-cdk-aws-cognito-oauthscope)></code> | __*Optional*__
**redirectPaths**? | <code>[RedirectPaths](#cloudcomponents-cdk-cloudfront-authorization-redirectpaths)</code> | __*Optional*__
**signOutUrl**? | <code>string</code> | __*Optional*__



## struct BaseDistributionProps  <a id="cloudcomponents-cdk-cloudfront-authorization-basedistributionprops"></a>






Name | Type | Description 
-----|------|-------------
**authorization** | <code>[IAuthorization](#cloudcomponents-cdk-cloudfront-authorization-iauthorization)</code> | <span></span>
**certificate**? | <code>[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)</code> | A certificate to associate with the distribution.<br/>__*Default*__: the CloudFront wildcard certificate (*.cloudfront.net) will be used.
**comment**? | <code>string</code> | Any comments you want to include about the distribution.<br/>__*Default*__: no comment
**defaultRootObject**? | <code>string</code> | The object that you want CloudFront to request from your origin (for example, index.html) when a viewer requests the root URL for your distribution. If no default object is set, the request goes to the origin's root (e.g., example.com/).<br/>__*Default*__: index.html
**domainNames**? | <code>Array<string></code> | Alternative domain names for this distribution.<br/>__*Default*__: The distribution will only support the default generated name (e.g., d111111abcdef8.cloudfront.net)
**enableIpv6**? | <code>boolean</code> | Whether CloudFront will respond to IPv6 DNS requests with an IPv6 address.<br/>__*Default*__: true
**enableLogging**? | <code>boolean</code> | Enable access logging for the distribution.<br/>__*Default*__: false, unless `logBucket` is specified.
**enabled**? | <code>boolean</code> | Enable or disable the distribution.<br/>__*Default*__: true
**errorResponses**? | <code>Array<[ErrorResponse](#aws-cdk-aws-cloudfront-errorresponse)></code> | __*Optional*__
**geoRestriction**? | <code>[GeoRestriction](#aws-cdk-aws-cloudfront-georestriction)</code> | Controls the countries in which your content is distributed.<br/>__*Default*__: No geographic restrictions
**httpVersion**? | <code>[HttpVersion](#aws-cdk-aws-cloudfront-httpversion)</code> | Specify the maximum HTTP version that you want viewers to use to communicate with CloudFront.<br/>__*Default*__: HttpVersion.HTTP2
**logBucket**? | <code>[IBucket](#aws-cdk-aws-s3-ibucket)</code> | The Amazon S3 bucket to store the access logs in.<br/>__*Default*__: A bucket is created if `enableLogging` is true
**logFilePrefix**? | <code>string</code> | An optional string that you want CloudFront to prefix to the access log filenames for this distribution.<br/>__*Default*__: no prefix
**logIncludesCookies**? | <code>boolean</code> | Specifies whether you want CloudFront to include cookies in access logs.<br/>__*Default*__: false
**minimumProtocolVersion**? | <code>[SecurityPolicyProtocol](#aws-cdk-aws-cloudfront-securitypolicyprotocol)</code> | The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections.<br/>__*Default*__: SecurityPolicyProtocol.TLS_V1_2_2019
**origin**? | <code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code> | The origin that you want CloudFront to route requests.<br/>__*Optional*__
**priceClass**? | <code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code> | The price class that corresponds with the maximum price that you want to pay for CloudFront service.<br/>__*Default*__: PriceClass.PRICE_CLASS_100
**removalPolicy**? | <code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code> | __*Default*__: Destroy
**webAclId**? | <code>string</code> | Unique identifier that specifies the AWS WAF web ACL to associate with this CloudFront distribution.<br/>__*Default*__: No AWS Web Application Firewall web access control list (web ACL).



## struct CommonDistributionProps  <a id="cloudcomponents-cdk-cloudfront-authorization-commondistributionprops"></a>






Name | Type | Description 
-----|------|-------------
**certificate**? | <code>[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)</code> | A certificate to associate with the distribution.<br/>__*Default*__: the CloudFront wildcard certificate (*.cloudfront.net) will be used.
**comment**? | <code>string</code> | Any comments you want to include about the distribution.<br/>__*Default*__: no comment
**defaultRootObject**? | <code>string</code> | The object that you want CloudFront to request from your origin (for example, index.html) when a viewer requests the root URL for your distribution. If no default object is set, the request goes to the origin's root (e.g., example.com/).<br/>__*Default*__: index.html
**domainNames**? | <code>Array<string></code> | Alternative domain names for this distribution.<br/>__*Default*__: The distribution will only support the default generated name (e.g., d111111abcdef8.cloudfront.net)
**enableIpv6**? | <code>boolean</code> | Whether CloudFront will respond to IPv6 DNS requests with an IPv6 address.<br/>__*Default*__: true
**enableLogging**? | <code>boolean</code> | Enable access logging for the distribution.<br/>__*Default*__: false, unless `logBucket` is specified.
**enabled**? | <code>boolean</code> | Enable or disable the distribution.<br/>__*Default*__: true
**geoRestriction**? | <code>[GeoRestriction](#aws-cdk-aws-cloudfront-georestriction)</code> | Controls the countries in which your content is distributed.<br/>__*Default*__: No geographic restrictions
**httpVersion**? | <code>[HttpVersion](#aws-cdk-aws-cloudfront-httpversion)</code> | Specify the maximum HTTP version that you want viewers to use to communicate with CloudFront.<br/>__*Default*__: HttpVersion.HTTP2
**logBucket**? | <code>[IBucket](#aws-cdk-aws-s3-ibucket)</code> | The Amazon S3 bucket to store the access logs in.<br/>__*Default*__: A bucket is created if `enableLogging` is true
**logFilePrefix**? | <code>string</code> | An optional string that you want CloudFront to prefix to the access log filenames for this distribution.<br/>__*Default*__: no prefix
**logIncludesCookies**? | <code>boolean</code> | Specifies whether you want CloudFront to include cookies in access logs.<br/>__*Default*__: false
**minimumProtocolVersion**? | <code>[SecurityPolicyProtocol](#aws-cdk-aws-cloudfront-securitypolicyprotocol)</code> | The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections.<br/>__*Default*__: SecurityPolicyProtocol.TLS_V1_2_2019
**origin**? | <code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code> | The origin that you want CloudFront to route requests.<br/>__*Optional*__
**priceClass**? | <code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code> | The price class that corresponds with the maximum price that you want to pay for CloudFront service.<br/>__*Default*__: PriceClass.PRICE_CLASS_100
**removalPolicy**? | <code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code> | __*Default*__: Destroy
**webAclId**? | <code>string</code> | Unique identifier that specifies the AWS WAF web ACL to associate with this CloudFront distribution.<br/>__*Default*__: No AWS Web Application Firewall web access control list (web ACL).



## interface IAuthorization  <a id="cloudcomponents-cdk-cloudfront-authorization-iauthorization"></a>

__Implemented by__: [SpaAuthorization](#cloudcomponents-cdk-cloudfront-authorization-spaauthorization), [StaticSiteAuthorization](#cloudcomponents-cdk-cloudfront-authorization-staticsiteauthorization)



### Properties


Name | Type | Description 
-----|------|-------------
**redirectPaths** | <code>[RedirectPaths](#cloudcomponents-cdk-cloudfront-authorization-redirectpaths)</code> | <span></span>
**signOutUrlPath** | <code>string</code> | <span></span>

### Methods


#### createAdditionalBehaviors(origin, options?) <a id="cloudcomponents-cdk-cloudfront-authorization-iauthorization-createadditionalbehaviors"></a>



```ts
createAdditionalBehaviors(origin: IOrigin, options?: AddBehaviorOptions): Map<string, BehaviorOptions>
```

* **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description*
* **options** (<code>[AddBehaviorOptions](#aws-cdk-aws-cloudfront-addbehavioroptions)</code>)  *No description*
  * **allowedMethods** (<code>[AllowedMethods](#aws-cdk-aws-cloudfront-allowedmethods)</code>)  HTTP methods to allow for this behavior. __*Default*__: AllowedMethods.ALLOW_GET_HEAD
  * **cachedMethods** (<code>[CachedMethods](#aws-cdk-aws-cloudfront-cachedmethods)</code>)  HTTP methods to cache for this behavior. __*Default*__: CachedMethods.CACHE_GET_HEAD
  * **cachePolicy** (<code>[ICachePolicy](#aws-cdk-aws-cloudfront-icachepolicy)</code>)  The cache policy for this behavior. __*Default*__: CachePolicy.CACHING_OPTIMIZED
  * **compress** (<code>boolean</code>)  Whether you want CloudFront to automatically compress certain files for this cache behavior. __*Default*__: true
  * **edgeLambdas** (<code>Array<[EdgeLambda](#aws-cdk-aws-cloudfront-edgelambda)></code>)  The Lambda@Edge functions to invoke before serving the contents. __*Default*__: no Lambda functions will be invoked
  * **functionAssociations** (<code>Array<[FunctionAssociation](#aws-cdk-aws-cloudfront-functionassociation)></code>)  The CloudFront functions to invoke before serving the contents. __*Default*__: no functions will be invoked
  * **originRequestPolicy** (<code>[IOriginRequestPolicy](#aws-cdk-aws-cloudfront-ioriginrequestpolicy)</code>)  The origin request policy for this behavior. __*Default*__: none
  * **smoothStreaming** (<code>boolean</code>)  Set this to true to indicate you want to distribute media files in the Microsoft Smooth Streaming format using this behavior. __*Default*__: false
  * **trustedKeyGroups** (<code>Array<[IKeyGroup](#aws-cdk-aws-cloudfront-ikeygroup)></code>)  A list of Key Groups that CloudFront can use to validate signed URLs or signed cookies. __*Default*__: no KeyGroups are associated with cache behavior
  * **viewerProtocolPolicy** (<code>[ViewerProtocolPolicy](#aws-cdk-aws-cloudfront-viewerprotocolpolicy)</code>)  The protocol that viewers can use to access the files controlled by this behavior. __*Default*__: ViewerProtocolPolicy.ALLOW_ALL

__Returns__:
* <code>Map<string, [BehaviorOptions](#aws-cdk-aws-cloudfront-behavioroptions)></code>

#### createDefaultBehavior(origin, options?) <a id="cloudcomponents-cdk-cloudfront-authorization-iauthorization-createdefaultbehavior"></a>



```ts
createDefaultBehavior(origin: IOrigin, options?: AddBehaviorOptions): BehaviorOptions
```

* **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description*
* **options** (<code>[AddBehaviorOptions](#aws-cdk-aws-cloudfront-addbehavioroptions)</code>)  *No description*
  * **allowedMethods** (<code>[AllowedMethods](#aws-cdk-aws-cloudfront-allowedmethods)</code>)  HTTP methods to allow for this behavior. __*Default*__: AllowedMethods.ALLOW_GET_HEAD
  * **cachedMethods** (<code>[CachedMethods](#aws-cdk-aws-cloudfront-cachedmethods)</code>)  HTTP methods to cache for this behavior. __*Default*__: CachedMethods.CACHE_GET_HEAD
  * **cachePolicy** (<code>[ICachePolicy](#aws-cdk-aws-cloudfront-icachepolicy)</code>)  The cache policy for this behavior. __*Default*__: CachePolicy.CACHING_OPTIMIZED
  * **compress** (<code>boolean</code>)  Whether you want CloudFront to automatically compress certain files for this cache behavior. __*Default*__: true
  * **edgeLambdas** (<code>Array<[EdgeLambda](#aws-cdk-aws-cloudfront-edgelambda)></code>)  The Lambda@Edge functions to invoke before serving the contents. __*Default*__: no Lambda functions will be invoked
  * **functionAssociations** (<code>Array<[FunctionAssociation](#aws-cdk-aws-cloudfront-functionassociation)></code>)  The CloudFront functions to invoke before serving the contents. __*Default*__: no functions will be invoked
  * **originRequestPolicy** (<code>[IOriginRequestPolicy](#aws-cdk-aws-cloudfront-ioriginrequestpolicy)</code>)  The origin request policy for this behavior. __*Default*__: none
  * **smoothStreaming** (<code>boolean</code>)  Set this to true to indicate you want to distribute media files in the Microsoft Smooth Streaming format using this behavior. __*Default*__: false
  * **trustedKeyGroups** (<code>Array<[IKeyGroup](#aws-cdk-aws-cloudfront-ikeygroup)></code>)  A list of Key Groups that CloudFront can use to validate signed URLs or signed cookies. __*Default*__: no KeyGroups are associated with cache behavior
  * **viewerProtocolPolicy** (<code>[ViewerProtocolPolicy](#aws-cdk-aws-cloudfront-viewerprotocolpolicy)</code>)  The protocol that viewers can use to access the files controlled by this behavior. __*Default*__: ViewerProtocolPolicy.ALLOW_ALL

__Returns__:
* <code>[BehaviorOptions](#aws-cdk-aws-cloudfront-behavioroptions)</code>

#### createLegacyAdditionalBehaviors() <a id="cloudcomponents-cdk-cloudfront-authorization-iauthorization-createlegacyadditionalbehaviors"></a>



```ts
createLegacyAdditionalBehaviors(): Array<Behavior>
```


__Returns__:
* <code>Array<[Behavior](#aws-cdk-aws-cloudfront-behavior)></code>

#### createLegacyDefaultBehavior() <a id="cloudcomponents-cdk-cloudfront-authorization-iauthorization-createlegacydefaultbehavior"></a>



```ts
createLegacyDefaultBehavior(): Behavior
```


__Returns__:
* <code>[Behavior](#aws-cdk-aws-cloudfront-behavior)</code>

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


#### createAdditionalBehaviors(origin, options?) <a id="cloudcomponents-cdk-cloudfront-authorization-ispaauthorization-createadditionalbehaviors"></a>



```ts
createAdditionalBehaviors(origin: IOrigin, options?: AddBehaviorOptions): Map<string, BehaviorOptions>
```

* **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description*
* **options** (<code>[AddBehaviorOptions](#aws-cdk-aws-cloudfront-addbehavioroptions)</code>)  *No description*
  * **allowedMethods** (<code>[AllowedMethods](#aws-cdk-aws-cloudfront-allowedmethods)</code>)  HTTP methods to allow for this behavior. __*Default*__: AllowedMethods.ALLOW_GET_HEAD
  * **cachedMethods** (<code>[CachedMethods](#aws-cdk-aws-cloudfront-cachedmethods)</code>)  HTTP methods to cache for this behavior. __*Default*__: CachedMethods.CACHE_GET_HEAD
  * **cachePolicy** (<code>[ICachePolicy](#aws-cdk-aws-cloudfront-icachepolicy)</code>)  The cache policy for this behavior. __*Default*__: CachePolicy.CACHING_OPTIMIZED
  * **compress** (<code>boolean</code>)  Whether you want CloudFront to automatically compress certain files for this cache behavior. __*Default*__: true
  * **edgeLambdas** (<code>Array<[EdgeLambda](#aws-cdk-aws-cloudfront-edgelambda)></code>)  The Lambda@Edge functions to invoke before serving the contents. __*Default*__: no Lambda functions will be invoked
  * **functionAssociations** (<code>Array<[FunctionAssociation](#aws-cdk-aws-cloudfront-functionassociation)></code>)  The CloudFront functions to invoke before serving the contents. __*Default*__: no functions will be invoked
  * **originRequestPolicy** (<code>[IOriginRequestPolicy](#aws-cdk-aws-cloudfront-ioriginrequestpolicy)</code>)  The origin request policy for this behavior. __*Default*__: none
  * **smoothStreaming** (<code>boolean</code>)  Set this to true to indicate you want to distribute media files in the Microsoft Smooth Streaming format using this behavior. __*Default*__: false
  * **trustedKeyGroups** (<code>Array<[IKeyGroup](#aws-cdk-aws-cloudfront-ikeygroup)></code>)  A list of Key Groups that CloudFront can use to validate signed URLs or signed cookies. __*Default*__: no KeyGroups are associated with cache behavior
  * **viewerProtocolPolicy** (<code>[ViewerProtocolPolicy](#aws-cdk-aws-cloudfront-viewerprotocolpolicy)</code>)  The protocol that viewers can use to access the files controlled by this behavior. __*Default*__: ViewerProtocolPolicy.ALLOW_ALL

__Returns__:
* <code>Map<string, [BehaviorOptions](#aws-cdk-aws-cloudfront-behavioroptions)></code>

#### createDefaultBehavior(origin, options?) <a id="cloudcomponents-cdk-cloudfront-authorization-ispaauthorization-createdefaultbehavior"></a>



```ts
createDefaultBehavior(origin: IOrigin, options?: AddBehaviorOptions): BehaviorOptions
```

* **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description*
* **options** (<code>[AddBehaviorOptions](#aws-cdk-aws-cloudfront-addbehavioroptions)</code>)  *No description*
  * **allowedMethods** (<code>[AllowedMethods](#aws-cdk-aws-cloudfront-allowedmethods)</code>)  HTTP methods to allow for this behavior. __*Default*__: AllowedMethods.ALLOW_GET_HEAD
  * **cachedMethods** (<code>[CachedMethods](#aws-cdk-aws-cloudfront-cachedmethods)</code>)  HTTP methods to cache for this behavior. __*Default*__: CachedMethods.CACHE_GET_HEAD
  * **cachePolicy** (<code>[ICachePolicy](#aws-cdk-aws-cloudfront-icachepolicy)</code>)  The cache policy for this behavior. __*Default*__: CachePolicy.CACHING_OPTIMIZED
  * **compress** (<code>boolean</code>)  Whether you want CloudFront to automatically compress certain files for this cache behavior. __*Default*__: true
  * **edgeLambdas** (<code>Array<[EdgeLambda](#aws-cdk-aws-cloudfront-edgelambda)></code>)  The Lambda@Edge functions to invoke before serving the contents. __*Default*__: no Lambda functions will be invoked
  * **functionAssociations** (<code>Array<[FunctionAssociation](#aws-cdk-aws-cloudfront-functionassociation)></code>)  The CloudFront functions to invoke before serving the contents. __*Default*__: no functions will be invoked
  * **originRequestPolicy** (<code>[IOriginRequestPolicy](#aws-cdk-aws-cloudfront-ioriginrequestpolicy)</code>)  The origin request policy for this behavior. __*Default*__: none
  * **smoothStreaming** (<code>boolean</code>)  Set this to true to indicate you want to distribute media files in the Microsoft Smooth Streaming format using this behavior. __*Default*__: false
  * **trustedKeyGroups** (<code>Array<[IKeyGroup](#aws-cdk-aws-cloudfront-ikeygroup)></code>)  A list of Key Groups that CloudFront can use to validate signed URLs or signed cookies. __*Default*__: no KeyGroups are associated with cache behavior
  * **viewerProtocolPolicy** (<code>[ViewerProtocolPolicy](#aws-cdk-aws-cloudfront-viewerprotocolpolicy)</code>)  The protocol that viewers can use to access the files controlled by this behavior. __*Default*__: ViewerProtocolPolicy.ALLOW_ALL

__Returns__:
* <code>[BehaviorOptions](#aws-cdk-aws-cloudfront-behavioroptions)</code>

#### createLegacyAdditionalBehaviors() <a id="cloudcomponents-cdk-cloudfront-authorization-ispaauthorization-createlegacyadditionalbehaviors"></a>



```ts
createLegacyAdditionalBehaviors(): Array<Behavior>
```


__Returns__:
* <code>Array<[Behavior](#aws-cdk-aws-cloudfront-behavior)></code>

#### createLegacyDefaultBehavior() <a id="cloudcomponents-cdk-cloudfront-authorization-ispaauthorization-createlegacydefaultbehavior"></a>



```ts
createLegacyDefaultBehavior(): Behavior
```


__Returns__:
* <code>[Behavior](#aws-cdk-aws-cloudfront-behavior)</code>

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


#### createAdditionalBehaviors(origin, options?) <a id="cloudcomponents-cdk-cloudfront-authorization-istaticsiteauthorization-createadditionalbehaviors"></a>



```ts
createAdditionalBehaviors(origin: IOrigin, options?: AddBehaviorOptions): Map<string, BehaviorOptions>
```

* **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description*
* **options** (<code>[AddBehaviorOptions](#aws-cdk-aws-cloudfront-addbehavioroptions)</code>)  *No description*
  * **allowedMethods** (<code>[AllowedMethods](#aws-cdk-aws-cloudfront-allowedmethods)</code>)  HTTP methods to allow for this behavior. __*Default*__: AllowedMethods.ALLOW_GET_HEAD
  * **cachedMethods** (<code>[CachedMethods](#aws-cdk-aws-cloudfront-cachedmethods)</code>)  HTTP methods to cache for this behavior. __*Default*__: CachedMethods.CACHE_GET_HEAD
  * **cachePolicy** (<code>[ICachePolicy](#aws-cdk-aws-cloudfront-icachepolicy)</code>)  The cache policy for this behavior. __*Default*__: CachePolicy.CACHING_OPTIMIZED
  * **compress** (<code>boolean</code>)  Whether you want CloudFront to automatically compress certain files for this cache behavior. __*Default*__: true
  * **edgeLambdas** (<code>Array<[EdgeLambda](#aws-cdk-aws-cloudfront-edgelambda)></code>)  The Lambda@Edge functions to invoke before serving the contents. __*Default*__: no Lambda functions will be invoked
  * **functionAssociations** (<code>Array<[FunctionAssociation](#aws-cdk-aws-cloudfront-functionassociation)></code>)  The CloudFront functions to invoke before serving the contents. __*Default*__: no functions will be invoked
  * **originRequestPolicy** (<code>[IOriginRequestPolicy](#aws-cdk-aws-cloudfront-ioriginrequestpolicy)</code>)  The origin request policy for this behavior. __*Default*__: none
  * **smoothStreaming** (<code>boolean</code>)  Set this to true to indicate you want to distribute media files in the Microsoft Smooth Streaming format using this behavior. __*Default*__: false
  * **trustedKeyGroups** (<code>Array<[IKeyGroup](#aws-cdk-aws-cloudfront-ikeygroup)></code>)  A list of Key Groups that CloudFront can use to validate signed URLs or signed cookies. __*Default*__: no KeyGroups are associated with cache behavior
  * **viewerProtocolPolicy** (<code>[ViewerProtocolPolicy](#aws-cdk-aws-cloudfront-viewerprotocolpolicy)</code>)  The protocol that viewers can use to access the files controlled by this behavior. __*Default*__: ViewerProtocolPolicy.ALLOW_ALL

__Returns__:
* <code>Map<string, [BehaviorOptions](#aws-cdk-aws-cloudfront-behavioroptions)></code>

#### createDefaultBehavior(origin, options?) <a id="cloudcomponents-cdk-cloudfront-authorization-istaticsiteauthorization-createdefaultbehavior"></a>



```ts
createDefaultBehavior(origin: IOrigin, options?: AddBehaviorOptions): BehaviorOptions
```

* **origin** (<code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code>)  *No description*
* **options** (<code>[AddBehaviorOptions](#aws-cdk-aws-cloudfront-addbehavioroptions)</code>)  *No description*
  * **allowedMethods** (<code>[AllowedMethods](#aws-cdk-aws-cloudfront-allowedmethods)</code>)  HTTP methods to allow for this behavior. __*Default*__: AllowedMethods.ALLOW_GET_HEAD
  * **cachedMethods** (<code>[CachedMethods](#aws-cdk-aws-cloudfront-cachedmethods)</code>)  HTTP methods to cache for this behavior. __*Default*__: CachedMethods.CACHE_GET_HEAD
  * **cachePolicy** (<code>[ICachePolicy](#aws-cdk-aws-cloudfront-icachepolicy)</code>)  The cache policy for this behavior. __*Default*__: CachePolicy.CACHING_OPTIMIZED
  * **compress** (<code>boolean</code>)  Whether you want CloudFront to automatically compress certain files for this cache behavior. __*Default*__: true
  * **edgeLambdas** (<code>Array<[EdgeLambda](#aws-cdk-aws-cloudfront-edgelambda)></code>)  The Lambda@Edge functions to invoke before serving the contents. __*Default*__: no Lambda functions will be invoked
  * **functionAssociations** (<code>Array<[FunctionAssociation](#aws-cdk-aws-cloudfront-functionassociation)></code>)  The CloudFront functions to invoke before serving the contents. __*Default*__: no functions will be invoked
  * **originRequestPolicy** (<code>[IOriginRequestPolicy](#aws-cdk-aws-cloudfront-ioriginrequestpolicy)</code>)  The origin request policy for this behavior. __*Default*__: none
  * **smoothStreaming** (<code>boolean</code>)  Set this to true to indicate you want to distribute media files in the Microsoft Smooth Streaming format using this behavior. __*Default*__: false
  * **trustedKeyGroups** (<code>Array<[IKeyGroup](#aws-cdk-aws-cloudfront-ikeygroup)></code>)  A list of Key Groups that CloudFront can use to validate signed URLs or signed cookies. __*Default*__: no KeyGroups are associated with cache behavior
  * **viewerProtocolPolicy** (<code>[ViewerProtocolPolicy](#aws-cdk-aws-cloudfront-viewerprotocolpolicy)</code>)  The protocol that viewers can use to access the files controlled by this behavior. __*Default*__: ViewerProtocolPolicy.ALLOW_ALL

__Returns__:
* <code>[BehaviorOptions](#aws-cdk-aws-cloudfront-behavioroptions)</code>

#### createLegacyAdditionalBehaviors() <a id="cloudcomponents-cdk-cloudfront-authorization-istaticsiteauthorization-createlegacyadditionalbehaviors"></a>



```ts
createLegacyAdditionalBehaviors(): Array<Behavior>
```


__Returns__:
* <code>Array<[Behavior](#aws-cdk-aws-cloudfront-behavior)></code>

#### createLegacyDefaultBehavior() <a id="cloudcomponents-cdk-cloudfront-authorization-istaticsiteauthorization-createlegacydefaultbehavior"></a>



```ts
createLegacyDefaultBehavior(): Behavior
```


__Returns__:
* <code>[Behavior](#aws-cdk-aws-cloudfront-behavior)</code>

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
**certificate**? | <code>[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)</code> | A certificate to associate with the distribution.<br/>__*Default*__: the CloudFront wildcard certificate (*.cloudfront.net) will be used.
**comment**? | <code>string</code> | Any comments you want to include about the distribution.<br/>__*Default*__: no comment
**defaultRootObject**? | <code>string</code> | The object that you want CloudFront to request from your origin (for example, index.html) when a viewer requests the root URL for your distribution. If no default object is set, the request goes to the origin's root (e.g., example.com/).<br/>__*Default*__: index.html
**domainNames**? | <code>Array<string></code> | Alternative domain names for this distribution.<br/>__*Default*__: The distribution will only support the default generated name (e.g., d111111abcdef8.cloudfront.net)
**enableIpv6**? | <code>boolean</code> | Whether CloudFront will respond to IPv6 DNS requests with an IPv6 address.<br/>__*Default*__: true
**enableLogging**? | <code>boolean</code> | Enable access logging for the distribution.<br/>__*Default*__: false, unless `logBucket` is specified.
**enabled**? | <code>boolean</code> | Enable or disable the distribution.<br/>__*Default*__: true
**geoRestriction**? | <code>[GeoRestriction](#aws-cdk-aws-cloudfront-georestriction)</code> | Controls the countries in which your content is distributed.<br/>__*Default*__: No geographic restrictions
**httpVersion**? | <code>[HttpVersion](#aws-cdk-aws-cloudfront-httpversion)</code> | Specify the maximum HTTP version that you want viewers to use to communicate with CloudFront.<br/>__*Default*__: HttpVersion.HTTP2
**logBucket**? | <code>[IBucket](#aws-cdk-aws-s3-ibucket)</code> | The Amazon S3 bucket to store the access logs in.<br/>__*Default*__: A bucket is created if `enableLogging` is true
**logFilePrefix**? | <code>string</code> | An optional string that you want CloudFront to prefix to the access log filenames for this distribution.<br/>__*Default*__: no prefix
**logIncludesCookies**? | <code>boolean</code> | Specifies whether you want CloudFront to include cookies in access logs.<br/>__*Default*__: false
**minimumProtocolVersion**? | <code>[SecurityPolicyProtocol](#aws-cdk-aws-cloudfront-securitypolicyprotocol)</code> | The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections.<br/>__*Default*__: SecurityPolicyProtocol.TLS_V1_2_2019
**origin**? | <code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code> | The origin that you want CloudFront to route requests.<br/>__*Optional*__
**priceClass**? | <code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code> | The price class that corresponds with the maximum price that you want to pay for CloudFront service.<br/>__*Default*__: PriceClass.PRICE_CLASS_100
**removalPolicy**? | <code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code> | __*Default*__: Destroy
**ttl**? | <code>[Duration](#aws-cdk-core-duration)</code> | The minimum amount of time, in seconds, that you want CloudFront to cache the HTTP status code specified in ErrorCode.<br/>__*Default*__: 300 seconds
**webAclId**? | <code>string</code> | Unique identifier that specifies the AWS WAF web ACL to associate with this CloudFront distribution.<br/>__*Default*__: No AWS Web Application Firewall web access control list (web ACL).



## struct StaticSiteDistributionProps  <a id="cloudcomponents-cdk-cloudfront-authorization-staticsitedistributionprops"></a>






Name | Type | Description 
-----|------|-------------
**authorization** | <code>[IStaticSiteAuthorization](#cloudcomponents-cdk-cloudfront-authorization-istaticsiteauthorization)</code> | <span></span>
**certificate**? | <code>[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)</code> | A certificate to associate with the distribution.<br/>__*Default*__: the CloudFront wildcard certificate (*.cloudfront.net) will be used.
**comment**? | <code>string</code> | Any comments you want to include about the distribution.<br/>__*Default*__: no comment
**defaultRootObject**? | <code>string</code> | The object that you want CloudFront to request from your origin (for example, index.html) when a viewer requests the root URL for your distribution. If no default object is set, the request goes to the origin's root (e.g., example.com/).<br/>__*Default*__: index.html
**domainNames**? | <code>Array<string></code> | Alternative domain names for this distribution.<br/>__*Default*__: The distribution will only support the default generated name (e.g., d111111abcdef8.cloudfront.net)
**enableIpv6**? | <code>boolean</code> | Whether CloudFront will respond to IPv6 DNS requests with an IPv6 address.<br/>__*Default*__: true
**enableLogging**? | <code>boolean</code> | Enable access logging for the distribution.<br/>__*Default*__: false, unless `logBucket` is specified.
**enabled**? | <code>boolean</code> | Enable or disable the distribution.<br/>__*Default*__: true
**errorResponses**? | <code>Array<[ErrorResponse](#aws-cdk-aws-cloudfront-errorresponse)></code> | __*Optional*__
**geoRestriction**? | <code>[GeoRestriction](#aws-cdk-aws-cloudfront-georestriction)</code> | Controls the countries in which your content is distributed.<br/>__*Default*__: No geographic restrictions
**httpVersion**? | <code>[HttpVersion](#aws-cdk-aws-cloudfront-httpversion)</code> | Specify the maximum HTTP version that you want viewers to use to communicate with CloudFront.<br/>__*Default*__: HttpVersion.HTTP2
**logBucket**? | <code>[IBucket](#aws-cdk-aws-s3-ibucket)</code> | The Amazon S3 bucket to store the access logs in.<br/>__*Default*__: A bucket is created if `enableLogging` is true
**logFilePrefix**? | <code>string</code> | An optional string that you want CloudFront to prefix to the access log filenames for this distribution.<br/>__*Default*__: no prefix
**logIncludesCookies**? | <code>boolean</code> | Specifies whether you want CloudFront to include cookies in access logs.<br/>__*Default*__: false
**minimumProtocolVersion**? | <code>[SecurityPolicyProtocol](#aws-cdk-aws-cloudfront-securitypolicyprotocol)</code> | The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections.<br/>__*Default*__: SecurityPolicyProtocol.TLS_V1_2_2019
**origin**? | <code>[IOrigin](#aws-cdk-aws-cloudfront-iorigin)</code> | The origin that you want CloudFront to route requests.<br/>__*Optional*__
**priceClass**? | <code>[PriceClass](#aws-cdk-aws-cloudfront-priceclass)</code> | The price class that corresponds with the maximum price that you want to pay for CloudFront service.<br/>__*Default*__: PriceClass.PRICE_CLASS_100
**removalPolicy**? | <code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code> | __*Default*__: Destroy
**webAclId**? | <code>string</code> | Unique identifier that specifies the AWS WAF web ACL to associate with this CloudFront distribution.<br/>__*Default*__: No AWS Web Application Firewall web access control list (web ACL).



## struct UserPoolClientCallbackUrls  <a id="cloudcomponents-cdk-cloudfront-authorization-userpoolclientcallbackurls"></a>






Name | Type | Description 
-----|------|-------------
**callbackUrls** | <code>Array<string></code> | A list of allowed redirect (callback) URLs for the identity providers.
**logoutUrls** | <code>Array<string></code> | A list of allowed logout URLs for the identity providers.



## struct UserPoolClientRedirectsProps  <a id="cloudcomponents-cdk-cloudfront-authorization-userpoolclientredirectsprops"></a>






Name | Type | Description 
-----|------|-------------
**callbackUrls** | <code>Array<string></code> | <span></span>
**identityProviders** | <code>Array<[UserPoolClientIdentityProvider](#aws-cdk-aws-cognito-userpoolclientidentityprovider)></code> | <span></span>
**logoutUrls** | <code>Array<string></code> | <span></span>
**oauthScopes** | <code>Array<[OAuthScope](#aws-cdk-aws-cognito-oauthscope)></code> | <span></span>
**userPool** | <code>[IUserPool](#aws-cdk-aws-cognito-iuserpool)</code> | <span></span>
**userPoolClient** | <code>[IUserPoolClient](#aws-cdk-aws-cognito-iuserpoolclient)</code> | <span></span>



## enum Mode  <a id="cloudcomponents-cdk-cloudfront-authorization-mode"></a>



Name | Description
-----|-----
**SPA** |
**STATIC_SITE** |


