import DataType from '../constants/dataType';
import SkillAccelCrawler from './SkillAccel';

type crawlingDataType = DataType.IMG | DataType.SKILL_ACCEL;

class Crawler {
  private _Controller: null | SkillAccelCrawler = null;

  constructor(type: crawlingDataType) {
    if (type === DataType.SKILL_ACCEL) this._Controller = new SkillAccelCrawler();
  }

  public async execute() {
    try {
      const datas = await this._Controller?.execute();
      return datas;
    } catch (error) {
      throw error;
    }
  }
}

export default Crawler;
