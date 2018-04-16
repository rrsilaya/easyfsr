import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.get('/meta', async (req, res) => {
  try {
    const metaData = await Ctrl.getMetadata();

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched metadata',
      data: metaData,
    });
  } catch (status) {
    res.status(status).json({
      status,
      message: 'Internal server error while getting metadata',
    });
  }
});

export default router;
