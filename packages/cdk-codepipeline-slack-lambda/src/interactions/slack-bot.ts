import { WebClient, WebAPICallResult } from '@slack/web-api';

export interface SlackBotProps {
    token: string;
    channelName: string;
    channelId?: string;
    name?: string;
    icon?: string;
}

type Channel = { id: string; name: string };

type Message = Record<string, any>;

export class SlackBot {
    private bot: WebClient;

    private channelName?: string;

    private channelId: string;

    private name: string;

    private icon: string;

    public constructor(props: SlackBotProps) {
        const { token, channelName, channelId, name, icon } = props;
        this.bot = new WebClient(token);
        if (channelName) {
            this.channelName = channelName;
        }
        if (channelId) {
            this.channelId = channelId;
        }
        this.name = name || 'Pipeline Bot';
        this.icon = icon || ':robot_face:';
        // this.messageCache = {};
    }

    public async postMessage(message): Promise<WebAPICallResult> {
        await this.setChannelId();

        return this.bot.chat.postMessage({
            channel: this.channelId,
            icon_emoji: this.icon,
            username: this.name,
            ...message,
        });
    }

    public async updateMessage(ts, message): Promise<WebAPICallResult> {
        await this.setChannelId();

        return this.bot.chat.update({
            channel: this.channelId,
            icon_emoji: this.icon,
            username: this.name,
            ts,
            ...message,
        });
    }

    public async findChannel(
        channelName: string,
    ): Promise<Channel | undefined> {
        const response = (await this.bot.conversations.list()) as Record<
            string,
            Channel[]
        >;
        return response.channels.find(
            (channel) => channel.name === channelName,
        );
    }

    protected async findMessages(
        channelId: string,
    ): Promise<Message[] | undefined> {
        const response = (await this.bot.channels.history({
            channel: channelId,
            // oldest: Date.now() - 7 Days
        })) as Record<string, Message[]>;

        return response.messages;
    }

    public async findMessageForExecutionId(
        this: SlackBot,
        executionId: string,
    ): Promise<Message | undefined> {
        this.setChannelId();
        const messages = await this.findMessages(this.channelId);

        if (!messages) {
            return undefined;
        }

        const foundMessage = messages.find((message) => {
            if (!message.attachments) {
                return false;
            }
            return message.attachments.find((attachment) => {
                return attachment.footer === executionId;
            });
        });

        return foundMessage;
    }

    public async setChannelId(): Promise<void> {
        if (this.channelName) {
            const response = await this.bot.conversations.list();
            this.channelId = (response.channels as any).find(
                (channel) => channel.name === this.channelName,
            ).id as string;
        }
    }

    public async openDialog(triggerId, dialog): Promise<WebAPICallResult> {
        return this.bot.dialog.open({ trigger_id: triggerId, dialog });
    }
}
