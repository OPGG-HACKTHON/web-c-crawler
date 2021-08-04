import { Request, Response } from 'express';
import StatusCode from '../constants/statusCode';
import { IResponseData } from '../types';
import champDataModel from '../models/ChampData';
import ErrorMessage from '../constants/errorMsg';
import errorHandler from '../utils/errorHandler';

class ChampDataController {
  public getChampData(req: Request, res: Response) {
    try {
      const champData: IResponseData = champDataModel.getChampData();
      if (!champData) throw new Error(ErrorMessage.SERVER_ERROR);
      res.status(StatusCode.OK).json({ champData, date: champDataModel.updateDay });
    } catch (error) {
      errorHandler(error, res);
    }
  }
}

const champDataController = new ChampDataController();
export default champDataController;
