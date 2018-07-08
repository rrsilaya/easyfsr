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
 * @apiSuccess {Object} data new User created
 * @apiSuccess {String} data.userID auto-inc ID of employee
 * @apiSuccess {Number} data.employeeID ID of employee
 * @apiSuccess {Number} data.password password of employee
 * @apiSuccess {String} data.firstName first name of employee
 * @apiSuccess {String} data.middleName middle name of employee
 * @apiSuccess {String} data.lastName last name of employee
 * @apiSuccess {String} data.committee committee of employee, if exists
 * @apiSuccess {Boolean} data.isHead  indicates if employee is head
 * @apiSuccess {String} data.officeNumber office number of employee
 * @apiSuccess {String} data.contractType contract type of employee
 * @apiSuccess {String} data.emailAddress email address of employee
 * @apiSuccess {String} data.rank rank of employee
 * @apiSuccess {Boolean} data.isArchived indicates if employee entry is archived
 * @apiSuccess {String} data.acctType account type of employee
 * @apiSuccess {String} data.filepath filepath
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully logged in'
 *        "data":
 *          {
 *               "userID": 3,
 *               "employeeID": "51111231223",
 *               "firstName": "Marie",
 *               "middleName": "S",
 *               "lastName": "Smith",
 *               "committee": null,
 *               "isHead": null,
 *               "officeNumber": "118",
 *               "contractType": "part-time",
 *               "emailAddress": "marieSmith@up.edu.ph",
 *               "rank": null,
 *               "isArchived": 0,
 *               "acctType": "USER"
 *               "filepath": "/uploads/users/dads-223asda.png"
 *           }
 *     }
 *   }
 *
 * @apiError (Error 500) {Number} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * @apiError (Error 401) {Number} status status code
 * @apiError (Error 401) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 401 Invalid credentials
 *   {
 *     "status": 401,
 *     "message": "Invalid credentials"
 *   }
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
        message = 'Invalid credentials';
        break;
      case 404:
        message = 'User not found';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {post} /auth Re-Auth
 * @apiGroup Auth
 * @apiName Re-Auth
 *
 * @apiParam (Body Params) {String} password Password of the user.
 *
 * @apiSuccess {Object} data new User created
 * @apiSuccess {String} data.userID auto-inc ID of employee
 * @apiSuccess {Number} data.employeeID ID of employee
 * @apiSuccess {Number} data.password password of employee
 * @apiSuccess {String} data.firstName first name of employee
 * @apiSuccess {String} data.middleName middle name of employee
 * @apiSuccess {String} data.lastName last name of employee
 * @apiSuccess {String} data.committee committee of employee, if exists
 * @apiSuccess {Boolean} data.isHead  indicates if employee is head
 * @apiSuccess {String} data.officeNumber office number of employee
 * @apiSuccess {String} data.contractType contract type of employee
 * @apiSuccess {String} data.emailAddress email address of employee
 * @apiSuccess {String} data.rank rank of employee
 * @apiSuccess {Boolean} data.isArchived indicates if employee entry is archived
 * @apiSuccess {String} data.acctType account type of employee
 * @apiSuccess {String} data.filepath filepath
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Authentication successful'
 *        "data":
 *          {
 *               "userID": 3,
 *               "employeeID": "51111231223",
 *               "firstName": "Marie",
 *               "middleName": "S",
 *               "lastName": "Smith",
 *               "committee": null,
 *               "isHead": null,
 *               "officeNumber": "118",
 *               "contractType": "part-time",
 *               "emailAddress": "marieSmith@up.edu.ph",
 *               "rank": null,
 *               "isArchived": 0,
 *               "acctType": "USER",
 *               "filepath": "/uploads/users/dads-223asda.png"
 *           }
 *     }
 *   }
 *
 * @apiError (Error 500) {Number} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * @apiError (Error 401) {Number} status status code
 * @apiError (Error 401) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 401 Invalid credentials
 *   {
 *     "status": 401,
 *     "message": "Invalid credentials"
 *   }
 */

router.post('/auth', async (req, res) => {
  try {
    if (!req.session.user) res.status(500).json();
    else {
      req.body.emailAddress = req.session.user.emailAddress;
      const user = await Ctrl.login(req.body);

      delete user.password;

      res.status(200).json({
        status: 200,
        message: 'Authentication successful',
        data: user,
      });
    }
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error while logging in';
        break;
      case 401:
        message = 'Invalid credentials';
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
 * @apiSuccess {Object} data new User created
 * @apiSuccess {String} data.userID auto-inc ID of employee
 * @apiSuccess {Number} data.employeeID ID of employee
 * @apiSuccess {Number} data.password password of employee
 * @apiSuccess {String} data.firstName first name of employee
 * @apiSuccess {String} data.middleName middle name of employee
 * @apiSuccess {String} data.lastName last name of employee
 * @apiSuccess {String} data.committee committee of employee, if exists
 * @apiSuccess {Boolean} data.isHead  indicates if employee is head
 * @apiSuccess {String} data.officeNumber office number of employee
 * @apiSuccess {String} data.contractType contract type of employee
 * @apiSuccess {String} data.emailAddress email address of employee
 * @apiSuccess {String} data.rank rank of employee
 * @apiSuccess {Boolean} data.isArchived indicates if employee entry is archived
 * @apiSuccess {String} data.acctType account type of employee
 * @apiSuccess {String} data.filepath filepath
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully logged in'
 *        "data":
 *          {
 *               "userID": 3,
 *               "employeeID": "51111231223",
 *               "firstName": "Marie",
 *               "middleName": "S",
 *               "lastName": "Smith",
 *               "committee": null,
 *               "isHead": null,
 *               "officeNumber": "118",
 *               "contractType": "part-time",
 *               "emailAddress": "marieSmith@up.edu.ph",
 *               "rank": null,
 *               "isArchived": 0,
 *               "acctType": "USER",
 *               "filepath": "/uploads/users/dads-223asda.png"
 *           }
 *     }
 *   }
 *
 */

router.post('/session', async (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Successfully fetched current session',
    data: req.session.user ? req.session.user : null,
  });
});

export default router;
