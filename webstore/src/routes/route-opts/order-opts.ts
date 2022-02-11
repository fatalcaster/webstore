import { createOrderController } from "../../controllers/order/create-order-controller";

const orderRoutes = {
  createOrder: "/api/order/create",
};

const createOrderOpts = {
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
