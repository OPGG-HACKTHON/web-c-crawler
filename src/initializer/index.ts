import express from 'express';
import ExpressInitializer from './express';

class Initializer {
  private _expressInitializer: ExpressInitializer | null = null;

  constructor(app: express.Application) {
    this._expressInitializer = new ExpressInitializer(app);
  }

  public init() {
    if (!this._expressInitializer) return;
    this._expressInitializer.init();
  }
}

export default Initializer;
