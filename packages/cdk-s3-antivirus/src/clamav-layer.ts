import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

/**
 * Clamav Lambda layer.
 */
export class ClamavLayer extends lambda.LayerVersion {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      code: lambda.Code.fromAsset(path.join(__dirname, 'layers', 'clamav', 'layer.zip'), {
        // we hash the Dockerfile (it contains the tools versions) because hashing the zip is non-deterministic
        assetHash: hashFile(path.join(__dirname, 'layers', 'clamav', 'Dockerfile')),
      }),
      description: '/opt/clamav',
    });
  }
}

function hashFile(fileName: string) {
  return crypto.createHash('sha256').update(fs.readFileSync(fileName)).digest('hex');
}
