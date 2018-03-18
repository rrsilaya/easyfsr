import { Router } from 'express';

import authRouter from './entities/auth/router';
import userRouter from './entities/user/router';
import courseRouter from './entities/course/router';
// import courseSchedRouter from './entities/courseSched/router';

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(courseRouter);
// router.use(courseSchedRouter);

export default router;
