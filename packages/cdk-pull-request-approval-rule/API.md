# API Reference

**Classes**

Name|Description
----|-----------
[ApprovalRuleTemplate](#cloudcomponents-cdk-pull-request-approval-rule-approvalruletemplate)|*No description*
[ApprovalRuleTemplateRepositoryAssociation](#cloudcomponents-cdk-pull-request-approval-rule-approvalruletemplaterepositoryassociation)|*No description*


**Structs**

Name|Description
----|-----------
[ApprovalRuleTemplateProps](#cloudcomponents-cdk-pull-request-approval-rule-approvalruletemplateprops)|*No description*
[ApprovalRuleTemplateRepositoryAssociationProps](#cloudcomponents-cdk-pull-request-approval-rule-approvalruletemplaterepositoryassociationprops)|*No description*
[Approvers](#cloudcomponents-cdk-pull-request-approval-rule-approvers)|*No description*
[Template](#cloudcomponents-cdk-pull-request-approval-rule-template)|*No description*



## class ApprovalRuleTemplate  <a id="cloudcomponents-cdk-pull-request-approval-rule-approvalruletemplate"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new ApprovalRuleTemplate(scope: Construct, id: string, props: ApprovalRuleTemplateProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ApprovalRuleTemplateProps](#cloudcomponents-cdk-pull-request-approval-rule-approvalruletemplateprops)</code>)  *No description*
  * **approvalRuleTemplateName** (<code>string</code>)  The name of the approval rule template. 
  * **template** (<code>[Template](#cloudcomponents-cdk-pull-request-approval-rule-template)</code>)  The content of the approval rule that is created on pull requests in associated repositories. 
  * **approvalRuleTemplateDescription** (<code>string</code>)  The description of the approval rule template. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**approvalRuleTemplateName** | <code>string</code> | <span></span>



## class ApprovalRuleTemplateRepositoryAssociation  <a id="cloudcomponents-cdk-pull-request-approval-rule-approvalruletemplaterepositoryassociation"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new ApprovalRuleTemplateRepositoryAssociation(scope: Construct, id: string, props: ApprovalRuleTemplateRepositoryAssociationProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ApprovalRuleTemplateRepositoryAssociationProps](#cloudcomponents-cdk-pull-request-approval-rule-approvalruletemplaterepositoryassociationprops)</code>)  *No description*
  * **approvalRuleTemplateName** (<code>string</code>)  The name of the template you want to associate with one or more repositories. 
  * **repository** (<code>[IRepository](#aws-cdk-aws-codecommit-irepository)</code>)  The repository you want to associate with the template. 


### Methods


#### onOverridden(id, options) <a id="cloudcomponents-cdk-pull-request-approval-rule-approvalruletemplaterepositoryassociation-onoverridden"></a>



```ts
onOverridden(id: string, options: OnEventOptions): Rule
```

* **id** (<code>string</code>)  *No description*
* **options** (<code>[OnEventOptions](#aws-cdk-aws-events-oneventoptions)</code>)  *No description*
  * **description** (<code>string</code>)  A description of the rule's purpose. __*Default*__: No description
  * **eventPattern** (<code>[EventPattern](#aws-cdk-aws-events-eventpattern)</code>)  Additional restrictions for the event to route to the specified target. __*Default*__: No additional filtering based on an event pattern.
  * **ruleName** (<code>string</code>)  A name for the rule. __*Default*__: AWS CloudFormation generates a unique physical ID.
  * **target** (<code>[IRuleTarget](#aws-cdk-aws-events-iruletarget)</code>)  The target to register for the event. __*Default*__: No target is added to the rule. Use `addTarget()` to add a target.

__Returns__:
* <code>[Rule](#aws-cdk-aws-events-rule)</code>



## struct ApprovalRuleTemplateProps  <a id="cloudcomponents-cdk-pull-request-approval-rule-approvalruletemplateprops"></a>






Name | Type | Description 
-----|------|-------------
**approvalRuleTemplateName** | <code>string</code> | The name of the approval rule template.
**template** | <code>[Template](#cloudcomponents-cdk-pull-request-approval-rule-template)</code> | The content of the approval rule that is created on pull requests in associated repositories.
**approvalRuleTemplateDescription**? | <code>string</code> | The description of the approval rule template.<br/>__*Optional*__



## struct ApprovalRuleTemplateRepositoryAssociationProps  <a id="cloudcomponents-cdk-pull-request-approval-rule-approvalruletemplaterepositoryassociationprops"></a>






Name | Type | Description 
-----|------|-------------
**approvalRuleTemplateName** | <code>string</code> | The name of the template you want to associate with one or more repositories.
**repository** | <code>[IRepository](#aws-cdk-aws-codecommit-irepository)</code> | The repository you want to associate with the template.



## struct Approvers  <a id="cloudcomponents-cdk-pull-request-approval-rule-approvers"></a>






Name | Type | Description 
-----|------|-------------
**numberOfApprovalsNeeded** | <code>number</code> | <span></span>
**approvalPoolMembers**? | <code>Array<string></code> | __*Optional*__



## struct Template  <a id="cloudcomponents-cdk-pull-request-approval-rule-template"></a>






Name | Type | Description 
-----|------|-------------
**approvers** | <code>[Approvers](#cloudcomponents-cdk-pull-request-approval-rule-approvers)</code> | <span></span>
**branches**? | <code>Array<string></code> | __*Optional*__



