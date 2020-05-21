import {
    CloudFormationCustomResourceEvent,
    CloudFormationCustomResourceDeleteEvent,
} from 'aws-lambda';
import { S3 } from 'aws-sdk';

export interface EcsTaskDefinitionProps {
    bucketName: string;
}

const s3 = new S3();

const getProperties = (
    props: CloudFormationCustomResourceDeleteEvent['ResourceProperties'],
): EcsTaskDefinitionProps => ({
    bucketName: props.BucketName,
});

const emptyBucket = async (bucketName: string): Promise<void> => {
    const listedObjects = await s3
        .listObjectVersions({
            Bucket: bucketName,
        })
        .promise();

    const deletableObjects = new Array<S3.ObjectIdentifier>();

    listedObjects.Versions?.forEach((version) => {
        deletableObjects.push({
            Key: version.Key as string,
            VersionId: version.VersionId,
        });
    });

    listedObjects.DeleteMarkers?.forEach((marker) => {
        deletableObjects.push({
            Key: marker.Key as string,
            VersionId: marker.VersionId,
        });
    });

    if (deletableObjects.length === 0) return;

    await s3
        .deleteObjects({
            Bucket: bucketName,
            Delete: { Objects: deletableObjects },
        })
        .promise();

    if (listedObjects.IsTruncated) await emptyBucket(bucketName);
};

const onDelete = async (
    event: CloudFormationCustomResourceDeleteEvent,
): Promise<void> => {
    const { bucketName } = getProperties(event.ResourceProperties);

    await emptyBucket(bucketName);
};

export const handler = async (
    event: CloudFormationCustomResourceEvent,
): Promise<void> => {
    const requestType = event.RequestType;

    if (requestType === 'Delete') {
        return onDelete(event as CloudFormationCustomResourceDeleteEvent);
    }
};
