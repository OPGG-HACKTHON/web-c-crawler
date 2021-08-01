import { Request, Response } from 'express';
import champDataService from '../services/champData';
import StatusCode from '../constants/statusCode';
import { champDatas } from '../models/staticData';
import { IResponseData, IChampionDataProps } from '../types';
import ErrorMessage from '../constants/errorMsg';

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
      if (error.message === ErrorMessage.UPSTREAM_ERROR) res.status(StatusCode.UPSTREAM_ERROR);
      if (error.message === ErrorMessage.CLIENT_ERROR) res.status(StatusCode.CLIENT_ERROR);
      if (error.message === ErrorMessage.SERVER_ERROR) res.status(StatusCode.SERVER_ERROR);
    }
  }
}

const champDataController = new ChampData();
export default champDataController;
