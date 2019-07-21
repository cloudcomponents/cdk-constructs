import { Metric, Unit } from '@aws-cdk/aws-cloudwatch';

export class SuccessMetric extends Metric {
    public constructor(serviceName: string) {
        super({
            metricName: 'Success',
            dimensions: { ServiceName: serviceName },
            namespace: 'CloudComponents/WebsiteMonitor',
            unit: Unit.COUNT,
        });
    }
}
