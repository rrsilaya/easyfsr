import { Router } from 'express';
import * as Ctrl from './controller';
import {
  getUserIDofFSR,
  getIDofFSRfromCourseSched,
} from '../../middlewares/controller';
import { addLog } from './../log/controller';
import moment from 'moment';
import { addCourse } from './../course/controller';

const router = Router();

/**
 * @api {post} /courseSched CourseSched
 * @apiGroup CourseSched
 * @apiName addCourseSched
 *
 * @apiParam (Body Params) {Number} courseID course id
 * @apiParam (Body Params) {String} day day course is being taught
 * @apiParam (Body Params) {Time} timeStart time course starts
 * @apiParam (Body Params) {Time} timeEnd time course end
 *
 * @apiSuccess {Object} data new courseSched added
 * @apiSuccess {Number} data.courseSchedID course schedule id
 * @apiSuccess {Number} data.courseID course id
 * @apiSuccess {String} data.day day course is being taught
 * @apiSuccess {Time} data.timeStart time course start
 * @apiSuccess {Time} data.timeEnd time course end
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200,
 *        "message": "Successfully created course schedule",
 *         "data":
 *           {
 *            "courseSchedID": 2,
 *            "courseID": 1,
 *            "day": "tuesday",
 *            "timeStart": "07:00:00",
 *             timeEnd": "08:00:00"
 *           }
 *     }
 *   }
 *
 * @apiError (Error 500) {Number} status  status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.post('/courseSched/', async (req, res) => {
  try {
    const userIDofFSR = await getUserIDofFSR(
      req.body.id,
      req.session.user.userID,
    );
    const timeStart = moment(req.body.timeStart, 'HH:mm:ss');
    const timeEnd = moment(req.body.timeEnd, 'HH:mm:ss');

    if (!moment(timeStart).isBefore(timeEnd))
      res.status(400).json({
        status: 400,
        message: 'Bad Request',
      });
    let course = {
      id: req.body.id,
      school: req.body.school,
      credit: req.body.credit,
      courseNumber: req.body.courseNumber,
    };
    const courseID = await addCourse(course);
    const courseSchedID = await Ctrl.addCourseSched({
      courseID: courseID,
      day: req.body.day,
      timeStart: req.body.timeStart,
      timeEnd: req.body.timeEnd,
    });
    const courseSched = await Ctrl.getCourseSched({ courseSchedID });
    await addLog({
      action: 'INSERT_COURSE_SCHED',
      changes: '',
      affectedID: courseSchedID,
      userID: req.session.user.userID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully created course schedule',
      data: courseSched,
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
 * @api {put} /courseSched/:courseSchedID updateCourseSched
 * @apiGroup CourseSched
 * @apiName updateCourseSched
 *
 * @apiParam (Query Params) {Number} courseSchedID course schedule id
 *
 * @apiParam (Body Params) {Number} [courseID] course id
 * @apiParam (Body Params) {String} [day] day course is being taught
 * @apiParam (Body Params) {Time} [timeStart] time course starts
 * @apiParam (Body Params) {Time} [timeEnd] time course end
 *
 * @apiSuccess {Object} data  courseSched updated
 * @apiSuccess {Number} data.courseSchedID course schedule id
 * @apiSuccess {Number} data.courseID course id
 * @apiSuccess {String} data.day day course is being taught
 * @apiSuccess {Time} data.timeStart time course start
 * @apiSuccess {Time} data.timeEnd time course end
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *         "status": 200,
 *         "message": "Successfully updated course schedule",
 *         "data":
 *           {
 *             "courseSchedID": 2,
 *             "courseID": 1,
 *             "day": "monday",
 *             "timeStart": "09:00:00",
 *             "timeEnd": "010:00:00"
 *           }
 *     }
 *   }
 *
 * @apiError (Error 500) {Number} status error status code
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
 * HTTP/1.1 404 Course Schedule not found
 * {
 *   "status": 404,
 *   "message": "Course schedule not found"
 * }
 */

