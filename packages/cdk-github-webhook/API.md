# API Reference

**Classes**

Name|Description
----|-----------
[GithubWebhook](#cloudcomponents-cdk-github-webhook-githubwebhook)|*No description*


**Structs**

Name|Description
----|-----------
[GithubWebhookProps](#cloudcomponents-cdk-github-webhook-githubwebhookprops)|*No description*



## class GithubWebhook  <a id="cloudcomponents-cdk-github-webhook-githubwebhook"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new GithubWebhook(scope: Construct, id: string, props: GithubWebhookProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[GithubWebhookProps](#cloudcomponents-cdk-github-webhook-githubwebhookprops)</code>)  *No description*
  * **events** (<code>Array<string></code>)  Determines what events the hook is triggered for. 
  * **githubApiToken** (<code>string &#124; [SecretKey](#cloudcomponents-cdk-secret-key-secretkey)</code>)  The OAuth access token. 
  * **githubRepoUrl** (<code>string</code>)  The Github repo url. 
  * **payloadUrl** (<code>string</code>)  The URL to which the payloads will be delivered. 
  * **logLevel** (<code>string</code>)  *No description* __*Optional*__




## struct GithubWebhookProps  <a id="cloudcomponents-cdk-github-webhook-githubwebhookprops"></a>






Name | Type | Description 
-----|------|-------------
**events** | <code>Array<string></code> | Determines what events the hook is triggered for.
**githubApiToken** | <code>string &#124; [SecretKey](#cloudcomponents-cdk-secret-key-secretkey)</code> | The OAuth access token.
**githubRepoUrl** | <code>string</code> | The Github repo url.
**payloadUrl** | <code>string</code> | The URL to which the payloads will be delivered.
**logLevel**? | <code>string</code> | __*Optional*__



