import config from "./config";
import fastify, { FastifyInstance } from "fastify";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { productRouter } from "./routes/product-router";
import jwt from "fastify-jwt";

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

app.register(jwt, {
  secret: {
    private: config.JWT_PRIVATE,
    public: config.JWT_PUBLIC,
  },
  sign: { algorithm: "RS256" },
});

app.register(productRouter);
// app.setErrorHandler()

app.post("/signup", (_req, reply) => {
  // some code
  const token = app.jwt.sign("test");
  reply.send({ token });
});

app.setErrorHandler(errorHandler);

app.all("*", async () => {
  throw new NotFoundError();
});

export { app };
