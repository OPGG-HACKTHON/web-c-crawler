import express from 'express';
import champDataController from '../controllers/champDatas';
const router = express.Router();

router.get('/champion/item', champDataController.getChampData);

export default router;
