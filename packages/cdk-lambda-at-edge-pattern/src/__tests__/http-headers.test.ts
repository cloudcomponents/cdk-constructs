import { App, Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { HttpHeaders } from '../http-headers';

test('default setup: us-east-1', () => {
  // GIVEN
  const app = new App();

  const stack = new Stack(app, 'Dummy', {
    env: {
      region: 'us-east-1',
    },
  });

  // WHEN
  new HttpHeaders(stack, 'HttpHeaders', {
    httpHeaders: {
      'Content-Security-Policy':
        "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none'; connect-src 'self'",
      'Strict-Transport-Security':
        'max-age=31536000; includeSubdomains; preload',
      'Referrer-Policy': 'same-origin',
      'X-XSS-Protection': '1; mode=block',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-cache',
    },
  });

  // THEN
  const supportStack = app.node.tryFindChild(`lambda-at-edge-support-stack`);

  expect(supportStack).toBeUndefined();

  expect(stack).toMatchCdkSnapshot({
    propertyMatchers: {
      Resources: {
        httpheadersProvider158513BA: {
          Properties: {
            Create: {
              physicalResourceId: expect.any(Object),
            },
            Update: {
              physicalResourceId: expect.any(Object),
            },
          },
        },
      },
    },
  });
});

test('default setup: not us-east-1', () => {
  // GIVEN
  const app = new App();

  const stack = new Stack(app, 'Dummy', {
    env: {
      region: 'xxx',
    },
  });

  // WHEN
  new HttpHeaders(stack, 'HttpHeaders', {
    httpHeaders: {
      'Content-Security-Policy':
        "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none'; connect-src 'self'",
      'Strict-Transport-Security':
        'max-age=31536000; includeSubdomains; preload',
      'Referrer-Policy': 'same-origin',
      'X-XSS-Protection': '1; mode=block',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-cache',
    },
  });

  // THEN
  const supportStack = app.node.tryFindChild(`lambda-at-edge-support-stack`);

  expect(supportStack).toMatchCdkSnapshot();

  expect(stack).toMatchCdkSnapshot({
    propertyMatchers: {
      Resources: {
        httpheadersProvider158513BA: {
          Properties: {
            Create: {
              physicalResourceId: expect.any(Object),
            },
            Update: {
              physicalResourceId: expect.any(Object),
            },
          },
        },
      },
    },
  });
});

test('blacklist', () => {
  // GIVEN
  const app = new App();

  const stack = new Stack(app, 'Dummy');

  // WHEN
  const addHttpHeader = () => {
    new HttpHeaders(stack, 'TimeToLive1', {
      httpHeaders: {
        connection: 'foo',
      },
    });
  };

  // THEN
  expect(() => addHttpHeader()).toThrowError(
    /HttpHeader connection is blacklisted and can't be added by Lambda@Edge functions/,
  );
});
