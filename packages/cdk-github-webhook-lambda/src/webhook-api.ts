import * as Octokit from '@octokit/rest';
import * as parseGithubUrl from 'parse-github-url';

const octokit = new Octokit();

export const createWebhook = (
  githubApiToken: string,
  githubRepoUrl: string,
  payloadUrl: string,
  events: string[]
) => {
  octokit.authenticate({ type: 'token', token: githubApiToken });

  const { repo, owner } = parseGithubRepoUrl(githubRepoUrl);

  const params = {
    name: 'web',
    owner,
    repo,
    config: { url: payloadUrl, content_type: 'json' },
    events: events,
    active: true
  };

  return octokit.repos.createHook(params);
};

export const updateWebhook = (
  githubApiToken: string,
  githubRepoUrl: string,
  payloadUrl: string,
  events: string[],
  hookId: number
) => {
  octokit.authenticate({ type: 'token', token: githubApiToken });

  const { repo, owner } = parseGithubRepoUrl(githubRepoUrl);

  const params = {
    owner,
    repo,
    config: { url: payloadUrl, content_type: 'json' },
    events: events,
    active: true,
    hook_id: hookId
  };

  return octokit.repos.updateHook(params);
};

export const deleteWebhook = (
  githubApiToken: string,
  githubRepoUrl: string,
  hookId: number
) => {
  octokit.authenticate({ type: 'token', token: githubApiToken });

  const { repo, owner } = parseGithubRepoUrl(githubRepoUrl);

  const params = {
    owner,
    repo,
    hook_id: hookId
  };

  return octokit.repos.deleteHook(params);
};

const parseGithubRepoUrl = (githubRepoUrl: string) => {
  const gh = parseGithubUrl(githubRepoUrl);

  if (gh === null || gh.owner === null || gh.name === null) {
    throw new Error('GithubRepoUrl is not correct');
  }

  return {
    repo: gh.name,
    owner: gh.owner
  };
};
