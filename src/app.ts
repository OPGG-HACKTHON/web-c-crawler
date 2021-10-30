import express from 'express';
import Initializer from './initializer/index';
require('dotenv').config();

const startServer = () => {
  const app: express.Application = express();
  const { SERVER_PORT } = process.env;
  const initializer: Initializer = new Initializer(app);
  initializer.init();
  app.listen(SERVER_PORT, () => console.log('SUCCESS'));
};

startServer();