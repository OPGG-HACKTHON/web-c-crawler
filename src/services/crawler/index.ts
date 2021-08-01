import DataType from '../constants/dataType';
import SkillAccelCrawler from './SkillAccel';
import ItemsByChampCrawler from './ItemsByChamp';
import { IItemImgData, IItemSkillAccelData } from '../types';

type crawlingDataType = DataType.IMG | DataType.SKILL_ACCEL;

class Crawler {
  private _Controller: null | SkillAccelCrawler | ItemsByChampCrawler = null;

  constructor(type: crawlingDataType, champName: string = '', line: string = '') {
    if (type === DataType.SKILL_ACCEL) this._Controller = new SkillAccelCrawler();
    if (type === DataType.IMG) this._Controller = new ItemsByChampCrawler(champName, line);
  }

  public async execute(): Promise<IItemSkillAccelData | IItemImgData> {
    try {
      const datas = await this._Controller!.execute();
      return datas;
    } catch (error) {
      throw error;
    }
  }
}

export default Crawler;
