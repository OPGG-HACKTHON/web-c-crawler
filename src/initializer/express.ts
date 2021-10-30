import express from 'express';
import routes from '../routes/index';
const cors = require('cors');

let corsOptions = {
  origin: 'https://www.domain.com',
  credentials: true
}

class ExpressInitializer {
  private _app: express.Application | null = null;

  constructor(app: express.Application) {
    this._app = app;
  }

  public init() {
    if (!this._app) return;
    this._app.use('/champion', routes);
    this._app.use(cors(corsOptions));
  }
}

export default ExpressInitializer;
