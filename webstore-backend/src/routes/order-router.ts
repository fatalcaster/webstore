import { FastifyInstance } from "fastify";
import { createOrderOpts, orderRoutes } from "./route-opts/order-opts";

function orderRouter(app: FastifyInstance, _options: any, done: any) {
  app.post(orderRoutes.createOrder, createOrderOpts);

  done();
}

export { orderRouter };
