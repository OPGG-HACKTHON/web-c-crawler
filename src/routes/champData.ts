import express from 'express';
const router = express.Router();

router.get('/champion/item', () => console.log('controller function'));

export default router;
