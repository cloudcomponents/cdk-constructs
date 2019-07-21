import {
    RuleTargetInput,
    EventField,
    IRule,
    RuleTargetConfig,
} from '@aws-cdk/aws-events';
import { CodeBuildProject } from '@aws-cdk/aws-events-targets';

export class PullRequestProjectTarget extends CodeBuildProject {
    public bind(_rule: IRule): RuleTargetConfig {
        const input = RuleTargetInput.fromObject({
            sourceVersion: EventField.fromPath('$.detail.sourceCommit'),
            artifactsOverride: { type: 'NO_ARTIFACTS' },
            environmentVariablesOverride: [
                {
                    name: 'pullRequestId',
                    value: EventField.fromPath('$.detail.pullRequestId'),
                    type: 'PLAINTEXT',
                },
                {
                    name: 'repositoryName',
                    value: EventField.fromPath('$.detail.repositoryNames[0]'),
                    type: 'PLAINTEXT',
                },
                {
                    name: 'sourceCommit',
                    value: EventField.fromPath('$.detail.sourceCommit'),
                    type: 'PLAINTEXT',
                },
                {
                    name: 'destinationCommit',
                    value: EventField.fromPath('$.detail.destinationCommit'),
                    type: 'PLAINTEXT',
                },
            ],
        });

        return {
            ...super.bind(_rule),
            input,
        };
    }
}
