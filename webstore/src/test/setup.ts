import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import { authRoutes } from "../routes/route-opts/auth-opts";
import { testingRouter } from "../routes/testing-router";

declare global {
  var getAuthCookie: () => Promise<
    | {
        [x: string]: string;
      }
    | undefined
  >;
  var getAdminCookie: () => Promise<
    | {
        [x: string]: string;
      }
    | undefined
  >;
}

let mongo: any;
beforeAll(async () => {
  app.register(testingRouter);

  // await MongoMemoryReplSet.create({
  //   replSet: { name: "testset", count: 1, storageEngine: "wiredTiger" },
  // });
  mongo = await MongoMemoryServer.create();

  const mongoUri = mongo.getUri();

  // const uri = replset.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
  await app.close();
}, 35000);

global.getAuthCookie = async () => {
  const response = await app.inject({
    method: "POST",
    url: authRoutes.emailSignUp,
    payload: {
      email: "test@test.com",
      password: "Password123",
    },
  });
  expect(response.statusCode).toEqual(200);

  const cookie = response.cookies as { name: string; value: string }[];

  return {
    [cookie[0].name]: cookie[0].value,
    [cookie[1].name]: cookie[1].value,
  };
};

global.getAdminCookie = async () => {
  const response = await app.inject({
    method: "GET",
    url: "/api/auth/testing-admin",
  });
  expect(response.statusCode).toEqual(200);

  const cookie = response.cookies as { name: string; value: string }[];

  return {
    [cookie[0].name]: cookie[0].value,
    [cookie[1].name]: cookie[1].value,
  };
};
