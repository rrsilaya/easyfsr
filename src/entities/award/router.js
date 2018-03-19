import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /award addAward
 * @apiGroup Award
 * @apiName addAward
 *
 * @apiParam (Body Params) {Integer} id ID of award
 * @apiParam (Body Params) {String} grantF grantF of award
 * @apiParam (Body Params) {String} chairGrantTitle chair grant title of award
 * @apiParam (Body Params) {String} collegeHasNominated which college has nominated the award
 * @apiParam (Body Params) {String} recipientOrNominee recipient or nominee of award
 * @apiParam (Body Params) {String} proffesionalChair professional chai of award
 * @apiParam (Body Params) {String} approvedStartDate approved start date of award
 * @apiParam (Body Params) {String} endDate end date of award
 *
 * @apiSuccess {Object} award new Award
 * @apiSuccess {Integer} award.id ID of award
 * @apiSuccess {String} award.grantF grantf of award
 * @apiSuccess {String} award.chairGrantTitle chair grant title of award
 * @apiSuccess {String} award.collegeHasNominated which college has nominated the award
 * @apiSuccess {String} award.recipientOrNominee recipient or nominee of award
 * @apiSuccess {String} award.professionalChair professional chair of award
 * @apiSuccess {String} award.approvedStartDate approved start date of award
 * @apiSuccess {String} award.endDate end date of award
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *		    "message": 'Succesfully added award'
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

router.post('/award/', async (req, res) => {
  try {
    const id = await Ctrl.addAward(req.body);

    // const user = await Ctrl.getUser({ id });
    res.status(200).json({
      status: 200,
      message: 'Successfully added award',
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
 * @api {put} /award/:id updateAward
 * @apiGroup Award
 * @apiName updateAward
 *
 * @apiParam (Query Params) {Integer} id ID of award
 * @apiParam (Body Params) {String} grantF grantF of award
 * @apiParam (Body Params) {String} chairGrantTitle chair grant title of award
 * @apiParam (Body Params) {String} collegeHasNominated which college nominated the award
 * @apiParam (Body Params) {String} recipientOrNominee recipient or nominee of award
 * @apiParam (Body Params) {String} proffesionalChair professional chair of award
 * @apiParam (Body Params) {String} approvedStartDate approved start date of award
 * @apiParam (Body Params) {String} endDate end date of award
 *
 * @apiSuccess {Object} award Award updated
 * @apiSuccess {Integer} award.id ID of award
 * @apiSuccess {String} award.grantF grantf of award
 * @apiSuccess {String} award.chairGrantTitle chair grant title of award
 * @apiSuccess {String} award.collegeHasNominated which college nominated the award
 * @apiSuccess {String} award.recipientOrNominee recipient or nominee of award
 * @apiSuccess {String} award.professionalChair professional chair of award
 * @apiSuccess {String} award.approvedStartDate approved start date of award
 * @apiSuccess {String} award.endDate end date of award
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully updated award'
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
 *
 * HTTP/1.1 404 Award not found
 * {
 *   "status": 404,
 *   "message": "award not found"
 * }
 */

router.put('/award/:id', async (req, res) => {
  try {
    await Ctrl.updateAward(req.params, req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated award',
      // data: user
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'award not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /award/:id deleteAward
 * @apiGroup Award
 * @apiName deleteAward
 *
 * @apiParam (Query Params) {Integer} id ID of award
 *
 * @apiSuccess {Object} award Award deleted
 * @apiSuccess {Integer} award.id ID of award
 * @apiSuccess {String} award.grantF grantf of award
 * @apiSuccess {String} award.chairGrantTitle chair grant title of award
 * @apiSuccess {String} award.collegeHasNominated which college has nominated theaward
 * @apiSuccess {String} award.recipientOrNominee recipient or nominee of award
 * @apiSuccess {String} award.professionalChair professional chair of award
 * @apiSuccess {String} award.approvedStartDate approved start date of award
 * @apiSuccess {String} award.endDate end date of award
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully deleted award'
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
 *
 * HTTP/1.1 404 Award not found
 * {
 *   "status": 404,
 *   "message": "award not found"
 * }
 */

router.delete('/award/:id', async (req, res) => {
  try {
    const id = await Ctrl.deleteAward(req.params);
    // const user = await Ctrl.getUser(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted award',
      //data: user
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'award not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /award/:id getAward
 * @apiGroup Award
 * @apiName getAward
 *
 * @apiParam (Query Params) {Integer} id ID of award
 *
 * @apiSuccess {Object} award Award deleted
 * @apiSuccess {Integer} award.id ID of award
 * @apiSuccess {String} award.grantF grantf of award
 * @apiSuccess {String} award.chairGrantTitle chair grant title of award
 * @apiSuccess {String} award.collegeHasNominated which college nominated the award
 * @apiSuccess {String} award.recipientOrNominee recipient or nominee of award
 * @apiSuccess {String} award.professionalChair professional chair of award
 * @apiSuccess {String} award.approvedStartDate approved start date of award
 * @apiSuccess {String} award.endDate end date of award
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    "status": 200,
 *    "message": "Successfully got award details",
 *    "data": [
 *       {
 *           "id": 1,
 *           "grantF": "Hi",
 *           "chairGrantTitle": "Mea",
 *           "collegeHasNominated": "123",
 *           "recipientOrNominee": "You",
 *           "professionalChair": "him",
 *           "approvedStartDate": "ystrday",
 *           "endDate": "tomo"
 *       }
 *     ]
 *   }
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 * HTTP/1.1 404 Award not found
 * {
 *   "status": 404,
 *   "message": "award not found"
 * }
 */

router.get('/award/:id', async (req, res) => {
  try {
    const id = await Ctrl.getAward(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully got award details',
      data: id,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'award not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
