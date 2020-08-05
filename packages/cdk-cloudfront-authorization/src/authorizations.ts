import { IOrigin, BehaviorOptions } from '@aws-cdk/aws-cloudfront';
import { OAuthScope, UserPoolClientIdentityProvider, IUserPool, IUserPoolClient } from '@aws-cdk/aws-cognito';
import { Construct } from '@aws-cdk/core';
import { LogLevel } from '@cloudcomponents/cdk-lambda-at-edge-pattern';

import { AuthFlow, RedirectPaths } from './auth-flow';
import { RetrieveUserPoolClientSecret } from './retrieve-user-pool-client-secret';
import { SecretGenerator } from './secret-generator';
import { UserPoolClientRedirects } from './user-pool-client-redirects';
import { UserPoolDomain } from './user-pool-domain';

export interface UserPoolClientCallbackUrls {
  /**
   * A list of allowed redirect (callback) URLs for the identity providers.
   */
  readonly callbackUrls: string[];

  /**
   * A list of allowed logout URLs for the identity providers.
   */
  readonly logoutUrls: string[];
}

export interface IAuthorization {
  readonly redirectPaths: RedirectPaths;
  readonly signOutUrlPath: string;
  updateUserPoolClientCallbacks(redirects: UserPoolClientCallbackUrls): void;
  createDefaultBehavior(origin: IOrigin): BehaviorOptions;
  createAdditionalBehaviors(origin: IOrigin): Record<string, BehaviorOptions>;
}

export interface AuthorizationProps {
  readonly userPool: IUserPool;
  readonly redirectPaths?: RedirectPaths;
  readonly signOutUrl?: string;
  readonly httpHeaders?: Record<string, string>;
  readonly logLevel?: LogLevel;
  readonly oauthScopes?: OAuthScope[];
}

export abstract class Authorization extends Construct {
  public readonly redirectPaths: RedirectPaths;
  public readonly signOutUrlPath: string;

  protected readonly userPool: IUserPool;
  protected readonly userPoolClient: IUserPoolClient;
  protected readonly oauthScopes: OAuthScope[];
  protected readonly httpHeaders: Record<string, string>;
  protected readonly nonceSigningSecret: string;
  protected readonly cognitoAuthDomain: string;

  private readonly authFlow: AuthFlow;

  constructor(scope: Construct, id: string, props: AuthorizationProps) {
    super(scope, id);

    this.userPool = props.userPool;

    this.redirectPaths = props.redirectPaths ?? {
      signIn: '/parseauth',
      authRefresh: '/refreshauth',
      signOut: '/',
    };

    this.signOutUrlPath = props.signOutUrl ?? '/signout';

    this.httpHeaders = props.httpHeaders ?? {
      'Content-Security-Policy':
        "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none'; connect-src 'self'",
      'Strict-Transport-Security': 'max-age=31536000; includeSubdomains; preload',
      'Referrer-Policy': 'same-origin',
      'X-XSS-Protection': '1; mode=block',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-cache',
    };

    this.oauthScopes = props.oauthScopes ?? [OAuthScope.PHONE, OAuthScope.EMAIL, OAuthScope.PROFILE, OAuthScope.OPENID, OAuthScope.COGNITO_ADMIN];

    this.userPoolClient = this.createUserPoolClient();

    this.nonceSigningSecret = this.generateNonceSigningSecret();

    this.cognitoAuthDomain = this.retrieveCognitoAuthDomain();

    this.authFlow = this.createAuthFlow(props.logLevel ?? LogLevel.WARN);
  }

  protected abstract createUserPoolClient(): IUserPoolClient;

  protected abstract createAuthFlow(logLevel: LogLevel): AuthFlow;

  public updateUserPoolClientCallbacks(redirects: UserPoolClientCallbackUrls): void {
    const { callbackUrls, logoutUrls } = redirects;

    new UserPoolClientRedirects(this, 'UserPoolClientRedirects', {
      userPool: this.userPool,
      userPoolClient: this.userPoolClient,
      oauthScopes: this.oauthScopes,
      callbackUrls,
      logoutUrls,
    });
  }

  public createDefaultBehavior(origin: IOrigin): BehaviorOptions {
    return {
      origin,
      forwardQueryString: true,
      edgeLambdas: [this.authFlow.checkAuth, this.authFlow.httpHeaders],
    };
  }

