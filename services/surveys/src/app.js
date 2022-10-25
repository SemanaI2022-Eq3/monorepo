import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import { ping } from './routes';

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

app.use('/api/survey', ping);

export default app;
