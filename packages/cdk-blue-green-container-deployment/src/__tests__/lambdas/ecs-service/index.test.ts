const mockEcsCreate = jest.fn();
const mockEcsUpdate = jest.fn();
const mockEcsTagResource = jest.fn();
const mockEcsUntagResource = jest.fn();

jest.mock('aws-sdk', () => {
  return {
    ECS: jest.fn().mockImplementation(() => {
      return {
        createService: mockEcsCreate.mockReturnValue({
          promise: jest.fn().mockResolvedValue({
            service: {
              serviceArn: 'arn:aws:ecs:us-east-1:012345678910:service/MyCluster/MyService',
              serviceName: 'MyService',
            },
          }),
        }),
        updateService: mockEcsUpdate.mockReturnValue({
          promise: jest.fn().mockResolvedValue({
            service: {
              serviceArn: 'arn:aws:ecs:us-east-1:012345678910:service/MyCluster/MyService',
              serviceName: 'MyService',
            },
          }),
        }),
        tagResource: mockEcsTagResource.mockReturnValue({
          promise: jest.fn().mockResolvedValue({}),
        }),
        untagResource: mockEcsUntagResource.mockReturnValue({
          promise: jest.fn().mockResolvedValue({}),
        }),
      };
    }),
  };
});

import { handleCreate, handleUpdate } from '../../../lambdas/ecs-service';
import { defaultContext } from '../__fixtures__/defaultContext';
import { defaultEcsServiceResourceProperties } from '../__fixtures__/defaultEcsServiceResourceProperties';
import { defaultEvent } from '../__fixtures__/defaultEvent';
import { defaultLogger } from '../__fixtures__/defaultLogger';

afterEach(() => {
  mockEcsCreate.mockClear();
  mockEcsUpdate.mockClear();
  mockEcsTagResource.mockClear();
  mockEcsUntagResource.mockClear();
});

describe('createHandler', () => {
  it('sends tags with create request', async () => {
    const response = await handleCreate(
      {
        ...defaultEvent,
        RequestType: 'Create',
        ResourceProperties: {
          ...defaultEcsServiceResourceProperties,
          Tags: [
            { Key: 'foo', Value: 'bar' },
            { Key: 'k', Value: 'west' },
          ],
        },
      },
      defaultContext,
      defaultLogger,
    );

    expect(mockEcsCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        tags: [
          { key: 'foo', value: 'bar' },
          { key: 'k', value: 'west' },
        ],
      }),
    );

    expect(response).toEqual({
      physicalResourceId: 'arn:aws:ecs:us-east-1:012345678910:service/MyCluster/MyService',
      responseData: {
        ServiceName: 'MyService',
      },
    });
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
          ...defaultEcsServiceResourceProperties,
          Tags: [
            { Key: 'dis', Value: 'dat' },
            { Key: 'k', Value: 'west' },
            { Key: 'ye', Value: 'west' },
          ],
        },
        OldResourceProperties: {
          ...defaultEcsServiceResourceProperties,
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

    expect(mockEcsUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        cluster: 'foo',
        deploymentConfiguration: {},
        desiredCount: 1,
        healthCheckGracePeriodSeconds: 3,
        service: 'foo',
      }),
    );

    expect(mockEcsUntagResource).toHaveBeenCalledWith({
      resourceArn: 'arn:aws:ecs:us-east-1:012345678910:service/MyCluster/MyService',
      tagKeys: ['foo'],
    });

    expect(mockEcsTagResource).toHaveBeenCalledWith(
      expect.objectContaining({
        resourceArn: 'arn:aws:ecs:us-east-1:012345678910:service/MyCluster/MyService',
        tags: [
          { key: 'dis', value: 'dat' },
          { key: 'k', value: 'west' },
          { key: 'ye', value: 'west' },
        ],
      }),
    );
  });

  it('does not delete keys if no old keys are deleted', async () => {
    await handleUpdate(
      {
        ...defaultEvent,
        RequestType: 'Update',
        PhysicalResourceId: 'foo',
        ResourceProperties: {
          ...defaultEcsServiceResourceProperties,
          Tags: [
            { Key: 'dis', Value: 'dat' },
            { Key: 'k', Value: 'west' },
            { Key: 'ye', Value: 'west' },
          ],
        },
        OldResourceProperties: {
          ...defaultEcsServiceResourceProperties,
          Tags: [
            { Key: 'dis', Value: 'dat' },
            { Key: 'k', Value: 'west' },
            { Key: 'ye', Value: 'west' },
          ],
        },
      },
      defaultContext,
      defaultLogger,
    );

    expect(mockEcsUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        cluster: 'foo',
        deploymentConfiguration: {},
        desiredCount: 1,
        healthCheckGracePeriodSeconds: 3,
        service: 'foo',
      }),
    );

    expect(mockEcsUntagResource).not.toHaveBeenCalled();

    expect(mockEcsTagResource).toHaveBeenCalledWith(
      expect.objectContaining({
        resourceArn: 'arn:aws:ecs:us-east-1:012345678910:service/MyCluster/MyService',
        tags: [
          { key: 'dis', value: 'dat' },
          { key: 'k', value: 'west' },
          { key: 'ye', value: 'west' },
        ],
      }),
    );
  });

  it('does not delete or create keys if no old keys or new keys are present', async () => {
    await handleUpdate(
      {
        ...defaultEvent,
        RequestType: 'Update',
        PhysicalResourceId: 'foo',
        ResourceProperties: {
          ...defaultEcsServiceResourceProperties,
          Tags: [],
        },
        OldResourceProperties: {
          ...defaultEcsServiceResourceProperties,
          Tags: [],
        },
      },
      defaultContext,
      defaultLogger,
    );

    expect(mockEcsUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        cluster: 'foo',
        deploymentConfiguration: {},
        desiredCount: 1,
        healthCheckGracePeriodSeconds: 3,
        service: 'foo',
      }),
    );

    expect(mockEcsUntagResource).not.toHaveBeenCalled();

    expect(mockEcsTagResource).not.toHaveBeenCalled();
  });
});
