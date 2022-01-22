import { aws_iam, aws_secretsmanager, aws_ssm } from 'aws-cdk-lib';

import { KeyType } from './key-type';

export abstract class SecretKey {
  public static fromPlainText(value: string): SecretKey {
    return new PlainTextSecretKey(value);
  }

  public static fromSSMParameter(secretKeyParameter: aws_ssm.IParameter): SecretKey {
    return new SSMParameterSecretKey(secretKeyParameter);
  }

  public static fromSecretsManager(secretKeySecret: aws_secretsmanager.ISecret, fieldName?: string): SecretKey {
    return new SecretsManagerSecretKey(secretKeySecret, fieldName);
  }

  constructor(public readonly secretKeyType: KeyType) {}

  public abstract grantRead?(grantee: aws_iam.IGrantable): aws_iam.Grant;

  public abstract serialize(): string;
}

class PlainTextSecretKey extends SecretKey {
  public grantRead: undefined;

  constructor(public readonly value: string) {
    super(KeyType.PLAIN_TEXT);
  }

  public serialize(): string {
    return JSON.stringify({
      secretKeyType: this.secretKeyType,
      value: this.value,
    });
  }
}

class SecretsManagerSecretKey extends SecretKey {
  constructor(public readonly secretKeySecret: aws_secretsmanager.ISecret, public readonly fieldName?: string) {
    super(KeyType.SECRETS_MANAGER);
  }

  public grantRead(grantee: aws_iam.IGrantable): aws_iam.Grant {
    return this.secretKeySecret.grantRead(grantee);
  }

  public serialize(): string {
    return JSON.stringify({
      secretKeyType: this.secretKeyType,
      secretId: this.secretKeySecret.secretArn,
      fieldName: this.fieldName,
    });
  }
}

class SSMParameterSecretKey extends SecretKey {
  constructor(public readonly secretKeyParameter: aws_ssm.IParameter) {
    super(KeyType.SSM_PARAMETER);
  }

  public grantRead(grantee: aws_iam.IGrantable): aws_iam.Grant {
    return this.secretKeyParameter.grantRead(grantee);
  }

  public serialize(): string {
    return JSON.stringify({
      secretKeyType: this.secretKeyType,
      parameterName: this.secretKeyParameter.parameterName,
    });
  }
}
