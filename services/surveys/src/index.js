/* eslint-disable no-console */
import app from './app';
import { port } from './config';

const start = async () => {
  try {
    console.info('Starting server...');
    app.listen(port, () => {
      console.info(`🚀  Server running at port: ${port}`);
    });
  } catch (err) {
    console.error(err);
    console.error('Not able to run server');
  }
};

start();
