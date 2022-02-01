import { app } from "./app";
import config from "./config";
import mongoose from "mongoose";
const start = async () => {
  if (!config.MONGO_URI) {
    throw new Error("MONGO_URI must be defined!");
  }
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(config.PORT, "0.0.0.0", () => {
      console.log(`Listening on PORT ${config.PORT}`);
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
