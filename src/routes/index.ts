import express from 'express';
import champData from './champData';
import progress from './progress';

const router = express.Router();

router.use('/progress', progress);
router.use('/item', champData);

export default router;
