import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();
router.post('/research/', async (req, res) => {
  try {
    const id = await Ctrl.addResearch(req.body);

    const research = await Ctrl.selectResearch(id);
    console.log(req.body.researchID);
    console.log(research);
    res.status(200).json({
      status: 200,
      message: 'Successfully created research',
      data: research,
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

router.get('/research/:researchID', async (req, res) => {
  try {
    const research = await Ctrl.selectResearch(req.params);
    console.log(research);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched research',
      data: research,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
