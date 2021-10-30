import express from 'express';
import routes from '../routes/index';
const cors = require('cors');

const corsOption = {
  origin: true,
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
    this._app.use(cors(corsOption));
  }
}

export default ExpressInitializer;
