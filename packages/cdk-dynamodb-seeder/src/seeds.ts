import * as fs from 'fs';
import { IBucket, Location } from '@aws-cdk/aws-s3';
import { Asset, AssetOptions } from '@aws-cdk/aws-s3-assets';
import { Construct } from '@aws-cdk/core';

export abstract class Seeds {
  /**
   * @returns `S3Seeds` associated with the specified S3 object.
   * @param bucket The S3 bucket
   * @param key The object key
   * @param objectVersion Optional S3 object version
   */
  public static fromBucket(bucket: IBucket, key: string, objectVersion?: string): S3Seeds {
    return new S3Seeds(bucket, key, objectVersion);
  }

  /**
   * @returns `InlineSeeds` with inline seeds.
   * @param seeds The actual json code (limited to 4KiB)
   */
  public static fromInline(seeds: Record<string, unknown>[]): InlineSeeds {
    return new InlineSeeds(JSON.stringify(seeds));
  }

  /**
   * Loads the seeds from a local disk path and uploads it to s3.
   *
   * @returns `JsonFileSeeds` associated with the specified S3 object.
   * @param path Path to json seeds file.
   */
  public static fromJsonFile(path: string, options?: AssetOptions): JsonFileSeeds {
    return new JsonFileSeeds(path, options);
  }

  /**
   * Called when the seeder is initialized to allow this object to bind
   * to the stack.
   *
   * @param scope The binding scope.
   */
  public abstract bind(scope: Construct): SeedsConfig;
}

export interface SeedsConfig {
  /**
   * The location of the seeds in S3.
   */
  readonly s3Location?: Location;

  /**
   * Inline seeds.
   */
  readonly inlineSeeds?: string;
}

/**
 * Seeds from an S3 archive.
 */
export class S3Seeds extends Seeds {
  private bucketName: string;

  constructor(bucket: IBucket, private key: string, private objectVersion?: string) {
    super();

    if (!bucket.bucketName) {
      throw new Error('BucketName is undefined for the provided bucket');
    }

    this.bucketName = bucket.bucketName;
  }

  public bind(_scope: Construct): SeedsConfig {
    return {
      s3Location: {
        bucketName: this.bucketName,
        objectKey: this.key,
        objectVersion: this.objectVersion,
      },
    };
  }
}

/**
 * Seeds from an inline json object (limited to 4KiB).
 */
export class InlineSeeds extends Seeds {
  constructor(private seeds: string) {
    super();

    if (seeds.length === 0) {
      throw new Error('Inline seeds cannot be empty');
    }

    if (seeds.length > 4096) {
      throw new Error(`Inline seeds are too large, must be <= 4096 but is ${seeds.length}`);
    }
  }

  public bind(_scope: Construct): SeedsConfig {
    return {
      inlineSeeds: this.seeds,
    };
  }
}

/**
 * Seeds from a local json file.
 */
export class JsonFileSeeds extends Seeds {
  private asset?: Asset;

  constructor(public readonly path: string, private readonly options: AssetOptions = {}) {
    super();
  }

  public bind(scope: Construct): SeedsConfig {
    // If the same JsonFileSeeds is used multiple times, retain only the first instantiation.
    if (!this.asset) {
      this.asset = new Asset(scope, 'JsonFileSeeds', {
        path: this.path,
        ...this.options,
      });
    }

    try {
      JSON.parse(fs.readFileSync(this.path, 'utf-8'));
    } catch (e) {
      throw new Error('Could not convert file to JSON');
    }

    return {
      s3Location: {
        bucketName: this.asset.s3BucketName,
        objectKey: this.asset.s3ObjectKey,
      },
    };
  }
}
