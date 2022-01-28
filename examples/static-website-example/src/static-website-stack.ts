import { StaticWebsite } from '@cloudcomponents/cdk-static-website';
import { RemovalPolicy, Stack, StackProps, aws_certificatemanager, aws_route53, aws_ssm } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class StaticWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const hostedZone = aws_route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: 'cloudcomponents.org',
    });

    const certificateArn = aws_ssm.StringParameter.valueFromLookup(this, '/certificate/cloudcomponents.org');

    const certificate = aws_certificatemanager.Certificate.fromCertificateArn(this, 'Certificate', certificateArn);

    new StaticWebsite(this, 'StaticWebsite', {
      hostedZone,
      certificate,
      domainNames: ['www.cloudcomponents.org', 'cloudcomponents.org'],
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}
