import { WebClient, WebAPICallResult } from '@slack/web-api';

export interface SlackBotProps {
    token: string;
    channelName: string;
    name?: string;
    icon?: string;
}

type Channel = { id: string; name: string };

type Message = Record<string, any>;

export class SlackBot {
    private bot: WebClient;

    private channelName: string;

    private name: string;

    private icon: string;

    public constructor({
        token,
        channelName,
        name = 'buildbot',
        icon = ':robot_face:',
    }: SlackBotProps) {
        this.bot = new WebClient(token);
        this.channelName = channelName;
        this.name = name;
        this.icon = icon;
    }

    public async postMessage(message): Promise<WebAPICallResult> {
        const channel = await this.findChannel(this.channelName);

        if (!channel) {
            throw Error(`Channel ${this.channelName} undefined!`);
        }

        return this.bot.chat.postMessage({
            channel: channel.id,
            icon_emoji: this.icon,
            username: this.name,
            ...message,
        });
    }

    public async updateMessage(ts, message): Promise<WebAPICallResult> {
        const channel = await this.findChannel(this.channelName);

        if (!channel) {
            throw Error(`Channel ${this.channelName} undefined!`);
        }

        return this.bot.chat.update({
            channel: channel.id,
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
        return response.channels.find(channel => channel.name === channelName);
    }

    public async findMessages(
        channelId: string,
    ): Promise<Message[] | undefined> {
        const response = (await this.bot.channels.history({
            channel: channelId,
            // oldest: Date.now() - 7 Days
        })) as Record<string, Message[]>;

        return response.messages;
    }

    public async openDialog(triggerId, dialog): Promise<WebAPICallResult> {
        return this.bot.dialog.open({ trigger_id: triggerId, dialog });
    }
}
