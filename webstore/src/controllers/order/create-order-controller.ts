import { FastifyReply, FastifyRequest } from "fastify";
import { RequestValidationError } from "../../errors/request-validation-error";
import { validateOrder } from "../../helpers/order-helper";
import { requestValidator } from "../../helpers/request-validation-helper";
import { OrderProps } from "../../models/order";

type Request = FastifyRequest<{ Body: OrderProps }>;

async function createOrderController(req: Request, res: FastifyReply) {
  const new_order = req.body;
  const errors = requestValidator([validateOrder(new_order)]);
  if (errors) {
    throw new RequestValidationError(errors);
  }
  //   const product = await createProduct(new_product);
  res.code(201).send();
}

export { createOrderController };
