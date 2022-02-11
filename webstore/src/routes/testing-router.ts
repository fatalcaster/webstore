import { FastifyInstance } from "fastify";
import { Permissions, UserPayload } from "../interfaces/user-payload";
import mongoose from "mongoose";
import { attachJwt, createTokens } from "../helpers/jwt-helper";

function testingRouter(app: FastifyInstance, _options: any, done: any) {
  app.get("/api/auth/testing-admin", async (_req, res) => {
    const admin: UserPayload = {
      email: "admin@test.com",
      id: String(new mongoose.Types.ObjectId()),
      permission: Permissions.Admin,
    };
    const tokens = createTokens(admin);
    attachJwt(tokens.access, tokens.refresh, res);
    res.send();
  });

  done();
}

export { testingRouter };
