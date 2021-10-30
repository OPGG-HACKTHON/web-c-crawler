import { Request, Response } from 'express';
import fs from 'fs';
import errorHandler from '../utils/errorHandler';

console.log(new Date())
class VisitorController {
    public visit (req: Request, res: Response) {
        try {
            const data = JSON.parse(fs.readFileSync('static/visitor.json').toString());
            data.totalVisitor = String(parseInt(data.totalVisitor) + 1);
            const currentDate = String(new Date());
            const currentDay = currentDate.split('T')[0]
            const ip = req.headers['x-forwarded-for'] ?? 'unknown';
            const ipStr = String(ip)
            if(!data.visitorInfo[ipStr]) data.visitorInfo[ipStr] = '0';
            data.visitorInfo[ipStr] = String(parseInt(data.totalVisitor) + 1);
            
            if(!data.DAU[currentDay]) data.DAU[currentDay] = '0';
            data.DAU[currentDay] = String(parseInt(data.DAU[currentDay]) + 1);
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
