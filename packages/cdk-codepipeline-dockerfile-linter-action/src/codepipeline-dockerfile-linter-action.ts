import { Construct } from '@aws-cdk/core';
import {
  BuildSpec,
  Cache,
  LocalCacheMode,
  LinuxBuildImage,
  PipelineProject,
  ComputeType,
} from '@aws-cdk/aws-codebuild';
import {
  ActionBindOptions,
  ActionCategory,
  ActionConfig,
  Artifact,
  CommonAwsActionProps,
  IStage,
} from '@aws-cdk/aws-codepipeline';
import { Action } from '@aws-cdk/aws-codepipeline-actions';
import { PolicyStatement } from '@aws-cdk/aws-iam';

export interface CodePipelineDockerfileLinterActionProps
  extends CommonAwsActionProps {
  /**
   * The source to use as input for this action.
   */
  readonly input: Artifact;

  /**
   * Version of hadolint
   *
   * @default v1.18.0
   */
  readonly version?: string;

  /**
   * The type of compute to use for backup the repositories.
   * See the {@link ComputeType} enum for the possible values.
   *
   * @default taken from {@link LinuxBuildImage.STANDARD_4_0#defaultComputeType}
   */
  readonly computeType?: ComputeType;
}

export class CodePipelineDockerfileLinterAction extends Action {
  private readonly props: CodePipelineDockerfileLinterActionProps;

  constructor(props: CodePipelineDockerfileLinterActionProps) {
    super({
      ...props,
      category: ActionCategory.TEST,
      provider: 'CodeBuild',
      artifactBounds: {
        minInputs: 1,
        maxInputs: 1,
        minOutputs: 0,
        maxOutputs: 0,
      },
      inputs: [props.input],
    });

    this.props = props;
  }

  protected bound(
    scope: Construct,
    _stage: IStage,
    options: ActionBindOptions,
  ): ActionConfig {
    const buildImage = LinuxBuildImage.STANDARD_4_0;

    const version = this.props.version || 'v1.18.0';

    const project = new PipelineProject(scope, 'LinterProject', {
      cache: Cache.local(LocalCacheMode.DOCKER_LAYER),
      environment: {
        buildImage,
        computeType: this.props.computeType || buildImage.defaultComputeType,
        privileged: true,
      },
      buildSpec: BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            commands: [],
          },
          pre_build: {
            commands: [
              `echo Pulling the hadolint docker image`,
              `docker pull hadolint/hadolint:${version}`,
            ],
          },
          build: {
            commands: [],
            finally: [
              `echo Scan started on \`date\``,
              `result=$(docker run --rm -i hadolint/hadolint:${version} hadolint -f json - < Dockerfile)`,
            ],
          },
          post_build: {
            commands: [
              `if [ "$result" != "[]" ]; then echo $result | jq .; else echo "Awesome! No findings!"; fi`,
              `echo Scan completed on \`date\``,
            ],
          },
        },
      }),
    });

    // grant the Pipeline role the required permissions to this Project
    options.role.addToPolicy(
      new PolicyStatement({
        resources: [project.projectArn],
        actions: [
          'codebuild:BatchGetBuilds',
          'codebuild:StartBuild',
          'codebuild:StopBuild',
        ],
      }),
    );

    // allow the Project access to the Pipeline's artifact Bucket
    // but only if the project is not imported
    // (ie., has a role) - otherwise, the IAM library throws an error
    if (project.role) {
      options.bucket.grantRead(project);
    }

    return {
      configuration: {
        ProjectName: project.projectName,
      },
    };
  }
}
