import { Router } from 'express';

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
router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Successfully fetched data',
  });
});

export default router;
