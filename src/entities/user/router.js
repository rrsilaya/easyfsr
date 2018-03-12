import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /user addUser
 * @apiGroup User
 * @apiName addUser
 *
 * @apiParam (Body Params) {String} employeeID ID of employee
 * @apiParam (Body Params) {String} password password of employee
 * @apiParam (Body Params) {String} firstName first name of employee
 * @apiParam (Body Params) {String} middleName middle name of employee
 * @apiParam (Body Params) {String} lastName last name of employee
 * @apiParam (Body Params) {String} committee committee of employee, if exists
 * @apiParam (Body Params) {Boolean} isHead indicates if employee is head
 * @apiParam (Body Params) {String} officeNumber office number of employee
 * @apiParam (Body Params) {String} contractType contract type of employee
 * @apiParam (Body Params) {String} emailAddress email address of employee
 * @apiParam (Body Params) {String} rank rank of employee
 * @apiParam (Body Params) {String} isArchived indicates if employee entry is archived
 * @apiParam (Body Params) {String} acctType account type of employee
 *
 * @apiSuccess {Object} user new User created
 * @apiSuccess {String} user.employeeID ID of employee
 * @apiSuccess {String} user.password password of employee
 * @apiSuccess {String} user.firstName first name of employee
 * @apiSuccess {String} user.middleName middle name of employee
 * @apiSuccess {String} user.lastName last name of employee
 * @apiSuccess {String} user.committee committee of employee, if exists
 * @apiSuccess {Boolean} user.isHead  indicates if employee is head
 * @apiSuccess {String} user.officeNumber office number of employee
 * @apiSuccess {String} user.contractType contract type of employee
 * @apiSuccess {String} user.emailAddress email address of employee
 * @apiSuccess {String} user.rank rank of employee
 * @apiSuccess {String} user.isArchived indicates if employee entry is archived
 * @apiSuccess {String} user.acctType account type of employee
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *		    "message": 'Succesfully created user'
 *     }
 *   }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.post('/user/', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const id = await Ctrl.addUser(req.body);

    // const user = await Ctrl.getUser({ id });
    res.status(200).json({
      status: 200,
      message: 'Successfully created user',
      // data: user
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

/**
 * @api {put} /user/:employeeID updateUser
 * @apiGroup User
 * @apiName updateUser
 *
 * @apiParam (Query Params) {String} employeeID ID of employee
 * @apiParam (Body Params) {String} password password of employee
 * @apiParam (Body Params) {String} firstName first name of employee
 * @apiParam (Body Params) {String} middleName middle name of employee
 * @apiParam (Body Params) {String} lastName last name of employee
 * @apiParam (Body Params) {String} committee committee of employee, if exists
 * @apiParam (Body Params) {Boolean} isHead indicates if employee is head
 * @apiParam (Body Params) {String} officeNumber office number of employee
 * @apiParam (Body Params) {String} contractType contract type of employee
 * @apiParam (Body Params) {String} emailAddress email address of employee
 * @apiParam (Body Params) {String} rank rank of employee
 * @apiParam (Body Params) {String} isArchived indicates if employee entry is archived
 * @apiParam (Body Params) {String} acctType account type of employee
 *
 * @apiSuccess {Object} user User updated
 * @apiSuccess {String} user.employeeID ID of employee
 * @apiSuccess {String} user.password password of employee
 * @apiSuccess {String} user.firstName first name of employee
 * @apiSuccess {String} user.middleName middle name of employee
 * @apiSuccess {String} user.lastName last name of employee
 * @apiSuccess {String} user.committee committee of employee, if exists
 * @apiSuccess {Boolean} user.isHead indicates if employee is head
 * @apiSuccess {String} user.officeNumber office number of employee
 * @apiSuccess {String} user.contractType contract type of employee
 * @apiSuccess {String} user.emailAddress email address of employee
 * @apiSuccess {String} user.rank rank of employee
 * @apiSuccess {String} user.isArchived indicates if employee entry is archived
 * @apiSuccess {String} user.acctType account type of employee
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        status: 200;
 *        message: 'Succesfully updated user'
 *     }
 *   }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }

   HTTP/1.1 404 User not found
 * {
 *   "status": 404,
 *   "message": "User not found"
 * }
 */

router.put('/user/:employeeID', async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    await Ctrl.updateUser(req.params, req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated user',
      // data: user
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'User not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /user getAllUser
 * @apiGroup User
 * @apiName getAllUser
 *
 * @apiSuccess {String} message Confirmation Message.
 * @apiSuccess {Object[]} user All users
 * @apiSuccess {String} user.employeeID ID of employee
 * @apiSuccess {String} user.password password of employee
 * @apiSuccess {String} user.firstName first name of employee
 * @apiSuccess {String} user.middleName middle name of employee
 * @apiSuccess {String} user.lastName last name of employee
 * @apiSuccess {String} user.committee committee of employee, if exists
 * @apiSuccess {Boolean} user.isHead indicates if employee is head
 * @apiSuccess {String} user.officeNumber office number of employee
 * @apiSuccess {String} user.contractType contract type of employee
 * @apiSuccess {String} user.emailAddress email address of employee
 * @apiSuccess {String} user.rank rank of employee
 * @apiSuccess {String} user.isArchived indicates if employee entry is archived
 * @apiSuccess {String} user.acctType account type of employee
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *   {
        "message": "Successfully fetched user",
        "user": [
            {
                "employeeID": "123abc",
                "password": "123abc(encrypted)",
                "firstName": "John Dewey",
                "middleName": "Bayani",
                "lastName": "Legaspi",
                "committee": "palicsihan",
                "isHead": False,
                "officeNumber": "123",
                "contractType": "regular",
                "emailAddress": "jblegaspi4@up.edu.ph",
                "rank": "instructor 1",
                "isArchived": "no",
                "acctType: "admin"

            }
        ]
    }
 *
 * @apiError (Error 500) {String[]} errors List of errors.
 * @apiError (Error 500) {String} errors.message Error message.
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "errors": [
 *        "Internal server error."
 *      ]
 *    }
 **/

router.get('/user', async (req, res) => {
  try {
    const user = await Ctrl.getAllUser();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched user',
      data: user,
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

export default router;
