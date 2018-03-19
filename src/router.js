import { Router } from 'express';

import authRouter from './entities/auth/router';
import userRouter from './entities/user/router';
import servRouter from './entities/extensionAndCommunityService/router';

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(servRouter);

export default router;
