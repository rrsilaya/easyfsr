import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.get('/log/:id', async (req, res) => {
  try {
    const log = await Ctrl.getLog(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched log',
      data: log,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'log not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.get('/log/', async (req, res) => {
  try {
    const logs = await Ctrl.getLogs(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched logs',
      data: logs,
      total: (await Ctrl.getTotalLogs(req.query)).total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalLogs(req.query)).total /
          (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Logs not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
