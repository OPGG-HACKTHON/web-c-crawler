import express from 'express';
import fs from 'fs'
import Initializer from './initializer/index';
const https = require('https');
require('dotenv').config();

// const options = { key: fs.readFileSync('/home/ec2-user/swoomi/backend_swoomi_me.p12') };

const options = {
  url: 'https://backend.swoomi.me/',
  headers: {
      "content-type": "application/json",
  },
  agentOptions: {
      pfx: fs.readFileSync('/home/ec2-user/swoomi/backend_swoomi_me.p12'),
      passphrase: ''
  }
};

const startServer = () => {
  const app: express.Application = express();
  const { SERVER_PORT } = process.env;
  const initializer: Initializer = new Initializer(app);
  initializer.init();
  https.createServer(options, app).listen(SERVER_PORT);
  // app.listen(SERVER_PORT)
};

startServer();