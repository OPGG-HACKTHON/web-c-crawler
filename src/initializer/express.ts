import express from 'express';
import routes from '../routes/index';

class ExpressInitializer {
  private _app: express.Application | null = null;

  constructor(app: express.Application) {
    this._app = app;
  }

  public init() {
    if (!this._app) return;
    this._app.use('/champion', routes);
  }
}

export default ExpressInitializer;
