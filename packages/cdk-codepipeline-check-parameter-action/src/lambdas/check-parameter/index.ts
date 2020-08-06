import type { CodePipelineEvent } from 'aws-lambda';
import { SSM, CodePipeline, STS } from 'aws-sdk';

// default session
const codePipeline = new CodePipeline();
const sts = new STS();

export const handler = async (event: CodePipelineEvent): Promise<void> => {
  const { id: jobId, data: jobData } = event['CodePipeline.job'];

  try {
    const { parameterName, logParameter, regExp, crossAccountRoleArn } = getUserParams(jobData);

    const ssm = await (async () => {
      if (!crossAccountRoleArn) {
        return new SSM();
      }

      const { Credentials: credentials } = await sts
        .assumeRole({
          RoleArn: crossAccountRoleArn,
          RoleSessionName: `CheckParameter-${parameterName}`,
        })
        .promise();

      if (!credentials) {
        throw new Error('Crossaccount role could not be assumed');
      }

      return new SSM({
        accessKeyId: credentials.AccessKeyId,
        secretAccessKey: credentials.SecretAccessKey,
        sessionToken: credentials.SessionToken,
      });
    })();

    const { Parameter: parameter } = await ssm
      .getParameter({
        Name: parameterName,
        WithDecryption: false,
      })
      .promise();

    if (!parameter?.Value) {
      throw new Error('No parameter value');
    }

    if (regExp) {
      if (!new RegExp(regExp).test(parameter.Value)) {
        await putJobFailure(jobId, `Value does not match the regular expression: ${regExp}`);
        return;
      }
    }

    await putJobSuccess(jobId, logParameter ? JSON.stringify(parameter) : 'Logging is off');
  } catch (error) {
    console.log(error);
    await putJobFailure(jobId, `Function exception: ${error.message as string}`);
  }
};

/**
 * Decodes the JSON user parameters and validates the required properties
 *
 * @param jobData The job data structure containing the UserParameters string which should be a valid JSON structure
 */
const getUserParams = (
  jobData: CodePipelineEvent['CodePipeline.job']['data'],
): {
  parameterName: string;
  logParameter: boolean;
  regExp?: string;
  crossAccountRoleArn?: string;
} => {
  const { UserParameters: userParameters } = jobData.actionConfiguration.configuration;

  const { parameterName, logParameter, regExp, crossAccountRoleArn } = JSON.parse(userParameters);

  if (!parameterName) {
    throw new Error('Your UserParameters JSON must include the parameter name');
  }

  if (!logParameter) {
    throw new Error('Your UserParameters JSON must include logParameter');
  }

  return {
    parameterName,
    logParameter,
    regExp,
    crossAccountRoleArn,
  };
};

/**
 * Notify CodePipeline of a successful job
 *
 * @param jobId The CodePipeline job ID
 * @param message A message to be logged relating to the job status
 */
const putJobSuccess = async (jobId: string, message?: string): Promise<void> => {
  console.log('Putting job success');

  if (message) {
    console.log(message);
  }

  await codePipeline
    .putJobSuccessResult({
      jobId,
    })
    .promise();
};

/**
 * Notify CodePipeline of a failed job
 *
 * @param jobId The CodePipeline job ID
 * @param message A message to be logged relating to the job status
 */
const putJobFailure = async (jobId: string, message: string): Promise<void> => {
  console.log('Putting job failure');
  console.log(message);

  await codePipeline
    .putJobFailureResult({
      jobId,
      failureDetails: {
        message,
        type: 'JobFailed',
      },
    })
    .promise();
};
