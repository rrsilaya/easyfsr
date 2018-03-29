import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.post('/cworkCoAuthor/', async (req, res) => {
  try {
    const cworkCoAuthorID = await Ctrl.addCworkCoAuthor(req.body);
    const cworkCoAuthor = await Ctrl.getCworkCoAuthor({ cworkCoAuthorID });
    res.status(200).json({
      status: 200,
      message: 'Successfully created co-author',
      data: cworkCoAuthor,
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

router.get('/cworkCoAuthor/', async (req, res) => {
  try {
    const cworkCoAuthor = await Ctrl.getCworkCoAuthors(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched co-authors',
      data: cworkCoAuthor,
      limit: req.query.limit || 12,
      offset,
      offset,
      page: req.query.page || 1,
      pages: Math.ceil(cworkCoAuthor.length / (req.query.limit || 12)),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Co-authors not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.delete('/cworkCoAuthor/:cworkCoAuthorID', async (req, res) => {
  try {
    const cworkCoAuthor = await Ctrl.getCworkCoAuthor(req.params);
    await Ctrl.deleteCworkCoAuthor(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted co-author',
      data: cworkCoAuthor,
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

router.get('/cworkCoAuthor/:cworkCoAuthorID', async (req, res) => {
  try {
    const cworkCoAuthor = await Ctrl.getCworkCoAuthor(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched co-author',
      data: cworkCoAuthor,
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

router.put('/cworkCoAuthor/:cworkCoAuthorID', async (req, res) => {
  try {
    await Ctrl.updateCworkCoAuthor(req.params, req.body);
    const cworkCoAuthor = await Ctrl.getCworkCoAuthor(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated co-author',
      data: cworkCoAuthor,
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
