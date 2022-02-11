import { FastifyReply, FastifyRequest } from "fastify";
import { RequestValidationError } from "../../errors/request-validation-error";
import { validateProduct } from "../../helpers/product-helper";
import { requestValidator } from "../../helpers/request-validation-helper";
import { ProductProps } from "../../models/product";
import { createProduct } from "../../services/product-services";

type Request = FastifyRequest<{ Body: ProductProps }>;

async function createProductController(req: Request, res: FastifyReply) {
  const new_product = req.body;

  const errors = requestValidator([validateProduct(new_product)]);
  if (errors) {
    throw new RequestValidationError(errors);
  }

  const product = await createProduct(new_product);

  res.code(201).send(product);
}

export { createProductController };
