import * as os from 'os';
import * as path from 'path';
import { S3 } from 'aws-sdk';
import execa from 'execa';
import * as fs from 'fs-extra';
import globby from 'globby';

const FRESHCLAM_CONF = '/tmp/freshclam.conf';
const REG_EXP = new RegExp('\\w+.c[vl]d');

export interface ScanResult {
  readonly bucket: string;
  readonly key: string;
  readonly status: ScanStatus;
  readonly message: string;
}

export interface AntiVirusOptions {
  readonly definitionsPath: string;
  readonly scanStatusTagName: string;
}

export class AntiVirus {
  private readonly s3: S3;

  constructor(private readonly options: AntiVirusOptions, s3?: S3) {
    this.s3 = s3 ?? new S3();
  }

  public async updateDefinitions(config: string[]): Promise<void> {
    const exists = await this.fileExists(FRESHCLAM_CONF);
    if (!exists) {
      await fs.writeFile(FRESHCLAM_CONF, config.join('\n'));
    }

    const args: string[] = [];

    args.push(`--config-file=${FRESHCLAM_CONF}`);
    args.push('--stdout');
    args.push('-u');
    args.push(os.userInfo().username);
    args.push(`--datadir=${this.options.definitionsPath}`);

    await execa('/opt/clamav/freshclam', args);
  }

  public async scan(bucket: string, key: string, scanPath: string): Promise<ScanResult> {
    await this.updateScanStatus(bucket, key, ScanStatus.IN_PROGRESS);
    await this.downloadFile(bucket, key, scanPath);

    try {
      const args: string[] = [];

      args.push('-v');
      args.push('--stdout');
      args.push(`--database=${this.options.definitionsPath}`);
      args.push('-r');
      args.push(scanPath);

      const result = await execa('/opt/clamav/clamscan', args);

      await this.updateScanStatus(bucket, key, ScanStatus.CLEAN);

      return {
        bucket,
        key,
        status: ScanStatus.CLEAN,
        message: result.stdout,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.exitCode === 1) {
        await this.updateScanStatus(bucket, key, ScanStatus.INFECTED);

        return {
          bucket,
          key,
          status: ScanStatus.INFECTED,
          message: error.stdout,
        };
      }

      await this.updateScanStatus(bucket, key, ScanStatus.ERROR);
      throw error;
    } finally {
      await this.cleanUp(scanPath);
    }
  }

  public async uploadDefinitions(bucket: string): Promise<void> {
    const files = await globby(this.options.definitionsPath, {
      onlyFiles: true,
    });

    console.log(files);

    await Promise.all(
      files.map((file: string) => {
        if (!REG_EXP.exec(file)) return;
        return this.uploadFile(bucket, path.basename(file), file);
      }),
    );
  }

  public async downloadDefinitions(bucket: string): Promise<void> {
    const { Contents: contents } = await this.s3
      .listObjectsV2({
        Bucket: bucket,
      })
      .promise();

    if (!contents) return;

    await Promise.all(
      contents.map(({ Key: key }) => {
        if (!key || !REG_EXP.exec(key)) return;
        return this.downloadFile(bucket, key, path.join(this.options.definitionsPath, key));
      }),
    );
  }

  private async updateScanStatus(bucket: string, key: string, status: ScanStatus): Promise<string | undefined> {
    const { VersionId: versionId } = await this.s3
      .putObjectTagging({
        Bucket: bucket,
        Key: key,
        Tagging: {
          TagSet: [
            {
              Key: this.options.scanStatusTagName,
              Value: status,
            },
          ],
        },
      })
      .promise();
    return versionId;
  }

  private async cleanUp(path: string): Promise<void> {
    await fs.remove(path);
  }

  private async uploadFile(bucket: string, key: string, path: string): Promise<void> {
    await this.s3
      .upload({
        Bucket: bucket,
        Key: key,
        Body: fs.createReadStream(path),
      })
      .promise();
  }

  private async downloadFile(bucket: string, key: string, path: string): Promise<void> {
    const ws = fs.createWriteStream(path);
    return new Promise((resolve, reject) => {
      this.s3
        .getObject({
          Bucket: bucket,
          Key: key,
        })
        .createReadStream()
        .on('end', resolve)
        .on('error', reject)
        .pipe(ws);
    });
  }

  private async fileExists(path: string): Promise<boolean> {
    try {
      await fs.access(path);
      return true;
    } catch {
      return false;
    }
  }
}

enum ScanStatus {
  IN_PROGRESS = 'IN PROGRESS',
  CLEAN = 'CLEAN',
  INFECTED = 'INFECTED',
  ERROR = 'ERROR',
}
