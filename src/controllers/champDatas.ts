import { Request, Response } from 'express';
import champDataService from '../services/champData';
import StatusCode from '../constants/statusCode';
import { champDatas } from '../models/staticData';
import { IResponseData, IChampionDataProps } from '../types';
import ErrorMessage from '../constants/errorMsg';
import errorHandler from '../utils/errorHandler';

class ChampData {
  async getChampData(req: Request, res: Response) {
    try {
      const initData: IResponseData = {};
      const champKoNames = Object.keys(champDatas);
      const skillAccelItemDatas = await champDataService._getSkillAccelData();
      let cnt = 0;
      let updatedData: IResponseData = {};
      for (let koName of champKoNames) {
        const champAsset: IChampionDataProps = { koName, data: initData, skillAccelItemDatas };
        updatedData = await champDataService._getItemsByChampion(champAsset);
        console.log(cnt++);
      }
      res.status(StatusCode.OK).json(updatedData);
    } catch (error) {
      errorHandler(error, res);
    }
  }
}

const champDataController = new ChampData();
export default champDataController;
