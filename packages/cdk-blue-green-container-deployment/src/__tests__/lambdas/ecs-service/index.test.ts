const mockCreateRequest = jest.fn();
const mockUpdateRequest = jest.fn();
const mockTagResourceRequest = jest.fn();
const mockUntagResourceRequest = jest.fn();

jest.mock('aws-sdk', () => {
  return {
    ECS: jest.fn().mockImplementation(() => {
      return {
        createService: mockCreateRequest.mockReturnValue({
          promise: jest.fn().mockResolvedValue({
            service: {
              serviceArn: 'arn:aws:ecs:us-east-1:012345678910:service/MyCluster/MyService',
              serviceName: 'MyService',
            },
          }),
        }),
        updateService: mockUpdateRequest.mockReturnValue({
          promise: jest.fn().mockResolvedValue({
            service: {
              serviceArn: 'arn:aws:ecs:us-east-1:012345678910:service/MyCluster/MyService',
              serviceName: 'MyService',
            },
          }),
        }),
        tagResource: mockTagResourceRequest.mockReturnValue({
          promise: jest.fn().mockResolvedValue({}),
        }),
        untagResource: mockUntagResourceRequest.mockReturnValue({
          promise: jest.fn().mockResolvedValue({}),
        }),
      };
    }),
  };
});

import { handleCreate, handleUpdate } from '../../../lambdas/ecs-service';
import { defaultContext } from '../__fixtures__/default-context';
import { defaultEcsServiceResourceProperties } from '../__fixtures__/default-ecs-service-resource-properties';
import { defaultEvent } from '../__fixtures__/default-event';
import { defaultLogger } from '../__fixtures__/default-logger';

afterEach(() => {
  mockCreateRequest.mockClear();
  mockUpdateRequest.mockClear();
  mockTagResourceRequest.mockClear();
  mockUntagResourceRequest.mockClear();
});

describe('createHandler', () => {
  test('sends tags with create request', async () => {
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

    expect(mockCreateRequest).toHaveBeenCalledWith(
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

  describe('with desired count', () => {
    test('sends the specified desired count', async () => {
      await handleCreate(
        {
          ...defaultEvent,
          RequestType: 'Create',
          ResourceProperties: {
            ...defaultEcsServiceResourceProperties,
            DesiredCount: 4,
          },
        },
        defaultContext,
        defaultLogger,
      );

      expect(mockCreateRequest).toHaveBeenCalledWith(expect.objectContaining({ desiredCount: 4 }));
    });
  });

  describe('without desired count', () => {
    test('sends 1 (default) as the desired count', async () => {
      await handleCreate(
        {
          ...defaultEvent,
          RequestType: 'Create',
          ResourceProperties: {
            ...defaultEcsServiceResourceProperties,
            desiredCount: undefined,
          },
        },
        defaultContext,
        defaultLogger,
      );

      expect(mockCreateRequest).toHaveBeenCalledWith(expect.objectContaining({ desiredCount: 1 }));
    });
  });
});

describe('updateHandler', () => {
  test('sends data update request', async () => {
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

    expect(mockUpdateRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        cluster: 'foo',
        deploymentConfiguration: {},
        desiredCount: 1,
        healthCheckGracePeriodSeconds: 3,
        service: 'foo',
      }),
    );

    expect(mockUntagResourceRequest).toHaveBeenCalledWith({
      resourceArn: 'arn:aws:ecs:us-east-1:012345678910:service/MyCluster/MyService',
      tagKeys: ['foo'],
    });

    expect(mockTagResourceRequest).toHaveBeenCalledWith(
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

  test('does not delete keys if no old keys are deleted', async () => {
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

    expect(mockUpdateRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        cluster: 'foo',
        deploymentConfiguration: {},
        desiredCount: 1,
        healthCheckGracePeriodSeconds: 3,
        service: 'foo',
      }),
    );

    expect(mockUntagResourceRequest).not.toHaveBeenCalled();

    expect(mockTagResourceRequest).toHaveBeenCalledWith(
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

  test('does not delete or create keys if no old keys or new keys are present', async () => {
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

    expect(mockUpdateRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        cluster: 'foo',
        deploymentConfiguration: {},
        desiredCount: 1,
        healthCheckGracePeriodSeconds: 3,
        service: 'foo',
      }),
    );

    expect(mockUntagResourceRequest).not.toHaveBeenCalled();

    expect(mockTagResourceRequest).not.toHaveBeenCalled();
  });

  describe('with desired count', () => {
    test('sends the desired count', async () => {
      await handleUpdate(
        {
          ...defaultEvent,
          RequestType: 'Update',
          PhysicalResourceId: 'foo',
          ResourceProperties: {
            ...defaultEcsServiceResourceProperties,
            DesiredCount: 3,
          },
          OldResourceProperties: {
            ...defaultEcsServiceResourceProperties,
            DesiredCount: 2,
          },
        },
        defaultContext,
        defaultLogger,
      );
      expect(mockUpdateRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          cluster: 'foo',
          deploymentConfiguration: {},
          desiredCount: 3,
          healthCheckGracePeriodSeconds: 3,
          service: 'foo',
        }),
      );
    });
  });

  describe('without desired count', () => {
    test('does not send the desired count', async () => {
      await handleUpdate(
        {
          ...defaultEvent,
          RequestType: 'Update',
          PhysicalResourceId: 'foo',
          ResourceProperties: {
            ...defaultEcsServiceResourceProperties,
            DesiredCount: undefined,
          },
          OldResourceProperties: {
            ...defaultEcsServiceResourceProperties,
          },
        },
        defaultContext,
        defaultLogger,
      );
      expect(mockUpdateRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          desiredCount: undefined,
        }),
      );
    });
  });
});
