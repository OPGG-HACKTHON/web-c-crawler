import schedule from 'node-schedule';
import ChampDataModel from '../../models/ChampData';
import staticDataUpdater from '../staticDataUpdater';

class Scheduler {
  public async scheduleCrawling() {
    schedule.scheduleJob('24 31 15 * * 1,6', async () => {
      const date = new Date()
      console.log(date + '업데이트 시작')
      await staticDataUpdater.updateStaticData();
      await ChampDataModel.updateChampData();
      console.log(date + '업데이트 끝')
    });
  }
}

export default Scheduler;
