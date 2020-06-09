import { Construct, Lazy } from '@aws-cdk/core';
import {
  BuildSpec,
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
        maxInputs: 5,
        minOutputs: 0,
        maxOutputs: 5,
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

    const project = new PipelineProject(scope, 'LinterProject', {
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
              `docker pull hadolint/hadolint:v1.18.0`,
            ],
          },
          build: {
            commands: [],
            finally: [
              `echo Scan started on \`date\``,
              `result=$(docker run --rm -i hadolint/hadolint:v1.18.0 hadolint -f json - < Dockerfile)`,
            ],
          },
          post_build: {
            commands: [
              `echo $result | jq .`,
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
      if ((this.actionProperties.outputs || []).length > 0) {
        options.bucket.grantReadWrite(project);
      } else {
        options.bucket.grantRead(project);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const configuration: any = {
      ProjectName: project.projectName,
    };
    if ((this.actionProperties.inputs || []).length > 1) {
      // lazy, because the Artifact name might be generated lazily
      configuration.PrimarySource = Lazy.stringValue({
        produce: () => this.props.input.artifactName,
      });
    }
    return {
      configuration,
    };
  }
}
