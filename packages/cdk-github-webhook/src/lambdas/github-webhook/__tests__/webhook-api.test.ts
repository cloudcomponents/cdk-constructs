const createMock = jest.fn();
const updateMock = jest.fn();
const deleteMock = jest.fn();

jest.mock('@octokit/rest', () => ({
  Octokit: jest.fn().mockImplementation(() => ({
    repos: {
      createWebhook: createMock,
      updateWebhook: updateMock,
      deleteWebhook: deleteMock,
    },
  })),
}));

import { RestEndpointMethodTypes } from '@octokit/rest';
import { createWebhook, updateWebhook, deleteWebhook } from '../webhook-api';

test('should call createHook with correct params', async () => {
  const githubApiToken = 'secure';
  const githubRepoUrl = 'https://github.com/cloudcomponents/cdk-constructs';
  const payloadUrl = 'payloadUrl';
  const events = ['*'];

  await createWebhook(githubApiToken, githubRepoUrl, payloadUrl, events);

  expect(createMock).toHaveBeenCalled();
  expect(createMock).toHaveBeenCalledWith({
    name: 'web',
    owner: 'cloudcomponents',
    repo: 'cdk-constructs',
    config: { url: payloadUrl, content_type: 'json' },
    events,
    active: true,
  });
});

test('should call updateHook with correct params', async () => {
  const githubApiToken = 'secure';
  const githubRepoUrl = 'https://github.com/cloudcomponents/cdk-constructs';
  const payloadUrl = 'payloadUrl';
  const events = ['*'];
  const hookId = 12;

  await updateWebhook(githubApiToken, githubRepoUrl, payloadUrl, events, hookId);

  expect(updateMock).toHaveBeenCalled();
  expect(updateMock).toHaveBeenCalledWith({
    owner: 'cloudcomponents',
    repo: 'cdk-constructs',
    config: { url: payloadUrl, content_type: 'json' },
    events,
    active: true,
    hook_id: hookId,
  });
});

test('should call deleteHook with correct params', async () => {
  const githubApiToken = 'secure';
  const githubRepoUrl = 'https://github.com/cloudcomponents/cdk-constructs';
  const hookId = 12;

  await deleteWebhook(githubApiToken, githubRepoUrl, hookId);

  expect(deleteMock).toHaveBeenCalled();
  expect(deleteMock).toHaveBeenCalledWith({
    owner: 'cloudcomponents',
    repo: 'cdk-constructs',
    hook_id: hookId,
  });
});

test('should throw an exception if the githubUrl is not correct', async () => {
  const githubApiToken = 'secure';
  const githubRepoUrl = '*INCORRECT_URL*';
  const payloadUrl = 'payloadUrl';
  const events = ['*'];

  const call = (): Promise<RestEndpointMethodTypes['repos']['createWebhook']['response']> =>
    createWebhook(githubApiToken, githubRepoUrl, payloadUrl, events);

  await expect(call()).rejects.toThrow('GithubRepoUrl is not correct');
});
