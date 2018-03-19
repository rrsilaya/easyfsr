import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

router.post('/research/', async (req, res) => {
  try {
    const id = await Ctrl.addResearch(req.body);
    //   const user = await Ctrl.getUser({ userID });

    res.status(200).json({
      status: 200,
      message: 'Successfully created research',
      // data: reasearch,
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

router.post('/rCoAuthor/', async (req, res) => {
  try {
    const rCoAuthor = await Ctrl.addrCoAuthor(req.body);

    res.status(200).json({
      status: 200,
      message: 'Successfully created rCoAuthor',
      // data: reasearch,
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

router.delete('/research/:id/:researchID', async (req, res) => {
  try {
    await Ctrl.deleteResearch(req.params);
    //   const user = await Ctrl.getUser(req.params);
    //   delete user.password;
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted research',
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

router.delete('/rCoAuthor/:userID/:researchID', async (req, res) => {
  try {
    await Ctrl.deleterCoAuthor(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully deleted rCoAuthor',
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'rCoAuthor not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.get('/research/:id/:researchID', async (req, res) => {
  try {
    const research = await Ctrl.selectResearch(req.params);

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

router.get('/rCoAuthor/:id/:researchID', async (req, res) => {
  try {
    const rCoAuthor = await Ctrl.selectResearchWithCoAuthor(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched research with coAuthor',
      data: rCoAuthor,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research with CoAuthor not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.get('/research/:id', async (req, res) => {
  try {
    const researches = await Ctrl.selectAllResearch(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched all research',
      data: researches,
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

router.get('/rCoAuthor/:id', async (req, res) => {
  try {
    const rCoAuthors = await Ctrl.selectAllResearchWithCoAuthor(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched all research with co authors',
      data: rCoAuthors,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research with co authors not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
