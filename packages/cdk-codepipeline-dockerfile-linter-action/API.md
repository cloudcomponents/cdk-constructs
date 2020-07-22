# API Reference

**Classes**

Name|Description
----|-----------
[CodePipelineDockerfileLinterAction](#cloudcomponents-cdk-codepipeline-dockerfile-linter-action-codepipelinedockerfilelinteraction)|*No description*


**Structs**

Name|Description
----|-----------
[CodePipelineDockerfileLinterActionProps](#cloudcomponents-cdk-codepipeline-dockerfile-linter-action-codepipelinedockerfilelinteractionprops)|*No description*



## class CodePipelineDockerfileLinterAction  <a id="cloudcomponents-cdk-codepipeline-dockerfile-linter-action-codepipelinedockerfilelinteraction"></a>



__Implements__: [IAction](#aws-cdk-aws-codepipeline-iaction)
__Extends__: [Action](#aws-cdk-aws-codepipeline-actions-action)

### Initializer




```ts
new CodePipelineDockerfileLinterAction(props: CodePipelineDockerfileLinterActionProps)
```

* **props** (<code>[CodePipelineDockerfileLinterActionProps](#cloudcomponents-cdk-codepipeline-dockerfile-linter-action-codepipelinedockerfilelinteractionprops)</code>)  *No description*
  * **actionName** (<code>string</code>)  The physical, human-readable name of the Action. 
  * **runOrder** (<code>number</code>)  The runOrder property for this Action. __*Default*__: 1
  * **variablesNamespace** (<code>string</code>)  The name of the namespace to use for variables emitted by this action. __*Default*__: a name will be generated, based on the stage and action names, if any of the action's variables were referenced - otherwise, no namespace will be set
  * **role** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  The Role in which context's this Action will be executing in. __*Default*__: a new Role will be generated
  * **input** (<code>[Artifact](#aws-cdk-aws-codepipeline-artifact)</code>)  The source to use as input for this action. 
  * **computeType** (<code>[ComputeType](#aws-cdk-aws-codebuild-computetype)</code>)  The type of compute to use for backup the repositories. __*Default*__: taken from {@link LinuxBuildImage.STANDARD_4_0#defaultComputeType}
  * **version** (<code>string</code>)  Version of hadolint. __*Default*__: v1.18.0


### Methods


#### protected bound(scope, _stage, options) <a id="cloudcomponents-cdk-codepipeline-dockerfile-linter-action-codepipelinedockerfilelinteraction-bound"></a>

The method called when an Action is attached to a Pipeline.

This method is guaranteed to be called only once for each Action instance.

```ts
protected bound(scope: Construct, _stage: IStage, options: ActionBindOptions): ActionConfig
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **_stage** (<code>[IStage](#aws-cdk-aws-codepipeline-istage)</code>)  *No description*
* **options** (<code>[ActionBindOptions](#aws-cdk-aws-codepipeline-actionbindoptions)</code>)  *No description*
  * **bucket** (<code>[IBucket](#aws-cdk-aws-s3-ibucket)</code>)  *No description* 
  * **role** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  *No description* 

__Returns__:
* <code>[ActionConfig](#aws-cdk-aws-codepipeline-actionconfig)</code>



## struct CodePipelineDockerfileLinterActionProps  <a id="cloudcomponents-cdk-codepipeline-dockerfile-linter-action-codepipelinedockerfilelinteractionprops"></a>






Name | Type | Description 
-----|------|-------------
**actionName** | <code>string</code> | The physical, human-readable name of the Action.
**input** | <code>[Artifact](#aws-cdk-aws-codepipeline-artifact)</code> | The source to use as input for this action.
**computeType**? | <code>[ComputeType](#aws-cdk-aws-codebuild-computetype)</code> | The type of compute to use for backup the repositories.<br/>__*Default*__: taken from {@link LinuxBuildImage.STANDARD_4_0#defaultComputeType}
**role**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | The Role in which context's this Action will be executing in.<br/>__*Default*__: a new Role will be generated
**runOrder**? | <code>number</code> | The runOrder property for this Action.<br/>__*Default*__: 1
**variablesNamespace**? | <code>string</code> | The name of the namespace to use for variables emitted by this action.<br/>__*Default*__: a name will be generated, based on the stage and action names, if any of the action's variables were referenced - otherwise, no namespace will be set
**version**? | <code>string</code> | Version of hadolint.<br/>__*Default*__: v1.18.0



