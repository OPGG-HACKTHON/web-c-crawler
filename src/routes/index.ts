import express from 'express';
import champData from './champData';

const router = express.Router();

router.use('/item', champData);

export default router;
