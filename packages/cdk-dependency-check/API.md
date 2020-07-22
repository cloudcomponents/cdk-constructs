# API Reference

**Classes**

Name|Description
----|-----------
[CodeCommitDependencyCheck](#cloudcomponents-cdk-dependency-check-codecommitdependencycheck)|*No description*


**Structs**

Name|Description
----|-----------
[CodeCommitDependencyCheckProps](#cloudcomponents-cdk-dependency-check-codecommitdependencycheckprops)|*No description*



## class CodeCommitDependencyCheck  <a id="cloudcomponents-cdk-dependency-check-codecommitdependencycheck"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new CodeCommitDependencyCheck(scope: Construct, id: string, props: CodeCommitDependencyCheckProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[CodeCommitDependencyCheckProps](#cloudcomponents-cdk-dependency-check-codecommitdependencycheckprops)</code>)  *No description*
  * **repository** (<code>[IRepository](#aws-cdk-aws-codecommit-irepository)</code>)  The repository to be checked. 
  * **schedule** (<code>[Schedule](#aws-cdk-aws-events-schedule)</code>)  Schedule for dependency check. 
  * **computeType** (<code>[ComputeType](#aws-cdk-aws-codebuild-computetype)</code>)  The type of compute to use for check the repositories. __*Default*__: taken from {@link #buildImage#defaultComputeType}
  * **enableExperimental** (<code>boolean</code>)  Enable the experimental analyzers. __*Default*__: false
  * **excludes** (<code>Array<string></code>)  The path patterns to exclude from the scan. __*Optional*__
  * **failOnCVSS** (<code>number</code>)  If the score set between 0 and 10 the exit code from dependency-check will indicate if a vulnerability with a CVSS score equal to or higher was identified. __*Default*__: 0
  * **paths** (<code>Array<string></code>)  The paths to scan. __*Default*__: the repositoryDir
  * **preCheckCommand** (<code>string</code>)  Custom command to be executed before the dependency check. __*Default*__: `echo "No preCheckCommand!"`
  * **projectName** (<code>string</code>)  The name of the project being scanned. __*Optional*__
  * **reportsBucket** (<code>[Bucket](#aws-cdk-aws-s3-bucket)</code>)  Bucket for uploading html reports. __*Optional*__
  * **suppressions** (<code>Array<string></code>)  The file paths to the suppression XML files; __*Optional*__
  * **version** (<code>string</code>)  Version of the dependency check. __*Default*__: 5.3.2


### Methods


#### onCheckFailed(id, options?) <a id="cloudcomponents-cdk-dependency-check-codecommitdependencycheck-oncheckfailed"></a>

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

#### onCheckStarted(id, options?) <a id="cloudcomponents-cdk-dependency-check-codecommitdependencycheck-oncheckstarted"></a>

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

#### onCheckSucceeded(id, options?) <a id="cloudcomponents-cdk-dependency-check-codecommitdependencycheck-onchecksucceeded"></a>

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



## struct CodeCommitDependencyCheckProps  <a id="cloudcomponents-cdk-dependency-check-codecommitdependencycheckprops"></a>






Name | Type | Description 
-----|------|-------------
**repository** | <code>[IRepository](#aws-cdk-aws-codecommit-irepository)</code> | The repository to be checked.
**schedule** | <code>[Schedule](#aws-cdk-aws-events-schedule)</code> | Schedule for dependency check.
**computeType**? | <code>[ComputeType](#aws-cdk-aws-codebuild-computetype)</code> | The type of compute to use for check the repositories.<br/>__*Default*__: taken from {@link #buildImage#defaultComputeType}
**enableExperimental**? | <code>boolean</code> | Enable the experimental analyzers.<br/>__*Default*__: false
**excludes**? | <code>Array<string></code> | The path patterns to exclude from the scan.<br/>__*Optional*__
**failOnCVSS**? | <code>number</code> | If the score set between 0 and 10 the exit code from dependency-check will indicate if a vulnerability with a CVSS score equal to or higher was identified.<br/>__*Default*__: 0
**paths**? | <code>Array<string></code> | The paths to scan.<br/>__*Default*__: the repositoryDir
**preCheckCommand**? | <code>string</code> | Custom command to be executed before the dependency check.<br/>__*Default*__: `echo "No preCheckCommand!"`
**projectName**? | <code>string</code> | The name of the project being scanned.<br/>__*Optional*__
**reportsBucket**? | <code>[Bucket](#aws-cdk-aws-s3-bucket)</code> | Bucket for uploading html reports.<br/>__*Optional*__
**suppressions**? | <code>Array<string></code> | The file paths to the suppression XML files;<br/>__*Optional*__
**version**? | <code>string</code> | Version of the dependency check.<br/>__*Default*__: 5.3.2



