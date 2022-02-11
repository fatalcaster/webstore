import { app } from "../../../app";
import { authRoutes } from "../../route-opts/auth-opts";

it("responds with a code different than 404", async () => {
  const response = await app.inject({
    method: "POST",
    url: authRoutes.emailSignUp,
  });

  expect(response.statusCode).not.toEqual(404);
});

it("attempts to sign up without email", async () => {
  const response = await app.inject({
    method: "POST",
    url: authRoutes.emailSignUp,
    payload: {
      password: "Password123",
    },
  });
  expect(response.statusCode).toEqual(400);
});

it("attempts to sign up without password", async () => {
  const response = await app.inject({
    method: "POST",
    url: authRoutes.emailSignUp,
    payload: {
      email: "test@test.com",
    },
  });
  expect(response.statusCode).toEqual(400);
});

it("attempts to sign up with an invalid email", async () => {
  const response = await app.inject({
    method: "POST",
    url: authRoutes.emailSignUp,
    payload: {
      email: "test@",
      password: "Password123",
    },
  });
  expect(response.statusCode).toEqual(400);
});

it("attempts to sign up with an invalid password", async () => {
  const response = await app.inject({
    method: "POST",
    url: authRoutes.emailSignUp,
    payload: {
      email: "test@",
      password: "password123",
    },
  });
  expect(response.statusCode).toEqual(400);
});

it("attempts to sign up with an already existing email", async () => {
  const first = await app.inject({
    method: "POST",
    url: authRoutes.emailSignUp,
    payload: {
      email: "testexists@test.com",
      password: "Password123",
    },
  });
  console.log(first.body);
  expect(first.statusCode).toEqual(201);
  const response = await app.inject({
    method: "POST",
    url: authRoutes.emailSignUp,
    payload: {
      email: "testexists@test.com",
      password: "Password123",
    },
  });
  expect(response.statusCode).toEqual(409);
});

it("signs user up successfully", async () => {
  const response = await app.inject({
    method: "POST",
    url: authRoutes.emailSignUp,
    payload: {
      email: "testira@test.com",
      password: "Password123",
    },
  });
  expect(response.statusCode).toEqual(201);
});
