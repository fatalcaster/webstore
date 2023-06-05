import { FastifyInstance } from "fastify";
import {
  createProductOpts,
  getManyProductsOpts,
  getSingleProductOpts,
  productRoutes,
} from "./route-opts/product-opts";

function productRouter(app: FastifyInstance, _options: any, done: any) {
  app.post(productRoutes.createProduct, createProductOpts);
  app.get(productRoutes.getOneProduct, getSingleProductOpts);
  app.get(productRoutes.getManyProducts, getManyProductsOpts);

  done();
}

export { productRouter };
