import { WebClient } from '@slack/client';

export class SlackBot {
  private bot;
  private channel;
  private name: string;
  private icon: string;

  constructor({ token, channel, name, icon }) {
    this.bot = new WebClient(token);
    this.channel = channel;
    this.name = name;
    this.icon = icon;
  }

  public async postMessage(message) {
    const channel = await this.findChannel(this.channel);

    return this.bot.chat.postMessage({
      channel: channel.id,
      icon_emoji: this.icon,
      username: this.name,
      ...message
    });
  }

  public async updateMessage(ts, message) {
    const channel = await this.findChannel(this.channel);

    return this.bot.chat.update({
      channel: channel.id,
      icon_emoji: this.icon,
      username: this.name,
      ts,
      ...message
    });
  }

  public async findChannel(name) {
    const response = await this.bot.conversations.list();
    return response.channels.find(channel => {
      return channel.name === name;
    });
  }

  public async openDialog(triggerId, dialog) {
    return this.bot.dialog.open({ trigger_id: triggerId, dialog });
  }
}
