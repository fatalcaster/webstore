import { FastifyInstance } from "fastify";
import {
  createProductOpts,
  getManyProductsOpts,
  getSingleProductOpts,
} from "./route-opts/product-opts";

function productRouter(app: FastifyInstance, _options: any, done: any) {
  app.post("/product", createProductOpts);
  app.get("/product", getManyProductsOpts);
  app.get("/product/:id", getSingleProductOpts);

  done();
}

export { productRouter };