router.put('/courseSched/:courseSchedID', async (req, res) => {
  try {
    const idOfCourse = await getIDofFSRfromCourseSched(
      req.params.courseSchedID,
      req.session.user.userID,
    );
    const userIDofFSR = await getUserIDofFSR(
      idOfCourse,
      req.session.user.userID,
    );
    await Ctrl.updateCourseSched(req.params, req.body);
    const courseSched = await Ctrl.getCourseSched(req.params);
    await addLog({
      action: 'UPDATE_COURSE_SCHED',
      changes: '',
      affectedID: courseSched.courseSchedID,
      userID: req.session.user.userID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully updated course schedule',
      data: courseSched,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'Course schedule not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /courseSched/:courseSchedID deleteCourseSched
 * @apiGroup CourseSched
 * @apiName deleteCourseSched
 *

 * @apiParam (Query Params) {Number} courseSchedID course schedule id
 *
 * @apiSuccess {Object} data courseSched deleted
 * @apiSuccess {Number} data.courseSchedID course schedule id
 * @apiSuccess {Number} data.courseID course id
 * @apiSuccess {String} data.day day course is being taught
 * @apiSuccess {Time} data.timeStart time course start
 * @apiSuccess {Time} data.timeEnd time course end
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *         "status": 200,
 *         "message": "Successfully deleted course schedule",
 *         "data": 
 *           {
 *             "courseSchedID": 2,
 *             "courseID": 1,
 *             "day": "monday",
 *             "timeStart": "09:00:00",
 *             "timeEnd": "010:00:00"
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
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 404 Course schedule not found
 * {
 *   "status": 404,
 *   "message": "Course schedule not found"
 * }
 */

router.delete('/courseSched/:courseSchedID', async (req, res) => {
  try {
    const idOfCourse = await getIDofFSRfromCourseSched(
      req.params.courseSchedID,
      req.session.user.userID,
    );
    const userIDofFSR = await getUserIDofFSR(
      idOfCourse,
      req.session.user.userID,
    );
    const courseSched = await Ctrl.getCourseSched(req.params);
    await Ctrl.deleteCourseSched(req.params);
    await addLog({
      action: 'DELETE_COURSE_SCHED',
      changes: '',
      affectedID: courseSched.courseSchedID,
      userID: req.session.user.userID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted course schedule',
      data: courseSched,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'Course schedule not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /courseSched/:courseSchedID getCourseSched
 * @apiGroup CourseSched
 * @apiName getCourse
 *
 * @apiParam (Query Params) {Number} courseSchedID course schedule id
 *
 * @apiSuccess {Object} data  courseSched fetched
 * @apiSuccess {Number} data.courseSchedID course schedule id
 * @apiSuccess {Number} data.courseID course id
 * @apiSuccess {String} data.day day course is being taught
 * @apiSuccess {Time} data.timeStart time course start
 * @apiSuccess {Time} data.timeEnd time course end
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *         "status": 200,
 *         "message": "Successfully fetched course schedule",
 *         "data":
 *           {
 *             "courseSchedID": 2,
 *             "courseID": 1,
 *             "day": "monday",
 *             "timeStart": "09:00:00",
 *             "timeEnd": "010:00:00"
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
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Course Schedule not found
 * {
 *   "status": 404,
 *   "message": "Course schedule not found"
 * }
 */

router.get('/courseSched/:courseSchedID', async (req, res) => {
  try {
    if (req.session.user.acctType === 'USER' && !req.session.user.isHead) {
      const idOfCourse = await getIDofFSRfromCourseSched(
        req.params.courseSchedID,
        req.session.user.userID,
      );
      const userIDofFSR = await getUserIDofFSR(
        idOfCourse,
        req.session.user.userID,
      );
    }
    const courseSched = await Ctrl.getCourseSched(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched course schedule',
      data: courseSched,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'Course schedule not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /courseSched getCourseSchedules
 * @apiGroup CourseSched
 * @apiName getCourseSchedules
 * 
 * @apiParam (Query Params) {Number} [courseID] id of course
 * @apiParam (Query Params) {String} [day] day course is being taught
 * @apiParam (Query Params) {Time} [timeStart] time course start
 * @apiParam (Query Params) {Time} [timeEnd] time course end *
 * @apiParam (Query Params) {Number} [page] page number
 * @apiParam (Query Params) {Number} [limit] count limit of course scheds to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'day'

 * @apiSuccess {Object[]} data All course schedules
 * @apiSuccess {String} data.courseSchedID course schedule id
 * @apiSuccess {String} data.courseID course id
 * @apiSuccess {String} data.day day course is being taught
 * @apiSuccess {String} data.timeStart time course start
 * @apiSuccess {String} data.timeEnd time course end
 * @apiSuccess {Integer} total Total amount of documents.
 * @apiSuccess {Integer} limit Max number of documents
 * @apiSuccess {Integer} page nth page this query is.
 * @apiSuccess {Integer} pages Number of total pages
 * 
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *         "status": 200,
 *         "message": "Successfully fetched course schedules",
 *         "data": [
 *           {
 *             "courseSchedID": 2,
 *             "courseID": 1,
 *             "day": "monday",
 *             "timeStart": "09:00:00",
 *             "timeEnd": "010:00:00"
 *           },
 *           {
 *             "courseSchedID": 3,
 *             "courseID": 2,
 *             "day": "tuesday",
 *             "timeStart": "09:00:00",
 *             "timeEnd": "010:00:00"
 *           },
 *         ],
 *         "total": 2,
 *         "limit": 2,
 *         "page": 8,
 *         "pages": 8         
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
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Course schedule not found
 * {
 *   "status": 404,
 *   "message": "Course Schedule not found"
 * }
 */

router.get('/courseSched/', async (req, res) => {
  try {
    req.session.user.acctType === 'USER'
      ? (req.query.userID = req.session.user.userID)
      : '';
    const courseScheds = await Ctrl.getCourseScheds(
      req.query,
      req.query.userID,
    );
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched course schedules',
      data: courseScheds,
      total: (await Ctrl.getTotalCourseScheds(req.query, req.query.userID))
        .total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalCourseScheds(req.query, req.query.userID)).total /
          (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Course schedule not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
