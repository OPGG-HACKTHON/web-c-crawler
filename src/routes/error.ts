import express from 'express';
import errorDataController from '../controllers/errorData';
const router = express.Router();

router.get('/', errorDataController.getErrorData);
router.post('/logging', errorDataController.saveErrorData);


export default router;
