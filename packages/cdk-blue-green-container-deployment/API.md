# API Reference

**Classes**

Name|Description
----|-----------
[DummyTaskDefinition](#cloudcomponents-cdk-blue-green-container-deployment-dummytaskdefinition)|*No description*
[EcsDeploymentGroup](#cloudcomponents-cdk-blue-green-container-deployment-ecsdeploymentgroup)|*No description*
[EcsService](#cloudcomponents-cdk-blue-green-container-deployment-ecsservice)|*No description*
[PushImageProject](#cloudcomponents-cdk-blue-green-container-deployment-pushimageproject)|*No description*


**Structs**

Name|Description
----|-----------
[DummyTaskDefinitionProps](#cloudcomponents-cdk-blue-green-container-deployment-dummytaskdefinitionprops)|*No description*
[EcsDeploymentGroupProps](#cloudcomponents-cdk-blue-green-container-deployment-ecsdeploymentgroupprops)|*No description*
[EcsServiceProps](#cloudcomponents-cdk-blue-green-container-deployment-ecsserviceprops)|*No description*
[PushImageProjectProps](#cloudcomponents-cdk-blue-green-container-deployment-pushimageprojectprops)|*No description*
[TrafficListener](#cloudcomponents-cdk-blue-green-container-deployment-trafficlistener)|*No description*


**Interfaces**

Name|Description
----|-----------
[IDummyTaskDefinition](#cloudcomponents-cdk-blue-green-container-deployment-idummytaskdefinition)|*No description*
[IEcsService](#cloudcomponents-cdk-blue-green-container-deployment-iecsservice)|*No description*


**Enums**

Name|Description
----|-----------
[RollbackEvent](#cloudcomponents-cdk-blue-green-container-deployment-rollbackevent)|*No description*
[SchedulingStrategy](#cloudcomponents-cdk-blue-green-container-deployment-schedulingstrategy)|*No description*



## class DummyTaskDefinition  <a id="cloudcomponents-cdk-blue-green-container-deployment-dummytaskdefinition"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IDummyTaskDefinition](#cloudcomponents-cdk-blue-green-container-deployment-idummytaskdefinition)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new DummyTaskDefinition(scope: Construct, id: string, props: DummyTaskDefinitionProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[DummyTaskDefinitionProps](#cloudcomponents-cdk-blue-green-container-deployment-dummytaskdefinitionprops)</code>)  *No description*
  * **image** (<code>string</code>)  *No description* 
  * **containerPort** (<code>number</code>)  *No description* __*Optional*__
  * **family** (<code>string</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**containerPort** | <code>number</code> | <span></span>
**executionRole** | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | <span></span>
**family** | <code>string</code> | <span></span>
**taskDefinitionArn** | <code>string</code> | <span></span>

### Methods


#### addToExecutionRolePolicy(statement) <a id="cloudcomponents-cdk-blue-green-container-deployment-dummytaskdefinition-addtoexecutionrolepolicy"></a>

Adds a policy statement to the task execution IAM role.

```ts
addToExecutionRolePolicy(statement: PolicyStatement): void
```

* **statement** (<code>[PolicyStatement](#aws-cdk-aws-iam-policystatement)</code>)  *No description*






## class EcsDeploymentGroup  <a id="cloudcomponents-cdk-blue-green-container-deployment-ecsdeploymentgroup"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IResource](#aws-cdk-core-iresource), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IEcsDeploymentGroup](#aws-cdk-aws-codedeploy-iecsdeploymentgroup), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IResource](#aws-cdk-core-iresource)
__Extends__: [Resource](#aws-cdk-core-resource)

### Initializer




```ts
new EcsDeploymentGroup(scope: Construct, id: string, props: EcsDeploymentGroupProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[EcsDeploymentGroupProps](#cloudcomponents-cdk-blue-green-container-deployment-ecsdeploymentgroupprops)</code>)  *No description*
  * **deploymentGroupName** (<code>string</code>)  *No description* 
  * **ecsServices** (<code>Array<[IEcsService](#cloudcomponents-cdk-blue-green-container-deployment-iecsservice)></code>)  *No description* 
  * **prodTrafficListener** (<code>[TrafficListener](#cloudcomponents-cdk-blue-green-container-deployment-trafficlistener)</code>)  *No description* 
  * **targetGroupNames** (<code>Array<string></code>)  *No description* 
  * **testTrafficListener** (<code>[TrafficListener](#cloudcomponents-cdk-blue-green-container-deployment-trafficlistener)</code>)  *No description* 
  * **applicationName** (<code>string</code>)  *No description* __*Optional*__
  * **autoRollbackOnEvents** (<code>Array<[RollbackEvent](#cloudcomponents-cdk-blue-green-container-deployment-rollbackevent)></code>)  The event type or types that trigger a rollback. __*Optional*__
  * **deploymentConfig** (<code>[IEcsDeploymentConfig](#aws-cdk-aws-codedeploy-iecsdeploymentconfig)</code>)  *No description* __*Optional*__
  * **terminationWaitTimeInMinutes** (<code>number</code>)  the number of minutes before deleting the original (blue) task set. __*Default*__: 60



### Properties


Name | Type | Description 
-----|------|-------------
**application** | <code>[IEcsApplication](#aws-cdk-aws-codedeploy-iecsapplication)</code> | The reference to the CodeDeploy ECS Application that this Deployment Group belongs to.
**deploymentConfig** | <code>[IEcsDeploymentConfig](#aws-cdk-aws-codedeploy-iecsdeploymentconfig)</code> | The Deployment Configuration this Group uses.
**deploymentGroupArn** | <code>string</code> | The ARN of this Deployment Group.
**deploymentGroupName** | <code>string</code> | The physical name of the CodeDeploy Deployment Group.



## class EcsService  <a id="cloudcomponents-cdk-blue-green-container-deployment-ecsservice"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConnectable](#aws-cdk-aws-ec2-iconnectable), [IEcsService](#cloudcomponents-cdk-blue-green-container-deployment-iecsservice)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new EcsService(scope: Construct, id: string, props: EcsServiceProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[EcsServiceProps](#cloudcomponents-cdk-blue-green-container-deployment-ecsserviceprops)</code>)  *No description*
  * **cluster** (<code>[ICluster](#aws-cdk-aws-ecs-icluster)</code>)  *No description* 
  * **prodTargetGroup** (<code>[ITargetGroup](#aws-cdk-aws-elasticloadbalancingv2-itargetgroup)</code>)  *No description* 
  * **serviceName** (<code>string</code>)  *No description* 
  * **taskDefinition** (<code>[DummyTaskDefinition](#cloudcomponents-cdk-blue-green-container-deployment-dummytaskdefinition)</code>)  *No description* 
  * **containerPort** (<code>number</code>)  *No description* __*Optional*__
  * **desiredCount** (<code>number</code>)  *No description* __*Optional*__
  * **launchType** (<code>[LaunchType](#aws-cdk-aws-ecs-launchtype)</code>)  *No description* __*Optional*__
  * **platformVersion** (<code>string</code>)  *No description* __*Optional*__
  * **securityGroups** (<code>Array<[SecurityGroup](#aws-cdk-aws-ec2-securitygroup)></code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**clusterName** | <code>string</code> | <span></span>
**connections** | <code>[Connections](#aws-cdk-aws-ec2-connections)</code> | <span></span>
**serviceName** | <code>string</code> | <span></span>



## class PushImageProject  <a id="cloudcomponents-cdk-blue-green-container-deployment-pushimageproject"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IResource](#aws-cdk-core-iresource), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IProject](#aws-cdk-aws-codebuild-iproject), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IResource](#aws-cdk-core-iresource), [IGrantable](#aws-cdk-aws-iam-igrantable), [IConnectable](#aws-cdk-aws-ec2-iconnectable)
__Extends__: [PipelineProject](#aws-cdk-aws-codebuild-pipelineproject)

### Initializer




```ts
new PushImageProject(scope: Construct, id: string, props: PushImageProjectProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[PushImageProjectProps](#cloudcomponents-cdk-blue-green-container-deployment-pushimageprojectprops)</code>)  *No description*
  * **imageRepository** (<code>[IRepository](#aws-cdk-aws-ecr-irepository)</code>)  *No description* 
  * **taskDefinition** (<code>[IDummyTaskDefinition](#cloudcomponents-cdk-blue-green-container-deployment-idummytaskdefinition)</code>)  *No description* 
  * **buildSpec** (<code>[BuildSpec](#aws-cdk-aws-codebuild-buildspec)</code>)  *No description* __*Optional*__
  * **cache** (<code>[Cache](#aws-cdk-aws-codebuild-cache)</code>)  *No description* __*Optional*__
  * **computeType** (<code>[ComputeType](#aws-cdk-aws-codebuild-computetype)</code>)  *No description* __*Optional*__
  * **environmentVariables** (<code>Map<string, [BuildEnvironmentVariable](#aws-cdk-aws-codebuild-buildenvironmentvariable)></code>)  *No description* __*Optional*__
  * **projectName** (<code>string</code>)  *No description* __*Optional*__




## struct DummyTaskDefinitionProps  <a id="cloudcomponents-cdk-blue-green-container-deployment-dummytaskdefinitionprops"></a>






Name | Type | Description 
-----|------|-------------
**image** | <code>string</code> | <span></span>
**containerPort**? | <code>number</code> | __*Optional*__
**family**? | <code>string</code> | __*Optional*__



## struct EcsDeploymentGroupProps  <a id="cloudcomponents-cdk-blue-green-container-deployment-ecsdeploymentgroupprops"></a>






Name | Type | Description 
-----|------|-------------
**deploymentGroupName** | <code>string</code> | <span></span>
**ecsServices** | <code>Array<[IEcsService](#cloudcomponents-cdk-blue-green-container-deployment-iecsservice)></code> | <span></span>
**prodTrafficListener** | <code>[TrafficListener](#cloudcomponents-cdk-blue-green-container-deployment-trafficlistener)</code> | <span></span>
**targetGroupNames** | <code>Array<string></code> | <span></span>
**testTrafficListener** | <code>[TrafficListener](#cloudcomponents-cdk-blue-green-container-deployment-trafficlistener)</code> | <span></span>
**applicationName**? | <code>string</code> | __*Optional*__
**autoRollbackOnEvents**? | <code>Array<[RollbackEvent](#cloudcomponents-cdk-blue-green-container-deployment-rollbackevent)></code> | The event type or types that trigger a rollback.<br/>__*Optional*__
**deploymentConfig**? | <code>[IEcsDeploymentConfig](#aws-cdk-aws-codedeploy-iecsdeploymentconfig)</code> | __*Optional*__
**terminationWaitTimeInMinutes**? | <code>number</code> | the number of minutes before deleting the original (blue) task set.<br/>__*Default*__: 60



## struct EcsServiceProps  <a id="cloudcomponents-cdk-blue-green-container-deployment-ecsserviceprops"></a>






Name | Type | Description 
-----|------|-------------
**cluster** | <code>[ICluster](#aws-cdk-aws-ecs-icluster)</code> | <span></span>
**prodTargetGroup** | <code>[ITargetGroup](#aws-cdk-aws-elasticloadbalancingv2-itargetgroup)</code> | <span></span>
**serviceName** | <code>string</code> | <span></span>
**taskDefinition** | <code>[DummyTaskDefinition](#cloudcomponents-cdk-blue-green-container-deployment-dummytaskdefinition)</code> | <span></span>
**containerPort**? | <code>number</code> | __*Optional*__
**desiredCount**? | <code>number</code> | __*Optional*__
**launchType**? | <code>[LaunchType](#aws-cdk-aws-ecs-launchtype)</code> | __*Optional*__
**platformVersion**? | <code>string</code> | __*Optional*__
**securityGroups**? | <code>Array<[SecurityGroup](#aws-cdk-aws-ec2-securitygroup)></code> | __*Optional*__



## interface IDummyTaskDefinition  <a id="cloudcomponents-cdk-blue-green-container-deployment-idummytaskdefinition"></a>

__Implemented by__: [DummyTaskDefinition](#cloudcomponents-cdk-blue-green-container-deployment-dummytaskdefinition)



### Properties


Name | Type | Description 
-----|------|-------------
**executionRole** | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | <span></span>
**family** | <code>string</code> | <span></span>
**taskDefinitionArn** | <code>string</code> | <span></span>



## interface IEcsService  <a id="cloudcomponents-cdk-blue-green-container-deployment-iecsservice"></a>

__Implemented by__: [EcsService](#cloudcomponents-cdk-blue-green-container-deployment-ecsservice)



### Properties


Name | Type | Description 
-----|------|-------------
**clusterName** | <code>string</code> | <span></span>
**serviceName** | <code>string</code> | <span></span>



## struct PushImageProjectProps  <a id="cloudcomponents-cdk-blue-green-container-deployment-pushimageprojectprops"></a>






Name | Type | Description 
-----|------|-------------
**imageRepository** | <code>[IRepository](#aws-cdk-aws-ecr-irepository)</code> | <span></span>
**taskDefinition** | <code>[IDummyTaskDefinition](#cloudcomponents-cdk-blue-green-container-deployment-idummytaskdefinition)</code> | <span></span>
**buildSpec**? | <code>[BuildSpec](#aws-cdk-aws-codebuild-buildspec)</code> | __*Optional*__
**cache**? | <code>[Cache](#aws-cdk-aws-codebuild-cache)</code> | __*Optional*__
**computeType**? | <code>[ComputeType](#aws-cdk-aws-codebuild-computetype)</code> | __*Optional*__
**environmentVariables**? | <code>Map<string, [BuildEnvironmentVariable](#aws-cdk-aws-codebuild-buildenvironmentvariable)></code> | __*Optional*__
**projectName**? | <code>string</code> | __*Optional*__



## struct TrafficListener  <a id="cloudcomponents-cdk-blue-green-container-deployment-trafficlistener"></a>






Name | Type | Description 
-----|------|-------------
**listenerArn** | <code>string</code> | ARN of the listener.



## enum RollbackEvent  <a id="cloudcomponents-cdk-blue-green-container-deployment-rollbackevent"></a>



Name | Description
-----|-----
**DEPLOYMENT_FAILURE** |
**DEPLOYMENT_STOP_ON_ALARM** |
**DEPLOYMENT_STOP_ON_REQUEST** |


## enum SchedulingStrategy  <a id="cloudcomponents-cdk-blue-green-container-deployment-schedulingstrategy"></a>



Name | Description
-----|-----
**REPLICA** |
**DAEMON** |


