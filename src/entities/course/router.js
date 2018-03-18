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
 *        "status": 200;
 *        "message": 'Succesfully added course'
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

router.post('/course/', async (req, res) => {
  try {
    const id = await Ctrl.addCourse(req.body);

    res.status(200).json({
      status: 200,
      message: 'Successfully added course',
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
 *        "status": 200;
 *        "message": 'Succesfully updated course'
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

router.put('/course/:courseNumber', async (req, res) => {
  try {
    await Ctrl.updateCourse(req.params, req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated course',
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

router.delete('/course/:courseNumber', async (req, res) => {
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
 * @api {put} /course/:courseNumber addCourse
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
 *           "hoursPerWeek": "10",
 *           "school": "uplb",
 *           "credit": "3",
 *           "courseNumber": "1234567"
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

router.get('/course/:courseNumber', async (req, res) => {
  try {
    const course = await Ctrl.getCourse(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully got course details',
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

export default router;
