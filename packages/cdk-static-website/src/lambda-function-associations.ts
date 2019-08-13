import {
    CfnDistribution,
    CloudFrontWebDistribution,
} from '@aws-cdk/aws-cloudfront';
import { Construct } from '@aws-cdk/core';

export interface Association {
    /**
     * The ARN of the Lambda function
     */
    readonly functionArn: string;

    /**
     * The version of the Lambda function
     */
    readonly functionVersion: string;

    /**
     * Specifies the event type that triggers a Lambda function invocation
     */
    readonly eventType:
        | 'viewer-request'
        | 'origin-request'
        | 'origin-response'
        | 'viewer-response';
}

export interface LambdaFunctionAssociationsProps {
    /**
     * The CloudFront distribution
     */
    readonly distribution: CloudFrontWebDistribution;

    /**
     * The Lambda function associations
     */
    readonly assosiations: Association[];
}

export class LambdaFunctionAssociations extends Construct {
    constructor(
        scope: Construct,
        id: string,
        props: LambdaFunctionAssociationsProps,
    ) {
        super(scope, id);

        const cfDist = props.distribution.node.findChild(
            'CFDistribution',
        ) as CfnDistribution;

        const assosiations = props.assosiations.map(
            (assosiation: Association) => ({
                EventType: assosiation.eventType,
                LambdaFunctionARN: `${assosiation.functionArn}:${assosiation.functionVersion}`,
            }),
        );

        cfDist.addOverride(
            'Properties.DistributionConfig.DefaultCacheBehavior.LambdaFunctionAssociations',
            assosiations,
        );
    }
}
