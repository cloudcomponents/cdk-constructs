import type {
  CloudFormationCustomResourceHandler,
  CloudFormationCustomResourceResponse,
  CloudFormationCustomResourceDeleteEvent,
  CloudFormationCustomResourceUpdateEvent,
} from 'aws-lambda';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import axios from 'axios';

const COGNITO_CLIENT = new CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION,
});

async function ensureCognitoUserPoolDomain(userPoolId: string): Promise<string> {
  const { UserPool: userPool } = await COGNITO_CLIENT.describeUserPool({
    UserPoolId: userPoolId,
  }).promise();

  if (!userPool) {
    throw new Error(`User pool ${userPoolId} not found.`);
  }

  const { Domain: domainPrefix, CustomDomain: customDomain } = userPool;

  if (!domainPrefix && !customDomain) {
    throw new Error('Cognito auth domain is missing! Either a domain prefix or a custom domain must be configured.');
  }

  return userPool.CustomDomain ?? `${userPool.Domain}.auth.${COGNITO_CLIENT.config.region}.amazoncognito.com`;
}

export const handler: CloudFormationCustomResourceHandler = async (event) => {
  const { LogicalResourceId, RequestId, RequestType, StackId, ResponseURL, ResourceProperties } = event;

  const { PhysicalResourceId: physicalResourceId } = event as CloudFormationCustomResourceDeleteEvent | CloudFormationCustomResourceUpdateEvent;

  let response: CloudFormationCustomResourceResponse;

  try {
    const domainName = RequestType !== 'Delete' ? await ensureCognitoUserPoolDomain(ResourceProperties.UserPoolId as string) : undefined;

    response = {
      LogicalResourceId,
      PhysicalResourceId: physicalResourceId || `${ResourceProperties.UserPoolId}-user-pool-domain`,
      Status: 'SUCCESS',
      RequestId,
      StackId,
      Data: {
        DomainName: domainName,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    response = {
      LogicalResourceId,
      PhysicalResourceId: physicalResourceId || `failed-to-create-${Date.now()}`,
      Status: 'FAILED',
      Reason: err.stack || err.message,
      RequestId,
      StackId,
    };
  }
  await axios.put(ResponseURL, response, { headers: { 'content-type': '' } });
};
