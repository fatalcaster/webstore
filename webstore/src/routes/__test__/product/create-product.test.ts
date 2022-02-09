import { app } from "../../../app";

it("responds with a code different than 404", async () => {
  const response = await app.inject({
    method: "POST",
    url: "/product",
  });

  expect(response.statusCode).not.toEqual(404);
});


it("creates a valid product with the response code of 201", async () => {
  const response = await app.inject({
    method: "POST",
    url: "/product",
    payload: {
      name: "Test",
      desc: "Testira se bas jako",
      price: 200,
      stock: 10
    }
  });
  console.log(`\n\n\n\n${JSON.stringify(response.body)}\n\n\n\n\n`);
  expect(JSON.parse(response.body).name).toEqual("Test"); 
  expect(response.statusCode).toEqual(201);
});