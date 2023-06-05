import { app } from "../../../app";
import { Product } from "../../../models/product";
import { getProductById } from "../../../services/product-services";
import { orderRoutes } from "../../route-opts/order-opts";

const createValidProduct = async (stock?: number) => {
  const product = Product.build({
    name: "Random product name",
    desc: "This is a product desc",
    price: 2000,
    ...(stock && { stock: stock }),
  });
  await product.save();
  return product;
};

const createAnOrder = async (cart: { product: string; qty: number }[]) => {
  const response = await app.inject({
    method: "POST",
    url: orderRoutes.createOrder,
    payload: {
      email: "test@test.com",
      cart: cart,
    },
  });
  return { statusCode: response.statusCode, body: JSON.parse(response.body) };
};

// async function createOrder(product_id: string, qty: number) {
//   const response = await app.inject({
//     method: "POST",
//     url: orderRoutes.createOrder,
//     payload: {
//       email: "test@test.com",
//       cart: [
//         {
//           product: product_id,
//           qty: qty,
//         },
//       ],
//     },
//   });
//   return response.body;
// }

it("responds with a code different than 404", async () => {
  const response = await app.inject({
    method: "POST",
    url: orderRoutes.createOrder,
  });

  expect(response.statusCode).not.toEqual(404);
});

it("attempts to create an order with empty body", async () => {
  const response = await app.inject({
    method: "POST",
    url: orderRoutes.createOrder,
  });
  expect(response.statusCode).toEqual(400);
});

// it("attempts to create an order with an invalid email", async () => {
//   const response = await app.inject({
//     method: "POST",
//     url: orderRoutes.createOrder,
//     payload: {
//       email: "tera",
//       cart: [
//         {
//           product: "",
//         },
//       ],
//     },
//   });
//   expect(response.statusCode).toEqual(400);
// });

it("creates a valid order", async () => {
  const product = await createValidProduct(10);
  const product2 = await createValidProduct(10);

  const stock1 = (await Product.findById(product.id))?.stock;
  const stock2 = (await Product.findById(product2.id))?.stock;

  console.log("STOCKICI", stock1, stock2);

  const response = await app.inject({
    method: "POST",
    url: orderRoutes.createOrder,
    payload: {
      email: "test@test.com",
      cart: [
        {
          product: product.id,
          qty: 3,
        },
        {
          product: product2.id,
          qty: 7,
        },
      ],
    },
  });
  const stock3 = (await Product.findById(product.id))?.stock;
  const stock4 = (await Product.findById(product2.id))?.stock;

  console.log("STOCKICI 2", stock3, stock4);

  expect(response.statusCode).toEqual(201);
  const check = await getProductById(product.id);
  console.log(check);
  expect(check?.stock).toEqual((product.stock as number) - 3);
});

it("attempts to create 2 orders at once - with unlimited stock", async () => {
  console.log("FROM NOW ON");
  const product = await createValidProduct();
  const product2 = await createValidProduct();
  const t = [
    createAnOrder([
      { product: product.id, qty: 3 },
      { product: product2.id, qty: 3 },
    ]),
    createAnOrder([
      { product: product.id, qty: 3 },
      { product: product2.id, qty: 3 },
    ]),
  ];
  await Promise.all(t).then((res) => {
    console.log("PROSO");
    for (let i = 0; i < res.length; i++) {
      expect(res[i].statusCode).toEqual(201);
      // console.log(`${JSON.stringify(res[i])}\n\n`);
    }
  });
});

it("attempts to create 2 orders at once - with limited stock", async () => {
  console.log("FROM NOW ON");
  const product = await createValidProduct(5);
  const product2 = await createValidProduct(5);
  const t = [
    createAnOrder([
      { product: product.id, qty: 3 },
      { product: product2.id, qty: 3 },
    ]),
    createAnOrder([
      { product: product.id, qty: 2 },
      { product: product2.id, qty: 3 },
    ]),
  ];
  const res = await Promise.all(t);
  console.log("PROSO");
  for (let i = 0; i < res.length; i++) {
    console.log(`TEST  LOG ${JSON.stringify(res[i])}\n\n`);
  }
  console.log("ITEMS LEFT", await getProductById(product.id));
  console.log("ITEMS LEFT 3", await getProductById(product2.id));
});

// it("attempts to create a product without description", async () => {
//   const cookie = await getAdminCookie();
//   const response = await app.inject({
//     method: "POST",
//     url: productRoutes.createProduct,
//     payload: {
//       name: "Ttesat",
//       price: 200,
//       stock: 10,
//     },
//     cookies: cookie,
//   });
//   expect(response.statusCode).toEqual(400);
// });

// it("attempts to create a product with invalid stock type", async () => {
//   const cookie = await getAdminCookie();
//   const response = await app.inject({
//     method: "POST",
//     url: productRoutes.createProduct,
//     payload: {
//       name: "Test",
//       desc: "Testira se bas jako",
//       price: 200,
//       stock: "10",
//     },
//     cookies: cookie,
//   });
//   expect(response.statusCode).toEqual(400);
// });

// it("attempts to create a product with invalid price type", async () => {
//   const cookie = await getAdminCookie();
//   const response = await app.inject({
//     method: "POST",
//     url: productRoutes.createProduct,
//     payload: {
//       name: "Test",
//       desc: "Testira se bas jako",
//       price: "200",
//       stock: 10,
//     },
//     cookies: cookie,
//   });
//   expect(response.statusCode).toEqual(400);
// });

// it("creates a valid product with the response code of 201", async () => {
//   const cookie = await getAdminCookie();
//   const response = await app.inject({
//     method: "POST",
//     url: productRoutes.createProduct,
//     payload: {
//       name: "Test",
//       desc: "Testira se bas jako",
//       price: 200,
//       stock: 10,
//     },
//     cookies: cookie,
//   });
//   console.log(`\n\n\n\n${JSON.stringify(response.body)}\n\n\n\n\n`);
//   expect(JSON.parse(response.body).name).toEqual("Test");
//   expect(response.statusCode).toEqual(201);
// });
