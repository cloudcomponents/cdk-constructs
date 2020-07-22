# API Reference

**Classes**

Name|Description
----|-----------
[PullRequestCheck](#cloudcomponents-cdk-pull-request-check-pullrequestcheck)|Represents a reference to a PullRequestCheck.


**Structs**

Name|Description
----|-----------
[PullRequestCheckProps](#cloudcomponents-cdk-pull-request-check-pullrequestcheckprops)|*No description*



## class PullRequestCheck  <a id="cloudcomponents-cdk-pull-request-check-pullrequestcheck"></a>

Represents a reference to a PullRequestCheck.

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new PullRequestCheck(scope: Construct, id: string, props: PullRequestCheckProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[PullRequestCheckProps](#cloudcomponents-cdk-pull-request-check-pullrequestcheckprops)</code>)  *No description*
  * **buildSpec** (<code>[BuildSpec](#aws-cdk-aws-codebuild-buildspec)</code>)  Filename or contents of buildspec in JSON format. 
  * **repository** (<code>[IRepository](#aws-cdk-aws-codecommit-irepository)</code>)  The CodeCommit repository. 
  * **buildImage** (<code>[IBuildImage](#aws-cdk-aws-codebuild-ibuildimage)</code>)  Build environment to use for the build. __*Default*__: BuildEnvironment.LinuxBuildImage.STANDARD_2_0
  * **computeType** (<code>[ComputeType](#aws-cdk-aws-codebuild-computetype)</code>)  The type of compute to use for this build. __*Default*__: taken from {@link #buildImage#defaultComputeType}
  * **postComment** (<code>boolean</code>)  Specifies whether comments should be written in the request. __*Default*__: true
  * **privileged** (<code>boolean</code>)  Indicates how the project builds Docker images. __*Default*__: false
  * **projectName** (<code>string</code>)  The human-visible name of this PullRequest-Project. __*Optional*__
  * **role** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  The IAM service Role of the Project. __*Optional*__
  * **updateApprovalState** (<code>boolean</code>)  Indicates whether the approval state [APPROVE, REVOKE] should be updated. __*Default*__: true


### Methods


#### addToRolePolicy(statement) <a id="cloudcomponents-cdk-pull-request-check-pullrequestcheck-addtorolepolicy"></a>

Add a permission only if there's a policy attached.

```ts
addToRolePolicy(statement: PolicyStatement): void
```

* **statement** (<code>[PolicyStatement](#aws-cdk-aws-iam-policystatement)</code>)  The permissions statement to add.




#### onCheckFailed(id, options?) <a id="cloudcomponents-cdk-pull-request-check-pullrequestcheck-oncheckfailed"></a>

Defines an event rule which triggers when a check fails.

```ts
onCheckFailed(id: string, options?: OnEventOptions): Rule
```

* **id** (<code>string</code>)  *No description*
* **options** (<code>[OnEventOptions](#aws-cdk-aws-events-oneventoptions)</code>)  *No description*
  * **description** (<code>string</code>)  A description of the rule's purpose. __*Default*__: No description
  * **eventPattern** (<code>[EventPattern](#aws-cdk-aws-events-eventpattern)</code>)  Additional restrictions for the event to route to the specified target. __*Default*__: No additional filtering based on an event pattern.
  * **ruleName** (<code>string</code>)  A name for the rule. __*Default*__: AWS CloudFormation generates a unique physical ID.
  * **target** (<code>[IRuleTarget](#aws-cdk-aws-events-iruletarget)</code>)  The target to register for the event. __*Default*__: No target is added to the rule. Use `addTarget()` to add a target.

__Returns__:
* <code>[Rule](#aws-cdk-aws-events-rule)</code>

#### onCheckStarted(id, options?) <a id="cloudcomponents-cdk-pull-request-check-pullrequestcheck-oncheckstarted"></a>

Defines an event rule which triggers when a check starts.

```ts
onCheckStarted(id: string, options?: OnEventOptions): Rule
```

* **id** (<code>string</code>)  *No description*
* **options** (<code>[OnEventOptions](#aws-cdk-aws-events-oneventoptions)</code>)  *No description*
  * **description** (<code>string</code>)  A description of the rule's purpose. __*Default*__: No description
  * **eventPattern** (<code>[EventPattern](#aws-cdk-aws-events-eventpattern)</code>)  Additional restrictions for the event to route to the specified target. __*Default*__: No additional filtering based on an event pattern.
  * **ruleName** (<code>string</code>)  A name for the rule. __*Default*__: AWS CloudFormation generates a unique physical ID.
  * **target** (<code>[IRuleTarget](#aws-cdk-aws-events-iruletarget)</code>)  The target to register for the event. __*Default*__: No target is added to the rule. Use `addTarget()` to add a target.

__Returns__:
* <code>[Rule](#aws-cdk-aws-events-rule)</code>

#### onCheckSucceeded(id, options?) <a id="cloudcomponents-cdk-pull-request-check-pullrequestcheck-onchecksucceeded"></a>

Defines an event rule which triggers when a check complets successfully.

```ts
onCheckSucceeded(id: string, options?: OnEventOptions): Rule
```

* **id** (<code>string</code>)  *No description*
* **options** (<code>[OnEventOptions](#aws-cdk-aws-events-oneventoptions)</code>)  *No description*
  * **description** (<code>string</code>)  A description of the rule's purpose. __*Default*__: No description
  * **eventPattern** (<code>[EventPattern](#aws-cdk-aws-events-eventpattern)</code>)  Additional restrictions for the event to route to the specified target. __*Default*__: No additional filtering based on an event pattern.
  * **ruleName** (<code>string</code>)  A name for the rule. __*Default*__: AWS CloudFormation generates a unique physical ID.
  * **target** (<code>[IRuleTarget](#aws-cdk-aws-events-iruletarget)</code>)  The target to register for the event. __*Default*__: No target is added to the rule. Use `addTarget()` to add a target.

__Returns__:
* <code>[Rule](#aws-cdk-aws-events-rule)</code>



## struct PullRequestCheckProps  <a id="cloudcomponents-cdk-pull-request-check-pullrequestcheckprops"></a>






Name | Type | Description 
-----|------|-------------
**buildSpec** | <code>[BuildSpec](#aws-cdk-aws-codebuild-buildspec)</code> | Filename or contents of buildspec in JSON format.
**repository** | <code>[IRepository](#aws-cdk-aws-codecommit-irepository)</code> | The CodeCommit repository.
**buildImage**? | <code>[IBuildImage](#aws-cdk-aws-codebuild-ibuildimage)</code> | Build environment to use for the build.<br/>__*Default*__: BuildEnvironment.LinuxBuildImage.STANDARD_2_0
**computeType**? | <code>[ComputeType](#aws-cdk-aws-codebuild-computetype)</code> | The type of compute to use for this build.<br/>__*Default*__: taken from {@link #buildImage#defaultComputeType}
**postComment**? | <code>boolean</code> | Specifies whether comments should be written in the request.<br/>__*Default*__: true
**privileged**? | <code>boolean</code> | Indicates how the project builds Docker images.<br/>__*Default*__: false
**projectName**? | <code>string</code> | The human-visible name of this PullRequest-Project.<br/>__*Optional*__
**role**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | The IAM service Role of the Project.<br/>__*Optional*__
**updateApprovalState**? | <code>boolean</code> | Indicates whether the approval state [APPROVE, REVOKE] should be updated.<br/>__*Default*__: true



