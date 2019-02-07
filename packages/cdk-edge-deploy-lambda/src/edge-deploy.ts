import { CloudFormationCustomResourceEvent } from 'aws-lambda';
import { Lambda } from 'aws-sdk';

import {
  customResourceHelper,
  OnCreateHandler,
  OnUpdateHandler,
  OnDeleteHandler
} from '@cloudcomponents/custom-resource-helper';

const lambda = new Lambda();

export const handler = customResourceHelper(() => ({
  onCreate: handleCreate,
  onUpdate: handleUpdate,
  onDelete: handleDelete
}));

const handleCreate: OnCreateHandler = async (event, _) => {
  const { region, role, runtime, code, handler } = getProperties(event);

  const params: Lambda.Types.CreateFunctionRequest = {
    FunctionName: 'my-function',
    Runtime: runtime,
    Code: { ZipFile: code },
    Handler: handler,
    Role: role
  };

  const ret = await lambda.createFunction(params).promise();
  console.log(ret);

  console.log(region, handler);
  console.log(code);

  const physicalResourceId = '1';
  const responseData = { test: 'test' };
  return {
    physicalResourceId,
    responseData
  };
};

const handleUpdate: OnUpdateHandler = async (event, _) => {
  const { region, code } = getProperties(event);

  console.log(region, code);
  const physicalResourceId = '1';
  const responseData = { test: 'test' };
  return {
    physicalResourceId,
    responseData
  };
};

const handleDelete: OnDeleteHandler = async (event, _) => {
  const { region, code } = getProperties(event);
  console.log(region, code);
  return;
};

const getProperties = (event: CloudFormationCustomResourceEvent) => {
  const props = event.ResourceProperties;

  const region = props.Region;
  const role = props.Role; //TODO
  const runtime = props.Runtime.name; //TODO
  const code = props.Code.code; //TODO
  const handler = props.Handler;

  return {
    region,
    role,
    runtime,
    code,
    handler
  };
};
