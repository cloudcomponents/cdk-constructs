# API Reference

**Classes**

Name|Description
----|-----------
[SecretKey](#cloudcomponents-cdk-secret-key-secretkey)|*No description*
[SecretKeyStore](#cloudcomponents-cdk-secret-key-secretkeystore)|*No description*


**Enums**

Name|Description
----|-----------
[KeyType](#cloudcomponents-cdk-secret-key-keytype)|*No description*



## class SecretKey  <a id="cloudcomponents-cdk-secret-key-secretkey"></a>




### Initializer




```ts
new SecretKey(secretKeyType: KeyType)
```

* **secretKeyType** (<code>[KeyType](#cloudcomponents-cdk-secret-key-keytype)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**secretKeyType** | <code>[KeyType](#cloudcomponents-cdk-secret-key-keytype)</code> | <span></span>

### Methods


#### grantRead(grantee) <a id="cloudcomponents-cdk-secret-key-secretkey-grantread"></a>



```ts
grantRead(grantee: IGrantable): Grant
```

* **grantee** (<code>[IGrantable](#aws-cdk-aws-iam-igrantable)</code>)  *No description*

__Returns__:
* <code>[Grant](#aws-cdk-aws-iam-grant)</code>

#### serialize() <a id="cloudcomponents-cdk-secret-key-secretkey-serialize"></a>



```ts
serialize(): string
```


__Returns__:
* <code>string</code>

#### *static* fromPlainText(value) <a id="cloudcomponents-cdk-secret-key-secretkey-fromplaintext"></a>



```ts
static fromPlainText(value: string): SecretKey
```

* **value** (<code>string</code>)  *No description*

__Returns__:
* <code>[SecretKey](#cloudcomponents-cdk-secret-key-secretkey)</code>

#### *static* fromSecretsManager(secretKeySecret, fieldName?) <a id="cloudcomponents-cdk-secret-key-secretkey-fromsecretsmanager"></a>



```ts
static fromSecretsManager(secretKeySecret: ISecret, fieldName?: string): SecretKey
```

* **secretKeySecret** (<code>[ISecret](#aws-cdk-aws-secretsmanager-isecret)</code>)  *No description*
* **fieldName** (<code>string</code>)  *No description*

__Returns__:
* <code>[SecretKey](#cloudcomponents-cdk-secret-key-secretkey)</code>

#### *static* fromSsmParameter(secretKeyParameter) <a id="cloudcomponents-cdk-secret-key-secretkey-fromssmparameter"></a>



```ts
static fromSsmParameter(secretKeyParameter: IParameter): SecretKey
```

* **secretKeyParameter** (<code>[IParameter](#aws-cdk-aws-ssm-iparameter)</code>)  *No description*

__Returns__:
* <code>[SecretKey](#cloudcomponents-cdk-secret-key-secretkey)</code>



## class SecretKeyStore  <a id="cloudcomponents-cdk-secret-key-secretkeystore"></a>




### Initializer




```ts
new SecretKeyStore(secretKeyType: KeyType)
```

* **secretKeyType** (<code>[KeyType](#cloudcomponents-cdk-secret-key-keytype)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**secretKeyType** | <code>[KeyType](#cloudcomponents-cdk-secret-key-keytype)</code> | <span></span>

### Methods


#### grantWrite(grantee) <a id="cloudcomponents-cdk-secret-key-secretkeystore-grantwrite"></a>



```ts
grantWrite(grantee: IGrantable): Grant
```

* **grantee** (<code>[IGrantable](#aws-cdk-aws-iam-igrantable)</code>)  *No description*

__Returns__:
* <code>[Grant](#aws-cdk-aws-iam-grant)</code>

#### serialize() <a id="cloudcomponents-cdk-secret-key-secretkeystore-serialize"></a>



```ts
serialize(): string
```


__Returns__:
* <code>string</code>

#### *static* fromSecretsManager(secretKeySecret) <a id="cloudcomponents-cdk-secret-key-secretkeystore-fromsecretsmanager"></a>



```ts
static fromSecretsManager(secretKeySecret: ISecret): SecretKeyStore
```

* **secretKeySecret** (<code>[ISecret](#aws-cdk-aws-secretsmanager-isecret)</code>)  *No description*

__Returns__:
* <code>[SecretKeyStore](#cloudcomponents-cdk-secret-key-secretkeystore)</code>

#### *static* fromSsmParameter(secretKeyParameter) <a id="cloudcomponents-cdk-secret-key-secretkeystore-fromssmparameter"></a>



```ts
static fromSsmParameter(secretKeyParameter: IParameter): SecretKeyStore
```

* **secretKeyParameter** (<code>[IParameter](#aws-cdk-aws-ssm-iparameter)</code>)  *No description*

__Returns__:
* <code>[SecretKeyStore](#cloudcomponents-cdk-secret-key-secretkeystore)</code>



## enum KeyType  <a id="cloudcomponents-cdk-secret-key-keytype"></a>



Name | Description
-----|-----
**SECRETS_MANAGER** |
**SSM_PARAMETER** |
**PLAIN_TEXT** |


