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

export const SALT_ROUNDS=process.env.SALT_ROUNDS;


export const USER_ACCESS_TOKEN = process.env.USER_ACCESS_TOKEN;
export const ADMIN__ACCESS_TOKEN = process.env.ADMIN__ACCESS_TOKEN;


export const USER_REFRESH_TOKEN = process.env.USER_REFRESH_TOKEN;
export const ADMIN_REFRESH_TOKEN = process.env.ADMIN_REFRESH_TOKEN;


export const ACCESS_TOKEN_EXPIRES_IN_USER=process.env.ACCESS_TOKEN_EXPIRES_IN_USER;
export const ACCESS_TOKEN_EXPIRES_IN_ADMIN= process.env.ACCESS_TOKEN_EXPIRES_IN_ADMIN;


export const REFRESH_TOKEN_EXPIRES_IN_USER=process.env.REFRESH_TOKEN_EXPIRES_IN_USER;
export const REFRESH_TOKEN_EXPIRES_IN_ADMIN=process.env.REFRESH_TOKEN_EXPIRES_IN_ADMIN;