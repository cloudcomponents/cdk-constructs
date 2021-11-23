import { CfnTemplate } from '@aws-cdk/aws-ses';
import { Construct } from '@aws-cdk/core';
import { minify as htmlMinify } from 'html-minifier';
import { html as htmlBeautify } from 'js-beautify';
import * as mjml2html from 'mjml';

import { TemplatePart } from './template-part';

export interface ParsingOptions {
  /**
   * Default fonts imported in the HTML rendered by HTML
   * ie. { 'Open Sans': 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700' }
   *
   * @default: @see https://github.com/mjmlio/mjml/blob/master/packages/mjml-core/src/index.js
   */
  readonly fonts?: Record<string, string>;

  /**
   * Option to keep comments in the HTML output
   *
   * @default: true
   */
  readonly keepComments?: boolean;

  /**
   * Option to beautify the HTML output
   *
   * @default: false
   */
  readonly beautify?: boolean;

  /**
   * Option to minify the HTML output
   *
   * @default: false
   */
  readonly minify?: boolean;

  /**
   * How to validate your MJML
   *
   * skip: your document is rendered without going through validation
   * soft: your document is going through validation and is rendered, even if it has errors
   * strict: your document is going through validation and is not rendered if it has any error
   *
   * @default: soft
   */
  readonly validationLevel?: 'strict' | 'soft' | 'skip';

  /**
   * Full path of the specified file to use when resolving paths from mj-include components
   * @default: templateDir or '.'
   */
  readonly filePath?: string;

  /**
   * The path or directory of the .mjmlconfig file
   * default: process.cwd()
   */
  readonly mjmlConfigPath?: string;
}

export interface ResponsiveEmailTemplateProps {
  readonly templateName: string;
  readonly subjectPart: string;
  readonly textPart?: TemplatePart;
  readonly htmlPart: TemplatePart;
  readonly parsingOptions?: ParsingOptions;
}

export class ResponsiveEmailTemplate extends Construct {
  constructor(scope: Construct, id: string, props: ResponsiveEmailTemplateProps) {
    super(scope, id);

    const parsingOptions: ParsingOptions = {
      minify: false,
      beautify: false,
      keepComments: true,
      validationLevel: 'soft',
      mjmlConfigPath: process.cwd(),
      filePath: props.htmlPart.defaultFilePath,
      ...props.parsingOptions,
    };

    new CfnTemplate(this, 'Template', {
      template: {
        templateName: props.templateName,
        htmlPart: this.parseTemplate(props.htmlPart.source, parsingOptions),
        subjectPart: props.subjectPart,
        textPart: props.textPart?.source,
      },
    });
  }

  private parseTemplate(source: string, options: ParsingOptions): string {
    const { minify, beautify, ...mjmlOptions } = options;
    const result = mjml2html(source, mjmlOptions);
    if (result.errors?.length > 0) {
      throw new Error(`Bad responsive email template: ${result.errors}`);
    }

    let { html } = result;

    if (beautify) {
      html = htmlBeautify(html as string, {
        indent_size: 2,
        wrap_attributes_indent_size: 2,
        max_preserve_newlines: 0,
        preserve_newlines: false,
      });
    }

    if (minify) {
      html = htmlMinify(html as string, {
        collapseWhitespace: true,
        minifyCSS: false,
        caseSensitive: true,
        removeEmptyAttributes: true,
      });
    }

    return html;
  }
}
