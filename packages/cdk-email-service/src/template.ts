import { Construct } from '@aws-cdk/core';
import { CfnTemplate } from '@aws-cdk/aws-ses';
// import {
//     AwsCustomResource,
//     AwsCustomResourcePolicy,
// } from '@aws-cdk/custom-resources';

export interface TemplateProps {
    /**
     * The name of the template. You specify this name when you send email using
     * the SendTemplatedEmail or SendBulkTemplatedEmail operations
     */
    readonly templateName: string;

    /**
     * The subject line of the email
     */
    readonly subjectPart: string;

    /**
     * The HTML body of the email
     */
    readonly htmlPart: string;

    /**
     * The email body that is visible to recipients whose email clients don't
     * display HTML content.
     */
    readonly textPart: string;
}

export class Template extends Construct {
    constructor(scope: Construct, id: string, props: TemplateProps) {
        super(scope, id);

        const { templateName, htmlPart, textPart, subjectPart } = props;

        new CfnTemplate(this, 'Template', {
            template: {
                templateName,
                htmlPart,
                textPart,
                subjectPart,
            },
        });

        // new AwsCustomResource(this, 'Template', {
        //     onCreate: {
        //         service: 'SES',
        //         action: 'createTemplate',
        //         parameters: {
        //             Template: {
        //                 TemplateName: templateName,
        //                 HtmlPart: htmlPart,
        //                 TextPart: textPart,
        //                 subjectPart: subjectPart,
        //             },
        //         },
        //     },
        //     onUpdate: {
        //         service: 'SES',
        //         action: 'updateTemplate',
        //         parameters: {
        //             Template: {
        //                 TemplateName: templateName,
        //                 HtmlPart: htmlPart,
        //                 TextPart: textPart,
        //                 subjectPart: subjectPart,
        //             },
        //         },
        //     },
        //     onDelete: {
        //         service: 'SES',
        //         action: 'deleteTemplate',
        //         parameters: {
        //             TemplateName: templateName,
        //         },
        //     },
        //     policy: AwsCustomResourcePolicy.fromSdkCalls({
        //         resources: AwsCustomResourcePolicy.ANY_RESOURCE,
        //     }),
        // });
    }
}
