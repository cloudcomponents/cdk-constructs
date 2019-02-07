import { App, Stack, StackProps } from '@aws-cdk/cdk';
import { Code, Runtime } from '@aws-cdk/aws-lambda';
import { EdgeDeploy } from '@cloudcomponents/cdk-edge-deploy';

export class EdgeDeployStack extends Stack {
  constructor(parent: App, name: string, props?: StackProps) {
    super(parent, name, props);

    new EdgeDeploy(this, 'EdgeDeploy', {
      code: Code.inline(`
          const path = require('path');
          exports.handler = async (event) => {
            const request = event.Records[0].cf.request;
            // Rewrite clean URLs (adding index.html)
            if (!path.extname(request.uri)) {
              request.uri = request.uri.replace(/\/?$/, '\/index.html');
            }
            return request;
          };
      `),
      runtime: Runtime.NodeJS810,
      handler: 'handler',
      logLevel: 'debug'
    });
  }
}
