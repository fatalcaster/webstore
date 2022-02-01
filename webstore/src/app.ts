import fastify, { FastifyInstance } from "fastify";
import { productRouter } from "./routes/product-router";

const app: FastifyInstance = fastify({ logger: true, trustProxy: true });

app.register(productRouter);

// app.setErrorHandler()

app.all("*", async () => {
  throw new Error();
});

export { app };
