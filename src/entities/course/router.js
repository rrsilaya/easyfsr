import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /course addCourse
 * @apiGroup Course
 * @apiName addCourse
 *
 * @apiParam (Body Params) {String} hoursPerWeek number of hours of course per week
 * @apiParam (Body Params) {String} school school course is being taken
 * @apiParam (Body Params) {String} credit credit of course
 * @apiParam (Body Params) {String} courseNumber courseNumber of course
 *
 * @apiSuccess {Object} course new Course is added
 * @apiSuccess {String} course.hoursPerWeek number of hours of course per week
 * @apiSuccess {String} course.school school course is being taken
 * @apiSuccess {String} course.credit credit of course
 * @apiSuccess {String} courseNumber courseNumber of course
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *       "status": 200,
 *       "message": "Successfully updated course",
 *       "data": [
            {
                "courseID": 4,
                "hoursPerWeek": "9",
                "school": "uplb",
                "credit": "3",
                "courseNumber": "999",
                "id": 1
            } 
        ]
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

router.post('/course/', async (req, res) => {
  try {
    const courseID = await Ctrl.addCourse(req.body);
    const course = await Ctrl.getCourse({ courseID });

    res.status(200).json({
      status: 200,
      message: 'Successfully added course',
      data: course,
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
 * @api {put} /course/:courseNumber updateCourse
 * @apiGroup Course
 * @apiName updateCourse
 *
 * @apiParam (Query Params) {String} courseNumber courseNumber of course
 * @apiParam (Body Params) {String} hoursPerWeek number of hours of course per week
 * @apiParam (Body Params) {String} school school course is being taken
 * @apiParam (Body Params) {String} credit credit of course
 *
 * @apiSuccess {Object} course Course is update
 * @apiSuccess {String} course.hoursPerWeek number of hours of course per week
 * @apiSuccess {String} course.school school course is being taken
 * @apiSuccess {String} course.credit credit of course
 * @apiSuccess {String} courseNumber courseNumber of course
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *       "status": 200,
 *       "message": "Successfully updated course",
 *       "data": [
 *         {
            "courseID": 2,
            "hoursPerWeek": "21",
            "school": "uplb",
            "credit": "3",
            "courseNumber": "128",
            "id": 1
 *        }
 *      ]
 *   }
 *
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

router.put('/course/:courseID', async (req, res) => {
  try {
    await Ctrl.updateCourse(req.params, req.body);
    const course = await Ctrl.getCourse(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully updated course',
      data: course,
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
 * @api {delete} /course/:courseNumber deleteCourse
 * @apiGroup Course
 * @apiName deleteCourse
 *
 * @apiParam (Query Params) {String} courseNumber courseNumber of course
 *
 * @apiSuccess {Object} course Course is update
 * @apiSuccess {String} course.hoursPerWeek number of hours of course per week
 * @apiSuccess {String} course.school school course is being taken
 * @apiSuccess {String} course.credit credit of course
 * @apiSuccess {String} courseNumber courseNumber of course
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully deleted course'
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

router.delete('/course/:courseID', async (req, res) => {
  try {
    const id = await Ctrl.deleteCourse(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted course',
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
 * @api {put} /course/:courseNumber getCourse
 * @apiGroup Course
 * @apiName updateCourse
 *
 * @apiParam (Query Params) {String} courseNumber courseNumber of course
 * 
 * @apiSuccess {Object} course Course is update
 * @apiSuccess {String} course.hoursPerWeek number of hours of course per week
 * @apiSuccess {String} course.school school course is being taken
 * @apiSuccess {String} course.credit credit of course
 * @apiSuccess {String} courseNumber courseNumber of course
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully got course details'
 *        "data": [
 *          {
            "courseID": 2,
            "hoursPerWeek": "21",
            "school": "uplb",
            "credit": "3",
            "courseNumber": "128",
            "id": 1
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

router.get('/course/:courseID', async (req, res) => {
  try {
    const course = await Ctrl.getCourse(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched course',
      data: course,
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
 * @api {get} /course getCourses
 * @apiGroup Course
 * @apiName getCourses
 *
 * @apiSuccess {String} message Confirmation Message.
 * @apiSuccess {Object[]} courses All courses
 * @apiSuccess {String} course.hoursPerWeek number of hours of course per week
 * @apiSuccess {String} course.school school course is being taken
 * @apiSuccess {String} course.credit credit of course
 * @apiSuccess {String} courseNumber courseNumber of course
 *
 
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *   {
        "message": "Successfully fetched courses",
        "courses": [
            {
            "courseID": 2,
            "hoursPerWeek": "21",
            "school": "uplb",
            "credit": "3",
            "courseNumber": "128",
            "id": 1
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

router.get('/course/', async (req, res) => {
  try {
    const courses = await Ctrl.getCourses(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched courses',
      data: courses,
      total: courses.length,
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      pages: Math.ceil(courses.length / (req.query.limit || 10)),
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