  public createAdditionalBehaviors(origin: IOrigin): Record<string, BehaviorOptions> {
    return {
      [this.redirectPaths.signIn]: {
        origin,
        forwardQueryString: true,
        edgeLambdas: [this.authFlow.parseAuth],
      },
      [this.redirectPaths.authRefresh]: {
        origin,
        forwardQueryString: true,
        edgeLambdas: [this.authFlow.refreshAuth],
      },
      [this.signOutUrlPath]: {
        origin,
        forwardQueryString: true,
        edgeLambdas: [this.authFlow.signOut],
      },
    };
  }

  private generateNonceSigningSecret(): string {
    const { secret } = new SecretGenerator(this, 'SecretGenerator');
    return secret;
  }

  private retrieveCognitoAuthDomain(): string {
    const userPoolDomain = new UserPoolDomain(this, 'UserPoolDomain', {
      userPool: this.userPool,
    });

    return userPoolDomain.cognitoAuthDomain;
  }
}

export interface ISpaAuthorization extends IAuthorization {
  readonly mode: Mode.SPA;
}

export type SpaAuthorizationProps = AuthorizationProps;

export class SpaAuthorization extends Authorization implements ISpaAuthorization {
  public readonly mode = Mode.SPA;

  constructor(scope: Construct, id: string, props: SpaAuthorizationProps) {
    super(scope, id, props);
  }

  protected createUserPoolClient(): IUserPoolClient {
    return this.userPool.addClient('UserPoolClient', {
      generateSecret: false,
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: this.oauthScopes,
      },
      supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO],
      preventUserExistenceErrors: true,
    });
  }

  protected createAuthFlow(logLevel: LogLevel): AuthFlow {
    return new AuthFlow(this, 'AuthFlow', {
      logLevel,
      httpHeaders: this.httpHeaders,
      userPool: this.userPool,
      userPoolClient: this.userPoolClient,
      oauthScopes: this.oauthScopes,
      redirectPaths: this.redirectPaths,
      nonceSigningSecret: this.nonceSigningSecret,
      cognitoAuthDomain: this.cognitoAuthDomain,
      cookieSettings: {
        idToken: 'Path=/; Secure; SameSite=Lax',
        accessToken: 'Path=/; Secure; SameSite=Lax',
        refreshToken: 'Path=/; Secure; SameSite=Lax',
        nonce: 'Path=/; Secure; HttpOnly; SameSite=Lax',
      },
    });
  }
}

export interface IStaticSiteAuthorization extends IAuthorization {
  readonly mode: Mode.STATIC_SITE;
}

export type StaticSiteAuthorizationProps = AuthorizationProps;

export class StaticSiteAuthorization extends Authorization implements IStaticSiteAuthorization {
  public readonly mode = Mode.STATIC_SITE;

  constructor(scope: Construct, id: string, props: StaticSiteAuthorizationProps) {
    super(scope, id, props);
  }

  protected createUserPoolClient(): IUserPoolClient {
    return this.userPool.addClient('UserPoolClient', {
      generateSecret: true,
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: this.oauthScopes,
      },
      supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO],
      preventUserExistenceErrors: true,
    });
  }

  protected createAuthFlow(logLevel: LogLevel): AuthFlow {
    const clientSecret = this.retrieveUserPoolClientSecret();

    return new AuthFlow(this, 'AuthFlow', {
      logLevel,
      httpHeaders: this.httpHeaders,
      userPool: this.userPool,
      userPoolClient: this.userPoolClient,
      oauthScopes: this.oauthScopes,
      redirectPaths: this.redirectPaths,
      nonceSigningSecret: this.nonceSigningSecret,
      cognitoAuthDomain: this.cognitoAuthDomain,
      clientSecret,
      cookieSettings: {
        idToken: 'Path=/; Secure; HttpOnly; SameSite=Lax',
        accessToken: 'Path=/; Secure; HttpOnly; SameSite=Lax',
        refreshToken: 'Path=/; Secure; HttpOnly; SameSite=Lax',
        nonce: 'Path=/; Secure; HttpOnly; SameSite=Lax',
      },
    });
  }

  private retrieveUserPoolClientSecret(): string {
    const { clientSecret } = new RetrieveUserPoolClientSecret(this, 'RetrieveUserPoolClientSecret', {
      userPool: this.userPool,
      userPoolClient: this.userPoolClient,
    });

    return clientSecret;
  }
}

export enum Mode {
  SPA = 'SPA',
  STATIC_SITE = 'STATIC_SITE',
}
