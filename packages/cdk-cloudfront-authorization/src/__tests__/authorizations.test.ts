import 'jest-cdk-snapshot';
import { UserPool } from '@aws-cdk/aws-cognito';
import { App, Stack } from '@aws-cdk/core';

import { SpaAuthorization, StaticSiteAuthorization } from '../authorizations';

test('default spa setup', (): void => {
  const app = new App();

  const stack = new Stack(app, 'Dummy', {
    env: {
      region: 'xxx',
    },
  });

  const userPool = new UserPool(stack, 'UserPool', {
    selfSignUpEnabled: false,
    userPoolName: 'cloudfront-authorization-userpool',
  });

  // UserPool must have a domain!
  userPool.addDomain('Domain', {
    cognitoDomain: {
      domainPrefix: 'cloudcomponents',
    },
  });

  new SpaAuthorization(stack, 'SpaAuthorization', {
    userPool,
  });

  expect(stack).toMatchCdkSnapshot({
    propertyMatchers: {
      Parameters: expect.any(Object),
      Resources: {
        AWS679f53fac002430cb0da5b7982bd22872D164C4C: {
          Properties: {
            Code: expect.any(Object),
          },
        },
        CustomWithConfigurationcloudcomponentscdklambdaatedgepatternwithconfigurationE415FB9B: {
          Properties: {
            Code: expect.any(Object),
          },
        },
        SingletonLambdacloudcomponentscdkcloudfrontauthorizationuserpooldomain78ACEC1A: {
          Properties: {
            Code: expect.any(Object),
          },
        },
        SpaAuthorizationAuthFlowcheckauthProviderAD2E39F4: {
          Properties: {
            Create: {
              physicalResourceId: expect.any(Object),
            },
            Update: {
              physicalResourceId: expect.any(Object),
            },
          },
        },
        SpaAuthorizationAuthFlowhttpheadersProviderCAB23200: {
          Properties: {
            Create: {
              physicalResourceId: expect.any(Object),
            },
            Update: {
              physicalResourceId: expect.any(Object),
            },
          },
        },
        SpaAuthorizationAuthFlowparseauthProviderFAD7CF01: {
          Properties: {
            Create: {
              physicalResourceId: expect.any(Object),
            },
            Update: {
              physicalResourceId: expect.any(Object),
            },
          },
        },
        SpaAuthorizationAuthFlowrefreshauthProvider2F233848: {
          Properties: {
            Create: {
              physicalResourceId: expect.any(Object),
            },
            Update: {
              physicalResourceId: expect.any(Object),
            },
          },
        },
        SpaAuthorizationAuthFlowsignoutProvider0444513A: {
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

test('default static-site setup', (): void => {
  const app = new App();

  const stack = new Stack(app, 'Dummy', {
    env: {
      region: 'xxx',
    },
  });

  const userPool = new UserPool(stack, 'UserPool', {
    selfSignUpEnabled: false,
    userPoolName: 'cloudfront-authorization-userpool',
  });

  // UserPool must have a domain!
  userPool.addDomain('Domain', {
    cognitoDomain: {
      domainPrefix: 'cloudcomponents',
    },
  });

  new StaticSiteAuthorization(stack, 'StaticSiteAuthorization', {
    userPool,
  });

  expect(stack).toMatchCdkSnapshot({
    propertyMatchers: {
      Parameters: expect.any(Object),
      Resources: {
        AWS679f53fac002430cb0da5b7982bd22872D164C4C: {
          Properties: {
            Code: expect.any(Object),
          },
        },
        CustomWithConfigurationcloudcomponentscdklambdaatedgepatternwithconfigurationE415FB9B: {
          Properties: {
            Code: expect.any(Object),
          },
        },
        SingletonLambdacloudcomponentscdkcloudfrontauthorizationuserpooldomain78ACEC1A: {
          Properties: {
            Code: expect.any(Object),
          },
        },
        StaticSiteAuthorizationAuthFlowcheckauthProviderA6235A8D: {
          Properties: {
            Create: {
              physicalResourceId: expect.any(Object),
            },
            Update: {
              physicalResourceId: expect.any(Object),
            },
          },
        },
        StaticSiteAuthorizationAuthFlowhttpheadersProvider1776DA6C: {
          Properties: {
            Create: {
              physicalResourceId: expect.any(Object),
            },
            Update: {
              physicalResourceId: expect.any(Object),
            },
          },
        },
        StaticSiteAuthorizationAuthFlowparseauthProvider72D5CD13: {
          Properties: {
            Create: {
              physicalResourceId: expect.any(Object),
            },
            Update: {
              physicalResourceId: expect.any(Object),
            },
          },
        },
        StaticSiteAuthorizationAuthFlowrefreshauthProvider4DB598E9: {
          Properties: {
            Create: {
              physicalResourceId: expect.any(Object),
            },
            Update: {
              physicalResourceId: expect.any(Object),
            },
          },
        },
        StaticSiteAuthorizationAuthFlowsignoutProvider710213B2: {
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
