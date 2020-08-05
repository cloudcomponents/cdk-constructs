import * as crypto from 'crypto';
import { ARecord, AaaaRecord, HostedZone, IAliasRecordTarget, RecordTarget } from '@aws-cdk/aws-route53';
import { Construct } from '@aws-cdk/core';

export interface WebsiteAliasRecordProps {
  /** The domain name for the site like 'example.com' */
  readonly domainName: string;

  /** Names for the records. */
  readonly recordNames: string[];

  /** Target for the alias record */
  readonly target: IAliasRecordTarget;

  /** We support IPv6 and add an AAAA record by default, but you can turn it off */
  readonly disableIPv6?: boolean;
}

export class WebsiteAliasRecord extends Construct {
  constructor(scope: Construct, id: string, props: WebsiteAliasRecordProps) {
    super(scope, id);

    const { domainName, recordNames, target } = props;

    const zone = HostedZone.fromLookup(this, 'Zone', {
      domainName,
    });

    recordNames.forEach((recordName): void => {
      const hash = crypto.createHash('md5').update(recordName).digest('hex').substr(0, 6);

      new ARecord(this, `WebsiteAliasRecord${hash}`, {
        zone,
        recordName: `${recordName}.`,
        target: RecordTarget.fromAlias(target),
      });

      if (!props.disableIPv6) {
        new AaaaRecord(this, `WebsiteIPv6AliasRecord${hash}`, {
          zone,
          recordName: `${recordName}.`,
          target: RecordTarget.fromAlias(target),
        });
      }
    });
  }
}
