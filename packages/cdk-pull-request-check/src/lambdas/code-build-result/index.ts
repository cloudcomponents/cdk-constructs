import type { CodeBuildCloudWatchStateEvent } from 'aws-lambda';
import { CodeCommit } from 'aws-sdk';

const codeCommit = new CodeCommit();

export const handler = async (event: CodeBuildCloudWatchStateEvent): Promise<void> => {
  const { region, detail } = event;

  const shouldUpdateApprovalState = process.env.UPDATE_APPROVAL_STATE === 'TRUE';

  const shouldPostComment = process.env.POST_COMMENT === 'TRUE';

  const { pullRequestId, revisionId, repositoryName, beforeCommitId, afterCommitId } = getPullRequestProps(detail);

  const s3Prefix = region === 'us-east-1' ? 's3' : `s3-${region}`;

  switch (detail['build-status']) {
    case CodeBuildState.IN_PROGRESS:
      if (shouldUpdateApprovalState) {
        await codeCommit
          .updatePullRequestApprovalState({
            pullRequestId,
            revisionId,
            approvalState: 'REVOKE',
          })
          .promise();
      }

      if (shouldPostComment) {
        await codeCommit
          .postCommentForPullRequest({
            pullRequestId,
            repositoryName,
            beforeCommitId,
            afterCommitId,
            content: `** Build started at ${'time'} **`,
          })
          .promise();
      }
      break;

    case CodeBuildState.FAILED:
      if (shouldPostComment) {
        const badge = `https://${s3Prefix}.amazonaws.com/codefactory-${region}-prod-default-build-badges/failing.svg`;

        const content = `![Failing](${badge} "Failing") - See the [Logs](${detail['additional-information'].logs['deep-link']})`;

        await codeCommit
          .postCommentForPullRequest({
            pullRequestId,
            repositoryName,
            beforeCommitId,
            afterCommitId,
            content,
          })
          .promise();
      }
      break;

    case CodeBuildState.SUCCEEDED:
      if (shouldUpdateApprovalState) {
        await codeCommit
          .updatePullRequestApprovalState({
            pullRequestId,
            revisionId,
            approvalState: 'APPROVE',
          })
          .promise();
      }

      if (shouldPostComment) {
        const badge = `https://${s3Prefix}.amazonaws.com/codefactory-${region}-prod-default-build-badges/passing.svg`;

        const content = `![Passing](${badge} "Passing") - See the [Logs](${detail['additional-information'].logs['deep-link']})`;

        await codeCommit
          .postCommentForPullRequest({
            pullRequestId,
            repositoryName,
            beforeCommitId,
            afterCommitId,
            content,
          })
          .promise();
      }
      break;

    case CodeBuildState.STOPPED:
      console.log('Build stopped!');
      break;

    default:
      throw new Error(`Invalid build status: ${detail['build-status']}`);
  }
};

interface PullrequestProps {
  repositoryName: string;
  pullRequestId: string;
  beforeCommitId: string;
  afterCommitId: string;
  revisionId: string;
}

const getPullRequestProps = (detail: CodeBuildCloudWatchStateEvent['detail']): PullrequestProps => {
  let repositoryName = '';
  let pullRequestId = '';
  let beforeCommitId = '';
  let afterCommitId = '';
  let revisionId = '';

  detail['additional-information'].environment['environment-variables'].forEach(({ name, value }) => {
    switch (name) {
      case 'pullRequestId':
        pullRequestId = value;
        break;
      case 'repositoryName':
        repositoryName = value;
        break;
      case 'sourceCommit':
        beforeCommitId = value;
        break;
      case 'destinationCommit':
        afterCommitId = value;
        break;
      case 'revisionId':
        revisionId = value;
        break;
      default:
        throw new Error(`Unknown environment variable: ${name}`);
    }
  });

  return {
    repositoryName,
    pullRequestId,
    beforeCommitId,
    afterCommitId,
    revisionId,
  };
};

enum CodeBuildState {
  'IN_PROGRESS' = 'IN_PROGRESS',
  'SUCCEEDED' = 'SUCCEEDED',
  'FAILED' = 'FAILED',
  'STOPPED' = 'STOPPED',
}
