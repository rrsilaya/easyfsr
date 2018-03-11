import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /login Login
 * @apiGroup Auth
 * @apiName Login
 *
 * @apiParam (Body Params) {String} emailAddress Email of the user.
 * @apiParam (Body Params) {String} password Password of the user.
 *
 * @apiSuccess {Object} user User logged in .
 * @apiSuccess {String} user.email Email of the user.
 * @apiSuccess {String} user.type Type of the user.
 * @apiSuccess {String} user.name Company name of the user.
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "status": 200,
 *      "message": "Successfully logged in",
 *      "data": {
 *        "employeeID": "51111231223",
 *        "firstName": "asdadad",
 *        "middleName": "S",
 *        "lastName": "asdasdad",
 *        "committee": "registration",
 *        "isHead": 0,
 *        "officeNumber": "118",
 *        "contractType": "part-time",
 *        "emailAddress": "esevangelista1@up.edu.ph",
 *        "rank": "121",
 *        "isArchived": "NO",
 *        "acctType": "USER"
 *      }
 *   }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "status": 401,
 *      "message": "Incorrect Email or Password"
 *    }
 */

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

/**
 * @api {post} /logout Logout
 * @apiGroup Auth
 * @apiName Logout
 */

router.post('/logout', async (req, res) => {
  try {
    await req.session.destroy();
    res.status(200).json();
  } catch (err) {
    res.status(500).json();
  }
});

/**
 * @api {post} /session Session
 * @apiGroup Auth
 * @apiName Session
 *
 *
 * @apiSuccess {Object} user User logged in .
 * @apiSuccess {String} user.email Email of the user.
 * @apiSuccess {String} user.type Type of the user.
 * @apiSuccess {String} user.name Company name of the user.
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "status": 200,
 *      "message": "Successfully logged in",
 *      "data": {
 *        "employeeID": "51111231223",
 *        "firstName": "asdadad",
 *        "middleName": "S",
 *        "lastName": "asdasdad",
 *        "committee": "registration",
 *        "isHead": 0,
 *        "officeNumber": "118",
 *        "contractType": "part-time",
 *        "emailAddress": "esevangelista1@up.edu.ph",
 *        "rank": "121",
 *        "isArchived": "NO",
 *        "acctType": "USER"
 *      }
 *   }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "status": 200,
 *      "message": "Successfully logged in",
 *      "data": null,
 *    }
 */

router.post('/session', async (req, res) => {
  console.log(req.session);
  res.status(200).json({
    status: 200,
    message: 'Successfully fetched current session',
    data: req.session.user ? req.session.user : null,
  });
});

export default router;
