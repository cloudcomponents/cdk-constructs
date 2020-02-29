import * as crypto from 'crypto';
import {
    ARecord,
    HostedZone,
    IAliasRecordTarget,
    RecordTarget,
} from '@aws-cdk/aws-route53';
import { Construct } from '@aws-cdk/core';

export interface WebsiteAliasRecordProps {
    /** The domain name for the site like 'example.com' */
    readonly domainName: string;

    /** Names for the records. */
    readonly recordNames: string[];

    /** Target for the alias record */
    readonly target: IAliasRecordTarget;
}

export class WebsiteAliasRecord extends Construct {
    constructor(scope: Construct, id: string, props: WebsiteAliasRecordProps) {
        super(scope, id);

        const { domainName, recordNames, target } = props;

        const zone = HostedZone.fromLookup(this, 'Zone', {
            domainName,
        });

        recordNames.forEach((recordName): void => {
            const hash = crypto
                .createHash('md5')
                .update(recordName)
                .digest('hex')
                .substr(0, 6);

            new ARecord(this, `WebsiteAliasRecord${hash}`, {
                zone,
                recordName: `${recordName}.`,
                target: RecordTarget.fromAlias(target),
            });
        });
    }
}
