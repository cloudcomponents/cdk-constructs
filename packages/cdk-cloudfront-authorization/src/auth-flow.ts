import * as path from 'path';
import { LambdaEdgeEventType } from '@aws-cdk/aws-cloudfront';
import { IUserPool, IUserPoolClient, OAuthScope } from '@aws-cdk/aws-cognito';
import { Code } from '@aws-cdk/aws-lambda';
import { Construct } from '@aws-cdk/core';
import { EdgeFunction, HttpHeaders, LogLevel, EdgeRole } from '@cloudcomponents/cdk-lambda-at-edge-pattern';

export interface RedirectPaths {
  readonly signIn: string;
  readonly authRefresh: string;
  readonly signOut: string;
}

export interface AuthFlowProps {
  readonly logLevel: LogLevel;
  readonly httpHeaders: Record<string, string>;
  readonly userPool: IUserPool;
  readonly userPoolClient: IUserPoolClient;
  readonly cognitoAuthDomain: string;
  readonly redirectPaths: RedirectPaths;
  readonly oauthScopes: OAuthScope[];
  readonly cookieSettings: Record<string, string>;
  readonly nonceSigningSecret: string;
  readonly clientSecret?: string;
}

export class AuthFlow extends Construct {
  public readonly checkAuth: EdgeFunction;
  public readonly parseAuth: EdgeFunction;
  public readonly refreshAuth: EdgeFunction;
  public readonly signOut: EdgeFunction;
  public readonly httpHeaders: EdgeFunction;

  constructor(scope: Construct, id: string, props: AuthFlowProps) {
    super(scope, id);

    const edgeRole = new EdgeRole(this, 'EdgeRole');

    const configuration = {
      logLevel: props.logLevel,
      httpHeaders: props.httpHeaders,
      redirectPathSignIn: props.redirectPaths.signIn,
      redirectPathAuthRefresh: props.redirectPaths.authRefresh,
      redirectPathSignOut: props.redirectPaths.signOut,
      userPoolId: props.userPool.userPoolId,
      clientId: props.userPoolClient.userPoolClientId,
      oauthScopes: props.oauthScopes.map((scope) => scope.scopeName),
      cognitoAuthDomain: props.cognitoAuthDomain,
      cookieSettings: props.cookieSettings,
      nonceSigningSecret: props.nonceSigningSecret,
      clientSecret: props.clientSecret,
    };

    this.checkAuth = new EdgeFunction(this, 'CheckAuth', {
      name: 'check-auth',
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'check-auth')),
      edgeRole,
      configuration,
      eventType: LambdaEdgeEventType.VIEWER_REQUEST,
    });

    this.parseAuth = new EdgeFunction(this, 'ParseAuth', {
      name: 'parse-auth',
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'parse-auth')),
      edgeRole,
      configuration,
      eventType: LambdaEdgeEventType.VIEWER_REQUEST,
    });

    this.refreshAuth = new EdgeFunction(this, 'RefreshAuth', {
      name: 'refresh-auth',
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'refresh-auth')),
      edgeRole,
      configuration,
      eventType: LambdaEdgeEventType.VIEWER_REQUEST,
    });

    this.signOut = new EdgeFunction(this, 'SignOut', {
      name: 'sign-out',
      code: Code.fromAsset(path.join(__dirname, 'lambdas', 'sign-out')),
      edgeRole,
      configuration,
      eventType: LambdaEdgeEventType.VIEWER_REQUEST,
    });

    this.httpHeaders = new HttpHeaders(this, 'HttpHeaders', {
      httpHeaders: props.httpHeaders,
      edgeRole,
    });
  }
}
