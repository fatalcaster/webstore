import { FastifyInstance } from "fastify";
import {
  authRoutes,
  emailLoginOpts,
  emailSignUpOpts,
  getMeOpts,
  logOutOpts,
} from "./route-opts/auth-opts";

function authRouter(app: FastifyInstance, _options: any, done: any) {
  app.post(authRoutes.emailLogIn, emailLoginOpts);
  app.post(authRoutes.emailSignUp, emailSignUpOpts);
  app.post(authRoutes.logOut, logOutOpts);
  app.get(authRoutes.getMe, getMeOpts);

  done();
}

export { authRouter };
