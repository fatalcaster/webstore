import { FastifyReply, FastifyRequest } from "fastify";
import { NotFoundError } from "../../errors/not-found-error";
import {
  getManyProducts,
  getProductById,
} from "../../services/product-services";

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

type ManyProductsRequest = FastifyRequest<{
  Params: { limit?: number; before?: Date };
}>;

const getManyProductsController = async (
  req: ManyProductsRequest,
  res: FastifyReply
) => {
  const { limit, before } = req.params;
  const products = await getManyProducts(limit, before);
  res.send(products);
};

export { getSingleProductController, getManyProductsController };
