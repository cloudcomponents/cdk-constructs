import * as path from 'path';
import { Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { ResponsiveEmailTemplate } from '../responsive-email-template';
import { TemplateSource } from '../template-source';

test('default setup', (): void => {
  const stack = new Stack();

  new ResponsiveEmailTemplate(stack, 'ResponsiveEmailTemplate', {
    templateName: 'testTemplate',
    subjectPart: 'Subject',
    textPart: TemplateSource.fromInline('This ist the text part'),
    htmlPart: TemplateSource.fromInline(`<mjml>
    <mj-head>
      <mj-title>Hello cloudcomponents</mj-title>
    </mj-head>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-text>
            Hello World!
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>`),
  });

  expect(stack).toMatchCdkSnapshot();
});

test('default setup - minify', (): void => {
  const stack = new Stack();

  new ResponsiveEmailTemplate(stack, 'ResponsiveEmailTemplate', {
    parsingOptions: {
      minify: true,
    },
    templateName: 'testTemplate',
    subjectPart: 'Subject',
    textPart: TemplateSource.fromInline('This ist the text part'),
    htmlPart: TemplateSource.fromInline(`<mjml>
    <mj-head>
      <mj-title>Hello cloudcomponents</mj-title>
    </mj-head>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-text>
            Hello World!
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>`),
  });

  expect(stack).toMatchCdkSnapshot();
});

test('default setup - beautify', (): void => {
  const stack = new Stack();

  new ResponsiveEmailTemplate(stack, 'ResponsiveEmailTemplate', {
    parsingOptions: {
      beautify: true,
    },
    templateName: 'testTemplate',
    subjectPart: 'Subject',
    textPart: TemplateSource.fromInline('This ist the text part'),
    htmlPart: TemplateSource.fromInline(`<mjml>
    <mj-head>
      <mj-title>Hello cloudcomponents</mj-title>
    </mj-head>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-text>
            Hello World!
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>`),
  });

  expect(stack).toMatchCdkSnapshot();
});

test('template file', (): void => {
  const stack = new Stack();

  new ResponsiveEmailTemplate(stack, 'ResponsiveEmailTemplate', {
    parsingOptions: {
      beautify: true,
    },
    templateName: 'testTemplate',
    subjectPart: 'Subject',
    textPart: TemplateSource.fromInline('This ist the text part'),
    htmlPart: TemplateSource.fromFile(path.join(__dirname, 'fixtures', 'template', 'template.mjml')),
  });

  expect(stack).toMatchCdkSnapshot();
});
