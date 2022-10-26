import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import { ping , forms } from './routes';

const app = express();

app.use(morgan('common'));
app.use(express.json());

app.use(
  session({
    secret: 'secr3t',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

app.get('/api/survey', (_req, res) =>
  res.status(200).json({
    message: 'Survey service up!',
  })
);

app.use('/api/survey', ping);
app.use('/api/survey',forms);

export default app;
