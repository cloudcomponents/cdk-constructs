import { LogLevel } from '@cloudcomponents/cdk-lambda-at-edge-pattern';
import { Duration, aws_cloudfront, aws_cognito } from 'aws-cdk-lib';
import { Construct } from 'constructs';

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
  createDefaultBehavior(origin: aws_cloudfront.IOrigin, options?: aws_cloudfront.AddBehaviorOptions): aws_cloudfront.BehaviorOptions;
  createAdditionalBehaviors(
    origin: aws_cloudfront.IOrigin,
    options?: aws_cloudfront.AddBehaviorOptions,
  ): Record<string, aws_cloudfront.BehaviorOptions>;
}

export interface AuthorizationProps {
  readonly userPool: aws_cognito.IUserPool;
  readonly redirectPaths?: RedirectPaths;
  readonly signOutUrl?: string;
  readonly customHeaders?: aws_cloudfront.ResponseCustomHeader[];
  readonly securityHeadersBehavior?: aws_cloudfront.ResponseSecurityHeadersBehavior;
  readonly logLevel?: LogLevel;
  readonly oauthScopes?: aws_cognito.OAuthScope[];
  readonly cookieSettings?: Record<string, string>;
  readonly identityProviders?: aws_cognito.UserPoolClientIdentityProvider[];
}

export abstract class Authorization extends Construct {
  public readonly redirectPaths: RedirectPaths;
  public readonly signOutUrlPath: string;
  public readonly authFlow: AuthFlow;
  public readonly userPoolClient: aws_cognito.IUserPoolClient;

  protected readonly userPool: aws_cognito.IUserPool;
  protected readonly oauthScopes: aws_cognito.OAuthScope[];
  protected readonly cookieSettings: Record<string, string> | undefined;
  protected readonly nonceSigningSecret: string;
  protected readonly cognitoAuthDomain: string;
  protected readonly identityProviders: aws_cognito.UserPoolClientIdentityProvider[];
  protected readonly responseHeaderPolicy: aws_cloudfront.IResponseHeadersPolicy;

  constructor(scope: Construct, id: string, props: AuthorizationProps) {
    super(scope, id);

    this.userPool = props.userPool;

    this.redirectPaths = props.redirectPaths ?? {
      signIn: '/parseauth',
      authRefresh: '/refreshauth',
      signOut: '/',
    };

    this.signOutUrlPath = props.signOutUrl ?? '/signout';

    this.responseHeaderPolicy = new aws_cloudfront.ResponseHeadersPolicy(this, 'ResponseHeadersPolicy', {
      securityHeadersBehavior: props.securityHeadersBehavior ?? {
        contentSecurityPolicy: {
          contentSecurityPolicy:
            "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'none'; connect-src 'self'",
          override: true,
        },
        contentTypeOptions: { override: true },
        frameOptions: { frameOption: aws_cloudfront.HeadersFrameOption.DENY, override: true },
        referrerPolicy: { referrerPolicy: aws_cloudfront.HeadersReferrerPolicy.SAME_ORIGIN, override: true },
        strictTransportSecurity: { accessControlMaxAge: Duration.seconds(31536000), includeSubdomains: true, preload: true, override: true },
        xssProtection: { protection: true, modeBlock: true, override: true },
      },
      customHeadersBehavior: {
        customHeaders: props.customHeaders ?? [
          {
            header: 'Cache-Control',
            value: 'no-cache',
            override: true,
          },
        ],
      },
    });

    this.oauthScopes = props.oauthScopes ?? [
      aws_cognito.OAuthScope.PHONE,
      aws_cognito.OAuthScope.EMAIL,
      aws_cognito.OAuthScope.PROFILE,
      aws_cognito.OAuthScope.OPENID,
      aws_cognito.OAuthScope.COGNITO_ADMIN,
    ];

    this.cookieSettings = props.cookieSettings;

    this.identityProviders = props.identityProviders ?? [aws_cognito.UserPoolClientIdentityProvider.COGNITO];

    this.userPoolClient = this.createUserPoolClient();

    this.nonceSigningSecret = this.generateNonceSigningSecret();

    this.cognitoAuthDomain = this.retrieveCognitoAuthDomain();

    this.authFlow = this.createAuthFlow(props.logLevel ?? LogLevel.WARN);
  }

