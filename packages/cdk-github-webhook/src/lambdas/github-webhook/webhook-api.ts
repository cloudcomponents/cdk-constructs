import { Octokit, RestEndpointMethodTypes } from '@octokit/rest';
import parseGithubUrl from 'parse-github-url';

export const createWebhook = async (
  githubApiToken: string,
  githubRepoUrl: string,
  payloadUrl: string,
  events: string[],
  webhookSecret?: string
): Promise<RestEndpointMethodTypes['repos']['createWebhook']['response']> => {
  const octokit = new Octokit({
    auth: githubApiToken,
  });

  const gh = parseGithubUrl(githubRepoUrl);

  if (gh === null || gh.owner === null || gh.name === null) {
    throw new Error('GithubRepoUrl is not correct');
  }

  const config = { url: payloadUrl, content_type: 'json' };
  if (webhookSecret != null) {
    Object.assign(config, { secret: webhookSecret});
  }

  const params = {
    name: 'web',
    owner: gh.owner,
    repo: gh.name,
    config,
    events,
    active: true,
  };

  return octokit.repos.createWebhook(params);
};

export const updateWebhook = async (
  githubApiToken: string,
  githubRepoUrl: string,
  payloadUrl: string,
  events: string[],
  hookId: number,
  webhookSecret?: string
): Promise<RestEndpointMethodTypes['repos']['updateWebhook']['response']> => {
  const octokit = new Octokit({
    auth: githubApiToken,
  });

  const gh = parseGithubUrl(githubRepoUrl);

  if (gh === null || gh.owner === null || gh.name === null) {
    throw new Error('GithubRepoUrl is not correct');
  }

  const config = { url: payloadUrl, content_type: 'json' };
  if (webhookSecret != null) {
    Object.assign(config, { secret: webhookSecret});
  }

  const params = {
    owner: gh.owner,
    repo: gh.name,
    config,
    events,
    active: true,
    hook_id: hookId,
  };

  return octokit.repos.updateWebhook(params);
};

export const deleteWebhook = async (
  githubApiToken: string,
  githubRepoUrl: string,
  hookId: number,
): Promise<RestEndpointMethodTypes['repos']['deleteWebhook']['response']> => {
  const octokit = new Octokit({
    auth: githubApiToken,
  });

  const gh = parseGithubUrl(githubRepoUrl);

  if (gh === null || gh.owner === null || gh.name === null) {
    throw new Error('GithubRepoUrl is not correct');
  }
  const params = {
    owner: gh.owner,
    repo: gh.name,
    hook_id: hookId,
  };

  return octokit.repos.deleteWebhook(params);
};
