import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../../app";
import { UserProps } from "../../models/user";
// import { createUser } from "../../services/product-services";

type Request = FastifyRequest<{ Body: UserProps }>;

async function createUserController(_req: Request, res: FastifyReply) {
  const response = app.jwt.sign("test");
  res.send(response);
}

export { createUserController };
