import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /courseSched Course
 * @apiGroup CourseSched
 * @apiName addCourseSched
 *
 * @apiParam (Body Params) {String} courseNumber number of course
 * @apiParam (Body Params) {String} day day course is being taught
 * @apiParam (Body Params) {String} time time course is being taught
 *
 * @apiSuccess {Object} courseSched new courseSched is added
 * @apiSuccess {String} courseSched.courseNumber number of course
 * @apiSuccess {String} courseSched.day day course is being taught
 * @apiSuccess {String} courseSched.time time course is being taught
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
          "status": 200,
          "message": "Successfully added course schedule",
          "data": {
              "courseNumber": "10",
              "day": "mon",
              "time": "2:00 pm"
          }
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

router.post('/courseSched/', async (req, res) => {
  try {
    await Ctrl.addCourseSched(req.body);

    // const courseSched = await Ctrl.getCourseSched(req.body.courseID);
    res.status(200).json({
      status: 200,
      message: 'Successfully added course schedule',
      // data: courseSched,
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
 * @api {put} /courseSched/:courseNumber updateCourseSched
 * @apiGroup CourseSched
 * @apiName updateCourseSched
 * 
 * @apiParam (Query Params) {String} courseNumber number of course

 * @apiParam (Body Params) {String} day day course is being taught
 * @apiParam (Body Params) {String} time time course is being taught

 * @apiSuccess {Object} courseSched new courseSched is added
 * @apiSuccess {String} courseSched.courseNumber number of course
 * @apiSuccess {String} courseSched.day day course is being taught
 * @apiSuccess {String} courseSched.time time course is being taught

 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
          "status": 200,
          "message": "Successfully added course schedule",
          "data": {
              "courseNumber": "10",
              "day": "mon",
              "time": "2:00 pm"
          }
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
 *   "message": "Course schedule not found"
 * }
 */

router.put('/courseSched/:courseSchedID', async (req, res) => {
  try {
    await Ctrl.updateCourseSched(req.params, req.body);
    // const courseSched = await Ctrl.getCourseSched(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated course schedule',
      // data: courseSched,
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
 * @api {delete} /courseSched/:courseNumber deleteCourseSched
 * @apiGroup CourseSched
 * @apiName deleteCourseSched
 *
 * @apiParam (Query Params) {String} courseNumber courseNumber of course
 *
 * @apiSuccess {Object} courseSched new courseSched is added
 * @apiSuccess {String} courseSched.courseNumber number of course
 * @apiSuccess {String} courseSched.day day course is being taught
 * @apiSuccess {String} courseSched.time time course is being taught
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully deleted course schedule'
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
    const id = await Ctrl.deleteCourseSched(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted course schedule',
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
 * @api {put} /course/:courseNumber addCourse
 * @apiGroup Course
 * @apiName updateCourse
 *
 * @apiParam (Query Params) {String} courseNumber number of course
 *
 * @apiParam (Body Params) {String} day day course is being taught
 * @apiParam (Body Params) {String} time time course is being taught
 *
 * @apiSuccess {Object} courseSched new courseSched is added
 * @apiSuccess {String} courseSched.courseNumber number of course
 * @apiSuccess {String} courseSched.day day course is being taught
 * @apiSuccess {String} courseSched.time time course is being taught
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully got course details'
 *        "data": [
 *          {
            "courseNumber": "12345678",
            "day": "friday",
            "time": "4:00 pm"
 *        }
 *     ]
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

router.get('/courseSched/', async (req, res) => {
  try {
    const courseSchedules = await Ctrl.getCourseScheds(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched all courses',
      data: courseSchedules,
      total: courseScheds.length,
      limit: req.query.limit || 12,
      page: req.query.page || 1,
      pages: Math.ceil(courseScheds.length / (req.query.limit || 12)),
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

export default router;
//
