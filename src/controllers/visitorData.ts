import { Request, Response } from 'express';
import fs from 'fs';
import errorHandler from '../utils/errorHandler';
const requestIp = require('request-ip');

class VisitorController {
    public visit (req: Request, res: Response) {
        try {
            const data = JSON.parse(fs.readFileSync('static/visitor.json').toString());
            data.totalVisitor = String(parseInt(data.totalVisitor) + 1);
            const day = new Date()
            const currentDate = String(day.getFullYear()) + '-' + String(day.getMonth()) + '-' + String(day.getDay());
            const currentDay = currentDate.split('T')[0]
            const ip = requestIp.getClientIp(req);
            const ipStr = String(ip)
            if(!data.visitorInfo[ipStr]) {
                data.visitorInfo[ipStr] = '0';
                data.uniqUser = String(parseInt(data.uniqUser) + 1);
            }
            data.visitorInfo[ipStr] = String(parseInt(data.visitorInfo[ipStr]) + 1);
            
            if(!data.DAU[currentDay]) data.DAU[currentDay] = '0';
            data.DAU[currentDay] = String(parseInt(data.DAU[currentDay]) + 1);
            fs.writeFile('static/visitor.json', JSON.stringify(data), () => {});
            res.send()
        }catch(err){
            errorHandler(err, res);
        }
    }
    public checkUser(req: Request, res: Response) {
        try{
            const { summonerName } = req.params;
            const data = JSON.parse(fs.readFileSync('static/visitor.json').toString());
            if(!data.user) data.user = {};
            if(!data.user[summonerName]) data.user[summonerName] = '0';
            data.user[summonerName] = String(parseInt(data.user[summonerName]) + 1);
            fs.writeFile('static/visitor.json', JSON.stringify(data), () => {});
            res.send();
        }catch(err) {
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
