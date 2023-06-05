import { FastifyReply, FastifyRequest } from "fastify";
import { ProductProps } from "../../models/product";
import { createProduct } from "../../services/product-services";

type Request = FastifyRequest<{ Body: ProductProps }>;

async function createProductController(req: Request, res: FastifyReply) {
  const new_product = req.body;

  const product = await createProduct(new_product);

  res.code(201).send(product);
}

export { createProductController };
