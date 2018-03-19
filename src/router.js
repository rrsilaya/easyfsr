import { Router } from 'express';

import authRouter from './entities/auth/router';
import userRouter from './entities/user/router';
import awardRouter from './entities/award/router';

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(awardRouter);

export default router;
