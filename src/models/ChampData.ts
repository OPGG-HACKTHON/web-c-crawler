import fs from 'fs';
import DataType from '../constants/dataType';
import Crawler from '../managers/crawler';
import { champDatas, itemDict } from '../models/staticData';
import { IUpdatedData, IItemSkillAccelData, IResponseData, IItemImgData, IChampionDataProps, IChampData, IItemData } from '../types';
import sendMail from '../utils/mailSender';
require('dotenv').config();

interface IData {
  [key: string]: any;
}

class ChampData {
  private _changeDataForm = (data: IResponseData):IChampData[] => {
    const newData = []
    for (let name of Object.keys(data)) {
      const posData = data[name]
      for ( let pos of Object.keys(posData)) {
        const unitData = posData[pos];
        const newItems = []
        for ( let itemName of Object.keys(unitData.items)){
          const itemData = unitData.items[itemName]
          const newItemData:IItemData = {
            name : itemName,
            skillAccel : itemData.skillAccel,
            englishName : itemData.englishName,
            src : itemData.src
          }
          newItems.push(newItemData)
        }
        const newUnitData : IChampData = {
          id : name,
          position: pos,
          items : newItems
        }
        newData.push(newUnitData) 
      }
    }
    return newData
  }

  public updateDay: Date = new Date();

  public setChampData(data: IResponseData) {
    const newData = this._changeDataForm(data)
    fs.writeFile('static/customData.json', JSON.stringify(newData), async () => sendMail('UPDATE SUCCESS'));
    this.updateDay = new Date();
  }

  public getChampData(): IResponseData {
    const champData = JSON.parse(fs.readFileSync(process.env.CHAMP_DATA_PATH!).toString());
    return champData;
  }

  public updateChampData = async () => {
    try {
      const initData: IResponseData = {};
      const champKoNames = Object.keys(champDatas);
      const skillAccelItemDatas = await this._getSkillAccelData();
      let updatedData: IResponseData = {};
      for (let koName of champKoNames) {
        const champAsset: IChampionDataProps = { koName, data: initData, skillAccelItemDatas };
        updatedData = await this._getItemsByChampion(champAsset);
      }
      this.setChampData(updatedData);
    } catch (error) {
      await sendMail(error);
    }
  };

  private async _getSkillAccelData(): Promise<IItemSkillAccelData> {
    try {
      const crawler = new Crawler(DataType.SKILL_ACCEL);
      const skillAccelItemDatas = (await crawler.execute()) as IItemSkillAccelData;
      return skillAccelItemDatas;
    } catch (error) {
      throw error;
    }
  }

  private async _getItemsByChampion(champAsset: IChampionDataProps): Promise<IResponseData> {
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

export default new ChampData();
