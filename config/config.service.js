import dotenv from "dotenv";
import { resolve } from "node:path";

const envPath = {
  development: "dev.env",
  production: "prod.env",
};
//path:path.resolve
dotenv.config({ path: resolve(`./config/${envPath.development}`) });

export const PORT = process.env.PORT || 3000;
export const DB_URL = process.env.DB_URL;
