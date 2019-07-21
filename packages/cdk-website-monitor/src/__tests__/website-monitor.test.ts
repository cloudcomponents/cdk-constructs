import { Stack } from '@aws-cdk/core';
import '@cloudcomponents/jest-cdk-snapshot';
import { WebsiteMonitor } from '../website-monitor';

describe('cdk-website-monitor: website-monitor', (): void => {
    it('snapshot', (): void => {
        const stack = new Stack();

        const websiteMonitor = new WebsiteMonitor(stack, 'WebsiteMonitor');

        websiteMonitor.watchService({
            serviceName: 'cloudcomponents',
            url: 'https://www.cloudcomponents.org',
            expression: 'rate(2 minutes)',
        });

        expect(stack).toMatchCdkSnapshot();
    });
});
