import { MessageBuilder, Field, Message } from './message-builder';

export class ApprovalMessageBuilder extends MessageBuilder {
    public removeActions(): void {
        this.actions = [];
    }

    public updateStatus(value): void {
        this.fields.forEach(field => {
            if (field.title === 'Status') {
                /* eslint-disable-next-line no-param-reassign */
                field.value = value;
            }
        });
    }

    public attachComment(comment: string): void {
        this.fields.push({
            title: 'Comment',
            value: comment,
            short: false,
        });
    }

    public get message(): Message {
        const title = 'APPROVAL NEEDED';
        const text =
            'The following Approval action is waiting for your response:';
        const callbackId = 'slack_approval';
        const message: Message = {
            attachments: [
                {
                    title,
                    text,
                    callback_id: callbackId,
                    fields: this.fields,
                    footer: this.footer,
                    actions: this.actions,
                },
            ],
        };

        if (this.ts) {
            message.ts = this.ts;
        }

        return message;
    }

    public static fromMessage(message: Message): ApprovalMessageBuilder {
        const attachment = message.attachments[0];

        return new ApprovalMessageBuilder({
            actions: attachment.actions,
            fields: attachment.fields,
            footer: attachment.footer,
            ts: message.ts,
        });
    }

    public static fromApprovalRequest(approval): ApprovalMessageBuilder {
        const actions = [
            {
                name: 'reject',
                text: 'Reject',
                type: 'button',
                style: 'danger',
                value: JSON.stringify({
                    approval,
                }),
            },
            {
                name: 'approve',
                text: 'Approve',
                type: 'button',
                style: 'primary',
                value: JSON.stringify({
                    approval,
                }),
            },
        ];

        const fields: Field[] = [];

        fields.push({
            title: 'Pipeline',
            value: approval.pipelineName,
            short: true,
        });

        fields.push({
            title: 'Stage',
            value: approval.stageName,
            short: true,
        });

        fields.push({
            title: 'Action',
            value: approval.actionName,
            short: true,
        });

        fields.push({
            title: 'Region',
            value: approval.region,
            short: true,
        });

        if (approval.customData) {
            fields.push({
                title: 'Additional information',
                value: approval.customData,
                short: false,
            });
        }

        if (approval.externalEntityLink) {
            fields.push({
                title: 'Content to review',
                value: approval.externalEntityLink,
                short: false,
            });
        }

        fields.push({
            title: 'Status',
            value: ':hourglass: Pending',
            short: false,
        });

        const footer = `This review request will expire on ${new Date(
            approval.expires,
        ).toDateString()}`;

        return new ApprovalMessageBuilder({ actions, fields, footer });
    }
}
