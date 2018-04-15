import { Router } from 'express';
import * as Ctrl from './controller';
import * as MiddlewareCtrl from '../../middlewares/controller';

const router = Router();
/**
 * @api {post} /timeslot/ addTimeslot
 * @apiGroup Timeslot
 * @apiName addTimeslot

 * @apiParam (Body Params) {Number} subjectID subject ID of subject
 * @apiParam (Body Params) {String} day day assigned to timeslot
 * @apiParam (Body Params) {Time} timeStart starting time of timeslot
 * @apiParam (Body Params) {Time} ttimeEnd dismissal time of timeslot
 *
 * @apiSuccess {Object}  data timeslot added
 * @apiSuccess {Number} data.timeslotID ID of timeslot
 * @apiSuccess {Number} data.subjectID subject ID of timeslot
 * @apiSuccess {String} data.day day assigned to timeslot
 * @apiSuccess {Time} data.timeStart starting time of timeslot
 * @apiSuccess {Time} data.timeEnd dismissal time of timeslot
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *     {
 *       "status": 200,
 *       "message": "Successfully created timeslot",
 *       "data": 
 *           {
 *             "timeslotID": 19,
 *             "subjectID": 12,
 *             "day": "12",
 *             "timeStart": "23:00:00",
 *             "timeEnd": "24:00:00"
 *           }
 *       }
 *
 * @apiError (Error 500) {Number} status status code
 * @apiError (Error 500) {String} message error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.post('/timeslot/', async (req, res) => {
  try {
    const userIDofFSR = await MiddlewareCtrl.getUserIDofFSR(
      req.body.id,
      req.session.user.userID,
    );
    const timeslotID = await Ctrl.addTimeslot(req.body);
    const timeslot = await Ctrl.getTimeslot({ timeslotID });
    res.status(200).json({
      status: 200,
      message: 'Successfully created timeslot',
      data: timeslot,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'FSR not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});
/**
 * @api {get} /timeslot/ getTimeslots
 * @apiGroup Timeslot
 * @apiName getTimeslots
 
 * @apiParam (Query Params) {Number} [subjectID] ID of subject
 * @apiParam (Query Params) {String} [day] day assigned to timeslot
 * @apiParam (Query Params) {Time} [timeStart] starting time of timeslot
 * @apiParam (Query Params) {Time} [timeEnd] dismissal time of timeslot
 * 
 * @apiSuccess {Object[]} data timeslots fetched
 * @apiSuccess {Number} data.timeslotID ID of timeslot
 * @apiSuccess {Number} data.subjectID ID of subject 
 * @apiSuccess {String} data.day day assigned to timeslot
 * @apiSuccess {Time} data.timeStart starting time of timeslot
 * @apiSuccess {Time} data.timeEnd dismissal time of timeslot
 * @apiSuccess {Number} total Total amount of documents.
 * @apiSuccess {Number} limit Max number of documents
 * @apiSuccess {Number} page nth page this query is.
 * @apiSuccess {Number} pages Number of total pages.
 *
 @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *   "status": 200,
 *   "message": "Successfully fetched timeslots",
 *   "data": [
 *       {
 *           "timeslotID": 15,
 *           "subjectID": 15,
 *           "day": "Friday",
 *           "timeStart": "13:00:00",
 *           "timeEnd": "16:00:00"
 *       },
 *       {
 *           "timeslotID": 41,
 *           "subjectID": 41,
 *           "day": "Friday",
 *           "timeStart": "07:00:00",
 *           "timeEnd": "08:00:00"
 *       }
 *   ],
 *   "total": 2,
 *   "limit": 12,
 *   "page": 1,
 *   "pages": 1
 *  }
 * @apiError (Error 500) {Number} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.get('/timeslot/', async (req, res) => {
  try {
    const timeslots = await Ctrl.getTimeslots(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched timeslots',
      data: timeslots,
      total: (await Ctrl.getTotalTimeslots(req.query)).total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalTimeslots(req.query)).total /
          (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Timeslots not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /timeslot/:timeslotID/ getTimeslot
 * @apiGroup Timeslot
 * @apiName getTimeslot
 *
 * @apiParam (Query Params) {Number} timeslotID ID of timeslot
 *
 * @apiSuccess {Object} data timeslot fetched
 * @apiSuccess {Number} data.timeslotID ID of timeslot
 * @apiSuccess {Number} data.subjectID subject ID of timeslot
 * @apiSuccess {String} data.day day assigned to timeslot
 * @apiSuccess {Time} data.timeStart starting time of timeslot
 * @apiSuccess {Time} data.timeEnd dismissal time of timeslot
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *     {
 *       "status": 200,
 *       "message": "Successfully fetched timeslot",
 *       "data":
 *           {
 *             "timeslotID": 19,
 *             "subjectID": 12,
 *             "day": "12",
 *             "timeStart": "23:00:00",
 *             "timeEnd": "24:00:00"
 *           }
 *     }
 *
 * @apiError (Error 500) {Number} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Timeslot not found
 * {
 *   "status": 404,
 *   "message": "Timeslot not found"
 * }
 */

