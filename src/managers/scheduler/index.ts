import schedule from 'node-schedule';
import ChampDataModel from '../../models/ChampData';
import staticDataUpdater from '../staticDataUpdater';

class Scheduler {
  public async scheduleCrawling() {
    schedule.scheduleJob('00 00 06 * * 2,6', async () => {
      await staticDataUpdater.updateStaticData();
      await ChampDataModel.updateChampData();
    });
  }
}

export default Scheduler;
