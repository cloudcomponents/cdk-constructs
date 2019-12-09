import { WebClient, WebAPICallResult } from '@slack/web-api';

export class SlackBot {
    private bot;

    private channel;

    private name: string;

    private icon: string;

    public constructor({ token, channel, name, icon }) {
        this.bot = new WebClient(token);
        this.channel = channel;
        this.name = name;
        this.icon = icon;
    }

    public async postMessage(message): Promise<WebAPICallResult> {
        const channel = await this.findChannel(this.channel);

        return this.bot.chat.postMessage({
            channel: channel.id,
            icon_emoji: this.icon,
            username: this.name,
            ...message,
        });
    }

    public async updateMessage(ts, message): Promise<WebAPICallResult> {
        const channel = await this.findChannel(this.channel);

        return this.bot.chat.update({
            channel: channel.id,
            icon_emoji: this.icon,
            username: this.name,
            ts,
            ...message,
        });
    }

    public async findChannel(name) {
        const response = await this.bot.conversations.list({ limit: 1000 });
        return response.channels.find(channel => channel.name === name);
    }

    public async openDialog(triggerId, dialog): Promise<WebAPICallResult> {
        return this.bot.dialog.open({ trigger_id: triggerId, dialog });
    }
}
