import DataType from '../constants/dataType';
import Crawler from './crawler';
import { champDatas, itemDict } from '../models/staticData';
import { IUpdatedData, IItemSkillAccelData, IResponseData, IItemImgData, IChampionDataProps } from '../types';

interface IData {
  [key: string]: any;
}

class ChampDataService {
  public async getSkillAccelData(): Promise<IItemSkillAccelData> {
    try {
      const crawler = new Crawler(DataType.SKILL_ACCEL);
      const skillAccelItemDatas = (await crawler.execute()) as IItemSkillAccelData;
      return skillAccelItemDatas;
    } catch (error) {
      throw error;
    }
  }

  public async getItemsByChampion(champAsset: IChampionDataProps): Promise<IResponseData> {
    try {
      const { koName, data } = champAsset;
      let updatedData: IResponseData = {};
      const { englishName: enName, position } = champDatas[koName];
      data[koName] = {};
      for (let line of position) {
        updatedData = await this._getItemsByLine({ ...champAsset, pos: line, enName });
      }
      return updatedData;
    } catch (error) {
      throw error;
    }
  }

  private async _getItemsByLine(champAsset: IChampionDataProps): Promise<IResponseData> {
    try {
      const { pos, enName } = champAsset;
      const crawler = new Crawler(DataType.IMG, enName, pos);
      const itemsDataOfChamp = (await crawler.execute()) as IItemImgData;
      const data = this._createResponseData(champAsset, itemsDataOfChamp);
      return data;
    } catch (error) {
      throw error;
    }
  }

  private _createResponseData(champAsset: IChampionDataProps, itemsDataOfChamp: IItemImgData): IResponseData {
    const { koName, skillAccelItemDatas, pos, data, enName } = champAsset;
    data[koName] = {
      ...data[koName!],
      [pos!]: {
        items: this._combineData(skillAccelItemDatas, itemsDataOfChamp),
        name: koName!,
        englishName: enName!,
        position: pos!,
      },
    };
    return data;
  }

  private _combineData(first: IData, second: IData): IUpdatedData {
    const updatedDatas: IUpdatedData = {};
    const koName = Object.keys(first);
    const enName = Object.keys(second);
    koName.forEach((key) => {
      if (enName.includes(itemDict[key])) updatedDatas[key] = { ...first[key], ...second[itemDict[key]] };
    });
    return updatedDatas;
  }
}

const champDataService = new ChampDataService();
export default champDataService;
