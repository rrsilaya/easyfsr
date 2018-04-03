import { Router } from 'express';

import * as Middleware from './middlewares';

import authRouter from './entities/auth/router';
import awardRouter from './entities/award/router';
import courseRouter from './entities/course/router';
import courseSchedRouter from './entities/courseSched/router';
import fsrRouter from './entities/fsr/router';
import limitedPracticeOfProfRouter from './entities/limitedPracticeOfProf/router';
import serviceRouter from './entities/extensionAndCommunityService/router';
import subjectRouter from './entities/subject/router';
import userRouter from './entities/user/router';
import announcementRouter from './entities/announcement/router';

const router = Router();

router.use(authRouter);
router.use(Middleware.isLoggedIn);

router.use(awardRouter);
router.use(courseRouter);
router.use(courseSchedRouter);
router.use(fsrRouter);
router.use(limitedPracticeOfProfRouter);
router.use(serviceRouter);
router.use(subjectRouter);
router.use(announcementRouter);
router.use(userRouter);

export default router;
