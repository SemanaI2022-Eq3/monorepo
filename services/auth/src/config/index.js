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

export { port, mongodbUri, googleClientId, googleClientSecret, googleCallback };
