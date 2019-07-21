#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import { WebsiteMonitorStack } from '../src/website-monitor-stack';

const app = new App();
new WebsiteMonitorStack(app, 'WebsiteMonitorStack');
