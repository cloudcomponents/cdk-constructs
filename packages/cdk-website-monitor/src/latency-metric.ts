import { Metric, Unit } from '@aws-cdk/aws-cloudwatch';

export class LatencyMetric extends Metric {
    public constructor(serviceName: string) {
        super({
            metricName: 'Latency',
            dimensions: { ServiceName: serviceName },
            namespace: 'CloudComponents/WebsiteMonitor',
            unit: Unit.MILLISECONDS,
        });
    }
}
