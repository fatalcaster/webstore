import { createUserController } from "../../controllers/user/create-product-controller";

const createUserOpts = {
  // preValidation: requiresAuth,
  // preHandler: createAnswerContentValidation,
  handler: createUserController,
};

// const getSingleUserOpts = {
//   // preValidation: requiresAuth,
//   // preHandler: createAnswerContentValidation,
//   handler: getSingleUserController,
// };

// const getManyUsersOpts = {
//   // preValidation: requiresAuth,
//   // preHandler: createAnswerContentValidation,
//   handler: getManyUsersController,
// };

export { createUserOpts };
