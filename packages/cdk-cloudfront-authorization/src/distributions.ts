import { ICertificate } from '@aws-cdk/aws-certificatemanager';
import { IOrigin, Distribution, ErrorResponse, PriceClass, CfnDistribution } from '@aws-cdk/aws-cloudfront';
import { S3Origin } from '@aws-cdk/aws-cloudfront-origins';
import { Construct, Duration, RemovalPolicy } from '@aws-cdk/core';
import { DeletableBucket } from '@cloudcomponents/cdk-deletable-bucket';

import { IAuthorization, IStaticSiteAuthorization, ISpaAuthorization } from './authorizations';

export interface CommonDistributionProps {
  readonly origin?: IOrigin;
  readonly priceClass?: PriceClass;
  readonly certificate?: ICertificate;
  readonly removalPolicy?: RemovalPolicy;
}

export interface BaseDistributionProps extends CommonDistributionProps {
  readonly authorization: IAuthorization;
  readonly errorResponses?: ErrorResponse[];
}

export class BaseDistribution extends Construct {
  constructor(scope: Construct, id: string, props: BaseDistributionProps) {
    super(scope, id);

    const removalPolicy = props.removalPolicy ?? RemovalPolicy.DESTROY;

    const origin = props.origin ?? this.defaultOrigin(removalPolicy === RemovalPolicy.DESTROY);

    const distribution = new Distribution(this, 'Distribution', {
      priceClass: props.priceClass ?? PriceClass.PRICE_CLASS_100,
      errorResponses: props.errorResponses,
      certificate: props.certificate,
      defaultBehavior: props.authorization.createDefaultBehavior(origin),
      additionalBehaviors: props.authorization.createAdditionalBehaviors(origin),
    });

    //TODO
    (distribution.node.findChild('CFDistribution') as CfnDistribution).addOverride('Properties.DistributionConfig.DefaultRootObject', 'index.html');

    props.authorization.updateUserPoolClientCallbacks({
      callbackUrls: [`https://${distribution.distributionDomainName}${props.authorization.redirectPaths.signIn}`],
      logoutUrls: [`https://${distribution.distributionDomainName}${props.authorization.redirectPaths.signOut}`],
    });
  }

  private defaultOrigin(forceDelete: boolean): IOrigin {
    const bucket = new DeletableBucket(this, 'DeletableBucket', {
      forceDelete,
    });

    return new S3Origin(bucket);
  }
}

export interface StaticSiteDistributionProps extends CommonDistributionProps {
  readonly authorization: IStaticSiteAuthorization;
  readonly errorResponses?: ErrorResponse[];
}

export class StaticSiteDistribution extends BaseDistribution {
  constructor(scope: Construct, id: string, props: StaticSiteDistributionProps) {
    super(scope, id, props);
  }
}

export interface SpaDistributionProps extends CommonDistributionProps {
  readonly authorization: ISpaAuthorization;
  /**
   * The minimum amount of time, in seconds, that you want CloudFront
   * to cache the HTTP status code specified in ErrorCode.
   *
   * @default 300 seconds
   */
  readonly ttl?: Duration;
}

export class SpaDistribution extends BaseDistribution {
  constructor(scope: Construct, id: string, props: SpaDistributionProps) {
    super(scope, id, {
      ...props,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          ttl: props.ttl ?? Duration.seconds(300),
          responsePagePath: '/index.html',
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          ttl: props.ttl ?? Duration.seconds(300),
          responsePagePath: '/index.html',
        },
      ],
    });
  }
}
