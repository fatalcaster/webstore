import dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_PRIVATE: readFileSync(
    `${path.join(__dirname, "/../certs")}/id_rsa_priv.pem`
  ),
  JWT_PUBLIC: readFileSync(
    `${path.join(__dirname, "/../certs")}/id_rsa_pub.pem`
  ),
};
