import { Router } from 'express';
import sample from './entities/sample/router';

const router = Router();

/**
 * This is just a placeholder route. Delete this when you are
 * going to add new routes. The convention will be importing
 * the router from the ./src/router directory and adding them
 * as parameter.
 *
 * ```
 * router.use(entityRouter)
 *       .use(entity2Router);
 * ```
 */
router.use(sample);

export default router;
