import { app } from "../../../app";
import { authRoutes } from "../../route-opts/auth-opts";
import { userRoutes } from "../../route-opts/user-opts";

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
    email: email,
    password: "Password123",
    cookies: cookie,
  };
};
it("responds with a code different than 404", async () => {
  const response = await app.inject({
    method: "GET",
    url: userRoutes.getManyUsers,
  });

  expect(response.statusCode).not.toEqual(404);
});

it("returns all available users", async () => {
  const usrNum = 5;
  const first_user = await createValidUser();
  const adminCookie = await global.getAdminCookie();
  for (let i = 0; i < usrNum - 1; i++) {
    await createValidUser();
  }
  const response = await app.inject({
    method: "GET",
    url: userRoutes.getManyUsers,
    cookies: adminCookie,
  });
  expect(response.statusCode).toEqual(200);
  const parsed_body = JSON.parse(response.body);

  const result = parsed_body.find((obj: { email: string }) => {
    return obj.email === first_user.email;
  });
  expect(result).not.toEqual(undefined);
  expect(result.email).toEqual(first_user.email);
  expect(parsed_body.length).toEqual(usrNum);
});

it("returns 3 available users", async () => {
  const usrNum = 5;
  const first_user = await createValidUser();
  const adminCookie = await global.getAdminCookie();
  for (let i = 0; i < usrNum; i++) {
    await createValidUser();
  }
  const response = await app.inject({
    method: "GET",
    url: `${userRoutes.getManyUsers}?limit=3`,
    cookies: adminCookie,
  });
  console.log(response.statusCode);
  expect(response.statusCode).toEqual(200);
  const parsed_body = JSON.parse(response.body);
  var result = parsed_body.find((obj: { email: string }) => {
    return obj.email === first_user.email;
  });
  expect(result).not.toEqual(undefined);
  expect(result.email).toEqual(first_user.email);
  expect(parsed_body.length).toEqual(3);
}, 5000);
