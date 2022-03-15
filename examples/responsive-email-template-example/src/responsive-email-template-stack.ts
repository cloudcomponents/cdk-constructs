import { ResponsiveEmailTemplate, TemplatePart } from '@cloudcomponents/cdk-responsive-email-template';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class ResponsiveEmailTemplateStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new ResponsiveEmailTemplate(this, 'EmailTemplate', {
      templateName: 'demo',
      subjectPart: 'cloudcomponents - {{ title }}',
      textPart: TemplatePart.fromInline('text message'),
      htmlPart: TemplatePart.fromInline(`<mjml>
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
