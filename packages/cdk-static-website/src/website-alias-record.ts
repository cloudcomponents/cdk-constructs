import {
    ARecord,
    RecordTarget,
    HostedZone,
    IAliasRecordTarget,
} from '@aws-cdk/aws-route53';
import { Construct } from '@aws-cdk/core';

export interface WebsiteAliasRecordProps {
    /** The domain name for the site like 'cloudcomponents.org' */
    domainName: string;

    /** Names for the records. */
    recordNames: string[];

    /** Target for the alias record */
    target: IAliasRecordTarget;
}

export class WebsiteAliasRecord extends Construct {
    public constructor(
        parent: Construct,
        name: string,
        props: WebsiteAliasRecordProps,
    ) {
        super(parent, name);

        const { domainName, recordNames, target } = props;

        const zone = HostedZone.fromLookup(this, 'Zone', {
            domainName,
        });

        recordNames.forEach((recordName, idx): void => {
            new ARecord(this, `WebsiteAliasRecord${idx}`, {
                zone,
                recordName: `${recordName}.`,
                target: RecordTarget.fromAlias(target),
            });
        });
    }
}
