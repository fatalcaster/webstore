import { FastifyReply, FastifyRequest } from "fastify";
import { getManyProducts } from "../../services/product-services";

type ManyProductsRequest = FastifyRequest<{
  Querystring: { limit?: number; before?: Date };
}>;

const getManyProductsController = async (
  req: ManyProductsRequest,
  res: FastifyReply
) => {
  const { limit, before } = req.query;
  const products = await getManyProducts(limit, before);
  res.send(products);
};

export { getManyProductsController };
