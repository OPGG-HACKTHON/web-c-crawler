import { Request, Response } from 'express';
import fs from 'fs';
import errorHandler from '../utils/errorHandler';

class ErrorDataController {
  public saveErrorData(req: Request, res: Response) {
    try {
        const { errorData } = req.body;
        let data = fs.readFileSync('static/error.json').toString()
        data += (`\n\n` + JSON.stringify(errorData))
        fs.writeFile('static/error.json', data, () => {});
        res.send();
    } catch (error) {
      errorHandler(error, res);
    }
  }

  public getErrorData(req: Request, res: Response) {
    try {
        const data = fs.readFileSync('static/error.json').toString()
        res.send(data)
    } catch (error) {
        console.log(error)
      errorHandler(error, res);
    }
  }
}

const errorDataController = new ErrorDataController();
export default errorDataController;
