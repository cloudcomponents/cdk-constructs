import * as path from 'path';
import { Construct } from '@aws-cdk/core';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { ITopic } from '@aws-cdk/aws-sns';
import { SnsEventSource } from '@aws-cdk/aws-lambda-event-sources';
import { PolicyStatement, Effect } from '@aws-cdk/aws-iam';

export interface MSTeamsIncomingWebhookConfigurationProps {
  /**
   * The url of the incoming webhook for a channel
   */
  readonly url: string;

  /**
   * The SNS topics that deliver notifications to MS Teams.
   */
  readonly notificationTopics?: ITopic[];
}

export class MSTeamsIncomingWebhookConfiguration extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: MSTeamsIncomingWebhookConfigurationProps,
  ) {
    super(scope, id);

    const incomingWebhook = new Function(this, 'SevierityFilter', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(
        path.join(__dirname, 'lambdas', 'msteams-incoming-webhook'),
      ),
      handler: 'index.handler',
      environment: {
        URL: props.url,
      },
    });

    incomingWebhook.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['iam:ListAccountAliases'],
        resources: ['*'],
      }),
    );

    props.notificationTopics?.forEach((topic) => {
      incomingWebhook.addEventSource(new SnsEventSource(topic));
    });
  }
}
