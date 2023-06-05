import { createProductController } from "../../controllers/product/create-product-controller";
import { getManyProductsController } from "../../controllers/product/get-many-products-controller";
import { getSingleProductController } from "../../controllers/product/get-single-product-controller";
import { requiresAdmin } from "../../middlewares/requires-admin";
import { requiresValidId } from "../../middlewares/requires-valid-id";
import { createProductSchema } from "../schemas/product/create-product-schema";

const productRoutes = {
  createProduct: "/api/product",
  getOneProduct: "/api/product/:id",
  getManyProducts: "/api/product",
};

const createProductOpts = {
  schema: createProductSchema,
  preValidation: requiresAdmin,
  handler: createProductController,
};

const getSingleProductOpts = {
  preHandler: requiresValidId,
  handler: getSingleProductController,
};

const getManyProductsOpts = {
  handler: getManyProductsController,
};

export {
  createProductOpts,
  getSingleProductOpts,
  getManyProductsOpts,
  productRoutes,
};
