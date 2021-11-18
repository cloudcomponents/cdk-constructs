const mockCodeDeployCreate = jest.fn();
const mockCodeDeployUpdate = jest.fn();
const mockCodeDeployTagResource = jest.fn();
const mockCodeDeployUntagResource = jest.fn();

jest.mock('aws-sdk', () => {
  return {
    CodeDeploy: jest.fn().mockImplementation(() => {
      return {
        createDeploymentGroup: mockCodeDeployCreate.mockReturnValue({
          promise: jest.fn().mockResolvedValue({
            service: {
              serviceArn: 'arn:aws:ecs:us-east-1:012345678910:service/MyCluster/MyService',
              serviceName: 'MyService',
            },
          }),
        }),
        updateDeploymentGroup: mockCodeDeployUpdate.mockReturnValue({
          promise: jest.fn().mockResolvedValue({
            service: {
              serviceArn: 'arn:aws:ecs:us-east-1:012345678910:service/MyCluster/MyService',
              serviceName: 'MyService',
            },
          }),
        }),
        tagResource: mockCodeDeployTagResource.mockReturnValue({
          promise: jest.fn().mockResolvedValue({}),
        }),
        untagResource: mockCodeDeployUntagResource.mockReturnValue({
          promise: jest.fn().mockResolvedValue({}),
        }),
      };
    }),
  };
});

import { handleCreate, handleUpdate } from '../../../lambdas/ecs-deployment-group';
import { defaultContext } from '../__fixtures__/defaultContext';
import { defaultEvent } from '../__fixtures__/defaultEvent';
import { defaultLogger } from '../__fixtures__/defaultLogger';

const defaultEcsDeploymentGroupProperties = {
  ApplicationName: 'Foo',
  DeploymentGroupName: 'Foo',
  ServiceRoleArn: 'arn:aws:iam::012345678910:role/MyRole',
  EcsServices: [
    {
      ServiceName: 'Foo',
      ClusterName: 'Foo',
    },
  ],
  TargetGroupNames: ['Foo'],
  ProdTrafficListenerArn: 'arn:aws:elasticloadbalancing::012345678910:listener/app/MyApp/foo/prod',
  TestTrafficListenerArn: 'arn:aws:elasticloadbalancing::012345678910:listener/app/MyApp/foo/test',
  TerminationWaitTimeInMinutes: 5,
  ArnForDeploymentGroup: 'arn:aws:ecs:us-east-1:012345678910:service/MyCluster/MyService',
};

describe('createHandler', () => {
  it('sends tags with create request', async () => {
    await handleCreate(
      {
        ...defaultEvent,
        RequestType: 'Create',
        ResourceProperties: {
          ServiceToken: 'foo',
          ...defaultEcsDeploymentGroupProperties,
          Tags: [
            { Key: 'foo', Value: 'bar' },
            { Key: 'k', Value: 'west' },
          ],
        },
      },
      defaultContext,
      defaultLogger,
    );

    expect(mockCodeDeployCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        tags: [
          { Key: 'foo', Value: 'bar' },
          { Key: 'k', Value: 'west' },
        ],
      }),
    );
  });
});

describe('updateHandler', () => {
  it('sends data update request', async () => {
    await handleUpdate(
      {
        ...defaultEvent,
        RequestType: 'Update',
        PhysicalResourceId: 'foo',
        ResourceProperties: {
          ServiceToken: 'foo',
          ...defaultEcsDeploymentGroupProperties,
          Tags: [
            { Key: 'dis', Value: 'dat' },
            { Key: 'k', Value: 'west' },
            { Key: 'ye', Value: 'west' },
          ],
        },
        OldResourceProperties: {
          ServiceToken: 'foo',
          ...defaultEcsDeploymentGroupProperties,
          Tags: [
            { Key: 'foo', Value: 'bar' },
            { Key: 'k', Value: 'WEST' },
            { Key: 'ye', Value: 'west' },
          ],
        },
      },
      defaultContext,
      defaultLogger,
    );

    expect(mockCodeDeployUpdate).toHaveBeenCalled();

    expect(mockCodeDeployUntagResource).toHaveBeenCalledWith({
      ResourceArn: 'arn:aws:ecs:us-east-1:012345678910:service/MyCluster/MyService',
      TagKeys: ['foo'],
    });

    expect(mockCodeDeployTagResource).toHaveBeenCalledWith(
      expect.objectContaining({
        ResourceArn: 'arn:aws:ecs:us-east-1:012345678910:service/MyCluster/MyService',
        Tags: [
          { Key: 'dis', Value: 'dat' },
          { Key: 'k', Value: 'west' },
          { Key: 'ye', Value: 'west' },
        ],
      }),
    );
  });
});
