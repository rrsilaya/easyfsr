import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /adminWork addAdminWork
 * @apiGroup AdminWork
 * @apiName addAdminWork
 *
 * @apiParam (Body Params) {Integer} id ID of admin work
 * @apiParam (Body Params) {String} position position of admin work
 * @apiParam (Body Params) {String} officeUnit office unit of admin work
 * @apiParam (Body Params) {String} approvedUnits approved units of admin work
 *
 * @apiSuccess {Object} adminWork new adminWork
 * @apiSuccess {Integer} adminWork.id ID of admin work
 * @apiSuccess {String} adminWork.position position of admin work
 * @apiSuccess {String} adminWork.officeUnit office unit of admin work
 * @apiSuccess {String} adminWork.approvedUnits approved units of admin work
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *   	"data": {
 *			"status": 200;
 *			"message": 'Succesfully created adminWork'
 *			"data": [
 *      		{
 *      			"adminWorkID": 6,
 *      			"position": "Position5",
 *       			"officeUnit": "office",
 *          		"approvedUnits": 14,
 *          		"id": 4
 *      		}
 * 	 		]
 *		}
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

router.post('/adminWork/', async (req, res) => {
  try {
    const adminWorkID = await Ctrl.addAdminWork(req.body);
    const adminWork = await Ctrl.getAdminWork({ adminWorkID });
    res.status(200).json({
      status: 200,
      message: 'Successfully created adminWork',
      data: adminWork,
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
 * @api {put} /adminWork/:adminWorkID updateAdminWork
 * @apiGroup AdminWork
 * @apiName updateAdminWork
 *
 * @apiParam (Body Params) {Integer} id ID of admin work
 * @apiParam (Body Params) {String} position position of admin work
 * @apiParam (Body Params) {String} officeUnit office unit of admin work
 * @apiParam (Body Params) {String} approvedUnits approved units of admin work
 *
 * @apiSuccess {Object} adminWork new adminWork
 * @apiSuccess {Integer} adminWork.id ID of admin work
 * @apiSuccess {String} adminWork.position position of admin work
 * @apiSuccess {String} adminWork.officeUnit office unit of admin work
 * @apiSuccess {String} adminWork.approvedUnits approved units of admin work
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *	 {
 *		"data": {
 *   		"status": 200,
 *   		"message": "Successfully updated adminWork",
 *   		"data": [
 *       		{
 *           	"adminWorkID": 6,
 *           	"position": "Position5",
 *           	"officeUnit": "office",
 *           	"approvedUnits": 12,
 *           	"id": 4
 *       		}
 *   		]
 *	 	}
 *	 }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *   HTTP/1.1 404 adminWork not found
 * 	 {
 *   	"status": 404,
 *   	"message": "adminWork not found"
 *   }
 */

router.put('/adminWork/:adminWorkID', async (req, res) => {
  try {
    await Ctrl.updateAdminWork(req.params, req.body);
    const adminWork = await Ctrl.getAdminWork(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated adminWork',
      data: adminWork,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'adminWork not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /adminWork/:adminWorkID deleteAdminWork
 * @apiGroup AdminWork
 * @apiName deleteAdminWork
 *
 * @apiParam (Body Params) {Integer} id ID of admin work
 * @apiParam (Body Params) {String} position position of admin work
 * @apiParam (Body Params) {String} officeUnit office unit of admin work
 * @apiParam (Body Params) {String} approvedUnits approved units of admin work
 *
 * @apiSuccess {Object} adminWork new adminWork
 * @apiSuccess {Integer} adminWork.id ID of admin work
 * @apiSuccess {String} adminWork.position position of admin work
 * @apiSuccess {String} adminWork.officeUnit office unit of admin work
 * @apiSuccess {String} adminWork.approvedUnits approved units of admin work
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully deleted adminWork'
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
 *   HTTP/1.1 404 adminWork not found
 * 	 {
 *   	"status": 404,
 *   	"message": "adminWork not found"
 *   }
 */

router.delete('/adminWork/:adminWorkID', async (req, res) => {
  try {
    await Ctrl.deleteAdminWork(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted adminWork',
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'adminWork not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /adminWork/:adminWorkID getAdminWork
 * @apiGroup AdminWork
 * @apiName getAdminWork
 *
 * @apiParam (Body Params) {Integer} id ID of admin work
 * @apiParam (Body Params) {String} position position of admin work
 * @apiParam (Body Params) {String} officeUnit office unit of admin work
 * @apiParam (Body Params) {String} approvedUnits approved units of admin work
 *
 * @apiSuccess {Object} adminWork new adminWork
 * @apiSuccess {Integer} adminWork.id ID of admin work
 * @apiSuccess {String} adminWork.position position of admin work
 * @apiSuccess {String} adminWork.officeUnit office unit of admin work
 * @apiSuccess {String} adminWork.approvedUnits approved units of admin work
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *     		"status": 200,
 *   		"message": "Successfully fetched adminWork",
 *  		"data": [
 *      		{
 *          	"adminWorkID": 4,
 *          	"position": "Position4",
 *          	"officeUnit": "office",
 *          	"approvedUnits": 12,
 *          	"id": 5
 *      		}
 *  		]
 *		}
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
 *   HTTP/1.1 404 adminWork not found
 * 	 {
 *   	"status": 404,
 *   	"message": "adminWork not found"
 *   }
 */

router.get('/adminWork/:adminWorkID', async (req, res) => {
  try {
    const adminWork = await Ctrl.getAdminWork(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched adminWork',
      data: adminWork,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'adminWork not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /adminWork getAdminWorks
 * @apiGroup AdminWork
 * @apiName getAdminWorks
 *
 * @apiParam (Body Params) {Integer} id ID of admin work
 * @apiParam (Body Params) {String} position position of admin work
 * @apiParam (Body Params) {String} officeUnit office unit of admin work
 * @apiParam (Body Params) {String} approvedUnits approved units of admin work
 *
 * @apiSuccess {Object} adminWork new adminWork
 * @apiSuccess {Integer} adminWork.id ID of admin work
 * @apiSuccess {String} adminWork.position position of admin work
 * @apiSuccess {String} adminWork.officeUnit office unit of admin work
 * @apiSuccess {String} adminWork.approvedUnits approved units of admin work
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *     		"status": 200,
 *   		"message": "Successfully fetched adminWorks",
 *  		"data": [
 *				{
 *          	"adminWorkID": 1,
 *          	"position": "Position1",
 *          	"officeUnit": "office",
 *          	"approvedUnits": 17,
 *          	"id": 1
 *      		},
 *      		{
 *          	"adminWorkID": 4,
 *          	"position": "Position4",
 *          	"officeUnit": "office",
 *          	"approvedUnits": 12,
 *          	"id": 5
 *      		}
 *  		]
 *		}
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
 *   HTTP/1.1 404 adminWork not found
 * 	 {
 *   	"status": 404,
 *   	"message": "adminWork not found"
 *   }
 */

router.get('/adminWork/', async (req, res) => {
  try {
    const adminWorks = await Ctrl.getAdminWorks(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched adminWorks',
      data: adminWorks,
      total: adminWorks.length,
      limit: req.query.limit || 12,
      page: req.query.page || 1,
      pages: Math.ceil(adminWorks.length / (req.query.limit || 12)),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'adminWork not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
