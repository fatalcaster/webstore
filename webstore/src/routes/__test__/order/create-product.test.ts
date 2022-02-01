import { app } from "../../../app";

it("responds with a code different than 404", async () => {
  // await global.getAuthCookie();

  const response = await app.inject({
    method: "GET",
    url: "/product",
  });

  expect(response.statusCode).not.toEqual(404);
});
