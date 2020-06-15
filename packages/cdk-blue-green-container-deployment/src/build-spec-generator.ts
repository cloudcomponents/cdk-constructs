export interface Env {
  variables?: { [key: string]: string };
  'parameter-store'?: { [key: string]: string };
}

export interface Phase {
  'run-as'?: string;
  commands: string[];
  finally?: string[];
}

export interface Artifacts {
  files?: string[];
  name?: string;
  'base-directory'?: string;
  'discard-paths'?: 'yes' | 'no';
}

export interface PrimaryArtifacts extends Artifacts {
  'secondary-artifacts'?: { [key: string]: Artifacts };
}

export interface Cache {
  paths: string[];
}

export interface BuildSpecStructure {
  version: '0.2';
  'run-as'?: string;
  env?: Env;
  phases?: { [key: string]: Phase };
  artifacts?: PrimaryArtifacts;
  cache?: Cache;
}

export interface DefaultBuildSpecProps {
  account: string;
  region: string;
  //manifestArtifactName: string;
  //imageArtifactName: string;
}

export class BuildSpecGenerator {
  private constructor(private readonly spec: BuildSpecStructure) {}

  public static empty(): BuildSpecGenerator {
    return new BuildSpecGenerator({ version: '0.2' });
  }

  public static default(props: DefaultBuildSpecProps): BuildSpecGenerator {
    return new BuildSpecGenerator({
      version: '0.2',
      phases: {
        pre_build: {
          commands: [
            'echo Build started on `date`',
            'echo Logging in to Amazon ECR...',
            'aws --version',
            `aws ecr get-login-password | docker login --username AWS --password-stdin ${props.account}.dkr.ecr.${props.region}.amazonaws.com`,
            'COMMIT_HASH=$(echo $CODEBUILD_RESOLVED_SOURCE_VERSION | cut -c 1-7)',
            'IMAGE_TAG=${COMMIT_HASH:=latest}',
            'echo Replacing placeholder...',
            'sed -i "s|SED_REPLACE_EXECUTION_ROLE_ARN|$EXECUTION_ROLE_ARN|g" taskdef.json',
            'sed -i "s|SED_REPLACE_FAMILY|$FAMILY|g" taskdef.json',
            'echo Current taskDefinition:',
            'cat taskdef.json',
          ],
        },
        build: {
          commands: [
            'echo Building the Docker image...',
            'docker version',
            'docker build -t $REPOSITORY_URI:latest -t $REPOSITORY_URI:$IMAGE_TAG -f Dockerfile .',
          ],
        },
        post_build: {
          commands: [
            'echo Pushing the Docker images to container registry...',
            'docker push $REPOSITORY_URI:latest',
            'docker push $REPOSITORY_URI:$IMAGE_TAG',
            'echo Writing image definitions file...',
            'printf \'{"ImageURI":"%s"}\' $REPOSITORY_URI:$IMAGE_TAG > imageDetail.json',
            'echo Build completed on `date`',
          ],
        },
      },
      artifacts: {
        files: ['appspec.yaml', 'taskdef.json'],
        'secondary-artifacts': {
          ManifestArtifact: {
            files: ['appspec.yaml', 'taskdef.json'],
          },
          ImageArtifact: {
            files: ['imageDetail.json'],
          },
        },
      },
    });
  }

  public render(): BuildSpecStructure {
    return this.spec;
  }
}
