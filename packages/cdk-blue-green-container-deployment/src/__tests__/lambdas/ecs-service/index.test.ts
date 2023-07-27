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

  test('sends enable execute true command with create request', async () => {
        const response = await handleCreate(
            {
                ...defaultEvent,
                RequestType: 'Create',
                ResourceProperties: {
                    ...defaultEcsServiceResourceProperties,
                    EnableExecuteCommand: true,
                },
            },
            defaultContext,
            defaultLogger,
        );

        expect(mockCreateRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                enableExecuteCommand: true,
            }),
        );
    });

  test('sends enable execute false command with create request', async () => {
        const response = await handleCreate(
            {
                ...defaultEvent,
                RequestType: 'Create',
                ResourceProperties: {
                    ...defaultEcsServiceResourceProperties,
                    EnableExecuteCommand: false,
                },
            },
            defaultContext,
            defaultLogger,
        );

        expect(mockCreateRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                enableExecuteCommand: false,
            }),
        );
    });

  test('enable execute command defaults to undefined', async () => {
        const response = await handleCreate(
            {
                ...defaultEvent,
                RequestType: 'Create',
                ResourceProperties: {
                    ...defaultEcsServiceResourceProperties,
                },
            },
            defaultContext,
            defaultLogger,
        );

        expect(mockCreateRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                enableExecuteCommand: undefined,
            }),
        );
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

    test('update enable execute command', async () => {
        await handleUpdate(
            {
                ...defaultEvent,
                RequestType: 'Update',
                PhysicalResourceId: 'foo',
                ResourceProperties: {
                    ...defaultEcsServiceResourceProperties,
                    EnableExecuteCommand: true,
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
                enableExecuteCommand: true
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
});
