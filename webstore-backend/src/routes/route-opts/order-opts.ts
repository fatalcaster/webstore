import { createOrderController } from "../../controllers/order/create-order-controller";
import { createOrderSchema } from "../schemas/order/create-order-schema";

const orderRoutes = {
  createOrder: "/api/order/create",
};

const createOrderOpts = {
  schema: createOrderSchema,
  handler: createOrderController,
};
// const getManyOrdersOpts = {
//   handler: emailSignupController,
// };

// const getSingleOrderOpts = {
//   handler: emailLoginController,
// };

// const getMeOpts = {
//   handler: getMeController,
// };

export { orderRoutes, createOrderOpts };
