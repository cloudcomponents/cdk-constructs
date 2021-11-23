# README

@cloudcomponents/cdk-responsive-email-template

# @cloudcomponents/cdk-responsive-email-template

## Table of contents

### Classes

- [ResponsiveEmailTemplate](#responsive-email-template)
- [TemplatePart](#template-part)

### Interfaces

- [ParsingOptions](#parsing-options)
- [ResponsiveEmailTemplateProps](#responsive-email-template-props)

# Responsive Email Template

[@cloudcomponents/cdk-responsive-email-template](#readme) / ResponsiveEmailTemplate

# Class: ResponsiveEmailTemplate

## Hierarchy

- `Construct`

  ↳ **`ResponsiveEmailTemplate`**

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [node](#node)

### Methods

- [onPrepare](#onprepare)
- [onSynthesize](#onsynthesize)
- [onValidate](#onvalidate)
- [parseTemplate](#parsetemplate)
- [prepare](#prepare)
- [synthesize](#synthesize)
- [toString](#tostring)
- [validate](#validate)
- [isConstruct](#isconstruct)

## Constructors

### constructor

• **new ResponsiveEmailTemplate**(`scope`, `id`, `props`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`ResponsiveEmailTemplateProps`](#responsive-email-template-props) |

#### Overrides

Construct.constructor

## Properties

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

### parseTemplate

▸ `Private` **parseTemplate**(`source`, `options`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` |
| `options` | [`ParsingOptions`](#parsing-options) |

#### Returns

`string`

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

# Template Part

[@cloudcomponents/cdk-responsive-email-template](#readme) / TemplatePart

# Class: TemplatePart

## Table of contents

### Constructors

- [constructor](#constructor)

### Properties

- [defaultFilePath](#defaultfilepath)
- [source](#source)

### Methods

- [fromFile](#fromfile)
- [fromInline](#frominline)

## Constructors

### constructor

• **new TemplatePart**()

## Properties

### defaultFilePath

• `Optional` `Readonly` `Abstract` **defaultFilePath**: `string`

___

### source

• `Readonly` `Abstract` **source**: `string`

## Methods

### fromFile

▸ `Static` **fromFile**(`filePath`): [`TemplatePart`](#template-part)

#### Parameters

| Name | Type |
| :------ | :------ |
| `filePath` | `string` |

#### Returns

[`TemplatePart`](#template-part)

___

### fromInline

▸ `Static` **fromInline**(`source`): [`TemplatePart`](#template-part)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` |

#### Returns

[`TemplatePart`](#template-part)

# Parsing Options

[@cloudcomponents/cdk-responsive-email-template](#readme) / ParsingOptions

# Interface: ParsingOptions

## Table of contents

### Properties

- [beautify](#beautify)
- [filePath](#filepath)
- [fonts](#fonts)
- [keepComments](#keepcomments)
- [minify](#minify)
- [mjmlConfigPath](#mjmlconfigpath)
- [validationLevel](#validationlevel)

## Properties

### beautify

• `Optional` `Readonly` **beautify**: `boolean`

Option to beautify the HTML output

**`default:`** false

___

### filePath

• `Optional` `Readonly` **filePath**: `string`

Full path of the specified file to use when resolving paths from mj-include components

**`default:`** templateDir or '.'

___

### fonts

• `Optional` `Readonly` **fonts**: `Record`<`string`, `string`\>

Default fonts imported in the HTML rendered by HTML
ie. { 'Open Sans': 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700' }

**`default:`** @see https://github.com/mjmlio/mjml/blob/master/packages/mjml-core/src/index.js

___

### keepComments

• `Optional` `Readonly` **keepComments**: `boolean`

Option to keep comments in the HTML output

**`default:`** true

___

### minify

• `Optional` `Readonly` **minify**: `boolean`

Option to minify the HTML output

**`default:`** false

___

### mjmlConfigPath

• `Optional` `Readonly` **mjmlConfigPath**: `string`

The path or directory of the .mjmlconfig file
default: process.cwd()

___

### validationLevel

• `Optional` `Readonly` **validationLevel**: ``"strict"`` \| ``"soft"`` \| ``"skip"``

How to validate your MJML

skip: your document is rendered without going through validation
soft: your document is going through validation and is rendered, even if it has errors
strict: your document is going through validation and is not rendered if it has any error

**`default:`** soft

# Responsive Email Template Props

[@cloudcomponents/cdk-responsive-email-template](#readme) / ResponsiveEmailTemplateProps

# Interface: ResponsiveEmailTemplateProps

## Table of contents

### Properties

- [htmlPart](#htmlpart)
- [parsingOptions](#parsingoptions)
- [subjectPart](#subjectpart)
- [templateName](#templatename)
- [textPart](#textpart)

## Properties

### htmlPart

• `Readonly` **htmlPart**: [`TemplatePart`](#template-part)

___

### parsingOptions

• `Optional` `Readonly` **parsingOptions**: [`ParsingOptions`](#parsing-options)

___

### subjectPart

• `Readonly` **subjectPart**: `string`

___

### templateName

• `Readonly` **templateName**: `string`

___

### textPart

• `Optional` `Readonly` **textPart**: [`TemplatePart`](#template-part)
