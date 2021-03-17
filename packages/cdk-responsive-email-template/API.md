# API Reference

**Classes**

Name|Description
----|-----------
[ResponsiveEmailTemplate](#cloudcomponents-cdk-responsive-email-template-responsiveemailtemplate)|*No description*
[TemplatePart](#cloudcomponents-cdk-responsive-email-template-templatepart)|*No description*


**Structs**

Name|Description
----|-----------
[ParsingOptions](#cloudcomponents-cdk-responsive-email-template-parsingoptions)|*No description*
[ResponsiveEmailTemplateProps](#cloudcomponents-cdk-responsive-email-template-responsiveemailtemplateprops)|*No description*



## class ResponsiveEmailTemplate  <a id="cloudcomponents-cdk-responsive-email-template-responsiveemailtemplate"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new ResponsiveEmailTemplate(scope: Construct, id: string, props: ResponsiveEmailTemplateProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ResponsiveEmailTemplateProps](#cloudcomponents-cdk-responsive-email-template-responsiveemailtemplateprops)</code>)  *No description*
  * **htmlPart** (<code>[TemplatePart](#cloudcomponents-cdk-responsive-email-template-templatepart)</code>)  *No description* 
  * **subjectPart** (<code>string</code>)  *No description* 
  * **templateName** (<code>string</code>)  *No description* 
  * **parsingOptions** (<code>[ParsingOptions](#cloudcomponents-cdk-responsive-email-template-parsingoptions)</code>)  *No description* __*Optional*__
  * **textPart** (<code>[TemplatePart](#cloudcomponents-cdk-responsive-email-template-templatepart)</code>)  *No description* __*Optional*__




## class TemplatePart  <a id="cloudcomponents-cdk-responsive-email-template-templatepart"></a>




### Initializer




```ts
new TemplatePart()
```




### Properties


Name | Type | Description 
-----|------|-------------
**source** | <code>string</code> | <span></span>
**defaultFilePath**? | <code>string</code> | __*Optional*__

### Methods


#### *static* fromFile(filePath) <a id="cloudcomponents-cdk-responsive-email-template-templatepart-fromfile"></a>



```ts
static fromFile(filePath: string): TemplatePart
```

* **filePath** (<code>string</code>)  *No description*

__Returns__:
* <code>[TemplatePart](#cloudcomponents-cdk-responsive-email-template-templatepart)</code>

#### *static* fromInline(source) <a id="cloudcomponents-cdk-responsive-email-template-templatepart-frominline"></a>



```ts
static fromInline(source: string): TemplatePart
```

* **source** (<code>string</code>)  *No description*

__Returns__:
* <code>[TemplatePart](#cloudcomponents-cdk-responsive-email-template-templatepart)</code>



## struct ParsingOptions  <a id="cloudcomponents-cdk-responsive-email-template-parsingoptions"></a>






Name | Type | Description 
-----|------|-------------
**beautify**? | <code>boolean</code> | Option to beautify the HTML output.<br/>__*Default*__: : false
**filePath**? | <code>string</code> | Full path of the specified file to use when resolving paths from mj-include components.<br/>__*Default*__: : templateDir or '.'
**fonts**? | <code>Map<string, string></code> | Default fonts imported in the HTML rendered by HTML ie.<br/>__*Default*__: :
**keepComments**? | <code>boolean</code> | Option to keep comments in the HTML output.<br/>__*Default*__: : true
**minify**? | <code>boolean</code> | Option to minify the HTML output.<br/>__*Default*__: : false
**validationLevel**? | <code>string</code> | How to validate your MJML.<br/>__*Default*__: : soft



## struct ResponsiveEmailTemplateProps  <a id="cloudcomponents-cdk-responsive-email-template-responsiveemailtemplateprops"></a>






Name | Type | Description 
-----|------|-------------
**htmlPart** | <code>[TemplatePart](#cloudcomponents-cdk-responsive-email-template-templatepart)</code> | <span></span>
**subjectPart** | <code>string</code> | <span></span>
**templateName** | <code>string</code> | <span></span>
**parsingOptions**? | <code>[ParsingOptions](#cloudcomponents-cdk-responsive-email-template-parsingoptions)</code> | __*Optional*__
**textPart**? | <code>[TemplatePart](#cloudcomponents-cdk-responsive-email-template-templatepart)</code> | __*Optional*__



