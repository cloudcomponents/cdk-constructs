import { CloudFrontWebDistribution, OriginAccessIdentity } from '@aws-cdk/aws-cloudfront';
import { UserPool } from '@aws-cdk/aws-cognito';
import { Bucket } from '@aws-cdk/aws-s3';
import { Construct, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core';
import { SpaAuthorization, SpaDistribution } from '@cloudcomponents/cdk-cloudfront-authorization';

export class CloudFrontAuthorizationStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const userPool = new UserPool(this, 'UserPool', {
      selfSignUpEnabled: false,
      userPoolName: 'cloudfront-authorization-userpool',
    });

    userPool.addDomain('Domain', {
      cognitoDomain: {
        domainPrefix: 'cloudcomponents',
      },
    });

    const authorization = new SpaAuthorization(this, 'Authorization', {
      userPool,
    });

    new SpaDistribution(this, 'Distribution', {
      authorization,
    });
  }
}

export class CloudFrontAuthorizationStack2 extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const userPool = new UserPool(this, 'UserPool', {
      selfSignUpEnabled: false,
      userPoolName: 'cloudfront-authorization-userpool',
    });

    userPool.addDomain('Domain', {
      cognitoDomain: {
        domainPrefix: 'cloudcomponents',
      },
    });

    const authorization = new SpaAuthorization(this, 'Authorization', {
      userPool,
    });

    const bucket = new Bucket(this, 'Bucket', {
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity', {
      comment: `CloudFront OriginAccessIdentity for ${bucket.bucketName}`,
    });

    new CloudFrontWebDistribution(this, 'Distribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
            originAccessIdentity,
          },
          behaviors: [authorization.createLegacyDefaultBehavior(), ...authorization.createLegacyAdditionalBehaviors()],
        },
      ],
    });
  }
}
