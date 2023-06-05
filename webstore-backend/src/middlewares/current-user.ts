import { FastifyReply, FastifyRequest } from "fastify";
import { UserPayload } from "../interfaces/user-payload";
import jwt from "jsonwebtoken";
import config from "./../config";

export const currentUser = (
  req: FastifyRequest,
  _res: FastifyReply,
  next: any
) => {
  if (!req.cookies?.access_token) {
    return next();
  }
  try {
    const payload = jwt.verify(
      req.cookies.access_token,
      config.JWT_ACCESS_PUBLIC!,
      {
        algorithms: ["RS256"],
      }
    ) as UserPayload;
    req.user = payload;
  } catch (err) {}
  next();
};
