import { getManyUsersController } from "../../controllers/user/get-many-users-controller";
import { requiresAdmin } from "../../middlewares/requires-admin";
import { getSingleUserController } from "../../controllers/user/get-single-user-controller";
import { requiresValidId } from "../../middlewares/requires-valid-id";

const userRoutes = {
  getSingleUser: "/api/user/:id",
  getManyUsers: "/api/user",
};

const getManyUsersOpts = {
  preValidation: requiresAdmin,
  handler: getManyUsersController,
};

const getSingleUserOpts = {
  preValidation: requiresAdmin,
  preHandler: requiresValidId,
  handler: getSingleUserController,
};

export { userRoutes, getManyUsersOpts, getSingleUserOpts };
