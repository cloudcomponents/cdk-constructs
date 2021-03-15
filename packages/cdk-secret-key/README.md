[![cloudcomponents Logo](https://raw.githubusercontent.com/cloudcomponents/cdk-constructs/master/logo.png)](https://github.com/cloudcomponents/cdk-constructs)

# @cloudcomponents/cdk-secret-key 

[![Build Status](https://github.com/cloudcomponents/cdk-constructs/workflows/Build/badge.svg)](https://github.com/cloudcomponents/cdk-constructs/actions?query=workflow=Build)
[![cdkdx](https://img.shields.io/badge/buildtool-cdkdx-blue.svg)](https://github.com/hupe1980/cdkdx)
[![typescript](https://img.shields.io/badge/jsii-typescript-blueviolet.svg)](https://www.npmjs.com/package/@cloudcomponents/cdk-secret-key)
[![python](https://img.shields.io/badge/jsii-python-blueviolet.svg)](https://pypi.org/project/cloudcomponents.cdk-secret-key/)

> Provide secret keys to lambdas

## Install
TypeScript/JavaScript:

```bash
npm i @cloudcomponents/cdk-secret-key
```

Python:

```bash
pip install cloudcomponents.cdk-secret-key
```

## How to use

```typescript
import { SecretKey } from '@cloudcomponents/cdk-secret-key';

const secretKey = SecretKey.fromPlainText(process.env.SECRET_KEY as string);
const secretKeyString = secretKey.serialize(),

```

See [cloudcomponents/lambda-utils-nodejs](https://github.com/cloudcomponents/lambda-utils-nodejs) for the counterpart in lambda functions

## API Reference

See [API.md](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-secret-key/API.md).

## Example

See more complete [examples](https://github.com/cloudcomponents/cdk-constructs/tree/master/examples).

## License

[MIT](https://github.com/cloudcomponents/cdk-constructs/tree/master/packages/cdk-secret-key/LICENSE)
