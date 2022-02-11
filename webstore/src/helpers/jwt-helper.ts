import { FastifyReply } from "fastify";
import { UserPayload } from "../interfaces/user-payload";
import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import config from "../config";

const createACTOpts: SignOptions = {
  algorithm: "RS256",
  expiresIn: 15 * 60, // 15 minutes
};
const createRFTOpts: SignOptions = {
  algorithm: "RS256",
  expiresIn: "7d",
};

export const verifyTokenOpts: VerifyOptions = {
  algorithms: ["RS256"],
};

const ACT_COOKIE = "access_token";
const RFT_COOKIE = "refresh_token";

export const attachJwt = (
  access_token: string,
  refresh_token: string,
  res: FastifyReply
) => {
  res.setCookie(ACT_COOKIE, access_token);
  res.setCookie(RFT_COOKIE, refresh_token);
};

export function verifyJWT<T>(
  token: string,
  privKey: string | Buffer,
  opts?: VerifyOptions
): T | null {
  try {
    const data = jwt.verify(token, privKey, opts) as T;
    return data;
  } catch {
    return null;
  }
}
// Creates a refresh token with the given data
export function createRFT(data: UserPayload) {
  return jwt.sign(data, config.JWT_REFRESH_PRIVATE, createRFTOpts);
}
//  Creates an access token with the given data
export function createACT(data: UserPayload) {
  return jwt.sign(data, config.JWT_ACCESS_PRIVATE, createACTOpts);
}

export function clearOldJWTData(payload: any) {
  delete payload.iat;
  delete payload.exp;
  delete payload.nbf;
  delete payload.jti;
}

export function createTokens(data: UserPayload) {
  const user = UserPayload.build(data);
  const refresh = createRFT(user);
  const access = createACT(user);
  return { refresh, access };
}

export function clearJWT(res: FastifyReply) {
  res.clearCookie(ACT_COOKIE);
  res.clearCookie(RFT_COOKIE);
}
