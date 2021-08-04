import Scheduler from '../managers/scheduler';

class ScheduleInitializer {
  private _scheduler: Scheduler | null = null;

  constructor() {
    this._scheduler = new Scheduler();
  }

  public init() {
    this._scheduler!.scheduleCrawling();
  }
}

export default ScheduleInitializer;
