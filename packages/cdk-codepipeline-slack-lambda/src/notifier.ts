import { CodePipelineCloudWatchEvent } from 'aws-lambda';
import { processCodepipeline } from './interactions/process-codepipeline';

export const handler = async (
    event: CodePipelineCloudWatchEvent,
): Promise<void> => {
    if (event.source === 'aws.codepipeline') {
        await processCodepipeline(event);
    }
};
