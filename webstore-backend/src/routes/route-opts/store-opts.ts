import { createStoreController } from "../../controllers/store/create-store-controller";
import { getStoreController } from "../../controllers/store/get-store-controller";
import { createStoreSchema } from "../schemas/store/create-store-schema";

const storeRoutes = {
  createStore: "/api/store",
  deleteStore: "/api/store",
  getStore: "/api/store",
};

const createStoreOpts = {
  schema: createStoreSchema,
  handler: createStoreController,
};

const getStoreByDomainOpts = {
  handler: getStoreController,
};

export { storeRoutes, createStoreOpts, getStoreByDomainOpts };
