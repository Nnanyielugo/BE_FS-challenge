import * as crypto from 'crypto';
import { Signature } from './interfaces';

export function verify(
  signingKey: string,
  { timestamp, token, signature }: Signature
): boolean {
  const encodedToken: string = crypto
    .createHmac('sha256', signingKey)
    .update(timestamp.concat(token))
    .digest('hex');

  return encodedToken === signature;
}
