import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { BuildSpec, ComputeType, LinuxBuildImage } from 'aws-cdk-lib/aws-codebuild';
import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { SnsTopic } from 'aws-cdk-lib/aws-events-targets';
import { Topic } from 'aws-cdk-lib/aws-sns';

import { PullRequestCheck } from '../pull-request-check';

test('default setup', (): void => {
  // GIVEN
  const stack = new Stack();

  const repository = new Repository(stack, 'Repository', {
    repositoryName: 'MyRepositoryName',
    description: 'Some description.',
  });

  // WHEN
  new PullRequestCheck(stack, 'PullRequestCheck', {
    repository,
    buildSpec: BuildSpec.fromSourceFilename('buildspecs/prcheck.yml'),
  });

  // THEN
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});

test('custom setup', (): void => {
  // GIVEN
  const stack = new Stack();

  const repository = new Repository(stack, 'Repository', {
    repositoryName: 'MyRepositoryName',
    description: 'Some description.',
  });

  // WHEN
  new PullRequestCheck(stack, 'PullRequestCheck', {
    repository,
    buildSpec: BuildSpec.fromSourceFilename('buildspecs/prcheck.yml'),
    computeType: ComputeType.LARGE,
    buildImage: LinuxBuildImage.STANDARD_5_0,
  });

  // THEN
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});

test('privileged', (): void => {
  // GIVEN
  const stack = new Stack();

  const repository = new Repository(stack, 'Repository', {
    repositoryName: 'MyRepositoryName',
    description: 'Some description.',
  });

  // WHEN
  new PullRequestCheck(stack, 'PullRequestCheck', {
    repository,
    privileged: true,
    buildSpec: BuildSpec.fromSourceFilename('buildspecs/prcheck.yml'),
  });

  // THEN
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});

test('custom projectName', (): void => {
  // GIVEN
  const stack = new Stack();

  const repository = new Repository(stack, 'Repository', {
    repositoryName: 'MyRepositoryName',
    description: 'Some description.',
  });

  // WHEN
  new PullRequestCheck(stack, 'PullRequestCheck', {
    projectName: 'custom-pr-project',
    repository,
    buildSpec: BuildSpec.fromSourceFilename('buildspecs/prcheck.yml'),
  });

  // THEN
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});

test('events', (): void => {
  // GIVEN
  const stack = new Stack();

  const repository = new Repository(stack, 'Repository', {
    repositoryName: 'MyRepositoryName',
  });

  const topic = new Topic(stack, 'Topic');

  // WHEN
  const prCheck = new PullRequestCheck(stack, 'PullRequestCheck', {
    repository,
    buildSpec: BuildSpec.fromSourceFilename('buildspecs/prcheck.yml'),
  });

  prCheck.onCheckStarted('started', { target: new SnsTopic(topic) });

  prCheck.onCheckSucceeded('succeeded', { target: new SnsTopic(topic) });

  prCheck.onCheckFailed('failed', { target: new SnsTopic(topic) });

  // THEN
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});

test('randomizer', (): void => {
  // GIVEN
  const stack = new Stack();

  const repository = new Repository(stack, 'Repository', {
    repositoryName: 'MyRepositoryName',
  });

  // WHEN
  new PullRequestCheck(stack, 'PullRequestCheck1', {
    repository,
    projectName: 'project1',
    buildSpec: BuildSpec.fromSourceFilename('buildspecs/prcheck1.yml'),
  });

  new PullRequestCheck(stack, 'PullRequestCheck2', {
    repository,
    projectName: 'project2',
    buildSpec: BuildSpec.fromSourceFilename('buildspecs/prcheck2.yml'),
  });

  // THEN
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});
