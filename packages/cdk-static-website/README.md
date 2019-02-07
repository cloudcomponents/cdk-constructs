# @cloudcomponents/cdk-static-website

> Cdk component that creates a static website using S3, configures CloudFront (CDN) and maps a custom domain via Route53 (DNS)

## Install

```bash
npm install --save @cloudcomponents/cdk-static-website
```

## How to use

```javascript
import * as path from 'path';
import { App, Stack, StackProps } from '@aws-cdk/cdk';
import { StaticWebsite } from '@cloudcomponents/cdk-static-website';

export class StaticWebsiteStack extends Stack {
  constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    new StaticWebsite(this, 'StaticWebsite', {
      siteName: 'testpage',
      aliasConfiguration: {
        domainName: 'cloudcomponents.org',
        siteSubDomain: 'test'
      },
      source: path.join(__dirname, '..', 'website', 'build')
    });
  }
}
```
