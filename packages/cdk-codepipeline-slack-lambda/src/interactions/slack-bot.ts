import { WebClient, WebAPICallResult } from '@slack/web-api';

export class SlackBot {
    private bot;

    private channelName;

    private channelId;

    private name: string;

    private icon: string;

    public constructor({ token, channelName, channelId, name, icon }) {
        this.bot = new WebClient(token);
        this.channelName = channelName;
        this.channelId = channelId;
        this.name = name;
        this.icon = icon;
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

    public async setChannelId(): Promise<void> {
        if (this.channelName) {
            const response = await this.bot.conversations.list();
            this.channelId = response.channels.find(
                channel => channel.name === this.channelName,
            ).id;
        }
    }

    public async openDialog(triggerId, dialog): Promise<WebAPICallResult> {
        return this.bot.dialog.open({ trigger_id: triggerId, dialog });
    }
}
