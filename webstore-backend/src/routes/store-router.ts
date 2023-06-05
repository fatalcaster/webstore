import { FastifyInstance } from "fastify";
import {
  createStoreOpts,
  getStoreByDomainOpts,
  storeRoutes,
} from "./route-opts/store-opts";

function storeRouter(app: FastifyInstance, _options: any, done: any) {
  app.get(storeRoutes.getStore, getStoreByDomainOpts);
  app.post(storeRoutes.createStore, createStoreOpts);

  done();
}

export { storeRouter };
