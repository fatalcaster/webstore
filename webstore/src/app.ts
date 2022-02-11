import config from "./config";
import fastify, { FastifyInstance } from "fastify";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { productRouter } from "./routes/product-router";
import { userRouter } from "./routes/user-router";
import cookie from "fastify-cookie";
import { UserPayload } from "./interfaces/user-payload";
import { currentUser } from "./middlewares/current-user";
import { authRouter } from "./routes/auth-router";
import { orderRouter } from "./routes/order-router";
import { FastifySchemaValidationError } from "fastify/types/schema";
import { RequestValidationError } from "./errors/request-validation-error";
import { serializeValidationErrors } from "./helpers/serialize-validation-error";

const app: FastifyInstance = fastify({
  logger: {
    prettyPrint:
      config.NODE_ENV === "development"
        ? {
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
          }
        : false,
  },
  trustProxy: true,
});

app.register(cookie);

// ROUTERS
app.register(productRouter);
app.register(userRouter);
app.register(authRouter);
app.register(orderRouter);
// app.setErrorHandler()

app.addHook("onRequest", currentUser);

declare module "fastify" {
  interface FastifyRequest {
    user?: UserPayload;
  }
}

app.setSchemaErrorFormatter(
  (errors: FastifySchemaValidationError[], _dataVar: string) => {
    // console.log("CUSTOM FORMATTER\n\n\n", errors);
    const err = serializeValidationErrors(errors);
    throw new RequestValidationError(err);
  }
);

app.setErrorHandler(errorHandler);

app.all("*", async () => {
  throw new NotFoundError();
});

export { app };
