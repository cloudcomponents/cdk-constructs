import { aws_iam, aws_secretsmanager, aws_ssm } from 'aws-cdk-lib';

import { KeyType } from './key-type';

export abstract class SecretKeyStore {
  public static fromSSMParameter(secretKeyParameter: aws_ssm.IParameter): SecretKeyStore {
    return new SSMParameterSecretKeyStore(secretKeyParameter);
  }

  public static fromSecretsManager(secretKeySecret: aws_secretsmanager.ISecret): SecretKeyStore {
    return new SecretsManagerSecretKeyStore(secretKeySecret);
  }

  constructor(public readonly secretKeyType: KeyType) {}

  public abstract grantWrite(grantee: aws_iam.IGrantable): aws_iam.Grant;

  public abstract serialize(): string;
}

class SecretsManagerSecretKeyStore extends SecretKeyStore {
  constructor(public readonly secretKeySecret: aws_secretsmanager.ISecret) {
    super(KeyType.SECRETS_MANAGER);
  }

  public grantWrite(grantee: aws_iam.IGrantable): aws_iam.Grant {
    return this.secretKeySecret.grantWrite(grantee);
  }

  public serialize(): string {
    return JSON.stringify({
      secretKeyType: this.secretKeyType,
      secretArn: this.secretKeySecret.secretArn,
    });
  }
}

class SSMParameterSecretKeyStore extends SecretKeyStore {
  constructor(public readonly secretKeyParameter: aws_ssm.IParameter) {
    super(KeyType.SSM_PARAMETER);
  }

  public grantWrite(grantee: aws_iam.IGrantable): aws_iam.Grant {
    return this.secretKeyParameter.grantWrite(grantee);
  }

  public serialize(): string {
    return JSON.stringify({
      secretKeyType: this.secretKeyType,
      parameterName: this.secretKeyParameter.parameterName,
    });
  }
}
