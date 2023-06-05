import { FastifyRequest, FastifyReply } from "fastify";
import { NotFoundError } from "../../errors/not-found-error";
import { getUserById } from "../../services/user-services";

type OneUserRequest = FastifyRequest<{ Params: { id: string } }>;

const getSingleUserController = async (
  req: OneUserRequest,
  res: FastifyReply
) => {
  const { id } = req.params;
  const user = await getUserById(id);
  if (!user) {
    throw new NotFoundError();
  }
  res.send(user);
};

export { getSingleUserController };
