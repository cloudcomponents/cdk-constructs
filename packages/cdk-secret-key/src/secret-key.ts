import { Grant, IGrantable } from '@aws-cdk/aws-iam';
import { ISecret } from '@aws-cdk/aws-secretsmanager';
import { IParameter } from '@aws-cdk/aws-ssm';

import { KeyType } from './key-type';

export abstract class SecretKey {
  public static fromPlainText(value: string): SecretKey {
    return new PlainTextSecretKey(value);
  }

  public static fromSSMParameter(secretKeyParameter: IParameter): SecretKey {
    return new SSMParameterSecretKey(secretKeyParameter);
  }

  public static fromSecretsManager(secretKeySecret: ISecret, fieldName?: string): SecretKey {
    return new SecretsManagerSecretKey(secretKeySecret, fieldName);
  }

  constructor(public readonly secretKeyType: KeyType) {}

  public abstract grantRead?(grantee: IGrantable): Grant;

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
  constructor(public readonly secretKeySecret: ISecret, public readonly fieldName?: string) {
    super(KeyType.SECRETS_MANAGER);
  }

  public grantRead(grantee: IGrantable): Grant {
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
  constructor(public readonly secretKeyParameter: IParameter) {
    super(KeyType.SSM_PARAMETER);
  }

  public grantRead(grantee: IGrantable): Grant {
    return this.secretKeyParameter.grantRead(grantee);
  }

  public serialize(): string {
    return JSON.stringify({
      secretKeyType: this.secretKeyType,
      parameterName: this.secretKeyParameter.parameterName,
    });
  }
}
