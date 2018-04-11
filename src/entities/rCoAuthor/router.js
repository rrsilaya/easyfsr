import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

router.post('/rCoAuthor/', async (req, res) => {
  try {
    const rCoAuthorID = await Ctrl.addrCoAuthor(req.body);
    const rCoAuthor = await Ctrl.getrCoAuthor(id);
    res.status(200).json({
      status: 200,
      message: 'Successfully created research co-author',
      data: rCoAuthor,
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

router.get('/rCoAuthor/:rCoAuthorID', async (req, res) => {
  try {
    const rCoAuthor = await Ctrl.getrCoAuthor(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched research co-author',
      data: rCoAuthor,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research co-author not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.get('/rCoAuthor/', async (req, res) => {
  try {
    const rCoAuthors = await Ctrl.getrCoAuthors(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched research co-authors',
      data: rCoAuthors,
      total: (await Ctrl.getTotalrCoAuthors(req.query)).total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalrCoAuthors(req.query)).total /
          (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (err) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research co-author not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});
router.delete('/rCoAuthor/:rCoAuthorID', async (req, res) => {
  try {
    const rCoAuthor = await Ctrl.getrCoAuthor(req.params);
    await Ctrl.deleterCoAuthor(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted research co-author',
      data: rCoAuthor,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research co-author not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.put('/rCoAuthor/:rCoAuthorID', async (req, res) => {
  try {
    await Ctrl.updaterCoAuthor(req.params, req.body);
    const rCoAuthor = await Ctrl.getResearch(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated research co-author',
      data: rCoAuthor,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research co-author not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
