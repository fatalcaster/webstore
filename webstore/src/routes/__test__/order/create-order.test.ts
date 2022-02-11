import { app } from "../../../app";
import { orderRoutes } from "../../route-opts/order-opts";

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
