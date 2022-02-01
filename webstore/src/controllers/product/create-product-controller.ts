import { FastifyReply, FastifyRequest } from "fastify";
import { ProductProps } from "../../models/product";
import { createProduct } from "../../services/product-services";

type Request = FastifyRequest<{ Params: ProductProps }>;

async function createProductController(req: Request, res: FastifyReply) {
  const { name, desc, price } = req.params;

  const product = await createProduct({ name, desc, price });

  res.code(201).send(product);
}

export { createProductController };
