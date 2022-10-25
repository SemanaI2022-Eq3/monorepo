import express from 'express';
import { authRequired } from '../middleware/auth-required';

const ping = express();

ping.use('/ping', authRequired, (_req, res) => {
  res.status(200).json({
    pong: new Date().getTime(),
  });
});

export default ping;
