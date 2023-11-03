import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;

export const NODE_ENV = process.env.NODE_ENV;

export const SECRET_WORD = process.env.SECRET_WORD|| "";

export const ROOT_USER = process.env.ROOT_USER;
export const ROOT_PASSWORD = process.env.ROOT_PASSWORD;

// export const DATABASE_HOST = process.env.DATABASE_HOST || "127.0.0.1";
// export const DATABASE_NAME = process.env.DATABASE_NAME || "";
// export const DATABASE_USER = process.env.DATABASE_USER || "";
// export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "";
