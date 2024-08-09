import express from 'express';
import {animalRouter} from './animals.js'


export const router = express.Router();

router.use('/api',animalRouter);
// router.use(contentRouter);

export default router;