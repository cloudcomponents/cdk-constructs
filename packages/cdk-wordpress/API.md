# API Reference

**Classes**

Name|Description
----|-----------
[Application](#cloudcomponents-cdk-wordpress-application)|*No description*
[Database](#cloudcomponents-cdk-wordpress-database)|*No description*
[Dns](#cloudcomponents-cdk-wordpress-dns)|*No description*
[EfsVolume](#cloudcomponents-cdk-wordpress-efsvolume)|*No description*
[Wordpress](#cloudcomponents-cdk-wordpress-wordpress)|*No description*


**Structs**

Name|Description
----|-----------
[ApplicationProps](#cloudcomponents-cdk-wordpress-applicationprops)|*No description*
[DatabaseProps](#cloudcomponents-cdk-wordpress-databaseprops)|*No description*
[DnsProps](#cloudcomponents-cdk-wordpress-dnsprops)|*No description*
[EfsVolumeProps](#cloudcomponents-cdk-wordpress-efsvolumeprops)|*No description*
[StaticContentOffload](#cloudcomponents-cdk-wordpress-staticcontentoffload)|*No description*
[WordpressProps](#cloudcomponents-cdk-wordpress-wordpressprops)|*No description*



## class Application  <a id="cloudcomponents-cdk-wordpress-application"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new Application(scope: Construct, id: string, props: ApplicationProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ApplicationProps](#cloudcomponents-cdk-wordpress-applicationprops)</code>)  *No description*
  * **certificate** (<code>[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)</code>)  *No description* 
  * **database** (<code>[Database](#cloudcomponents-cdk-wordpress-database)</code>)  *No description* 
  * **domainName** (<code>string</code>)  *No description* 
  * **domainZone** (<code>[IHostedZone](#aws-cdk-aws-route53-ihostedzone)</code>)  *No description* 
  * **volume** (<code>[EfsVolume](#cloudcomponents-cdk-wordpress-efsvolume)</code>)  *No description* 
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  *No description* 
  * **cloudFrontHashHeader** (<code>string</code>)  *No description* __*Optional*__
  * **environment** (<code>Map<string, string></code>)  *No description* __*Optional*__
  * **image** (<code>[ContainerImage](#aws-cdk-aws-ecs-containerimage)</code>)  *No description* __*Optional*__
  * **logDriver** (<code>[LogDriver](#aws-cdk-aws-ecs-logdriver)</code>)  *No description* __*Optional*__
  * **memoryLimitMiB** (<code>number</code>)  *No description* __*Optional*__
  * **removalPolicy** (<code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code>)  *No description* __*Optional*__
  * **secrets** (<code>Map<string, [Secret](#aws-cdk-aws-ecs-secret)></code>)  *No description* __*Optional*__
  * **serviceName** (<code>string</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**distribution** | <code>[IDistribution](#aws-cdk-aws-cloudfront-idistribution)</code> | <span></span>
**domainName** | <code>string</code> | <span></span>
**domainZone** | <code>[IHostedZone](#aws-cdk-aws-route53-ihostedzone)</code> | <span></span>
**listener** | <code>[ApplicationListener](#aws-cdk-aws-elasticloadbalancingv2-applicationlistener)</code> | <span></span>
**service** | <code>[FargateService](#aws-cdk-aws-ecs-fargateservice)</code> | <span></span>
**targetGroup** | <code>[ApplicationTargetGroup](#aws-cdk-aws-elasticloadbalancingv2-applicationtargetgroup)</code> | <span></span>

### Methods


#### enableStaticContentOffload(domainName, certificate) <a id="cloudcomponents-cdk-wordpress-application-enablestaticcontentoffload"></a>



```ts
enableStaticContentOffload(domainName: string, certificate: ICertificate): StaticContentOffload
```

* **domainName** (<code>string</code>)  *No description*
* **certificate** (<code>[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)</code>)  *No description*

__Returns__:
* <code>[StaticContentOffload](#cloudcomponents-cdk-wordpress-staticcontentoffload)</code>



## class Database  <a id="cloudcomponents-cdk-wordpress-database"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new Database(scope: Construct, id: string, props: DatabaseProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[DatabaseProps](#cloudcomponents-cdk-wordpress-databaseprops)</code>)  *No description*
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  *No description* 
  * **allocatedStorage** (<code>number</code>)  *No description* __*Optional*__
  * **databaseName** (<code>string</code>)  *No description* __*Optional*__
  * **engine** (<code>[IInstanceEngine](#aws-cdk-aws-rds-iinstanceengine)</code>)  *No description* __*Optional*__
  * **instanceType** (<code>[InstanceType](#aws-cdk-aws-ec2-instancetype)</code>)  *No description* __*Optional*__
  * **removalPolicy** (<code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**environment** | <code>Map<string, string></code> | <span></span>
**secrets** | <code>Map<string, [Secret](#aws-cdk-aws-ecs-secret)></code> | <span></span>

### Methods


#### allowDefaultPortFrom(other, description?) <a id="cloudcomponents-cdk-wordpress-database-allowdefaultportfrom"></a>



```ts
allowDefaultPortFrom(other: IConnectable, description?: string): void
```

* **other** (<code>[IConnectable](#aws-cdk-aws-ec2-iconnectable)</code>)  *No description*
* **description** (<code>string</code>)  *No description*






## class Dns  <a id="cloudcomponents-cdk-wordpress-dns"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new Dns(scope: Construct, id: string, props: DnsProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[DnsProps](#cloudcomponents-cdk-wordpress-dnsprops)</code>)  *No description*
  * **distribution** (<code>[IDistribution](#aws-cdk-aws-cloudfront-idistribution)</code>)  *No description* 
  * **domainName** (<code>string</code>)  *No description* 
  * **domainZone** (<code>[IHostedZone](#aws-cdk-aws-route53-ihostedzone)</code>)  *No description* 




## class EfsVolume  <a id="cloudcomponents-cdk-wordpress-efsvolume"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new EfsVolume(scope: Construct, id: string, props: EfsVolumeProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[EfsVolumeProps](#cloudcomponents-cdk-wordpress-efsvolumeprops)</code>)  *No description*
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  *No description* 
  * **name** (<code>string</code>)  *No description* __*Optional*__
  * **removalPolicy** (<code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**efsVolumeConfiguration** | <code>[EfsVolumeConfiguration](#aws-cdk-aws-ecs-efsvolumeconfiguration)</code> | <span></span>
**name** | <code>string</code> | <span></span>

### Methods


#### allowDefaultPortFrom(other, description?) <a id="cloudcomponents-cdk-wordpress-efsvolume-allowdefaultportfrom"></a>



```ts
allowDefaultPortFrom(other: IConnectable, description?: string): void
```

* **other** (<code>[IConnectable](#aws-cdk-aws-ec2-iconnectable)</code>)  *No description*
* **description** (<code>string</code>)  *No description*






## class Wordpress  <a id="cloudcomponents-cdk-wordpress-wordpress"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new Wordpress(scope: Construct, id: string, props: WordpressProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[WordpressProps](#cloudcomponents-cdk-wordpress-wordpressprops)</code>)  *No description*
  * **domainName** (<code>string</code>)  *No description* 
  * **domainZone** (<code>[IHostedZone](#aws-cdk-aws-route53-ihostedzone)</code>)  *No description* 
  * **backupPlan** (<code>[BackupPlan](#aws-cdk-aws-backup-backupplan)</code>)  *No description* __*Optional*__
  * **cloudFrontHashHeader** (<code>string</code>)  *No description* __*Optional*__
  * **database** (<code>[Database](#cloudcomponents-cdk-wordpress-database)</code>)  *No description* __*Optional*__
  * **environment** (<code>Map<string, string></code>)  *No description* __*Optional*__
  * **image** (<code>[ContainerImage](#aws-cdk-aws-ecs-containerimage)</code>)  *No description* __*Optional*__
  * **logDriver** (<code>[LogDriver](#aws-cdk-aws-ecs-logdriver)</code>)  *No description* __*Optional*__
  * **memoryLimitMiB** (<code>number</code>)  *No description* __*Optional*__
  * **offloadStaticContent** (<code>boolean</code>)  *No description* __*Optional*__
  * **removalPolicy** (<code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code>)  *No description* __*Optional*__
  * **secrets** (<code>Map<string, [Secret](#aws-cdk-aws-ecs-secret)></code>)  *No description* __*Optional*__
  * **serviceName** (<code>string</code>)  *No description* __*Optional*__
  * **subjectAlternativeNames** (<code>Array<string></code>)  *No description* __*Optional*__
  * **volume** (<code>[EfsVolume](#cloudcomponents-cdk-wordpress-efsvolume)</code>)  *No description* __*Optional*__
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**application** | <code>[Application](#cloudcomponents-cdk-wordpress-application)</code> | <span></span>
**database** | <code>[Database](#cloudcomponents-cdk-wordpress-database)</code> | <span></span>
**volume** | <code>[EfsVolume](#cloudcomponents-cdk-wordpress-efsvolume)</code> | <span></span>
**staticContentOffload**? | <code>[StaticContentOffload](#cloudcomponents-cdk-wordpress-staticcontentoffload)</code> | __*Optional*__



## struct ApplicationProps  <a id="cloudcomponents-cdk-wordpress-applicationprops"></a>






Name | Type | Description 
-----|------|-------------
**certificate** | <code>[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)</code> | <span></span>
**database** | <code>[Database](#cloudcomponents-cdk-wordpress-database)</code> | <span></span>
**domainName** | <code>string</code> | <span></span>
**domainZone** | <code>[IHostedZone](#aws-cdk-aws-route53-ihostedzone)</code> | <span></span>
**volume** | <code>[EfsVolume](#cloudcomponents-cdk-wordpress-efsvolume)</code> | <span></span>
**vpc** | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | <span></span>
**cloudFrontHashHeader**? | <code>string</code> | __*Optional*__
**environment**? | <code>Map<string, string></code> | __*Optional*__
**image**? | <code>[ContainerImage](#aws-cdk-aws-ecs-containerimage)</code> | __*Optional*__
**logDriver**? | <code>[LogDriver](#aws-cdk-aws-ecs-logdriver)</code> | __*Optional*__
**memoryLimitMiB**? | <code>number</code> | __*Optional*__
**removalPolicy**? | <code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code> | __*Optional*__
**secrets**? | <code>Map<string, [Secret](#aws-cdk-aws-ecs-secret)></code> | __*Optional*__
**serviceName**? | <code>string</code> | __*Optional*__



## struct DatabaseProps  <a id="cloudcomponents-cdk-wordpress-databaseprops"></a>






Name | Type | Description 
-----|------|-------------
**vpc** | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | <span></span>
**allocatedStorage**? | <code>number</code> | __*Optional*__
**databaseName**? | <code>string</code> | __*Optional*__
**engine**? | <code>[IInstanceEngine](#aws-cdk-aws-rds-iinstanceengine)</code> | __*Optional*__
**instanceType**? | <code>[InstanceType](#aws-cdk-aws-ec2-instancetype)</code> | __*Optional*__
**removalPolicy**? | <code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code> | __*Optional*__



## struct DnsProps  <a id="cloudcomponents-cdk-wordpress-dnsprops"></a>






Name | Type | Description 
-----|------|-------------
**distribution** | <code>[IDistribution](#aws-cdk-aws-cloudfront-idistribution)</code> | <span></span>
**domainName** | <code>string</code> | <span></span>
**domainZone** | <code>[IHostedZone](#aws-cdk-aws-route53-ihostedzone)</code> | <span></span>



## struct EfsVolumeProps  <a id="cloudcomponents-cdk-wordpress-efsvolumeprops"></a>






Name | Type | Description 
-----|------|-------------
**vpc** | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | <span></span>
**name**? | <code>string</code> | __*Optional*__
**removalPolicy**? | <code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code> | __*Optional*__



## struct StaticContentOffload  <a id="cloudcomponents-cdk-wordpress-staticcontentoffload"></a>

__Obtainable from__: [Application](#cloudcomponents-cdk-wordpress-application).[enableStaticContentOffload](#cloudcomponents-cdk-wordpress-application#cloudcomponents-cdk-wordpress-application-enablestaticcontentoffload)()





Name | Type | Description 
-----|------|-------------
**distribution** | <code>[IDistribution](#aws-cdk-aws-cloudfront-idistribution)</code> | <span></span>
**domainName** | <code>string</code> | <span></span>



## struct WordpressProps  <a id="cloudcomponents-cdk-wordpress-wordpressprops"></a>






Name | Type | Description 
-----|------|-------------
**domainName** | <code>string</code> | <span></span>
**domainZone** | <code>[IHostedZone](#aws-cdk-aws-route53-ihostedzone)</code> | <span></span>
**backupPlan**? | <code>[BackupPlan](#aws-cdk-aws-backup-backupplan)</code> | __*Optional*__
**cloudFrontHashHeader**? | <code>string</code> | __*Optional*__
**database**? | <code>[Database](#cloudcomponents-cdk-wordpress-database)</code> | __*Optional*__
**environment**? | <code>Map<string, string></code> | __*Optional*__
**image**? | <code>[ContainerImage](#aws-cdk-aws-ecs-containerimage)</code> | __*Optional*__
**logDriver**? | <code>[LogDriver](#aws-cdk-aws-ecs-logdriver)</code> | __*Optional*__
**memoryLimitMiB**? | <code>number</code> | __*Optional*__
**offloadStaticContent**? | <code>boolean</code> | __*Optional*__
**removalPolicy**? | <code>[RemovalPolicy](#aws-cdk-core-removalpolicy)</code> | __*Optional*__
**secrets**? | <code>Map<string, [Secret](#aws-cdk-aws-ecs-secret)></code> | __*Optional*__
**serviceName**? | <code>string</code> | __*Optional*__
**subjectAlternativeNames**? | <code>Array<string></code> | __*Optional*__
**volume**? | <code>[EfsVolume](#cloudcomponents-cdk-wordpress-efsvolume)</code> | __*Optional*__
**vpc**? | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | __*Optional*__



