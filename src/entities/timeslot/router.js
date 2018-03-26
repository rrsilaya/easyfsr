import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();
/**
 * @api {post} /timeslot/ addTimeslot
 * @apiGroup Timeslot
 * @apiName addTimeslot

 * @apiParam (Body Params) {Integer} timeslot.subjectID ID of subject
 * @apiParam (Body Params) {String} timeslot.day day assigned to timeslot
 * @apiParam (Body Params) {String} timeslot.time time assigned to timeslot
 *
 * @apiSuccess {Object}  timeslot timeslot added
 * @apiSuccess {Integer} timeslot.timeslotID ID of timeslot
 * @apiSuccess {Integer} timeslot.subjectID ID of subject
 * @apiSuccess {String} timeslot.day day assigned to timeslot
 * @apiSuccess {String} timeslot.time time assigned to timeslot
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     {
        "status": 200,
        "message": "Successfully created timeslot",
        "data": [
            {
                "timeslotID": 19,
                "subjectID": 12,
                "day": "12",
                "time": "23"
            }
        ]
}
 *   }
 *
 * @apiError (Error 500) {Integer} errors.status 500
 * @apiError (Error 500) {String} errors.message Internal server error

 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.post('/timeslot/', async (req, res) => {
  try {
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
 * 
  *@apiSuccess {Object} timeslot timeslots fetched
 * @apiSuccess {Integer} timeslot.timeslotID ID of timeslot
 * @apiSuccess {Integer} timeslot.subjectID ID of subject 
 * @apiSuccess {String} timeslot.day day assigned to timeslot
 * @apiSuccess {String} timeslot.time time assigned to timeslot
 *
 @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    "status": 200,
 *    "message": "Successfully fetched timeslots",
 *     "data": [
        {
            "timeslotID": 3,
            "subjectID": 2,
            "day": "Monday",
            "time": '1:00PM'
        },
        {
            "timeslotID": 4,
            "subjectID": 3,
            "day": "Monday",
            "time": '1:00PM'
        }
    ]
 *  }
 * @apiError (Error 500) {Integer} errors.status 500
 * @apiError (Error 500) {String} errors.message Internal server error
  * @apiError (Error 404) {Integer} errors.status 400
 * @apiError (Error 404) {String} errors.message Timeslots not found
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 * HTTP/1.1 404 Timeslots not found
 * {
 *   "status": 404,
 *   "message": "Timeslots not found"
 * }
 */

