// https://github.com/OfficeDev/outlook-dev-docs/blob/master/docs/actionable-messages/message-card-reference.md

export interface Fact {
  name: string;
  value: string;
}
export interface Section {
  title: string;
  facts: Fact[];
}

export interface Payload {
  '@type': 'MessageCard';
  '@context': 'http://schema.org/extensions';
  title: string;
  text: string;
  themeColor?: string;
  sections?: Section[];
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

  public setThemeColor(color: string): void {
    this.payload.themeColor = color;
  }

  public addSection(section: Section): void {
    if (this.payload.sections) {
      this.payload.sections.push(section);
      return;
    }
    this.payload.sections = [section];
  }
}
