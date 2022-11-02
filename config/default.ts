import * as dotenv from "dotenv";
dotenv.config();

export default {
  corsOrigin: process.env.CORS_ORIGIN,
  port: process.env.PORT,
};
