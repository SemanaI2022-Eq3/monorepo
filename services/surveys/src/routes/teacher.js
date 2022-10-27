import express from 'express';
import { authRequired } from '../middleware/auth-required';

const teachers = express();

teachers.get('/teachers', authRequired, async (_req, res) => {
  res.status(200).json({
    pong: new Date().getTime(),
  });
});

export default teachers;
