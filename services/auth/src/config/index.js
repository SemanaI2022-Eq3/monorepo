import dotenv from 'dotenv';

const isProd = process.env.NODE_ENV === 'production';
if (!isProd) {
  dotenv.config();
}

const port = process.env.PORT || 8000;

const mongodbUri = process.env.MONGODB_URI;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleCallback = process.env.GOOGLE_CALLBACK;

if (!mongodbUri || !googleClientId || !googleClientSecret || !googleCallback) {
  if (isProd) {
    throw new Error(
      'MONGODB_URI, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET or GOOGLE_CALLBACK  is undefined! Add it as an environment variable.'
    );
  } else {
    throw new Error(
      "MONGODB_URI, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET or GOOGLE_CALLBACK is undefined! Add it to your .env file in /back/.env (copy .env.example to .env if it doesn't exist)"
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
  privateKey: decode(process.env.JWT_RS256_PRIV_KEY),
  passphrase: process.env.JWT_RS256_PASSPHRASE,
  domain: process.env.JWT_COOKIE_DOMAIN || 'localhost',
};

const loginRedirect = process.env.LOGIN_REDIRECT || '/';

export {
  port,
  mongodbUri,
  googleClientId,
  googleClientSecret,
  googleCallback,
  jwtRS256,
  loginRedirect,
};
