import * as path from 'path';
import { Construct } from '@aws-cdk/core';
import {
    BuildSpec,
    LinuxBuildImage,
    Project,
    ComputeType,
} from '@aws-cdk/aws-codebuild';
import { Rule, Schedule } from '@aws-cdk/aws-events';
import { CodeBuildProject, SnsTopic } from '@aws-cdk/aws-events-targets';
import { Bucket } from '@aws-cdk/aws-s3';
import { Asset } from '@aws-cdk/aws-s3-assets';
import { ITopic } from '@aws-cdk/aws-sns';
import { PolicyStatement } from '@aws-cdk/aws-iam';

const S3_BUCKET_ENV = 'SCRIPTS_BUCKET';
const S3_KEY_ENV = 'SCRIPTS_BUCKET_KEY';

export interface S3CodecommitBackupProps {
    /**
     * Bucket for storing the backups.
     */
    backupBucket: Bucket;

    /**
     * Schedule for backups.
     */
    schedule: Schedule;

    /**
     * The names of the repositories in the region to be backed up.
     *
     * @default - All repositories in the region
     */
    repositoryNames?: string[];

    /**
     * Topic to be informed about a failed backup.
     */
    failedTopic?: ITopic;

    /**
     * The type of compute to use for backup the repositories.
     * See the {@link ComputeType} enum for the possible values.
     *
     * @default taken from {@link #buildImage#defaultComputeType}
     */
    computeType?: ComputeType;
}

export class S3CodecommitBackup extends Construct {
    constructor(scope: Construct, id: string, props: S3CodecommitBackupProps) {
        super(scope, id);

        const {
            backupBucket,
            schedule,
            repositoryNames = [],
            failedTopic,
            computeType,
        } = props;

        const asset = new Asset(this, 'ScriptsDirectory', {
            path: path.join(__dirname, '..', 'scripts'),
        });

        const buildImage = LinuxBuildImage.STANDARD_2_0;

        const backupProject = new Project(this, 'BackupProject', {
            environment: {
                buildImage,
                computeType: computeType || buildImage.defaultComputeType,
            },
            environmentVariables: {
                BACKUP_BUCKET: {
                    value: backupBucket.bucketName,
                },
                REPOSITORY_NAMES: {
                    value: repositoryNames.join(' '),
                },
                [S3_BUCKET_ENV]: { value: asset.s3BucketName },
                [S3_KEY_ENV]: { value: asset.s3ObjectKey },
            },
            buildSpec: BuildSpec.fromObject({
                version: '0.2',
                phases: {
                    pre_build: {
                        commands: [
                            `echo "Downloading scripts from s3://\${${S3_BUCKET_ENV}}/\${${S3_KEY_ENV}}"`,
                            `aws s3 cp s3://\${${S3_BUCKET_ENV}}/\${${S3_KEY_ENV}} ./`,
                            `unzip ./$(basename \${${S3_KEY_ENV}})`,
                        ],
                    },
                    build: {
                        commands: [
                            'chmod +x backup_codecommit.sh',
                            './backup_codecommit.sh',
                        ],
                    },
                },
            }),
        });

        if (failedTopic) {
            backupProject.onBuildFailed('onFailed', {
                target: new SnsTopic(failedTopic),
            });
        }

        asset.grantRead(backupProject);

        backupBucket.grantPut(backupProject);

        backupProject.addToRolePolicy(
            new PolicyStatement({
                resources: ['*'],
                actions: [
                    'codecommit:BatchGet*',
                    'codecommit:Get*',
                    'codecommit:Describe*',
                    'codecommit:List*',
                    'codecommit:GitPull',
                ],
            }),
        );

        new Rule(this, 'ScheduleRule', {
            schedule,
            targets: [new CodeBuildProject(backupProject)],
        });
    }
}
