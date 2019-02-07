import {
  CloudFrontWebDistribution,
  CfnDistribution
} from '@aws-cdk/aws-cloudfront';
import { Construct } from '@aws-cdk/cdk';

export interface Association {
  functionArn: string;
  functionVersion: string;
  eventType:
    | 'viewer-request'
    | 'origin-request'
    | 'origin-response'
    | 'viewer-response';
}

export interface LambdaFunctionAssociationsProps {
  distribution: CloudFrontWebDistribution;
  assosiations: Association[];
}

export class LambdaFunctionAssociations extends Construct {
  constructor(
    parent: Construct,
    name: string,
    props: LambdaFunctionAssociationsProps
  ) {
    super(parent, name);

    const cfDist = props.distribution.node.findChild(
      'CFDistribution'
    ) as CfnDistribution;

    const assosiation = props.assosiations.map(assosiation => ({
      EventType: assosiation.eventType,
      LambdaFunctionARN: `${assosiation.functionArn}:${
        assosiation.functionVersion
      }`
    }));

    cfDist.addOverride(
      'Properties.DistributionConfig.DefaultCacheBehavior.LambdaFunctionAssociations',
      assosiation
    );
  }
}
