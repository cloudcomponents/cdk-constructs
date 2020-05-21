import * as path from 'path';
import { Stack } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-codecommit';
import { Topic } from '@aws-cdk/aws-sns';
import { SnsTopic } from '@aws-cdk/aws-events-targets';
import 'jest-cdk-snapshot';

import { ApprovalRuleTemplateRepositoryAssociation } from '../approval-rule-template-repositroy-association';

jest.mock('../directories', () => ({
  approvalRuleTemplateRepositoryAssociationDir: path.join(
    __dirname,
    'mocks',
    'approval-rule-template-repository-association',
  ),
}));

test('default setup', (): void => {
  const stack = new Stack();

  const repository = new Repository(stack, 'Repository', {
    repositoryName: 'repo',
  });

  new ApprovalRuleTemplateRepositoryAssociation(
    stack,
    'ApprovalRuleTemplateRepositoryAssociation',
    {
      approvalRuleTemplateName: 'name',
      repository,
    },
  );

  expect(stack).toMatchCdkSnapshot();
});

test('onOverridden', (): void => {
  const stack = new Stack();

  const repository = new Repository(stack, 'Repository', {
    repositoryName: 'repo',
  });

  const ruleAsscociation = new ApprovalRuleTemplateRepositoryAssociation(
    stack,
    'ApprovalRuleTemplateRepositoryAssociation',
    {
      approvalRuleTemplateName: 'name',
      repository,
    },
  );

  const topic = new Topic(stack, 'Topic');

  ruleAsscociation.onOverridden('overridden', {
    target: new SnsTopic(topic),
  });

  expect(stack).toMatchCdkSnapshot();
});
