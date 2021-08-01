import { Request, Response } from 'express';
import DataType from '../constants/dataType';
import StatusCode from '../constants/statusCode';
import Crawler from '../crawler';

class ChampData {
  async getChampData(req: Request, res: Response) {
    try {
      const crawler = new Crawler(DataType.SKILL_ACCEL);
      const data = await crawler.execute();
      res.status(StatusCode.OK).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}

const champDataController = new ChampData();
export default champDataController;
