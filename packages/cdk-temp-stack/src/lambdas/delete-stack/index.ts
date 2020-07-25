import { CloudFormation } from 'aws-sdk';

const cfn = new CloudFormation();

interface DeleteStackEvent {
  stackId: string;
}

export const handler = async (event: DeleteStackEvent): Promise<void> => {
  console.log(event);

  const { stackId } = event;

  await cfn
    .deleteStack({
      StackName: stackId,
    })
    .promise();

  console.log(`Stack ${stackId} deleted!`);
};
