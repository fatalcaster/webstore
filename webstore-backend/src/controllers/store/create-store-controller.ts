import { FastifyReply, FastifyRequest } from "fastify";

import { Store } from "../../models/store";
import { NotAuthorizedError } from "../../errors/not-authorizer-error";
import { getUserById } from "../../services/user-services";
import { InternalError } from "../../errors/internal-error";

type Request = FastifyRequest<{
  Body: {
    store_name: string;
  };
}>;

async function createStoreController(req: Request, res: FastifyReply) {
  const userCreds = req.user;

  if (!userCreds) {
    throw new NotAuthorizedError();
  }

  const { store_name } = req.body;

  const user = await getUserById(userCreds.id);

  if (!user) {
    throw new InternalError();
  }

  const store = Store.build({
    domain: store_name,
    owner: user,
  });
  await store.save();

  res.code(201).send(store);
}

export { createStoreController };

// const session: ClientSession = await mongoose.startSession();
// session.startTransaction();
//
// const order = Order.build(final_order);
//
// await runInTransaction(async (session) => {
// cart!.forEach(async (item) => {
// await updateProductStock(item.product.id, -item.qty, session);
// });
//
// await order.save();
// });
