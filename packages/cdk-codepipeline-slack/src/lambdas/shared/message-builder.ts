import { AttachmentAction, MessageAttachment } from '@slack/web-api';
import { Message } from './message';

export type Field = { title: string; value: string; short?: boolean };

// export interface MessageBuilderProps {
//   actions: AttachmentAction[];
//   fields: Field[];
//   footer: string;
//   ts?: string;
// }

export abstract class MessageBuilder {
  protected actions?: AttachmentAction[];

  protected ts?: string;

  protected fields?: Field[];

  protected footer?: string;

  constructor(props: MessageAttachment) {
    this.actions = props.actions;
    this.fields = props.fields;
    this.footer = props.footer;
    this.ts = props.ts;
  }

  public abstract get message(): Message;
}