router.get('/timeslot/:timeslotID/', async (req, res) => {
  try {
    const idOfSubject = await MiddlewareCtrl.getIDofFSRfromCourse(
      req.params.timeslotID,
      req.session.user.userID,
    );
    const userIDofFSR = await MiddlewareCtrl.getUserIDofFSR(
      idOfSubject,
      req.session.user.userID,
    );
    const timeslot = await Ctrl.getTimeslot(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched timeslot',
      data: timeslot,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'Timeslot not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {put} /timeslot/:timeslotID updateTimeslot
 * @apiGroup Timeslot
 * @apiName updateTimeslot
 *
 * @apiParam (Query Params) {Number} timeslotID ID of timeslot

 * @apiParam (Body Params) {Number} [subjectID subject ID of subject
 * @apiParam (Body Params) {String} [day] day assigned to timeslot
 * @apiParam (Body Params) {Time} [timeStart] starting time of timeslot
 * @apiParam (Body Params) {Time} [timeEnd] dismissal time of timeslot
 *
 * @apiSuccess {Object} data timeslot updated
 * @apiSuccess {Number} data.timeslotID ID of timeslot
 * @apiSuccess {Number} data.subjectID subject ID of timeslot
 * @apiSuccess {String} data.day day assigned to timeslot
 * @apiSuccess {Time} data.timeStart starting time of timeslot
 * @apiSuccess {Time} data.timeEnd dismissal time of timeslot
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *     {
 *       "status": 200,
 *       "message": "Successfully updated timeslot",
 *       "data": 
 *           {
 *             "timeslotID": 19,
 *             "subjectID": 12,
 *             "day": "12",
 *             "timeStart": "23:00:00",
 *             "timeEnd": "24:00:00"
 *           }
 *     }
 *       
 * @apiError (Error 500) {Number} status  status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *   
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Timeslot not found
 * {
 *   "status": 404,
 *   "message": "Timeslot not found"
 * }
 */

router.put('/timeslot/:timeslotID/', async (req, res) => {
  try {
    const idOfSubject = await MiddlewareCtrl.getIDofFSRfromCourse(
      req.params.timeslotID,
      req.session.user.userID,
    );
    const userIDofFSR = await MiddlewareCtrl.getUserIDofFSR(
      idOfSubject,
      req.session.user.userID,
    );
    await Ctrl.updateTimeslot(req.params, req.body);
    const timeslot = await Ctrl.getTimeslot(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated timeslot',
      data: timeslot,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'Timeslot not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /timeslot/:timeslotID/ getTimeslot
 * @apiGroup Timeslot
 * @apiName getTimeslot
 *
 * @apiParam (Query Params) {Number} timeslotID ID of timeslot
 *
 * @apiSuccess {Object} data timeslot deleted
 * @apiSuccess {Number} data.timeslotID ID of timeslot
 * @apiSuccess {Number} data.subjectID subject ID of timeslot
 * @apiSuccess {String} data.day day assigned to timeslot
 * @apiSuccess {Time} data.timeStart starting time of timeslot
 * @apiSuccess {Time} data.timeEnd dismissal time of timeslot
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *     {
 *       "status": 200,
 *       "message": "Successfully deleted timeslot",
 *       "data":
 *           {
 *             "timeslotID": 19,
 *             "subjectID": 12,
 *             "day": "12",
 *             "timeStart": "23:00:00",
 *             "timeEnd": "24:00:00"
 *           }
 *     }
 *
 * @apiError (Error 500) {Number} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Timeslot not found
 * {
 *   "status": 404,
 *   "message": "Timeslot not found"
 * }
 */

router.delete('/timeslot/:timeslotID/', async (req, res) => {
  try {
    const idOfSubject = await MiddlewareCtrl.getIDofFSRfromCourse(
      req.params.timeslotID,
      req.session.user.userID,
    );
    const userIDofFSR = await MiddlewareCtrl.getUserIDofFSR(
      idOfSubject,
      req.session.user.userID,
    );
    const timeslot = await Ctrl.getTimeslot(req.params);
    await Ctrl.deleteTimeslot(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted timeslot',
      data: timeslot,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Timeslot not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
