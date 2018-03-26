import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /courseSched CourseSched
 * @apiGroup CourseSched
 * @apiName addCourseSched
 *
 * @apiParam (Body Params) {String} courseSchedID course schedule id
 * @apiParam (Body Params) {String} courseID course id
 * @apiParam (Body Params) {String} day day course is being taught
 * @apiParam (Body Params) {String} timeStart time course starts
 * @apiParam (Body Params) {String} timeEnd time course end
 *
 * @apiSuccess {Object} courseSched new courseSched is added
 * @apiSuccess {String} courseSched.courseSchedID course schedule id
 * @apiSuccess {String} courseSched.courseID course id
 * @apiSuccess {String} courseSched.day day course is being taught
 * @apiSuccess {String} courseSched.timeStart time course start
 * @apiSuccess {String} courseSched.timeEnd time course end
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
          "status": 200,
          "message": "Successfully added course schedule",
          "data": [
          {
            "courseSchedID": 2,
            "courseID": 1,
            "day": "tuesday",
            "timeStart": "07:00:00",
            "timeEnd": "08:00:00"
          }
          ]
 *     }
 *   }
 *
 * @apiError (Error 500) {String[]} status error status code
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
    const courseSchedID = await Ctrl.addCourseSched(req.body);

    const courseSched = await Ctrl.getCourseSched({ courseSchedID });
    res.status(200).json({
      status: 200,
      message: 'Successfully added course schedule',
      data: courseSched,
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
 * @api {put} /courseSched/:courseSchedID updateCourseSched
 * @apiGroup CourseSched
 * @apiName updateCourseSched
 * 
 * @apiParam (Query Params) {String} courseSchedID course schedule id

 * @apiParam (Body Params) {String} courseID course id
 * @apiParam (Body Params) {String} day day course is being taught
 * @apiParam (Body Params) {String} timeStart time course starts
 * @apiParam (Body Params) {String} timeEnd time course end

 * @apiSuccess {Object} courseSched new courseSched is updated
 * @apiSuccess {String} courseSched.courseSchedID course schedule id
 * @apiSuccess {String} courseSched.courseID course id
 * @apiSuccess {String} courseSched.day day course is being taught
 * @apiSuccess {String} courseSched.timeStart time course start
 * @apiSuccess {String} courseSched.timeEnd time course end
 
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
          "status": 200,
          "message": "Successfully updated course schedule",
          "data": [
          {
            "courseSchedID": 2,
            "courseID": 1,
            "day": "monday",
            "timeStart": "09:00:00",
            "timeEnd": "010:00:00"
          }
          ]
 *     }
 *   }
 *
 * @apiError (Error 500) {String[]} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }

    HTTP/1.1 404 Course not found
 * {
 *   "status": 404,
 *   "message": "Course schedule not found"
 * }
 */

router.put('/courseSched/:courseSchedID', async (req, res) => {
  try {
    await Ctrl.updateCourseSched(req.params, req.body);
    const courseSched = await Ctrl.getCourseSched(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated course schedule',
      data: courseSched,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Course not found';
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

 * @apiParam (Query Params) {String} courseSchedID course schedule id
 *
 * @apiSuccess {Object} courseSched new courseSched is deleted
 * @apiSuccess {String} courseSched.courseSchedID course schedule id
 * @apiSuccess {String} courseSched.courseID course id
 * @apiSuccess {String} courseSched.day day course is being taught
 * @apiSuccess {String} courseSched.timeStart time course start
 * @apiSuccess {String} courseSched.timeEnd time course end
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully deleted course schedule'
          "data": [
          {
            "courseSchedID": 2,
            "courseID": 1,
            "day": "monday",
            "timeStart": "09:00:00",
            "timeEnd": "010:00:00"
          }
          ]
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

    HTTP/1.1 404 Course schedule not found
 * {
 *   "status": 404,
 *   "message": "Course schedule not found"
 * }
 */

router.delete('/courseSched/:courseSchedID', async (req, res) => {
  try {
    const courseSched = await Ctrl.getCourseSched(req.params);

    await Ctrl.deleteCourseSched(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted course schedule',
      data: courseSched,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Course not found';
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
 * @apiParam (Query Params) {String} courseSchedID course schedule id
 *
 * @apiSuccess {Object} courseSched new courseSched is deleted
 * @apiSuccess {String} courseSched.courseSchedID course schedule id
 * @apiSuccess {String} courseSched.courseID course id
 * @apiSuccess {String} courseSched.day day course is being taught
 * @apiSuccess {String} courseSched.timeStart time course start
 * @apiSuccess {String} courseSched.timeEnd time course end
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully got course details'
          "data": [
          {
            "courseSchedID": 2,
            "courseID": 1,
            "day": "monday",
            "timeStart": "09:00:00",
            "timeEnd": "010:00:00"
          }
          ]
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

    HTTP/1.1 404 Course not found
 * {
 *   "status": 404,
 *   "message": "Course not found"
 * }
 */

router.get('/courseSched/:courseSchedID', async (req, res) => {
  try {
    const courseSched = await Ctrl.getCourseSched(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully got course schedule details',
      data: courseSched,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Course not found';
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
 * @apiSuccess {String} message Confirmation Message.
 * @apiSuccess {Object[]} courseSchedules All course schedules
 
 * @apiSuccess {String} courseSched.courseNumber number of course
 * @apiSuccess {String} courseSched.day day course is being taught
 * @apiSuccess {String} courseSched.time time course is being taught
 *
 
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *   {
        "message": "Successfully fetched courses",
        "courseSchedules": [
 *          {
            "courseNumber": "12345678",
            "day": "friday",
            "time": "4:00 pm"
 *        }
 *     ]
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

// router.get('/courseSched/', async (req, res) => {
//   try {
//     const courseSchedules = await Ctrl.getCourseScheds(req.params);
//     res.status(200).json({
//       status: 200,
//       message: 'Successfully fetched all courses',
//       data: courseSchedules,
//       total: courseScheds.length,
//       limit: req.query.limit || 12,
//       page: req.query.page || 1,
//       pages: Math.ceil(courseScheds.length / (req.query.limit || 12)),
//     });
//   } catch (status) {
//     let message = '';
//     switch (status) {
//       case 404:
//         message = 'Course not found';
//         break;
//       case 500:
//         message = 'Internal server error';
//         break;
//     }
//     res.status(status).json({ status, message });
//   }
// });

export default router;
//
