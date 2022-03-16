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

- [parseTemplate](#parsetemplate)
- [toString](#tostring)
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

• `Readonly` **node**: `Node`

The tree node.

**`stability`** stable

#### Inherited from

Construct.node

## Methods

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
