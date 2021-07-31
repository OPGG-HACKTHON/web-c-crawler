import express from 'express';
import champData from '../routes/champData';

class ExpressInitializer {
  private _app: express.Application | null = null;

  constructor(app: express.Application) {
    this._app = app;
  }

  public init() {
    if (!this._app) return;
    this._app.use('/', champData);
  }
}

export default ExpressInitializer;
