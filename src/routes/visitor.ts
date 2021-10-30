import express from 'express';
import visitorController from '../controllers/visitorData';
const router = express.Router();

router.get('/', visitorController.getVisitor);
router.get('/plus', visitorController.visit);
router.get('/user/:summonerName', visitorController.checkUser);
router.get('/examplePage', visitorController.checkExample);

export default router;
