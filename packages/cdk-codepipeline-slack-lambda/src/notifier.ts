import { CodePipelineCloudWatchEvent } from 'aws-lambda';
import { processCodePipeline } from './interactions/process-codepipeline';

export const handler = async (
  event: CodePipelineCloudWatchEvent,
): Promise<void> => {
  if (event.source === 'aws.codepipeline') {
    await processCodePipeline(event);
  }
};
