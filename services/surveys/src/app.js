import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import cookieParser from 'cookie-parser';
import { isProd, jwtRS256 } from './config';
import { ping, forms } from './routes';

const app = express();

app.use(morgan('common'));
app.use(cookieParser());
app.use(express.json());

const cookieName = 'token';

const optsJwt = {
  jwtFromRequest: (request) => {
    let token = null;
    if (request.cookies && request.cookies[cookieName]) {
      token = request.cookies[cookieName];
    }

    return token;
  },
  secretOrKey: jwtRS256.publicKey,
  algorithms: ['RS256'],
};

passport.use(
  new JwtStrategy(optsJwt, (jwtPayload, done) => done(null, jwtPayload))
);
app.use(passport.initialize());

app.get('/api/survey', (_req, res) =>
  res.status(200).json({
    message: 'Survey service up!',
  })
);

app.use('/api/survey', ping);
app.use('/api/survey', forms);

app.use((err, _req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (isProd) {
    // eslint-disable-next-line no-console
    console.error(err.stack);
    res.status(500).send({ message: 'Something broke!', error: err });
  } else {
    next(err);
  }
});

export default app;
