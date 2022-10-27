import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { jwtRS256, loginRedirect } from '../config';

import('../controllers/auth-controller');

const auth = express();

auth.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

auth.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: loginRedirect,
    session: false,
  }),
  (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(401).json({
        message: 'Invalid request',
      });

      return;
    }

    const token = jwt.sign(
      {
        sub: req.user.id,
        username: req.user.email,
        iss: 'auth-semanai',
      },
      {
        key: jwtRS256.privateKey,
        passphrase: jwtRS256.passphrase,
      },
      {
        algorithm: 'RS256',
        expiresIn: '2 days',
      }
    );

    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 2,
      domain: jwtRS256.domain,
      secure: true,
      httpOnly: true,
    });
    res.redirect(loginRedirect);
  }
);

auth.get('/logout', (_req, res) => {
  res.clearCookie('token', {
    domain: jwtRS256.domain,
  });
  res.redirect(loginRedirect);
});

export default auth;
