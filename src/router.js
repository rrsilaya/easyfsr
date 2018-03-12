import { Router } from 'express';

import authRouter from './entities/auth/router';
import userRouter from './entities/user/router';

const router = Router();

router.use(authRouter);
router.use(userRouter);

export default router;
