import {
  AliasRecord,
  HostedZoneProvider,
  IAliasRecordTarget
} from '@aws-cdk/aws-route53';
import { Construct } from '@aws-cdk/cdk';

export interface WebsiteAliasRecordProps {
  /** The domain name for the site like 'cloudcomponents.org' */
  domainName: string;

  /** Names for the records. */
  recordNames: string[];

  /** Target for the alias record */
  target: IAliasRecordTarget;
}

export class WebsiteAliasRecord extends Construct {
  constructor(parent: Construct, name: string, props: WebsiteAliasRecordProps) {
    super(parent, name);

    const { domainName, recordNames, target } = props;

    const zone = new HostedZoneProvider(this, {
      domainName
    }).findAndImport(this, 'Zone');

    recordNames.forEach((recordName, idx) => {
      new AliasRecord(this, `WebsiteAliasRecord${idx}`, {
        zone,
        recordName: `${recordName}.`,
        target
      });
    });
  }
}
