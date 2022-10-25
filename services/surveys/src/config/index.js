import dotenv from 'dotenv';

const isProd = process.env.NODE_ENV === 'production';
if (!isProd) {
  dotenv.config();
}

const port = process.env.PORT || 8001;

const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
  if (isProd) {
    throw new Error(
      'MONGODB_URI is undefined! Add it as an environment variable.'
    );
  } else {
    throw new Error(
      "MONGODB_URI is undefined! Add it to your .env file in /back/.env (copy .env.example to .env if it doesn't exist)"
    );
  }
}

export { port, mongodbUri };
