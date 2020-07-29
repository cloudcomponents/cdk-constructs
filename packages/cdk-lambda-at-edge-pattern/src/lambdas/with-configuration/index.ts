import { writeFileSync, mkdtempSync } from 'fs';
import { resolve } from 'path';
import {
  CloudFormationCustomResourceCreateEvent,
  CloudFormationCustomResourceUpdateEvent,
} from 'aws-lambda';
import axios from 'axios';
import Zip from 'adm-zip';
import { Lambda } from 'aws-sdk';
import {
  camelizeKeys,
  customResourceHelper,
  OnCreateHandler,
  OnUpdateHandler,
  OnDeleteHandler,
  ResourceHandler,
  ResourceHandlerReturn,
} from 'custom-resource-helper';

interface WithConfigurationJson {
  region: string;
  functionName: string;
  configuration: string;
}

const updateLambdaCode = async (
  event:
    | CloudFormationCustomResourceCreateEvent
    | CloudFormationCustomResourceUpdateEvent,
): Promise<ResourceHandlerReturn> => {
  const { region, functionName, configuration } = camelizeKeys(
    event.ResourceProperties,
  ) as WithConfigurationJson;

  const lambda = new Lambda({
    region,
  });

  const { Code } = await lambda
    .getFunction({
      FunctionName: functionName,
    })
    .promise();

  const { data } = await axios.get(Code.Location, {
    responseType: 'arraybuffer',
  });

  const lambdaZip = new Zip(data);

  const tempDir = mkdtempSync('/tmp/lambda-package');

  lambdaZip.extractAllTo(tempDir, true);

  writeFileSync(
    resolve(tempDir, 'configuration.json'),
    Buffer.from(configuration),
  );

  const newLambdaZip = new Zip();

  newLambdaZip.addLocalFolder(tempDir);

  const {
    CodeSha256: codeSha256,
    Version: version,
    FunctionArn: functionArn,
  } = await lambda
    .updateFunctionCode({
      FunctionName: functionName,
      ZipFile: newLambdaZip.toBuffer(),
      Publish: true,
    })
    .promise();

  return {
    physicalResourceId: functionName,
    responseData: {
      CodeSha256: codeSha256,
      Version: version,
      FunctionArn: functionArn,
    },
  };
};

const handleCreate: OnCreateHandler = async (
  event,
): Promise<ResourceHandlerReturn> => updateLambdaCode(event);

const handleUpdate: OnUpdateHandler = async (
  event,
): Promise<ResourceHandlerReturn> => updateLambdaCode(event);

const handleDelete: OnDeleteHandler = async (): Promise<void> => {
  return;
};

export const handler = customResourceHelper(
  (): ResourceHandler => ({
    onCreate: handleCreate,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
  }),
);
