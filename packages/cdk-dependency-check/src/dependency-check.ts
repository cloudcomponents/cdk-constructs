import { Construct } from '@aws-cdk/core';
import {
    BuildSpec,
    LinuxBuildImage,
    Project,
    ComputeType,
    Cache,
    LocalCacheMode,
} from '@aws-cdk/aws-codebuild';
import { IRepository } from '@aws-cdk/aws-codecommit';
import { Rule, Schedule, OnEventOptions } from '@aws-cdk/aws-events';
import { CodeBuildProject } from '@aws-cdk/aws-events-targets';
import { PolicyStatement } from '@aws-cdk/aws-iam';

export interface DependencyCheckProps {
    /**
     * Bucket for storing the backups.
     */
    readonly repository: IRepository;

    /**
     * Schedule for backups.
     */
    readonly schedule: Schedule;

    /**
     * The type of compute to use for backup the repositories.
     * See the {@link ComputeType} enum for the possible values.
     *
     * @default taken from {@link #buildImage#defaultComputeType}
     */
    readonly computeType?: ComputeType;

    /**
     * Custom command to be executed before the dependency check
     *
     * @default `echo "No preCheckCommand!"`
     */
    readonly preCheckCommand?: string;

    /**
     * Version of the dependency check
     *
     * @default 5.3.0
     */
    readonly version?: string;

    /**
     * Name of the project
     *
     * @default taken from {@link #repository#repositoryName}
     */
    readonly projectName?: string;
}

export class DependencyCheck extends Construct {
    private readonly checkProject: Project;

    constructor(scope: Construct, id: string, props: DependencyCheckProps) {
        super(scope, id);

        const {
            schedule,
            computeType,
            repository,
            preCheckCommand = `echo "No preCheckCommand!"`,
            version = '5.3.0',
            projectName,
        } = props;

        const buildImage = LinuxBuildImage.STANDARD_2_0;

        this.checkProject = new Project(this, 'CheckProject', {
            cache: Cache.local(LocalCacheMode.CUSTOM),
            environment: {
                buildImage,
                computeType: computeType || buildImage.defaultComputeType,
            },
            buildSpec: BuildSpec.fromObject({
                version: '0.2',
                env: {
                    'git-credential-helper': 'yes',
                },
                phases: {
                    install: {
                        commands: [
                            `echo "[===== Install OWASP Dependency Check =====]"`,
                            `curl -L https://dl.bintray.com/jeremy-long/owasp/dependency-check-${version}-release.zip -o dependency-check.zip`,
                            `unzip dependency-check.zip -d "/opt"`,
                            `chmod +x /opt/dependency-check/bin/dependency-check.sh`,
                            `export PATH="$PATH:/opt/dependency-check/bin"`,
                            `mkdir reports`,
                        ],
                    },
                    pre_build: {
                        commands: [
                            `echo "[===== Clone repository: ${repository.repositoryName} =====]"`,
                            `git clone "${repository.repositoryCloneUrlHttp}"`,
                            `cd ${repository.repositoryName}`,
                            `${preCheckCommand}`,
                            `cd \${CODEBUILD_SRC_DIR}`,
                        ],
                    },
                    build: {
                        commands: [
                            `echo "[===== Scan repository: ${repository.repositoryName} =====]"`,
                            `dependency-check.sh --version`,
                            `dependency-check.sh --project "${projectName ||
                                repository.repositoryName}" --scan "${
                                repository.repositoryName
                            }/" --failOnCVSS 5 --prettyPrint --format "ALL" --out reports`,
                        ],
                    },
                },
                reports: {
                    dependencyCheckReport: {
                        files: ['reports/dependency-check-junit.xml'],
                    },
                },
                cache: {
                    paths: ['/opt/dependency-check/data/**/*'],
                },
            }),
        });

        this.checkProject.addToRolePolicy(
            new PolicyStatement({
                resources: [repository.repositoryArn],
                actions: [
                    'codecommit:BatchGet*',
                    'codecommit:Get*',
                    'codecommit:Describe*',
                    'codecommit:List*',
                    'codecommit:GitPull',
                ],
            }),
        );

        this.checkProject.addToRolePolicy(
            new PolicyStatement({
                resources: ['*'], // TODO
                actions: [
                    'codebuild:CreateReportGroup',
                    'codebuild:CreateReport',
                    'codebuild:UpdateReport',
                    'codebuild:BatchPutTestCases',
                ],
            }),
        );

        new Rule(this, 'ScheduleRule', {
            schedule,
            targets: [new CodeBuildProject(this.checkProject)],
        });
    }

    /**
     * Defines an event rule which triggers when a check fails.
     */
    public onCheckFailed(id: string, options?: OnEventOptions): Rule {
        return this.checkProject.onBuildFailed(id, options);
    }

    /**
     * Defines an event rule which triggers when a check starts.
     */
    public onCheckStarted(id: string, options?: OnEventOptions): Rule {
        return this.checkProject.onBuildStarted(id, options);
    }

    /**
     * Defines an event rule which triggers when a check complets successfully.
     */
    public onCheckSucceeded(id: string, options?: OnEventOptions): Rule {
        return this.checkProject.onBuildSucceeded(id, options);
    }
}
