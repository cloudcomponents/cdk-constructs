# README

@cloudcomponents/cdk-pull-request-approval-rule

# @cloudcomponents/cdk-pull-request-approval-rule

## Table of contents

### Classes

- [ApprovalRuleTemplate](#approval-rule-template)
- [ApprovalRuleTemplateRepositoryAssociation](#approval-rule-template-repository-association)

### Interfaces

- [ApprovalRuleTemplateProps](#approval-rule-template-props)
- [ApprovalRuleTemplateRepositoryAssociationProps](#approval-rule-template-repository-association-props)
- [Approvers](#approvers)
- [Template](#template)

# Approval Rule Template

[@cloudcomponents/cdk-pull-request-approval-rule](#readme) / ApprovalRuleTemplate

# Class: ApprovalRuleTemplate

## Hierarchy

- `Construct`

  ↳ **`ApprovalRuleTemplate`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [approvalRuleTemplateName](#approvalruletemplatename)
- [node](#node)

### Methods

- [onPrepare](#onprepare)
- [onSynthesize](#onsynthesize)
- [onValidate](#onvalidate)
- [prepare](#prepare)
- [synthesize](#synthesize)
- [toString](#tostring)
- [validate](#validate)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new ApprovalRuleTemplate**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`ApprovalRuleTemplateProps`](#approval-rule-template-props) |

#### Overrides

Construct.constructor

## Properties

### approvalRuleTemplateName

• `Readonly` **approvalRuleTemplateName**: `string`

___

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

Construct.node

## Methods

### onPrepare

▸ `Protected` **onPrepare**(): `void`

Perform final modifications before synthesis.

This method can be implemented by derived constructs in order to perform
final changes before synthesis. prepare() will be called after child
constructs have been prepared.

This is an advanced framework feature. Only use this if you
understand the implications.

**`stability`** stable

#### Returns

`void`

#### Inherited from

Construct.onPrepare

___

### onSynthesize

▸ `Protected` **onSynthesize**(`session`): `void`

Allows this construct to emit artifacts into the cloud assembly during synthesis.

This method is usually implemented by framework-level constructs such as `Stack` and `Asset`
as they participate in synthesizing the cloud assembly.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `session` | `ISynthesisSession` | The synthesis session. |

#### Returns

`void`

#### Inherited from

Construct.onSynthesize

___

### onValidate

▸ `Protected` **onValidate**(): `string`[]

Validate the current construct.

This method can be implemented by derived constructs in order to perform
validation logic. It is called on all constructs before synthesis.

**`stability`** stable

#### Returns

`string`[]

An array of validation error messages, or an empty array if the construct is valid.

#### Inherited from

Construct.onValidate

___

### prepare

▸ `Protected` **prepare**(): `void`

Perform final modifications before synthesis.

This method can be implemented by derived constructs in order to perform
final changes before synthesis. prepare() will be called after child
constructs have been prepared.

This is an advanced framework feature. Only use this if you
understand the implications.

**`stability`** stable

#### Returns

`void`

#### Inherited from

Construct.prepare

___

### synthesize

▸ `Protected` **synthesize**(`session`): `void`

Allows this construct to emit artifacts into the cloud assembly during synthesis.

This method is usually implemented by framework-level constructs such as `Stack` and `Asset`
as they participate in synthesizing the cloud assembly.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `session` | `ISynthesisSession` | The synthesis session. |

#### Returns

`void`

#### Inherited from

Construct.synthesize

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

Construct.toString

___

### validate

▸ `Protected` **validate**(): `string`[]

Validate the current construct.

This method can be implemented by derived constructs in order to perform
validation logic. It is called on all constructs before synthesis.

**`stability`** stable

#### Returns

`string`[]

An array of validation error messages, or an empty array if the construct is valid.

#### Inherited from

Construct.validate

___

### isConstruct

▸ `Static` **isConstruct**(`x`): x is Construct

Return whether the given object is a Construct.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `any` |

#### Returns

x is Construct

#### Inherited from

Construct.isConstruct

# Approval Rule Template Repository Association

[@cloudcomponents/cdk-pull-request-approval-rule](#readme) / ApprovalRuleTemplateRepositoryAssociation

# Class: ApprovalRuleTemplateRepositoryAssociation

## Hierarchy

- `Construct`

  ↳ **`ApprovalRuleTemplateRepositoryAssociation`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [node](#node)
- [repository](#repository)

### Methods

- [onOverridden](#onoverridden)
- [onPrepare](#onprepare)
- [onSynthesize](#onsynthesize)
- [onValidate](#onvalidate)
- [prepare](#prepare)
- [synthesize](#synthesize)
- [toString](#tostring)
- [validate](#validate)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new ApprovalRuleTemplateRepositoryAssociation**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`ApprovalRuleTemplateRepositoryAssociationProps`](#approval-rule-template-repository-association-props) |

#### Overrides

Construct.constructor

## Properties

### node

• `Readonly` **node**: `ConstructNode`

The construct tree node associated with this construct.

**`stability`** stable

#### Inherited from

Construct.node

___

### repository

• `Private` **repository**: `IRepository`

## Methods

### onOverridden

▸ **onOverridden**(`id`, `options`): `Rule`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `options` | `OnEventOptions` |

#### Returns

`Rule`

___

### onPrepare

▸ `Protected` **onPrepare**(): `void`

Perform final modifications before synthesis.

This method can be implemented by derived constructs in order to perform
final changes before synthesis. prepare() will be called after child
constructs have been prepared.

This is an advanced framework feature. Only use this if you
understand the implications.

**`stability`** stable

#### Returns

`void`

#### Inherited from

Construct.onPrepare

___

### onSynthesize

▸ `Protected` **onSynthesize**(`session`): `void`

Allows this construct to emit artifacts into the cloud assembly during synthesis.

This method is usually implemented by framework-level constructs such as `Stack` and `Asset`
as they participate in synthesizing the cloud assembly.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `session` | `ISynthesisSession` | The synthesis session. |

#### Returns

`void`

#### Inherited from

Construct.onSynthesize

___

### onValidate

▸ `Protected` **onValidate**(): `string`[]

Validate the current construct.

This method can be implemented by derived constructs in order to perform
validation logic. It is called on all constructs before synthesis.

**`stability`** stable

#### Returns

`string`[]

An array of validation error messages, or an empty array if the construct is valid.

#### Inherited from

Construct.onValidate

___

### prepare

▸ `Protected` **prepare**(): `void`

Perform final modifications before synthesis.

This method can be implemented by derived constructs in order to perform
final changes before synthesis. prepare() will be called after child
constructs have been prepared.

This is an advanced framework feature. Only use this if you
understand the implications.

**`stability`** stable

#### Returns

`void`

#### Inherited from

Construct.prepare

___

### synthesize

▸ `Protected` **synthesize**(`session`): `void`

Allows this construct to emit artifacts into the cloud assembly during synthesis.

This method is usually implemented by framework-level constructs such as `Stack` and `Asset`
as they participate in synthesizing the cloud assembly.

**`stability`** stable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `session` | `ISynthesisSession` | The synthesis session. |

#### Returns

`void`

#### Inherited from

Construct.synthesize

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

Construct.toString

___

### validate

▸ `Protected` **validate**(): `string`[]

Validate the current construct.

This method can be implemented by derived constructs in order to perform
validation logic. It is called on all constructs before synthesis.

**`stability`** stable

#### Returns

`string`[]

An array of validation error messages, or an empty array if the construct is valid.

#### Inherited from

Construct.validate

___

### isConstruct

▸ `Static` **isConstruct**(`x`): x is Construct

Return whether the given object is a Construct.

**`stability`** stable

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `any` |

#### Returns

x is Construct

#### Inherited from

Construct.isConstruct

# Approval Rule Template Props

[@cloudcomponents/cdk-pull-request-approval-rule](#readme) / ApprovalRuleTemplateProps

# Interface: ApprovalRuleTemplateProps

## Table of contents

### Properties

- [approvalRuleTemplateDescription](#approvalruletemplatedescription)
- [approvalRuleTemplateName](#approvalruletemplatename)
- [template](#template)

## Properties

### approvalRuleTemplateDescription

• `Optional` `Readonly` **approvalRuleTemplateDescription**: `string`

The description of the approval rule template

___

### approvalRuleTemplateName

• `Readonly` **approvalRuleTemplateName**: `string`

The name of the approval rule template.

___

### template

• `Readonly` **template**: [`Template`](#template)

The content of the approval rule that is created on pull requests in associated repositories.

# Approval Rule Template Repository Association Props

[@cloudcomponents/cdk-pull-request-approval-rule](#readme) / ApprovalRuleTemplateRepositoryAssociationProps

# Interface: ApprovalRuleTemplateRepositoryAssociationProps

## Table of contents

### Properties

- [approvalRuleTemplateName](#approvalruletemplatename)
- [repository](#repository)

## Properties

### approvalRuleTemplateName

• `Readonly` **approvalRuleTemplateName**: `string`

The name of the template you want to associate with one or more repositories.

___

### repository

• `Readonly` **repository**: `IRepository`

The repository you want to associate with the template.

# Approvers

[@cloudcomponents/cdk-pull-request-approval-rule](#readme) / Approvers

# Interface: Approvers

## Table of contents

### Properties

- [approvalPoolMembers](#approvalpoolmembers)
- [numberOfApprovalsNeeded](#numberofapprovalsneeded)

## Properties

### approvalPoolMembers

• `Optional` `Readonly` **approvalPoolMembers**: `string`[]

___

### numberOfApprovalsNeeded

• `Readonly` **numberOfApprovalsNeeded**: `number`

# Template

[@cloudcomponents/cdk-pull-request-approval-rule](#readme) / Template

# Interface: Template

## Table of contents

### Properties

- [approvers](#approvers)
- [branches](#branches)

## Properties

### approvers

• `Readonly` **approvers**: [`Approvers`](#approvers)

___

### branches

• `Optional` `Readonly` **branches**: `string`[]
