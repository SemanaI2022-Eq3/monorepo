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

const decode = (data) => {
  if (!data) {
    return undefined;
  }
  const buff = Buffer.from(data, 'base64');
  return buff.toString('utf-8');
};

const jwtRS256 = {
  publicKey: decode(process.env.JWT_RS256_PUB_KEY),
};

export { port, mongodbUri, jwtRS256 };
