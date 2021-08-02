import { Request, Response } from 'express';
import champDataService from '../services/champData';
import StatusCode from '../constants/statusCode';
import { champDatas } from '../models/staticData';
import { IResponseData, IChampionDataProps } from '../types';
import errorHandler from '../utils/errorHandler';
import ErrorMessage from '../constants/errorMsg';

class ChampDataController {
  private _dataCnt: number = 0;

  private _progressPercent: number = 0;

  private _isLoading: boolean = false;

  private _setDataCnt(num: number) {
    this._dataCnt = num;
    const totalChampNum = 155;
    this._progressPercent = Math.round((num / totalChampNum) * 100);
  }

  public getChampData = async (req: Request, res: Response) => {
    try {
      if (this._isLoading) throw new Error(ErrorMessage.CLIENT_ERROR);
      this._isLoading = true;
      const initData: IResponseData = {};
      const champKoNames = Object.keys(champDatas);
      const skillAccelItemDatas = await champDataService.getSkillAccelData();
      let updatedData: IResponseData = {};
      for (let koName of champKoNames) {
        const champAsset: IChampionDataProps = { koName, data: initData, skillAccelItemDatas };
        updatedData = await champDataService.getItemsByChampion(champAsset);
        this._setDataCnt(this._dataCnt + 1);
        console.log(this._dataCnt);
      }
      this._isLoading = false;
      res.status(StatusCode.OK).json(updatedData);
    } catch (error) {
      errorHandler(error, res);
    }
  };

  public getProgressNum = (req: Request, res: Response) => {
    res.status(StatusCode.OK).json(this._progressPercent);
  };
}

const champDataController = new ChampDataController();
export default champDataController;
