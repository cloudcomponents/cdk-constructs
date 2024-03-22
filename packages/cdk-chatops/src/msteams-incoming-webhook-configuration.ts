import * as path from 'path';
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import { Code, Function, IFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { SnsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { ITopic } from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';

export interface MSTeamsIncomingWebhookConfigurationProps {
  /**
   * The url of the incoming webhook for a channel
   */
  readonly url: string;

  /**
   * Specifies a custom brand color for the card. The color will be displayed in a non-obtrusive manner.
   *
   * @default `#CEDB56`
   */
  readonly themeColor?: string;

  /**
   * @default ACCOUNT_LABEL_MODE.ID_AND_ALIAS
   */
  readonly accountLabelMode?: AccountLabelMode;

  /**
   * The SNS topics that deliver notifications to MS Teams.
   */
  readonly notificationTopics?: ITopic[];
}

export class MSTeamsIncomingWebhookConfiguration extends Construct {
  public readonly incomingWebhook: IFunction;

  constructor(scope: Construct, id: string, props: MSTeamsIncomingWebhookConfigurationProps) {
    super(scope, id);

    this.incomingWebhook = new Function(this, 'Function', {
      runtime: Runtime.NODEJS_16_X,
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'msteams-incoming-webhook')),
      handler: 'index.handler',
      environment: {
        URL: props.url,
        THEME_COLOR: props.themeColor || '#CEDB56',
        ACCOUNT_LABEL_MODE: props.accountLabelMode || AccountLabelMode.ID_AND_ALIAS,
      },
    });

    this.incomingWebhook.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['iam:ListAccountAliases'],
        resources: ['*'],
      }),
    );

    props.notificationTopics?.forEach((topic) => {
      this.incomingWebhook.addEventSource(new SnsEventSource(topic));
    });
  }

  public addEventSource(snsEventSource: SnsEventSource): void {
    this.incomingWebhook.addEventSource(snsEventSource);
  }
}

export enum AccountLabelMode {
  ID = 'ID',
  ALIAS = 'ALIAS',
  ID_AND_ALIAS = 'ID_AND_ALIAS',
}
