import { app } from "../../../app";
import { Product } from "../../../models/product";
import { productRoutes } from "../../route-opts/product-opts";

const createValidProduct = async () => {
  const product = Product.build({
    name: "Random product name",
    desc: "This is a product desc",
    price: 2000,
  });
  await product.save();
  return product;
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
  let product = await createValidProduct();
  for (let i = 0; i < prodNum - 1; i++) product = await createValidProduct();
  const inserted = (await Product.find({})).length;
  console.log(inserted);
  expect(inserted).toEqual(prodNum);

  const response = await app.inject({
    method: "GET",
    url: productRoutes.getManyProducts,
  });
  console.log(response.statusCode);

  expect(response.statusCode).toEqual(200);
  // console.log(response.body);
  expect(JSON.parse(response.body).length).toEqual(prodNum);
  expect(JSON.parse(response.body)[0].name).toEqual(product!.name);
  expect(JSON.parse(response.body).length).toEqual(prodNum);
});

it("returns 3 available products", async () => {
  const prodNum = 5;
  let product = await createValidProduct();
  for (let i = 0; i < prodNum - 1; i++) product = await createValidProduct();
  const inserted = (await Product.find({})).length;
  console.log(inserted);
  expect(inserted).toEqual(prodNum);

  const response = await app.inject({
    method: "GET",
    url: `${productRoutes.getManyProducts}?limit=3`,
  });
  expect(response.statusCode).toEqual(200);
  expect(JSON.parse(response.body).length).toEqual(3);
  expect(JSON.parse(response.body)[0].name).toEqual(product!.name);
  expect(JSON.parse(response.body).length).toEqual(3);
});
