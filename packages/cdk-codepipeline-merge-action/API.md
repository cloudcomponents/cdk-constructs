# API Reference

**Classes**

Name|Description
----|-----------
[CodePipelineMergeAction](#cloudcomponents-cdk-codepipeline-merge-action-codepipelinemergeaction)|Represents a reference to a CodePipelineMergeAction.
[MergeBranchesFunction](#cloudcomponents-cdk-codepipeline-merge-action-mergebranchesfunction)|*No description*


**Structs**

Name|Description
----|-----------
[CodePipelineMergeActionProps](#cloudcomponents-cdk-codepipeline-merge-action-codepipelinemergeactionprops)|*No description*
[MergeBranchesFunctionProps](#cloudcomponents-cdk-codepipeline-merge-action-mergebranchesfunctionprops)|*No description*



## class CodePipelineMergeAction  <a id="cloudcomponents-cdk-codepipeline-merge-action-codepipelinemergeaction"></a>

Represents a reference to a CodePipelineMergeAction.

__Implements__: [IAction](#aws-cdk-aws-codepipeline-iaction)
__Extends__: [Action](#aws-cdk-aws-codepipeline-actions-action)

### Initializer




```ts
new CodePipelineMergeAction(props: CodePipelineMergeActionProps)
```

* **props** (<code>[CodePipelineMergeActionProps](#cloudcomponents-cdk-codepipeline-merge-action-codepipelinemergeactionprops)</code>)  *No description*
  * **actionName** (<code>string</code>)  The physical, human-readable name of the Action. 
  * **runOrder** (<code>number</code>)  The runOrder property for this Action. __*Default*__: 1
  * **variablesNamespace** (<code>string</code>)  The name of the namespace to use for variables emitted by this action. __*Default*__: a name will be generated, based on the stage and action names, if any of the action's variables were referenced - otherwise, no namespace will be set
  * **role** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  The Role in which context's this Action will be executing in. __*Default*__: a new Role will be generated
  * **destinationCommitSpecifier** (<code>string</code>)  The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). 
  * **repository** (<code>[IRepository](#aws-cdk-aws-codecommit-irepository)</code>)  The CodeCommit repository. 
  * **sourceCommitSpecifier** (<code>string</code>)  The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID). 
  * **crossAccountRole** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  Role for crossAccount permission. __*Optional*__


### Methods


#### protected bound(scope, _stage, options) <a id="cloudcomponents-cdk-codepipeline-merge-action-codepipelinemergeaction-bound"></a>

This is a renamed version of the {@link IAction.bind} method.

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



## class MergeBranchesFunction  <a id="cloudcomponents-cdk-codepipeline-merge-action-mergebranchesfunction"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IResource](#aws-cdk-core-iresource), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IFunction](#aws-cdk-aws-lambda-ifunction), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IResource](#aws-cdk-core-iresource), [IConnectable](#aws-cdk-aws-ec2-iconnectable), [IGrantable](#aws-cdk-aws-iam-igrantable), [IClientVpnConnectionHandler](#aws-cdk-aws-ec2-iclientvpnconnectionhandler)
__Extends__: [Function](#aws-cdk-aws-lambda-function)

### Initializer




```ts
new MergeBranchesFunction(scope: Construct, id: string, props: MergeBranchesFunctionProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[MergeBranchesFunctionProps](#cloudcomponents-cdk-codepipeline-merge-action-mergebranchesfunctionprops)</code>)  *No description*
  * **repository** (<code>[IRepository](#aws-cdk-aws-codecommit-irepository)</code>)  The CodeCommit repository. 
  * **crossAccountRole** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  Role for crossAccount permission. __*Optional*__




## struct CodePipelineMergeActionProps  <a id="cloudcomponents-cdk-codepipeline-merge-action-codepipelinemergeactionprops"></a>






Name | Type | Description 
-----|------|-------------
**actionName** | <code>string</code> | The physical, human-readable name of the Action.
**destinationCommitSpecifier** | <code>string</code> | The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID).
**repository** | <code>[IRepository](#aws-cdk-aws-codecommit-irepository)</code> | The CodeCommit repository.
**sourceCommitSpecifier** | <code>string</code> | The branch, tag, HEAD, or other fully qualified reference used to identify a commit (for example, a branch name or a full commit ID).
**crossAccountRole**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | Role for crossAccount permission.<br/>__*Optional*__
**role**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | The Role in which context's this Action will be executing in.<br/>__*Default*__: a new Role will be generated
**runOrder**? | <code>number</code> | The runOrder property for this Action.<br/>__*Default*__: 1
**variablesNamespace**? | <code>string</code> | The name of the namespace to use for variables emitted by this action.<br/>__*Default*__: a name will be generated, based on the stage and action names, if any of the action's variables were referenced - otherwise, no namespace will be set



## struct MergeBranchesFunctionProps  <a id="cloudcomponents-cdk-codepipeline-merge-action-mergebranchesfunctionprops"></a>






Name | Type | Description 
-----|------|-------------
**repository** | <code>[IRepository](#aws-cdk-aws-codecommit-irepository)</code> | The CodeCommit repository.
**crossAccountRole**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | Role for crossAccount permission.<br/>__*Optional*__



