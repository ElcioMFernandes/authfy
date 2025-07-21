import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env["SERVER_PORT"] || 3000,
  node_env: process.env["NODE_ENV"] || "development",

  database: {
    url: process.env["DATABASE_URL"]!,
  },

  jwt: {
    access_secret: process.env["ACCESS_SECRET"]!,
    access_expires: process.env["ACCESS_EXPIRES"]!,
    refresh_secret: process.env["REFRESH_SECRET"]!,
    refresh_expires: process.env["REFRESH_EXPIRES"]!,
  },

  redis: {
    url: process.env["REDIS_URL"]!,
    password: process.env["REDIS_PASSWORD"]!,
  },
  rate_limit: {
    windowMs: parseInt(process.env["RATE_LIMIT_WINDOW_MS"] || "900000"),
    maxRequests: parseInt(process.env["RATE_LIMIT_MAX_REQUESTS"] || "100"),
  },
  security: {
    bcryptSaltRounds: parseInt(process.env["BCRYPT_SALT_ROUNDS"] || "12"),
  },
} as const;

const require_env_variables = [
  "DATABASE_URL",
  "ACCESS_SECRET",
  "REFRESH_SECRET",
];

for (const env_variable of require_env_variables) {
  if (!process.env[env_variable])
    throw new Error(`Missing required environment variable: ${env_variable}`);
}
