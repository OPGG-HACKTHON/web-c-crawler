import express from 'express';
import fs from 'fs'
import Initializer from './initializer/index';
const https = require('https');
require('dotenv').config();

const options = { key: fs.readFileSync('/home/ubuntu/app/private.key'), cert: fs.readFileSync('/home/ubuntu/app/certificate.crt') };

const startServer = () => {
  const app: express.Application = express();
  const { SERVER_PORT } = process.env;
  const initializer: Initializer = new Initializer(app);
  initializer.init();
  https.createServer(options, app).listen(SERVER_PORT);
};

startServer();