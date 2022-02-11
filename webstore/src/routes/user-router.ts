import { FastifyInstance } from "fastify";
import {
  getManyUsersOpts,
  getSingleUserOpts,
  userRoutes,
} from "./route-opts/user-opts";

function userRouter(app: FastifyInstance, _options: any, done: any) {
  app.get(userRoutes.getSingleUser, getSingleUserOpts);
  app.get(userRoutes.getManyUsers, getManyUsersOpts);

  done();
}

export { userRouter };
