import express from 'express';
import champData from './champData';
import visitorData from './visitor';
import errorData from './error'

const router = express.Router();

router.use('/item', champData);
router.use('/visitor',visitorData);
router.use('/error', errorData)

export default router;
