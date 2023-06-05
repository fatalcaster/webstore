// import { ProductDoc } from "../models/product";
// import { XOR } from "./utils";

type TCart = {
  qty: number;
  product: string;
};
// // type TOrder = {
// //   email: string;
// //   cart: TCart[];
// // };

// // async function parseCart(order: TOrder) {
// //   const cart = removeDupProducts(sortCart(order.cart));

// //   const cart_query = isolatePropertyFromArray(cart, "product", (item) =>
// //     isValidObjectId(item)
// //   ) as Array<string>;

// //   const existing_items = await getManyProducts({ id_range: cart_query });
// //   if (existing_items.length !== cart_query.length) {
// //     throw new NotFoundError();
// //   }

// //   return { cart: final_cart, stock_updates: existing_items };
// // }

// type TInsufficientSupply = {
//   id: string;
//   cart: null;
//   updated_stock: null;
// };
// type TSufficientSupply = {
//   id: null;
//   cart: {
//     qty: number;
//     product: ProductDoc;
//   }[];
//   updated_stock: ProductDoc[];
// };
// function updateStock(
//   cart: TCart[],
//   current_stock: ProductDoc[]
// ): XOR<TInsufficientSupply, TSufficientSupply> {
//   const final_cart = [];
//   for (let i = 0, j = 0; i < cart.length; i++) {
//     console.log(current_stock[j]);
//     // If Id's are matching...
//     if (cart[i].product === current_stock[j].id) {
//       // If the stock is insufficient...
//       if (
//         current_stock[j].stock !== "unlimited" &&
//         current_stock[j].stock < cart[i].qty
//       ) {
//         return { id: current_stock[j].id, cart: null, updated_stock: null };
//       }
//       // Add the product to the cart
//       final_cart.push({
//         qty: cart[i].qty,
//         product: current_stock[j],
//       });
//       /*
//       // if stock isn't unlimited...
//       if (typeof current_stock[j].stock === "number")
//         // @ts-ignore
//         // update it
//         current_stock[j].stock -= cart[i].qty;
//       */
//       j++;
//     }
//   }
//   return { id: null, cart: final_cart, updated_stock: current_stock };
// }
function removeDupProducts(sorted_cart: TCart[]) {
  for (let i = 1; i < sorted_cart.length; i++) {
    if (sorted_cart[i].product === sorted_cart[i - 1].product) {
      sorted_cart[i - 1].qty += sorted_cart[i].qty;
      sorted_cart.splice(i, 1);
    }
  }
  return sorted_cart;
}
function sortCart(cart: TCart[]) {
  const sorted_cart = cart.sort((a, b) => {
    return a.product.localeCompare(b.product);
  });
  return sorted_cart;
}

export { removeDupProducts, sortCart };
