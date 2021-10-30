import express from 'express';
import champData from './champData';
import visitorData from './visitor'

const router = express.Router();

router.use('/item', champData);
router.use('/visitor',visitorData)

export default router;
