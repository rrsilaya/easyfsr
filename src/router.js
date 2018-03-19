import { Router } from 'express';

import authRouter from './entities/auth/router';
import userRouter from './entities/user/router';
import serviceRouter from './entities/extensionAndCommunityService/router';

const router = Router();

router.use(authRouter);

// router.use( (req,res,next) => {
//   if(req.session.user.acctType == 'ADMIN'){
//     return next;
//   }
//   res.status(403).json({
//     status:403,
//     message: 'Forbidden access',
//   });
// });

router.use(userRouter);
router.use(serviceRouter);

// router.use( (req,res,next) => {
//   if(req.session.user){
//     return next;
//   }
//   res.status(401).json({
//     status:401,
//     message: 'You must be logged in',
//   });
// });

export default router;
