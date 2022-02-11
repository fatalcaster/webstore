import { emailLoginController } from "../../controllers/auth/email-login-controller";
import { emailSignupController } from "../../controllers/auth/email-signup-controller";
import { getMeController } from "../../controllers/auth/get-me-controller";
import { logOutController } from "../../controllers/auth/log-out-controller";
import { emailLogInSchema } from "../schemas/auth/email-login-schema";
import { emailSignUpSchema } from "../schemas/auth/email-signup-schema";

const authRoutes = {
  logOut: "/api/auth/logout",
  emailSignUp: "/api/auth/signup",
  emailLogIn: "/api/auth/login",
  getMe: "/api/auth/me",
};

const logOutOpts = {
  handler: logOutController,
};
const emailSignUpOpts = {
  schema: emailSignUpSchema,
  handler: emailSignupController,
};

const emailLoginOpts = {
  schema: emailLogInSchema,
  handler: emailLoginController,
};

const getMeOpts = {
  handler: getMeController,
};

export { authRoutes, logOutOpts, emailSignUpOpts, emailLoginOpts, getMeOpts };
