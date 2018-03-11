import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const user = await Ctrl.login(req.body);

    delete user.password;
    req.session.user = user;

    res.status(200).json({
      status: 200,
      message: 'Successfully logged in',
      data: user,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error while logging in';
        break;
      case 401:
        message = 'Incorrect Email or Password';
        break;
      case 404:
        message = 'User not found';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.post('/logout', async (req, res) => {
  try {
    await req.session.destroy();
    res.status(200).json();
  } catch (err) {
    res.status(500).json();
  }
});

router.post('/session', async (req, res) => {
  console.log(req.session);
  res.status(200).json({
    status: 200,
    message: 'Successfully fetched current session',
    data: req.session.user ? req.session.user : null,
  });
});

export default router;
