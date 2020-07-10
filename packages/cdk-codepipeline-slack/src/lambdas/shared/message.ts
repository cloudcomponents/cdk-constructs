import { MessageAttachment } from '@slack/web-api';

export interface Message {
  ts?: string;
  text: string;
  attachments: MessageAttachment[];
}
