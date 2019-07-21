import * as path from 'path';
import { Construct, CfnOutput } from '@aws-cdk/core';
import {
    Dashboard,
    CfnDashboard,
    IWidget,
    GraphWidget,
    TextWidget,
} from '@aws-cdk/aws-cloudwatch';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
import { Rule, Schedule } from '@aws-cdk/aws-events';
import { LambdaFunction } from '@aws-cdk/aws-events-targets';
import { PolicyStatement } from '@aws-cdk/aws-iam';

import { SuccessMetric } from './success-metric';
import { LatencyMetric } from './latency-metric';

function linkForDashboard(dashboard: Dashboard): string {
    const cfnDashboard = dashboard.node.defaultChild as CfnDashboard;
    return `https://console.aws.amazon.com/cloudwatch/home?region=${dashboard.stack.region}#dashboards:name=${cfnDashboard.ref}`;
}

interface SectionOptions {
    readonly links?: {
        readonly title: string;
        readonly url: string;
    }[];
}

export interface WatchServiceProps {
    readonly serviceName: string;
    readonly url: string;
    readonly expression: string;
}

export class WebsiteMonitor extends Construct {
    private readonly dashboard: Dashboard;

    private readonly function: Function;

    public constructor(scope: Construct, id: string) {
        super(scope, id);

        this.dashboard = new Dashboard(this, 'Dashboard');

        this.function = new Function(this, 'Function', {
            runtime: Runtime.NODEJS_10_X,
            code: Code.asset(
                path.join(__dirname, '..', 'lambda', 'bundle.zip'),
            ),
            handler: 'lib/index.handler',
        });

        this.function.addToRolePolicy(
            new PolicyStatement({
                actions: ['cloudwatch:PutMetricData'],
                resources: ['*'],
            }),
        );

        new CfnOutput(this, 'WebsiteMonitorDashboard', {
            value: linkForDashboard(this.dashboard),
        });
    }

    private addSection(title: string, options: SectionOptions = {}): void {
        const markdown = [
            `# ${title}`,
            (options.links || [])
                .map((link): string => `[button:${link.title}](${link.url})`)
                .join(' | '),
        ];

        this.addWidgets(
            new TextWidget({
                width: 24,
                markdown: markdown.join('\n'),
            }),
        );
    }

    private addWidgets(...widgets: IWidget[]): void {
        this.dashboard.addWidgets(...widgets);
    }

    public watchService(props: WatchServiceProps): void {
        const { serviceName, url, expression } = props;

        this.addSection(serviceName, { links: [{ title: serviceName, url }] });

        const successMetric = new SuccessMetric(serviceName);
        const latencyMetric = new LatencyMetric(serviceName);

        this.addWidgets(
            new GraphWidget({
                title: `Success`,
                width: 6,
                left: [successMetric],
            }),
            new GraphWidget({
                title: `Latency`,
                width: 6,
                left: [latencyMetric],
            }),
        );

        const scheduler = new Rule(this, 'Scheduler', {
            schedule: Schedule.expression(expression),
        });

        scheduler.addTarget(new LambdaFunction(this.function));
    }
}
