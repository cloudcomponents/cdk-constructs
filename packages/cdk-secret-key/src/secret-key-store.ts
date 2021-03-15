import { Grant, IGrantable } from '@aws-cdk/aws-iam';
import { ISecret } from '@aws-cdk/aws-secretsmanager';
import { IParameter } from '@aws-cdk/aws-ssm';

import { KeyType } from './key-type';

export abstract class SecretKeyStore {
  public static fromSSMParameter(secretKeyParameter: IParameter): SecretKeyStore {
    return new SSMParameterSecretKeyStore(secretKeyParameter);
  }

  public static fromSecretsManager(secretKeySecret: ISecret): SecretKeyStore {
    return new SecretsManagerSecretKeyStore(secretKeySecret);
  }

  constructor(public readonly secretKeyType: KeyType) {}

  public abstract grantWrite(grantee: IGrantable): Grant;

  public abstract serialize(): string;
}

class SecretsManagerSecretKeyStore extends SecretKeyStore {
  constructor(public readonly secretKeySecret: ISecret) {
    super(KeyType.SECRETS_MANAGER);
  }

  public grantWrite(grantee: IGrantable): Grant {
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
  constructor(public readonly secretKeyParameter: IParameter) {
    super(KeyType.SSM_PARAMETER);
  }

  public grantWrite(grantee: IGrantable): Grant {
    return this.secretKeyParameter.grantWrite(grantee);
  }

  public serialize(): string {
    return JSON.stringify({
      secretKeyType: this.secretKeyType,
      parameterName: this.secretKeyParameter.parameterName,
    });
  }
}
