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
