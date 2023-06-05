import { FastifyRequest, FastifyReply } from "fastify";
import { NotFoundError } from "../../errors/not-found-error";
import { getProductById } from "../../services/product-services";
import { getStoreByDomain } from "../../services/store-service";

type OneProductRequest = FastifyRequest<{ Params: { domain: string } }>;

const getStoreController = async (
  req: OneProductRequest,
  res: FastifyReply
) => {
  const { domain } = req.params;
  const store = await getStoreByDomain(domain);
  if (!store) {
    throw new NotFoundError();
  }
  res.send(store);
};

export { getStoreController };
