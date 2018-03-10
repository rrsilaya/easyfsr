import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /user addUser
 * @apiGroup User
 * @apiName addUser
 *
 * @apiParam (Body Params) {String} employeeID 		ID of employee
 * @apiParam (Body Params) {String} password 		password of employee
 * @apiParam (Body Params) {String} firstName 		first name of employee
 * @apiParam (Body Params) {String} middleName 		middle name of employee
 * @apiParam (Body Params) {String} lastName		last name of employee
 * @apiParam (Body Params) {String} committee 		committee of employee, if exists
 * @apiParam (Body Params) {Boolean} isHead 		if employee is head
 * @apiParam (Body Params) {String} officeNumber 	office number of employee
 * @apiParam (Body Params) {String} contractType 	contract type of employee
 * @apiParam (Body Params) {String} emailAddress 	email address of employee
 * @apiParam (Body Params) {String} rank 			rank of employee
 * @apiParam (Body Params) {String} isArchived 		if employee entry is archived
 * @apiParam (Body Params) {String} acctType		account type of employee
 *
 * @apiSuccess {Object} user 				new User created
 * @apiSuccess {String} user.employeeID 	ID of employee
 * @apiSuccess {String} user.password 		password of employee
 * @apiSuccess {String} user.firstName 		first name of employee
 * @apiSuccess {String} user.middleName 	middle name of employee
 * @apiSuccess {String} user.lastName		last name of employee
 * @apiSuccess {String} user.committee 		committee of employee, if exists
 * @apiSuccess {Boolean} user.isHead 		if employee is head
 * @apiSuccess {String} user.officeNumber 	office number of employee
 * @apiSuccess {String} user.contractType 	contract type of employee
 * @apiSuccess {String} user.emailAddress 	email address of employee
 * @apiSuccess {String} user.rank 			rank of employee
 * @apiSuccess {String} user.isArchived 	if employee entry is archived
 * @apiSuccess {String} user.acctType		account type of employee
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        status: 200;
 *		  message: 'Succesfully created user'
 *     }
 *   }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 * {
 *   "status": 500,
 *   "message": "Internal server error"
 * }
 */

router.post('/user/', async (req, res) => {
  try {
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

export default router;
