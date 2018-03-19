import { Router } from 'express';

import authRouter from './entities/auth/router';
import userRouter from './entities/user/router';
import studyLoadRouter from './entities/studyLoad/router';

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(studyLoadRouter);

export default router;
