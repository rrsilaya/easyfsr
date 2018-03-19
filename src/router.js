import { Router } from 'express';

import authRouter from './entities/auth/router';
import userRouter from './entities/user/router';
import serviceRouter from './entities/extensionAndCommunityService/router';

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(serviceRouter);

export default router;
