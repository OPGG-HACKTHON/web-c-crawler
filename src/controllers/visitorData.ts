import { Request, Response } from 'express';
import fs from 'fs';
import errorHandler from '../utils/errorHandler';

class VisitorController {
    public visit (req: Request, res: Response) {
        try {
            const data = JSON.parse(fs.readFileSync('static/visitor.json').toString());
            data.totalVisitor += String(parseInt(data.totalVisitor) + 1);
            data.visitorInfo.push({date: new Date()})
            fs.writeFile('static/visitor.json', JSON.stringify(data), () => {});
            res.send()
        }catch(err){
            errorHandler(err, res);
        }
    }

  public getVisitor(req: Request, res: Response) {
    try {
        const data = JSON.parse(fs.readFileSync('static/visitor.json').toString());
        res.send(data)
    } catch (error) {
      errorHandler(error, res);
    }
  }
}

const visitorController = new VisitorController();
export default visitorController;
