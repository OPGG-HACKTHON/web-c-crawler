import express from 'express';
import ExpressInitializer from './express';
import ScheduleInitializer from './scheduler';

class Initializer {
  private _expressInitializer: ExpressInitializer | null = null;
  private _schesuleInitializer: ScheduleInitializer | null = null;

  constructor(app: express.Application) {
    this._expressInitializer = new ExpressInitializer(app);
    this._schesuleInitializer = new ScheduleInitializer();
  }

  public init() {
    if (!this._expressInitializer) return;
    this._expressInitializer.init();
    if (!this._schesuleInitializer) return;
    this._schesuleInitializer.init();
  }
}

export default Initializer;
