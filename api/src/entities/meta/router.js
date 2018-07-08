import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.post('/meta', async (req, res) => {
  try {
    const id = await Ctrl.addMetaData(req.body);
    const metaData = await Ctrl.getMetaData({ id });

    res.status(200).json({
      status: 200,
      message: 'Successfully created metadata',
      data: metaData,
    });
  } catch (status) {
    res.status(status).json({
      status,
      message: 'Internal server error while adding metadata',
    });
  }
});

router.get('/meta', async (req, res) => {
  try {
    const metaData = await Ctrl.getLatestMetaData();

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
