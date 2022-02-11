import { FastifyReply, FastifyRequest } from "fastify";
import { getManyUsers } from "../../services/user-services";

type ManyUsersRequest = FastifyRequest<{
  Querystring: { limit?: number; before?: Date };
}>;

const getManyUsersController = async (
  req: ManyUsersRequest,
  res: FastifyReply
) => {
  const { limit, before } = req.query;
  const users = await getManyUsers(limit, before);
  res.send(users);
};

export { getManyUsersController };
