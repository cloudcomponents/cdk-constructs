import * as path from 'path';
import { Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { ApprovalRuleTemplate } from '../approval-rule-template';

jest.mock('../directories', () => ({
  approvalRuleTemplateDir: path.join(__dirname, 'mocks', 'approval-rule-template'),
}));

test('default setup', (): void => {
  const stack = new Stack();

  new ApprovalRuleTemplate(stack, 'ApprovalRuleTemplate', {
    approvalRuleTemplateName: 'name',
    template: {
      approvers: {
        numberOfApprovalsNeeded: 2,
      },
    },
  });

  expect(stack).toMatchCdkSnapshot();
});

test('list of approvalPoolMembers', (): void => {
  const stack = new Stack();

  new ApprovalRuleTemplate(stack, 'ApprovalRuleTemplate', {
    approvalRuleTemplateName: 'name',
    template: {
      approvers: {
        numberOfApprovalsNeeded: 2,
        approvalPoolMembers: ['arn:aws:sts::123456789012:assumed-role/CodeCommitReview/*', 'arn:aws:sts::123456789012:assumed-role/LeadDeveloper/*'],
      },
    },
  });

  expect(stack).toMatchCdkSnapshot();
});
