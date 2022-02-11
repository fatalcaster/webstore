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

it("returns a 404 to a random string as an id", async () => {
  const url = "/api/product/relfanlfeajn";
  console.log(url);
  const response = await app.inject({
    method: "GET",
    url: url,
  });
  expect(response.statusCode).toEqual(404);
});

it("gets the product with the given id", async () => {
  const product = await createValidProduct();

  const url = `/api/product/${product.id}`;
  console.log(url);
  const response = await app.inject({
    method: "GET",
    url: url,
  });
  expect(response.statusCode).toEqual(200);
});
