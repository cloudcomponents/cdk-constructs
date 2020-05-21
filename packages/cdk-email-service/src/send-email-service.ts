import * as fs from 'fs';
import * as path from 'path';
import { Construct } from '@aws-cdk/core';
import { Code, Function, Runtime, IEventSource } from '@aws-cdk/aws-lambda';
import { PolicyStatement, Effect } from '@aws-cdk/aws-iam';

const ENTRYPOINT_FILENAME = '__entrypoint__';
const ENTRYPOINT_NODEJS_SOURCE = path.join(
    __dirname,
    'lambdas',
    'send-email-service',
    'nodejs-entrypoint.js',
);

export interface SendEmailServiceProps {
    /**
     * A local file system directory with the event converter code. The code will be
     * bundled into a zip asset and wired to the send email service AWS Lambda function.
     */
    readonly codeDirectory: string;

    readonly fromName: string;
    readonly fromEmail: string;
    readonly eventSources?: IEventSource[];
}

export class SendEmailService extends Construct {
    constructor(scope: Construct, id: string, props: SendEmailServiceProps) {
        super(scope, id);

        // copy the entry point to the code directory
        fs.copyFileSync(
            ENTRYPOINT_NODEJS_SOURCE,
            path.join(props.codeDirectory, `${ENTRYPOINT_FILENAME}.js`),
        );

        // verify we have an index file there
        if (!fs.existsSync(path.join(props.codeDirectory, 'index.js'))) {
            throw new Error(`Cannot find ${props.codeDirectory}/index.js`);
        }

        const sendEmailService = new Function(this, 'SendEmailService', {
            runtime: Runtime.NODEJS_12_X,
            code: Code.fromAsset(props.codeDirectory),
            handler: `${ENTRYPOINT_FILENAME}.handler`,
            environment: {
                SOURCE: `${props.fromName} <${props.fromEmail}>`,
            },
        });

        sendEmailService.addToRolePolicy(
            new PolicyStatement({
                effect: Effect.ALLOW,
                actions: ['ses:SendTemplatedEmail'],
                resources: ['*'],
            }),
        );
    }
}
