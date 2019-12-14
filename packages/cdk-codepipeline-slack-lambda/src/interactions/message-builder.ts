export type Field = { title: string; value: string; short: boolean };

export type Message = Record<string, any>;

export interface MessageBuilderProps {
    actions: Record<string, string>[];
    fields: Field[];
    footer: string;
    ts?: string;
}
export abstract class MessageBuilder {
    protected actions: Record<string, string>[];

    protected ts?: string;

    protected fields: Field[];

    protected footer: string;

    constructor(props: MessageBuilderProps) {
        this.actions = props.actions;
        this.fields = props.fields;
        this.footer = props.footer;
        this.ts = props.ts;
    }

    public abstract get message(): Message;
}
