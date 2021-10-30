import express from 'express';
import routes from '../routes/index';
const requestIp = require('request-ip');
const cors = require('cors');

const corsOption = {
  origin: '*',
  credentials: true,
};

class ExpressInitializer {
  private _app: express.Application | null = null;

  constructor(app: express.Application) {
    this._app = app;
  }

  public init() {
    if (!this._app) return;
    this._app.use('/champion', routes);
    this._app.use(cors());
    this._app.use(requestIp.mw())
  }
}

export default ExpressInitializer;
