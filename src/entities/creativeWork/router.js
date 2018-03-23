import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

router.post('/creativeWork/', async (req, res) => {
  try {
    const id = await Ctrl.addCreativeWork(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully created creative work',
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.delete('/creativeWork/:id/:creativeWorkID', async (req, res) => {
  try {
    await Ctrl.deleteCreativeWork(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted creative work',
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Creative work not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
