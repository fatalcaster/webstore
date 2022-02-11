import { app } from "../../../app";
import { authRoutes } from "../../route-opts/auth-opts";

const createUser = async () => {
  const user = (Math.random() + 1).toString(36).substring(7);
  const email = `${user}@test.com`;
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
    email: email,
    password: "Password123",
    cookies: cookie,
  };
};

it("responds with a code different than 404", async () => {
  const response = await app.inject({
    method: "GET",
    url: authRoutes.getMe,
  });

  expect(response.statusCode).not.toEqual(404);
});

it("returns data about the current user", async () => {
  const user = await createUser();
  const response = await app.inject({
    method: "GET",
    url: authRoutes.getMe,
    cookies: user.cookies,
  });

  expect(response.statusCode).toEqual(200);
});
