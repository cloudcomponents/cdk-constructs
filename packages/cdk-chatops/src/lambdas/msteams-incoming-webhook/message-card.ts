import { Action } from './actions';
// https://github.com/OfficeDev/outlook-dev-docs/blob/master/docs/actionable-messages/message-card-reference.md
// https://docs.microsoft.com/de-de/outlook/actionable-messages/message-card-reference

export interface Fact {
  name: string;
  value: string;
}

export interface Image {
  image: string;
  title: string;
}

export interface Section {
  title?: string;
  startGroup?: boolean;
  heroImage?: Image;
  text?: string;
  facts?: Fact[];
  images?: Image[];
  potentialAction?: Action[];
}

export interface Payload {
  '@type': 'MessageCard';
  '@context': 'http://schema.org/extensions';
  correlationId?: string;
  themeColor?: string;
  title: string;
  text: string;
  sections?: Section[];
  potentialAction?: Action[];
}

export interface MessageCardProps {
  title: string;
  text: string;
  themeColor?: string;
}

export class MessageCard {
  public readonly payload: Payload;

  constructor(props: MessageCardProps) {
    this.payload = {
      '@type': 'MessageCard',
      '@context': 'http://schema.org/extensions',
      title: props.title,
      text: props.text,
    };

    if (props.themeColor) {
      this.setThemeColor(props.themeColor);
    }
  }

  public setThemeColor(themeColor: string): void {
    this.payload.themeColor = themeColor;
  }

  public addSection(section: Section): void {
    if (this.payload.sections) {
      this.payload.sections.push(section);
      return;
    }
    this.payload.sections = [section];
  }

  public addPotentialAction(action: Action): void {
    if (this.payload.potentialAction) {
      this.payload.potentialAction.push(action);
      return;
    }
    this.payload.potentialAction = [action];
  }
}
