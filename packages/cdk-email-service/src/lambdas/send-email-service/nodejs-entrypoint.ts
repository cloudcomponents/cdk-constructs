import { SNSEvent, SQSEvent } from 'aws-lambda';
import { SES } from 'aws-sdk';

export interface SendTemplatedEmailEvent {
    messages: string[];
}

export interface SendTemplatedEmailEventBody {
    toAddresses: SES.AddressList;
    templateData: SES.TemplateData;
    template: SES.TemplateName;
}

export type Converter = (
    event: SNSEvent | SQSEvent,
) => Promise<SendTemplatedEmailEvent>;

const ses = new SES();

export const handler = async (event: SNSEvent | SQSEvent): Promise<void> => {
    const source = process.env.SOURCE as string;

    const converter: Converter = require('./index').handler;

    const convertedEvent = await converter(event);

    const { messages } = convertedEvent;

    await Promise.all(
        messages.map(async (message) => {
            const { template, toAddresses, templateData } = JSON.parse(
                message,
            ) as SendTemplatedEmailEventBody;

            return ses
                .sendTemplatedEmail({
                    Source: source,
                    Template: template,
                    Destination: {
                        ToAddresses: toAddresses,
                    },
                    TemplateData: templateData,
                })
                .promise();
        }),
    );
};
