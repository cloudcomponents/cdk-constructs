import {
  CloudFrontWebDistribution,
  CfnDistribution
} from '@aws-cdk/aws-cloudfront';
import { Construct } from '@aws-cdk/cdk';
import {
  AwsManagedPolicy,
  Role,
  CompositePrincipal,
  ServicePrincipal
} from '@aws-cdk/aws-iam';
import { Function, Runtime, Code, Version } from '@aws-cdk/aws-lambda';

export interface EdgeLambdaProps {
  distribution: CloudFrontWebDistribution;
}

export class EdgeLambda extends Construct {
  public readonly fn: Function;
  public readonly version: Version;

  constructor(parent: Construct, name: string, props: EdgeLambdaProps) {
    super(parent, name);

    const { distribution } = props;

    const role = new Role(this, 'ServiceRole', {
      assumedBy: new CompositePrincipal(
        new ServicePrincipal('lambda.amazonaws.com'),
        new ServicePrincipal('edgelambda.amazonaws.com')
      ),
      managedPolicyArns: [
        new AwsManagedPolicy('service-role/AWSLambdaBasicExecutionRole', this)
          .policyArn
      ]
    });

    this.fn = new Function(this, 'RewriteFunction', {
      runtime: Runtime.NodeJS810,
      handler: 'index.handler',
      role,
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
      `)
    });

    this.version = this.fn.addVersion('RewriteFunction');

    const cfDist = distribution.node.findChild(
      'CFDistribution'
    ) as CfnDistribution;

    cfDist.addOverride(
      'Properties.DistributionConfig.DefaultCacheBehavior.LambdaFunctionAssociations',
      [
        {
          EventType: 'origin-request',
          LambdaFunctionARN: `${this.fn.functionArn}:${
            this.version.functionVersion
          }`
        }
      ]
    );
  }
}
