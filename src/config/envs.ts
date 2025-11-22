import 'dotenv/config';
import env from 'env-var';

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),

  MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
  MONGO_URL: env.get('MONGO_URL').required().asString(),

  JWT_SECRET_KEY: env.get('JWT_SECRET_KEY').required().asString(),
};
