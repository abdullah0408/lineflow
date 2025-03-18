import { Router } from 'express';
import userRouter from './api/index.js';

const router = Router();

router.use('/api', userRouter);

export default router;