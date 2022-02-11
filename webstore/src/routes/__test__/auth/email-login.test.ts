import { app } from "../../../app";
import { authRoutes } from "../../route-opts/auth-opts";

const createUser = async () => {
  const user = (Math.random() + 1).toString(36).substring(7);
  const email = `${user}@test.com`;
  const response = await app.inject({
    method: "POST",
    url: authRoutes.emailSignUp,
    payload: {
      email: email,
      password: "Password123",
    },
  });
  expect(response.statusCode).toEqual(201);
  console.log(response.body);
  return {
    email: email,
    password: "Password123",
  };
};

it("responds with a code different than 404", async () => {
  const response = await app.inject({
    method: "POST",
    url: authRoutes.emailLogIn,
  });

  expect(response.statusCode).not.toEqual(404);
});

it("attempts to log in without email", async () => {
  const user = await createUser();
  const response = await app.inject({
    method: "POST",
    url: authRoutes.emailLogIn,
    payload: {
      password: user.password,
    },
  });
  expect(response.statusCode).toEqual(400);
});

it("attempts to log in without password", async () => {
  const user = await createUser();

  const response = await app.inject({
    method: "POST",
    url: authRoutes.emailLogIn,
    payload: {
      email: user.email,
    },
  });
  expect(response.statusCode).toEqual(400);
});

it("attempts to log in with an invalid email", async () => {
  const user = await createUser();

  const response = await app.inject({
    method: "POST",
    url: authRoutes.emailLogIn,
    payload: {
      email: "test@",
      password: user.password,
    },
  });
  expect(response.statusCode).toEqual(400);
});

it("attempts to log in with an invalid password", async () => {
  const user = await createUser();

  const response = await app.inject({
    method: "POST",
    url: authRoutes.emailLogIn,
    payload: {
      email: user.email,
      password: "password123",
    },
  });
  expect(response.statusCode).toEqual(400);
});

it("attempts to log in with an email that doesn't exist", async () => {
  const response = await app.inject({
    method: "POST",
    url: authRoutes.emailLogIn,
    payload: {
      email: "testexists@test.com",
      password: "Password123",
    },
  });
  expect(response.statusCode).toEqual(404);
});

it("logs user in successfully", async () => {
  const user = await createUser();
  const response = await app.inject({
    method: "POST",
    url: authRoutes.emailLogIn,
    payload: {
      email: user.email,
      password: user.password,
    },
  });
  expect(response.statusCode).toEqual(200);
});
