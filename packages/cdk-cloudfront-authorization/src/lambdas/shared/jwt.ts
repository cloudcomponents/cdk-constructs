import { decode, verify } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

// jwks client is cached at this scope so it can be reused across Lambda invocations
let jwksRsa: jwksClient.JwksClient;

const isRsaSigningKey = (key: jwksClient.SigningKey): key is jwksClient.RsaSigningKey => 'rsaPublicKey' in key;

async function getSigningKey(jwksUri: string, kid: string) {
  // Retrieves the public key that corresponds to the private key with which the token was signed

  if (!jwksRsa) {
    jwksRsa = jwksClient({ cache: true, rateLimit: true, jwksUri });
  }
  return new Promise<string>((resolve, reject) =>
    jwksRsa.getSigningKey(kid, (err, jwk) => (err ? reject(err) : resolve((isRsaSigningKey(jwk) ? jwk.rsaPublicKey : jwk.publicKey) as string))),
  );
}

export async function validate(jwtToken: string, jwksUri: string, issuer: string, audience: string): Promise<void> {
  const decodedToken = decode(jwtToken, { complete: true });

  if (!decodedToken || typeof decodedToken === 'string') {
    throw new Error('Cannot parse JWT token');
  }

  // The JWT contains a "kid" claim, key id, that tells which key was used to sign the token
  const kid = decodedToken['header']['kid'];
  if (!kid) {
    throw new Error('Kid is missing in token');
  }
  const jwk = await getSigningKey(jwksUri, kid);

  // Verify the JWT
  // This either rejects (JWT not valid), or resolves (JWT valid)
  const verificationOptions = {
    audience,
    issuer,
    ignoreExpiration: false,
  };
  return new Promise((resolve, reject) => verify(jwtToken, jwk, verificationOptions, (err) => (err ? reject(err) : resolve())));
}

export interface CognitoIdTokenPayload {
  sub: string;
  'cognito:groups'?: string[];
  'cognito:username'?: string;
  given_name?: string;
  aud: string;
  token_use: 'id';
  auth_time: number;
  name?: string;
  exp: number;
  iat: number;
  email?: string;
}

export function decodeIdToken(jwt: string): CognitoIdTokenPayload {
  const tokenBody = jwt.split('.')[1];
  const decodableTokenBody = tokenBody.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(Buffer.from(decodableTokenBody, 'base64').toString());
}