router.get('/timeslot/', async (req, res) => {
  try {
    const timeslots = await Ctrl.getTimeslots(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched timeslots',
      data: timeslots,
      total: timeslots.length,
      limit: req.query.limit || 12,
      page: req.query.page || 1,
      pages: Math.ceil(timeslots.length / (req.query.limit || 12)),
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
 * @apiParam (Query Params) {Integer} timeslotID ID of timeslot
 *
  *@apiSuccess {Object} timeslot timeslot fetched
 * @apiSuccess {Integer} timeslot.timeslotID ID of timeslot
 * @apiSuccess {Integer} timeslot.subjectID ID of subject 
 * @apiSuccess {String} timeslot.day day assigned to timeslot
 * @apiSuccess {String} timeslot.time time assigned to timeslot
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    "status": 200,
 *    "message": "Successfully fetched timeslot",
 *    "data": [
 *       {
 *          "timeslotID": 3,
            "subjectID": 2,
            "day": "Monday",
            "time": '1:00PM'
 *       }
 *    ]
 *  }
 * @apiError (Error 500) {Integer} errors.status 500
 * @apiError (Error 500) {String} errors.message Internal server error
 * @apiError (Error 404) {Integer} errors.status 400
 * @apiError (Error 404) {String} errors.message Timeslot not found
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 * HTTP/1.1 404 Timeslot not found
 * {
 *   "status": 404,
 *   "message": "Timeslot not found"
 * }
 */

router.get('/timeslot/:timeslotID/', async (req, res) => {
  try {
    const timeslot = await Ctrl.getTimeslot(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched timeslot',
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

/**
 * @api {put} /timeslot/:timeslotID updateTimeslot
 * @apiGroup Timeslot
 * @apiName updateTimeslot
 *
 * @apiParam (Query Params) {Integer} timeslotID ID of timeslot

* @apiParam (Body Params) {Integer} timeslot.subjectID subject ID of subject
 * @apiParam (Body Params) {String} timeslot.day day assigned to timeslot
 * @apiParam (Body Params) {String} timeslot.time time assigned to timeslot
 *
   *@apiSuccess {Object} timeslot timeslot updated
 * @apiSuccess {Integer} timeslot.timeslotID ID of timeslot
 * @apiSuccess {Integer} timeslot.subjectID ID of subject 
 * @apiSuccess {String} timeslot.day day assigned to timeslot
 * @apiSuccess {String} timeslot.time time assigned to timeslot
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
      "status": 200,
      "message": "Successfully updated timeslot",
      "data": [
          {
            "timeslotID": 4,
            "subjectID": 3,
            "day": "Monday",
            "time": '1:00PM'
          }
      ]
    }
 *   
 *
 * @apiError (Error 500) {Integer} errors.status 500
 * @apiError (Error 500) {String} errors.message Internal server error
  * @apiError (Error 404) {Integer} errors.status 400
 * @apiError (Error 404) {String} errors.message Timeslot not found
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
    HTTP/1.1 404 Timeslot not found
 * {
 *   "status": 404,
 *   "message": "Timeslot not found"
 * }
 */

router.put('/timeslot/:timeslotID/', async (req, res) => {
  try {
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
 * @api {delete} /timeslot/:timeslotID deleteTimeslot
 * @apiGroup Timeslot
 * @apiName deleteTimeslot
 *
 * @apiParam (Query Params) {Integer} timeslot.timeslotID ID of timeslot
 *
 *@apiSuccess {Object} timeslot subject deleted
 
 * @apiSuccess {Integer} timeslot.timeslotID ID of timeslot
 * @apiSuccess {Integer} timeslot.subjectID ID of subject 
 * @apiSuccess {String} timeslot.day day assigned to timeslot
 * @apiSuccess {String} timeslot.time time assigned to timeslot
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully deleted timeslot'
 *     }
 *   }
 *
 * @apiError (Error 500) {Integer} errors.status 500
 * @apiError (Error 500) {String} errors.message Internal server error
 * @apiError (Error 404) {Integer} errors.status 400
 * @apiError (Error 404) {String} errors.message Timeslot not found
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * HTTP/1.1 404 Timeslot not found
 * {
 *   "status": 404,
 *   "message": "Timeslot not found"
 * }
 */

router.delete('/timeslot/:timeslotID/', async (req, res) => {
  try {
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

/**
 * @api {delete} /timeslot/ deleteSubjects
 * @apiGroup Timeslot
 * @apiName deleteTimeslots
 * 
 * @apiSuccess {Object}  timeslots timeslots deleted
 * @apiSuccess {Integer} timeslot.timeslotID ID of timeslot
 * @apiSuccess {Integer} timeslot.subjectID ID of subject 
 * @apiSuccess {String} timeslot.day day assigned to timeslot
 * @apiSuccess {String} timeslot.time time assigned to timeslot
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
      "status": 200,
      "message": "Successfully deleted timeslots",
      "data": [
          {
              "timeslotID": 23,
              "subjectID": 1,
              "day": "1223",
              "time": "232332erer"
          },
          {
              "timeslotID": 24,
              "subjectID": 1,
              "day": "1223",
              "time": "232332erer"
          },
          {
              "timeslotID": 26,
              "subjectID": 1,
              "day": "1223",
              "time": "232332"
          }
      ]
    }
}
 *
 * @apiError (Error 500) {Integer} errors.status 500
 * @apiError (Error 500) {String} errors.message Internal server error
 * @apiError (Error 404) {Integer} errors.status 400
 * @apiError (Error 404) {String} errors.message Timeslots not found
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 * HTTP/1.1 404 Timeslots not found
 * {
 *   "status": 404,
 *   "message": "Timeslots not found"
 * }
 */

router.delete('/timeslot/', async (req, res) => {
  try {
    const timeslots = await Ctrl.getTimeslots(req.query);
    await Ctrl.deleteTimeslots(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted timeslots',
      data: timeslots,
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

export default router;
