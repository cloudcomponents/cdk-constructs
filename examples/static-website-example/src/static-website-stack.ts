import { SecurityPolicyProtocol } from '@aws-cdk/aws-cloudfront';
import { StringParameter } from '@aws-cdk/aws-ssm';
import { Construct, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core';
import { HttpHeaders } from '@cloudcomponents/cdk-lambda-at-edge-pattern';
import { StaticWebsite } from '@cloudcomponents/cdk-static-website';

export class StaticWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const httpHeaders = new HttpHeaders(this, 'HttpHeaders', {
      httpHeaders: {
        'Content-Security-Policy':
          "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none'; connect-src 'self'",
        'Strict-Transport-Security': 'max-age=31536000; includeSubdomains; preload',
        'Referrer-Policy': 'same-origin',
        'X-XSS-Protection': '1; mode=block',
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-cache',
      },
    });

    const certificateArn = StringParameter.valueFromLookup(this, '/certificate/cloudcomponents.org');

    const website = new StaticWebsite(this, 'StaticWebsite', {
      bucketConfiguration: {
        removalPolicy: RemovalPolicy.DESTROY,
      },
      aliasConfiguration: {
        domainName: 'cloudcomponents.org',
        names: ['www.cloudcomponents.org', 'cloudcomponents.org'],
        acmCertRef: certificateArn,
      },
    });

    website.addLambdaFunctionAssociation(httpHeaders);
  }
}

export class StaticWebsiteWithExistingSourcesAndSecurityPolicyStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const certificateArn = StringParameter.valueFromLookup(this, '/certificate/cloudcomponents.org');

    new StaticWebsite(this, 'StaticWebsite', {
      bucketConfiguration: {
        source: '../path/to/your/static/webpage',
        removalPolicy: RemovalPolicy.DESTROY,
      },
      aliasConfiguration: {
        domainName: 'cloudcomponents.org',
        names: ['www.cloudcomponents.org', 'cloudcomponents.org'],
        acmCertRef: certificateArn,
        securityPolicy: SecurityPolicyProtocol.TLS_V1_2_2018,
      },
    });
  }
}
