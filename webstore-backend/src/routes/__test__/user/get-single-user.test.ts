import { Types } from "mongoose";
import { app } from "../../../app";
import { authRoutes } from "../../route-opts/auth-opts";

const route = "/api/user/";

const createValidUser = async (primail?: string) => {
  const user = (Math.random() + 1).toString(36).substring(7);
  const email = primail || `${user}@test.com`;
  console.log(email);
  const response = await app.inject({
    method: "POST",
    url: authRoutes.emailSignUp,
    payload: {
      email: email,
      password: "Password123",
    },
  });

  const resCookies = response.cookies as { name: string; value: string }[];

  const cookie = {
    [resCookies[0].name]: resCookies[0].value,
    [resCookies[1].name]: resCookies[1].value,
  };
  expect(response.statusCode).toEqual(201);
  console.log(response.body);
  return {
    id: JSON.parse(response.body).id,
    email: email,
    password: "Password123",
    cookies: cookie,
  };
};

it("responds with a 404 for a user that doesn't exist", async () => {
  const adminCookie = await getAdminCookie();
  const response = await app.inject({
    method: "GET",
    url: `${route}${new Types.ObjectId()}`,
    cookies: adminCookie,
  });

  expect(response.statusCode).toEqual(404);
});

it("responds with a 401 for unauthorized request", async () => {
  const response = await app.inject({
    method: "GET",
    url: `${route}${new Types.ObjectId()}`,
  });

  expect(response.statusCode).toEqual(401);
});

it("finds an existing user with code 200", async () => {
  const user = await createValidUser();
  const adminCookie = await global.getAdminCookie();
  const response = await app.inject({
    method: "GET",
    url: `${route}${user.id}`,
    cookies: adminCookie,
  });

  expect(response.statusCode).toEqual(200);
});
