import dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_ACCESS_PRIVATE: readFileSync(
    `${path.join(__dirname, "/../certs")}/jwt_access_priv.pem`
  ),
  JWT_ACCESS_PUBLIC: readFileSync(
    `${path.join(__dirname, "/../certs")}/jwt_access_pub.pem`
  ),
  JWT_REFRESH_PRIVATE: readFileSync(
    `${path.join(__dirname, "/../certs")}/jwt_refresh_priv.pem`
  ),
  JWT_REFRESH_PUBLIC: readFileSync(
    `${path.join(__dirname, "/../certs")}/jwt_refresh_pub.pem`
  ),
};
