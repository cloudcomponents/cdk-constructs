import { CloudWatch } from 'aws-sdk';
import axios from 'axios';

const cloudWatch = new CloudWatch();

const timeInMs = (): number => Date.now();

const url = 'https://www.cloudcomponents.org';
const serviceName = 'cloudcomponents';

export const handler = async (): Promise<void> => {
    let endTime;
    let requestWasSuccessful;

    const startTime = timeInMs();
    try {
        await axios.get(url);
        requestWasSuccessful = true;
    } catch (error) {
        requestWasSuccessful = false;
    } finally {
        endTime = timeInMs();
    }

    const totalTime = endTime - startTime;

    await cloudWatch
        .putMetricData({
            MetricData: [
                {
                    MetricName: 'Success',
                    Dimensions: [
                        {
                            Name: 'ServiceName',
                            Value: serviceName,
                        },
                    ],
                    Unit: 'Count',
                    Value: requestWasSuccessful ? 1 : 0,
                },
            ],
            Namespace: 'CloudComponents/WebsiteMonitor',
        })
        .promise();

    await cloudWatch
        .putMetricData({
            MetricData: [
                {
                    MetricName: 'Latency',
                    Dimensions: [
                        {
                            Name: 'ServiceName',
                            Value: serviceName,
                        },
                    ],
                    Unit: 'Count',
                    Value: totalTime,
                },
            ],
            Namespace: 'CloudComponents/WebsiteMonitor',
        })
        .promise();
};
