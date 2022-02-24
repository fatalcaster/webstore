import { FastifyReply, FastifyRequest } from "fastify";
import { isValidObjectId } from "mongoose";
import { NotFoundError } from "../../errors/not-found-error";
import { removeDupProducts, sortCart } from "../../helpers/cart-helper";
import { Order } from "../../models/order";
import {
  getManyProducts,
  updateProductStock,
} from "../../services/product-services";
import { promiseQueue } from "../../helpers/utils/interfaces/promise-queue";
import { pluckArrayProperty } from "../../helpers/utils/pluck-array-property";
import { ProductDoc } from "../../models/product";

type TCartItem<T> = {
  qty: number;
  product: T;
};

type Request = FastifyRequest<{
  Body: {
    email: string;
    cart: TCartItem<string>[];
  };
}>;

async function createOrderController(req: Request, res: FastifyReply) {
  const new_order = req.body;
  const req_cart = removeDupProducts(sortCart(new_order.cart));

  const cart_query = pluckArrayProperty(req_cart, "product", (item, index) => {
    if (isValidObjectId(item)) throw new NotFoundError(index);
    return true;
  });

  const existing_items = await getManyProducts({ id_range: cart_query });
  if (existing_items.length !== cart_query.length) {
    throw new NotFoundError();
  }
  for (let i = 0; i < existing_items.length; i++) {}

  const cart: TCartItem<ProductDoc>[] = [];
  for (let i = 0; i < req_cart.length; i++) {
    console.log(existing_items[i].id, " | ", req_cart[i].product);

    cart.push({
      qty: req_cart[i].qty,
      product: existing_items[i],
    });
  }

  await Promise.all(
    cart.map((item: TCartItem<ProductDoc>, _index) => {
      if (item.product.stock) {
        return promiseQueue.enqueue(item.product.id, () =>
          updateProductStock(item.product.id, -item.qty)
        );
      }
      return [];
    })
  );
  const order = Order.build({
    email: new_order.email,
    cart: cart,
  });
  await order.save();

  res.code(201).send(order);
}

export { createOrderController };

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
