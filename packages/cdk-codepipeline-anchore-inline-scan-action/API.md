# API Reference

**Classes**

Name|Description
----|-----------
[CodePipelineAnchoreInlineScanAction](#cloudcomponents-cdk-codepipeline-anchore-inline-scan-action-codepipelineanchoreinlinescanaction)|*No description*


**Structs**

Name|Description
----|-----------
[CodePipelineAnchoreInlineScanActionProps](#cloudcomponents-cdk-codepipeline-anchore-inline-scan-action-codepipelineanchoreinlinescanactionprops)|*No description*



## class CodePipelineAnchoreInlineScanAction  <a id="cloudcomponents-cdk-codepipeline-anchore-inline-scan-action-codepipelineanchoreinlinescanaction"></a>



__Implements__: [IAction](#aws-cdk-aws-codepipeline-iaction)
__Extends__: [Action](#aws-cdk-aws-codepipeline-actions-action)

### Initializer




```ts
new CodePipelineAnchoreInlineScanAction(props: CodePipelineAnchoreInlineScanActionProps)
```

* **props** (<code>[CodePipelineAnchoreInlineScanActionProps](#cloudcomponents-cdk-codepipeline-anchore-inline-scan-action-codepipelineanchoreinlinescanactionprops)</code>)  *No description*
  * **actionName** (<code>string</code>)  The physical, human-readable name of the Action. 
  * **runOrder** (<code>number</code>)  The runOrder property for this Action. __*Default*__: 1
  * **variablesNamespace** (<code>string</code>)  The name of the namespace to use for variables emitted by this action. __*Default*__: a name will be generated, based on the stage and action names, if any of the action's variables were referenced - otherwise, no namespace will be set
  * **role** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  The Role in which context's this Action will be executing in. __*Default*__: a new Role will be generated
  * **input** (<code>[Artifact](#aws-cdk-aws-codepipeline-artifact)</code>)  The source to use as input for this action. 
  * **computeType** (<code>[ComputeType](#aws-cdk-aws-codebuild-computetype)</code>)  The type of compute to use for backup the repositories. __*Default*__: taken from {@link LinuxBuildImage.STANDARD_4_0#defaultComputeType}
  * **policyBundlePath** (<code>string</code>)  Path to local Anchore policy bundle. __*Default*__: ./policy_bundle.json
  * **timeout** (<code>number</code>)  Specify timeout for image scanning in seconds. __*Default*__: 300
  * **version** (<code>string</code>)  Version of anchore ci-tools. __*Default*__: v0.7.2


### Methods


#### protected bound(scope, _stage, options) <a id="cloudcomponents-cdk-codepipeline-anchore-inline-scan-action-codepipelineanchoreinlinescanaction-bound"></a>

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



## struct CodePipelineAnchoreInlineScanActionProps  <a id="cloudcomponents-cdk-codepipeline-anchore-inline-scan-action-codepipelineanchoreinlinescanactionprops"></a>






Name | Type | Description 
-----|------|-------------
**actionName** | <code>string</code> | The physical, human-readable name of the Action.
**input** | <code>[Artifact](#aws-cdk-aws-codepipeline-artifact)</code> | The source to use as input for this action.
**computeType**? | <code>[ComputeType](#aws-cdk-aws-codebuild-computetype)</code> | The type of compute to use for backup the repositories.<br/>__*Default*__: taken from {@link LinuxBuildImage.STANDARD_4_0#defaultComputeType}
**policyBundlePath**? | <code>string</code> | Path to local Anchore policy bundle.<br/>__*Default*__: ./policy_bundle.json
**role**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | The Role in which context's this Action will be executing in.<br/>__*Default*__: a new Role will be generated
**runOrder**? | <code>number</code> | The runOrder property for this Action.<br/>__*Default*__: 1
**timeout**? | <code>number</code> | Specify timeout for image scanning in seconds.<br/>__*Default*__: 300
**variablesNamespace**? | <code>string</code> | The name of the namespace to use for variables emitted by this action.<br/>__*Default*__: a name will be generated, based on the stage and action names, if any of the action's variables were referenced - otherwise, no namespace will be set
**version**? | <code>string</code> | Version of anchore ci-tools.<br/>__*Default*__: v0.7.2



