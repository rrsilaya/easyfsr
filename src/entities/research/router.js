import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';
import { upload, unlink } from './../../utils';

const router = Router();

router.post('/research/', async (req, res) => {
  try {
    if (req.files && req.files.filepath)
      req.body.filepath = await upload(req.files.filepath, 'researches');
    const researchID = await Ctrl.addResearch(req.body);
    const research = await Ctrl.getResearch({ researchID });
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
    const research = await Ctrl.getResearch(req.params);
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

router.get('/research/', async (req, res) => {
  try {
    const researches = await Ctrl.getResearches(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched researches',
      data: researches,
      total: (await Ctrl.getTotalResearches(req.query)).total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalResearches(req.query)).total /
          (parseInt(req.query.limit) || 12),
      ),
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
router.delete('/research/:researchID', async (req, res) => {
  try {
    const research = await Ctrl.getResearch(req.params);
    await Ctrl.deleteResearch(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted research',
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

router.put('/research/:researchID', async (req, res) => {
  try {
    if (req.files && req.files.filepath) {
      const research = await Ctrl.getResearch(req.params);

      if (research.filepath) await unlink(research.filepath);
      req.body.filepath = await upload(req.files.filepath, 'researches');
    }
    await Ctrl.updateResearch(req.params, req.body);
    const research = await Ctrl.getResearch(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated research',
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
