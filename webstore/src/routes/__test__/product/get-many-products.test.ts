import { app } from "../../../app";
import { productRoutes } from "../../route-opts/product-opts";

const createValidProduct = async () => {
  const cookie = await getAdminCookie();
  const response = await app.inject({
    method: "POST",
    url: productRoutes.createProduct,
    payload: {
      name: "Test",
      desc: "Testira se bas jako",
      price: 200,
      stock: 10,
    },
    cookies: cookie,
  });
  expect(JSON.parse(response.body).name).toEqual("Test");
  expect(response.statusCode).toEqual(201);
  return JSON.parse(response.body);
};

it("responds with a code different than 404", async () => {
  const response = await app.inject({
    method: "GET",
    url: productRoutes.getManyProducts,
  });
  console.log(response.statusCode);
  expect(response.statusCode).not.toEqual(404);
});

it("returns all available products", async () => {
  const prodNum = 5;
  let product;
  for (let i = 0; i < prodNum; i++) product = await createValidProduct();
  const response = await app.inject({
    method: "GET",
    url: productRoutes.getManyProducts,
  });
  console.log(response.statusCode);

  expect(response.statusCode).toEqual(200);
  expect(JSON.parse(response.body)[0].name).toEqual(product.name);
  expect(JSON.parse(response.body).length).toEqual(prodNum);
});

it("returns 3 available products", async () => {
  const prodNum = 5;
  let product;
  for (let i = 0; i < prodNum; i++) product = await createValidProduct();
  const response = await app.inject({
    method: "GET",
    url: `${productRoutes.getManyProducts}?limit=3`,
  });
  console.log(response.statusCode);
  expect(response.statusCode).toEqual(200);
  expect(JSON.parse(response.body)[0].name).toEqual(product.name);
  expect(JSON.parse(response.body).length).toEqual(3);
});
