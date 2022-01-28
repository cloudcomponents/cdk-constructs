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

- [toString](#tostring)
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

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

Construct.node

## Methods

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

Construct.toString

___

### isConstruct

▸ `Static` **isConstruct**(`x`): x is Construct

(deprecated) Checks if `x` is a construct.

**`deprecated`** use `x instanceof Construct` instead

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `any` | Any object. |

#### Returns

x is Construct

true if `x` is an object created from a class which extends `Construct`.

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
- [toString](#tostring)
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

• `Readonly` **node**: `Node`

The tree node.

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

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

**`stability`** stable

#### Returns

`string`

#### Inherited from

Construct.toString

___

### isConstruct

▸ `Static` **isConstruct**(`x`): x is Construct

(deprecated) Checks if `x` is a construct.

**`deprecated`** use `x instanceof Construct` instead

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `any` | Any object. |

#### Returns

x is Construct

true if `x` is an object created from a class which extends `Construct`.

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