  protected abstract createUserPoolClient(): aws_cognito.IUserPoolClient;

  protected abstract createAuthFlow(logLevel: LogLevel): AuthFlow;

  public updateUserPoolClientCallbacks(redirects: UserPoolClientCallbackUrls): void {
    const { callbackUrls, logoutUrls } = redirects;

    new UserPoolClientRedirects(this, 'UserPoolClientRedirects', {
      userPool: this.userPool,
      userPoolClient: this.userPoolClient,
      oauthScopes: this.oauthScopes,
      callbackUrls,
      logoutUrls,
      identityProviders: this.identityProviders,
    });
  }

  public createDefaultBehavior(origin: aws_cloudfront.IOrigin, options?: aws_cloudfront.AddBehaviorOptions): aws_cloudfront.BehaviorOptions {
    return {
      origin,
      compress: true,
      originRequestPolicy: aws_cloudfront.OriginRequestPolicy.ALL_VIEWER,
      viewerProtocolPolicy: aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      edgeLambdas: [this.authFlow.checkAuth],
      responseHeadersPolicy: this.responseHeaderPolicy,
      ...options,
    };
  }

  public createAdditionalBehaviors(
    origin: aws_cloudfront.IOrigin,
    options?: aws_cloudfront.AddBehaviorOptions,
  ): Record<string, aws_cloudfront.BehaviorOptions> {
    return {
      [this.redirectPaths.signIn]: {
        origin,
        compress: true,
        originRequestPolicy: aws_cloudfront.OriginRequestPolicy.ALL_VIEWER,
        viewerProtocolPolicy: aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        edgeLambdas: [this.authFlow.parseAuth],
        ...options,
      },
      [this.redirectPaths.authRefresh]: {
        origin,
        compress: true,
        viewerProtocolPolicy: aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        edgeLambdas: [this.authFlow.refreshAuth],
        ...options,
      },
      [this.signOutUrlPath]: {
        origin,
        compress: true,
        originRequestPolicy: aws_cloudfront.OriginRequestPolicy.ALL_VIEWER,
        viewerProtocolPolicy: aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        edgeLambdas: [this.authFlow.signOut],
        ...options,
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

  protected createUserPoolClient(): aws_cognito.IUserPoolClient {
    return this.userPool.addClient('UserPoolClient', {
      generateSecret: false,
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: this.oauthScopes,
      },
      supportedIdentityProviders: this.identityProviders,
      preventUserExistenceErrors: true,
    });
  }

  protected createAuthFlow(logLevel: LogLevel): AuthFlow {
    return new AuthFlow(this, 'AuthFlow', {
      logLevel,
      userPool: this.userPool,
      userPoolClient: this.userPoolClient,
      oauthScopes: this.oauthScopes,
      redirectPaths: this.redirectPaths,
      nonceSigningSecret: this.nonceSigningSecret,
      cognitoAuthDomain: this.cognitoAuthDomain,
      cookieSettings: this.cookieSettings ?? {
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

  protected createUserPoolClient(): aws_cognito.IUserPoolClient {
    return this.userPool.addClient('UserPoolClient', {
      generateSecret: true,
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: this.oauthScopes,
      },
      supportedIdentityProviders: this.identityProviders,
      preventUserExistenceErrors: true,
    });
  }

  protected createAuthFlow(logLevel: LogLevel): AuthFlow {
    const clientSecret = this.retrieveUserPoolClientSecret();

    return new AuthFlow(this, 'AuthFlow', {
      logLevel,
      userPool: this.userPool,
      userPoolClient: this.userPoolClient,
      oauthScopes: this.oauthScopes,
      redirectPaths: this.redirectPaths,
      nonceSigningSecret: this.nonceSigningSecret,
      cognitoAuthDomain: this.cognitoAuthDomain,
      clientSecret,
      cookieSettings: this.cookieSettings ?? {
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
