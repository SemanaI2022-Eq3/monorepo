import express from 'express';
import { userRepository } from '../database';
import { authRequired } from '../middleware/auth-required';

const user = express();

user.get('/info', authRequired, (req, res, next) => {
  userRepository
    .getUserById({ id: req.user.sub })
    .then((userObject) => {
      res.status(200).json({ user: userObject });
    })
    .catch(next);
});

user.get('/infojwt', authRequired, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

export default user;
