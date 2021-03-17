[![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)](https://github.com/cloudcomponents/cdk-constructs)

# @cloudcomponents/cdk-responsive-email-template 

[![Build Status](https://github.com/cloudcomponents/cdk-constructs/workflows/Build/badge.svg)](https://github.com/cloudcomponents/cdk-constructs/actions?query=workflow=Build)
[![cdkdx](https://img.shields.io/badge/buildtool-cdkdx-blue.svg)](https://github.com/hupe1980/cdkdx)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-responsive-email-template)
[![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)](https://pypi.org/project/cloudcomponents.cdk-responsive-email-template/)

> Responsive [mjml](https://documentation.mjml.io/) email template for aws ses

## Install
TypeScript/JavaScript:

```bash
npm i @cloudcomponents/cdk-responsive-email-template
```

Python:

```bash
pip install cloudcomponents.cdk-responsive-email-template
```

## How to use

```typescript
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { ResponsiveEmailTemplate, TemplateSource } from '@cloudcomponents/cdk-responsive-email-template';

export class ResponsiveEmailTemplateStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new ResponsiveEmailTemplate(this, 'EmailTemplate', {
      templateName: 'demo',
      subjectPart: 'cloudcomponents - {{ title }}',
      textPart: TemplateSource.fromInline('text message'),
      htmlPart: TemplateSource.fromInline(`<mjml>
    <mj-head>
      <mj-title>cloudcomponents - {{ title }}</mj-title>
    </mj-head>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-text>
            Hello {{ name }}!
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>`),
      parsingOptions: {
        beautify: true,
      },
    });
  }
}
```

## API Reference

See [API.md](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-responsive-email-template/API.md).

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-responsive-email-template/LICENSE)
