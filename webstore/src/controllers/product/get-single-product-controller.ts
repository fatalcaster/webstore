import { FastifyRequest, FastifyReply } from "fastify";
import { NotFoundError } from "../../errors/not-found-error";
import { getProductById } from "../../services/product-services";

type OneProductRequest = FastifyRequest<{ Params: { id: string } }>;

const getSingleProductController = async (
  req: OneProductRequest,
  res: FastifyReply
) => {
  const { id } = req.params;
  const product = await getProductById(id);
  if (!product) {
    throw new NotFoundError();
  }
  res.send(product);
};

export { getSingleProductController };
