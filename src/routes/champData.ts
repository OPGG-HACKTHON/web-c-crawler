import express from 'express';
import champDataController from '../controllers/champDatas';
const router = express.Router();

router.get('/', champDataController.getChampData);

export default router;
