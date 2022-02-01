import { createProductController } from "../../controllers/product/create-product-controller";
import {
  getManyProductsController,
  getSingleProductController,
} from "../../controllers/product/get-product-controller";

const createProductOpts = {
  // preValidation: requiresAuth,
  // preHandler: createAnswerContentValidation,
  handler: createProductController,
};

const getSingleProductOpts = {
  // preValidation: requiresAuth,
  // preHandler: createAnswerContentValidation,
  handler: getSingleProductController,
};

const getManyProductsOpts = {
  // preValidation: requiresAuth,
  // preHandler: createAnswerContentValidation,
  handler: getManyProductsController,
};

export { createProductOpts, getSingleProductOpts, getManyProductsOpts };
