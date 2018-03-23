import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /creativeWork addCreativeWork
 * @apiGroup Creative Work
 * @apiName addCreativeWork

 * @apiParam (Body Params) {Integer} creativeWork.id ID of creative work
 * @apiParam (Body Params) {Date} creativeWork.date date of creative work
 * @apiParam (Body Params) {String} creativeWork.title title of creative work
 * @apiParam (Body Params) {String} creativeWork.type type of creative work
 * @apiParam (Body Params) {Integer} creativeWork.credUnit credit units of creative work
 * @apiParam (Body Params) {Integer} creativeWork.userID user ID of creative work
 *
 * @apiSuccess {Object} creativeWork createWork added
 * @apiSuccess {Integer} creativeWork.id ID of creative work
 * @apiSuccess {Date} creativeWork.date date of creative work
 * @apiSuccess {String} creativeWork.title title of creative work
 * @apiSuccess {String} creativeWork.type type of creative work
 * @apiSuccess {Integer} creativeWork.credUnit credit units of creative work
 * @apiSuccess {Integer} creativeWork.userID user ID of creative work
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully added creative work'
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

router.post('/creativeWork/', async (req, res) => {
  try {
    const id = await Ctrl.addCreativeWork(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully created creative work',
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
 * @api {get} /creativeWork/ getAllCreativeWork
 * @apiGroup Creative Work
 * @apiName getAllCreativeWork
 * 
 * @apiSuccess {Object} creativeWork createWorks fetched
 * @apiSuccess {Integer} creativeWork.creativeWorkID ID of creative work
 * @apiSuccess {Integer} creativeWork.id ID of fsr connected to creative work
 * @apiSuccess {Date} creativeWork.date date of creative work
 * @apiSuccess {String} creativeWork.title title of creative work
 * @apiSuccess {String} creativeWork.type type of creative work
 * @apiSuccess {Integer} creativeWork.credUnit credit units of creative work
 * @apiSuccess {Integer} creativeWork.userID user ID of creative work
 *
 @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    "status": 200,
 *    "message": "Successfully fetched creative works",
 *    "data": [
 *       {
 *          "creativeWorkID": 1,
            "id": 1,
            "date": "2015-05-03T16:00:00.000Z",
            "title": "hello",
            "type": "a",
            "credUnit": 2,
            "userID": 1
 *       },
 *       {
 *          "creativeWorkID": 2,
            "id": 2,
            "date": "2015-05-03T16:00:00.000Z",
            "title": "hello",
            "type": "a",
            "credUnit": 2,
            "userID": 1
 *       }
 *    ]
 *  }
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
  * @apiError (Error 404) {String[]} errors List of errors
 * @apiError (Error 404) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 * HTTP/1.1 404 Creative works not found
 * {
 *   "status": 404,
 *   "message": "Creative works not found"
 * }
 */
router.get('/creativeWork/', async (req, res) => {
  try {
    const creativeWork = await Ctrl.getAllCreativeWork();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched creative works',
      data: creativeWork,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Creative works not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
