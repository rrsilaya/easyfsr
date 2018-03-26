import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

router.post('/coAuthor/', async (req, res) => {
  try {
    const id = await Ctrl.addCoAuthor(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully created co-author',
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

router.put('/coAuthor/:coAuthorID', async (req, res) => {
  try {
    await Ctrl.updateCoAuthor(req.params, req.body);
    const coAuthor = await Ctrl.getCoAuthor(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated co-author',
      data: coAuthor,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Co-author not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.delete('/coAuthor/:coAuthorID', async (req, res) => {
  try {
    const coAuthor = await Ctrl.getCoAuthor(req.params);
    await Ctrl.deleteCoAuthor(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted co-author',
      data: coAuthor,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Co-author not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
