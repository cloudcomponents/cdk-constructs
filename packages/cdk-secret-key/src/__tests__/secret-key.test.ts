import { Stack, aws_secretsmanager, aws_ssm } from 'aws-cdk-lib';

import { KeyType } from '../key-type';
import { SecretKey } from '../secret-key';

test('plain text', (): void => {
  const secretKey = SecretKey.fromPlainText('foo');

  expect(secretKey.serialize()).toEqual(
    JSON.stringify({
      secretKeyType: KeyType.PLAIN_TEXT,
      value: 'foo',
    }),
  );
});

test('ssm parameter', (): void => {
  const stack = new Stack();
  const secretKeyParameter = aws_ssm.StringParameter.fromStringParameterName(stack, 'TestParameter', 'secret-key');
  const secretKey = SecretKey.fromSSMParameter(secretKeyParameter);

  const parsedSecretKey = JSON.parse(secretKey.serialize());

  expect(parsedSecretKey).toEqual({
    secretKeyType: KeyType.SSM_PARAMETER,
    parameterName: secretKeyParameter.parameterName,
  });
});

test('secrets manager', (): void => {
  const stack = new Stack();
  const secretKeySecret = aws_secretsmanager.Secret.fromSecretNameV2(stack, 'TestSecret', 'secret-key');
  const secretKey = SecretKey.fromSecretsManager(secretKeySecret);

  const parsedSecretKey = JSON.parse(secretKey.serialize());

  expect(parsedSecretKey).toEqual({
    secretKeyType: KeyType.SECRETS_MANAGER,
    secretId: secretKeySecret.secretArn,
  });
});

test('secrets manager with fieldName', (): void => {
  const stack = new Stack();
  const secretKeySecret = aws_secretsmanager.Secret.fromSecretNameV2(stack, 'TestSecret', 'secret-key');
  const secretKey = SecretKey.fromSecretsManager(secretKeySecret, 'api');

  const parsedSecretKey = JSON.parse(secretKey.serialize());

  expect(parsedSecretKey).toEqual({
    secretKeyType: KeyType.SECRETS_MANAGER,
    secretId: secretKeySecret.secretArn,
    fieldName: 'api',
  });
});
