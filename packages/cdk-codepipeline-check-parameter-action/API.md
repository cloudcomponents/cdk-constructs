# API Reference

**Classes**

Name|Description
----|-----------
[CheckParameterFunction](#cloudcomponents-cdk-codepipeline-check-parameter-action-checkparameterfunction)|*No description*
[CodePipelineCheckEmailParameterAction](#cloudcomponents-cdk-codepipeline-check-parameter-action-codepipelinecheckemailparameteraction)|*No description*
[CodePipelineCheckParameterAction](#cloudcomponents-cdk-codepipeline-check-parameter-action-codepipelinecheckparameteraction)|Represents a reference to a CodePipelineCheckParameterAction.
[CodePipelineCheckUrlParameterAction](#cloudcomponents-cdk-codepipeline-check-parameter-action-codepipelinecheckurlparameteraction)|*No description*


**Structs**

Name|Description
----|-----------
[CheckParamterFunctionProps](#cloudcomponents-cdk-codepipeline-check-parameter-action-checkparamterfunctionprops)|*No description*
[CodePipelineCheckEmailParameterActionProps](#cloudcomponents-cdk-codepipeline-check-parameter-action-codepipelinecheckemailparameteractionprops)|*No description*
[CodePipelineCheckParameterActionProps](#cloudcomponents-cdk-codepipeline-check-parameter-action-codepipelinecheckparameteractionprops)|*No description*
[CodePipelineCheckUrlParameterActionProps](#cloudcomponents-cdk-codepipeline-check-parameter-action-codepipelinecheckurlparameteractionprops)|*No description*
[CommonCodePipelineCheckParameterActionProps](#cloudcomponents-cdk-codepipeline-check-parameter-action-commoncodepipelinecheckparameteractionprops)|*No description*
[RegExp](#cloudcomponents-cdk-codepipeline-check-parameter-action-regexp)|*No description*



## class CheckParameterFunction  <a id="cloudcomponents-cdk-codepipeline-check-parameter-action-checkparameterfunction"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IResource](#aws-cdk-core-iresource), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IFunction](#aws-cdk-aws-lambda-ifunction), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConstruct](#aws-cdk-core-iconstruct), [IResource](#aws-cdk-core-iresource), [IConnectable](#aws-cdk-aws-ec2-iconnectable), [IGrantable](#aws-cdk-aws-iam-igrantable), [IClientVpnConnectionHandler](#aws-cdk-aws-ec2-iclientvpnconnectionhandler)
__Extends__: [Function](#aws-cdk-aws-lambda-function)

### Initializer




```ts
new CheckParameterFunction(scope: Construct, id: string, props: CheckParamterFunctionProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[CheckParamterFunctionProps](#cloudcomponents-cdk-codepipeline-check-parameter-action-checkparamterfunctionprops)</code>)  *No description*
  * **parameterName** (<code>string</code>)  The name of the parameter. 
  * **crossAccountRole** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  Role for crossAccount permission. __*Optional*__




## class CodePipelineCheckEmailParameterAction  <a id="cloudcomponents-cdk-codepipeline-check-parameter-action-codepipelinecheckemailparameteraction"></a>



__Implements__: [IAction](#aws-cdk-aws-codepipeline-iaction)
__Extends__: [CodePipelineCheckParameterAction](#cloudcomponents-cdk-codepipeline-check-parameter-action-codepipelinecheckparameteraction)

### Initializer




```ts
new CodePipelineCheckEmailParameterAction(props: CodePipelineCheckEmailParameterActionProps)
```

* **props** (<code>[CodePipelineCheckEmailParameterActionProps](#cloudcomponents-cdk-codepipeline-check-parameter-action-codepipelinecheckemailparameteractionprops)</code>)  *No description*
  * **actionName** (<code>string</code>)  The physical, human-readable name of the Action. 
  * **runOrder** (<code>number</code>)  The runOrder property for this Action. __*Default*__: 1
  * **variablesNamespace** (<code>string</code>)  The name of the namespace to use for variables emitted by this action. __*Default*__: a name will be generated, based on the stage and action names, if any of the action's variables were referenced - otherwise, no namespace will be set
  * **role** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  The Role in which context's this Action will be executing in. __*Default*__: a new Role will be generated
  * **parameterName** (<code>string</code>)  The name of the parameter. 
  * **crossAccountRole** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  Role for crossAccount permission. __*Optional*__
  * **logParameter** (<code>boolean</code>)  Parameter is logged after successful check. __*Default*__: false The parameter is not logged
  * **exact** (<code>boolean</code>)  Only match an exact string. __*Default*__: true




## class CodePipelineCheckParameterAction  <a id="cloudcomponents-cdk-codepipeline-check-parameter-action-codepipelinecheckparameteraction"></a>

Represents a reference to a CodePipelineCheckParameterAction.

__Implements__: [IAction](#aws-cdk-aws-codepipeline-iaction)
__Extends__: [Action](#aws-cdk-aws-codepipeline-actions-action)

### Initializer




```ts
new CodePipelineCheckParameterAction(props: CodePipelineCheckParameterActionProps)
```

* **props** (<code>[CodePipelineCheckParameterActionProps](#cloudcomponents-cdk-codepipeline-check-parameter-action-codepipelinecheckparameteractionprops)</code>)  *No description*
  * **actionName** (<code>string</code>)  The physical, human-readable name of the Action. 
  * **runOrder** (<code>number</code>)  The runOrder property for this Action. __*Default*__: 1
  * **variablesNamespace** (<code>string</code>)  The name of the namespace to use for variables emitted by this action. __*Default*__: a name will be generated, based on the stage and action names, if any of the action's variables were referenced - otherwise, no namespace will be set
  * **role** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  The Role in which context's this Action will be executing in. __*Default*__: a new Role will be generated
  * **parameterName** (<code>string</code>)  The name of the parameter. 
  * **crossAccountRole** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  Role for crossAccount permission. __*Optional*__
  * **logParameter** (<code>boolean</code>)  Parameter is logged after successful check. __*Default*__: false The parameter is not logged
  * **regExp** (<code>[RegExp](#cloudcomponents-cdk-codepipeline-check-parameter-action-regexp)</code>)  Regular expression to validate the parameter. __*Optional*__


### Methods


#### protected bound(scope, _stage, options) <a id="cloudcomponents-cdk-codepipeline-check-parameter-action-codepipelinecheckparameteraction-bound"></a>

(experimental) The method called when an Action is attached to a Pipeline.

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



## class CodePipelineCheckUrlParameterAction  <a id="cloudcomponents-cdk-codepipeline-check-parameter-action-codepipelinecheckurlparameteraction"></a>



__Implements__: [IAction](#aws-cdk-aws-codepipeline-iaction)
__Extends__: [CodePipelineCheckParameterAction](#cloudcomponents-cdk-codepipeline-check-parameter-action-codepipelinecheckparameteraction)

### Initializer




```ts
new CodePipelineCheckUrlParameterAction(props: CodePipelineCheckUrlParameterActionProps)
```

* **props** (<code>[CodePipelineCheckUrlParameterActionProps](#cloudcomponents-cdk-codepipeline-check-parameter-action-codepipelinecheckurlparameteractionprops)</code>)  *No description*
  * **actionName** (<code>string</code>)  The physical, human-readable name of the Action. 
  * **runOrder** (<code>number</code>)  The runOrder property for this Action. __*Default*__: 1
  * **variablesNamespace** (<code>string</code>)  The name of the namespace to use for variables emitted by this action. __*Default*__: a name will be generated, based on the stage and action names, if any of the action's variables were referenced - otherwise, no namespace will be set
  * **role** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  The Role in which context's this Action will be executing in. __*Default*__: a new Role will be generated
  * **parameterName** (<code>string</code>)  The name of the parameter. 
  * **crossAccountRole** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  Role for crossAccount permission. __*Optional*__
  * **logParameter** (<code>boolean</code>)  Parameter is logged after successful check. __*Default*__: false The parameter is not logged
  * **exact** (<code>boolean</code>)  Only match an exact string. __*Default*__: true
  * **strict** (<code>boolean</code>)  Force URLs to start with a valid protocol or www. __*Optional*__




## struct CheckParamterFunctionProps  <a id="cloudcomponents-cdk-codepipeline-check-parameter-action-checkparamterfunctionprops"></a>






Name | Type | Description 
-----|------|-------------
**parameterName** | <code>string</code> | The name of the parameter.
**crossAccountRole**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | Role for crossAccount permission.<br/>__*Optional*__



## struct CodePipelineCheckEmailParameterActionProps  <a id="cloudcomponents-cdk-codepipeline-check-parameter-action-codepipelinecheckemailparameteractionprops"></a>






Name | Type | Description 
-----|------|-------------
**actionName** | <code>string</code> | The physical, human-readable name of the Action.
**parameterName** | <code>string</code> | The name of the parameter.
**crossAccountRole**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | Role for crossAccount permission.<br/>__*Optional*__
**exact**? | <code>boolean</code> | Only match an exact string.<br/>__*Default*__: true
**logParameter**? | <code>boolean</code> | Parameter is logged after successful check.<br/>__*Default*__: false The parameter is not logged
**role**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | The Role in which context's this Action will be executing in.<br/>__*Default*__: a new Role will be generated
**runOrder**? | <code>number</code> | The runOrder property for this Action.<br/>__*Default*__: 1
**variablesNamespace**? | <code>string</code> | The name of the namespace to use for variables emitted by this action.<br/>__*Default*__: a name will be generated, based on the stage and action names, if any of the action's variables were referenced - otherwise, no namespace will be set



## struct CodePipelineCheckParameterActionProps  <a id="cloudcomponents-cdk-codepipeline-check-parameter-action-codepipelinecheckparameteractionprops"></a>






Name | Type | Description 
-----|------|-------------
**actionName** | <code>string</code> | The physical, human-readable name of the Action.
**parameterName** | <code>string</code> | The name of the parameter.
**crossAccountRole**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | Role for crossAccount permission.<br/>__*Optional*__
**logParameter**? | <code>boolean</code> | Parameter is logged after successful check.<br/>__*Default*__: false The parameter is not logged
**regExp**? | <code>[RegExp](#cloudcomponents-cdk-codepipeline-check-parameter-action-regexp)</code> | Regular expression to validate the parameter.<br/>__*Optional*__
**role**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | The Role in which context's this Action will be executing in.<br/>__*Default*__: a new Role will be generated
**runOrder**? | <code>number</code> | The runOrder property for this Action.<br/>__*Default*__: 1
**variablesNamespace**? | <code>string</code> | The name of the namespace to use for variables emitted by this action.<br/>__*Default*__: a name will be generated, based on the stage and action names, if any of the action's variables were referenced - otherwise, no namespace will be set



## struct CodePipelineCheckUrlParameterActionProps  <a id="cloudcomponents-cdk-codepipeline-check-parameter-action-codepipelinecheckurlparameteractionprops"></a>






Name | Type | Description 
-----|------|-------------
**actionName** | <code>string</code> | The physical, human-readable name of the Action.
**parameterName** | <code>string</code> | The name of the parameter.
**crossAccountRole**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | Role for crossAccount permission.<br/>__*Optional*__
**exact**? | <code>boolean</code> | Only match an exact string.<br/>__*Default*__: true
**logParameter**? | <code>boolean</code> | Parameter is logged after successful check.<br/>__*Default*__: false The parameter is not logged
**role**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | The Role in which context's this Action will be executing in.<br/>__*Default*__: a new Role will be generated
**runOrder**? | <code>number</code> | The runOrder property for this Action.<br/>__*Default*__: 1
**strict**? | <code>boolean</code> | Force URLs to start with a valid protocol or www.<br/>__*Optional*__
**variablesNamespace**? | <code>string</code> | The name of the namespace to use for variables emitted by this action.<br/>__*Default*__: a name will be generated, based on the stage and action names, if any of the action's variables were referenced - otherwise, no namespace will be set



## struct CommonCodePipelineCheckParameterActionProps  <a id="cloudcomponents-cdk-codepipeline-check-parameter-action-commoncodepipelinecheckparameteractionprops"></a>






Name | Type | Description 
-----|------|-------------
**actionName** | <code>string</code> | The physical, human-readable name of the Action.
**parameterName** | <code>string</code> | The name of the parameter.
**crossAccountRole**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | Role for crossAccount permission.<br/>__*Optional*__
**logParameter**? | <code>boolean</code> | Parameter is logged after successful check.<br/>__*Default*__: false The parameter is not logged
**role**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | The Role in which context's this Action will be executing in.<br/>__*Default*__: a new Role will be generated
**runOrder**? | <code>number</code> | The runOrder property for this Action.<br/>__*Default*__: 1
**variablesNamespace**? | <code>string</code> | The name of the namespace to use for variables emitted by this action.<br/>__*Default*__: a name will be generated, based on the stage and action names, if any of the action's variables were referenced - otherwise, no namespace will be set



## struct RegExp  <a id="cloudcomponents-cdk-codepipeline-check-parameter-action-regexp"></a>






Name | Type | Description 
-----|------|-------------
**source** | <code>string</code> | <span></span>



