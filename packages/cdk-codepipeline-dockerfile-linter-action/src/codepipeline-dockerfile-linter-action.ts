import { BuildSpec, LinuxBuildImage, PipelineProject, ComputeType } from '@aws-cdk/aws-codebuild';
import { ActionBindOptions, ActionCategory, ActionConfig, Artifact, CommonAwsActionProps, IStage } from '@aws-cdk/aws-codepipeline';
import { Action } from '@aws-cdk/aws-codepipeline-actions';
import { PolicyStatement } from '@aws-cdk/aws-iam';
import { Construct } from '@aws-cdk/core';

export interface CodePipelineDockerfileLinterActionProps extends CommonAwsActionProps {
  /**
   * The source to use as input for this action.
   */
  readonly input: Artifact;

  /**
   * Version of hadolint
   *
   * @default v1.19.0
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

  protected bound(scope: Construct, _stage: IStage, options: ActionBindOptions): ActionConfig {
    const buildImage = LinuxBuildImage.STANDARD_4_0;

    const version = this.props.version ?? 'v1.19.0';

    const hadolint = '/opt/hadolint';

    const project = new PipelineProject(scope, 'LinterProject', {
      environment: {
        buildImage,
        computeType: this.props.computeType || buildImage.defaultComputeType,
      },
      buildSpec: BuildSpec.fromObject({
        version: '0.2',
        phases: {
          pre_build: {
            commands: [
              'echo Installing hadolint',
              `wget -O ${hadolint} "https://github.com/hadolint/hadolint/releases/download/${version}/hadolint-$(uname -s)-$(uname -m)"`,
              `chmod +x ${hadolint}`,
            ],
          },
          build: {
            commands: ['echo Scan started on `date`', `result=$(${hadolint} -f json Dockerfile)`],
          },
          post_build: {
            commands: ['if [ "$result" != "[]" ]; then echo $result | jq .; else echo "Awesome! No findings!"; fi', 'echo Scan completed on `date`'],
          },
        },
      }),
    });

    // grant the Pipeline role the required permissions to this Project
    options.role.addToPrincipalPolicy(
      new PolicyStatement({
        resources: [project.projectArn],
        actions: ['codebuild:BatchGetBuilds', 'codebuild:StartBuild', 'codebuild:StopBuild'],
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
