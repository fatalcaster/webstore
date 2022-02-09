import { FastifyReply, FastifyRequest } from "fastify";
import { ProductProps } from "../../models/product";
import { createProduct } from "../../services/product-services";

type Request = FastifyRequest<{ Body: ProductProps }>;

async function createProductController(req: Request, res: FastifyReply) {
  const { name, desc, price, stock } = req.body;

  const product = await createProduct({ name, desc, price, stock });

  res.code(201).send(product);
}

export { createProductController };
