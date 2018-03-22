import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();
/**
 * @api {get} /subject/:id getSubject
 * @apiGroup Subject
 * @apiName getSubject
 *
 * @apiParam (Query Params) {Integer} id ID of subject
 *
 * @apiSuccess {Object} subject Subject fetched
 * @apiSuccess {Integer} subject.id ID of subject
 * @apiSuccess {Integer} subject.subjectCode subject code of subject
 * @apiSuccess {String} subject.subjectID subject ID of subject
 * @apiSuccess {Integer} subject.teachingLoadCreds teaching load credits of subject
 * @apiSuccess {Integer} subject.noOfStudents number of students enrolled in the subject
 * @apiSuccess {Integer} subject.hoursPerWeek number of hours per week subject takes up
 * @apiSuccess {String} subject.sectionCode section code of subject
 * @apiSuccess {String} subject.room room where subject is being taught
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    "status": 200,
 *    "message": "Successfully fetched subject",
 *    "data": [
 *       {
 *           "id": 1,
 *           "subjectCode": "Hi",
 *           "subjectID": 1,
 *           "teachingLoadCreds": 1,
 *           "noOfStudents": 5,
 *           "hoursPerWeek": 1,
 *           "sectionCode": "Hello",
 *           "room": 1
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
 * HTTP/1.1 404 Subject not found
 * {
 *   "status": 404,
 *   "message": "Subject not found"
 * }
 */

router.get('/subject/', async (req, res) => {
  try {
    const subject = await Ctrl.getSubject();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched subject',
      data: subject,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Subject not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /subject/ getSubjects
 * @apiGroup Subject
 * @apiName getSubjects
 * 
 * @apiSuccess {Object} subject Subjects fetched
 * @apiSuccess {Integer} subject.id ID of subject
 * @apiSuccess {Integer} subject.subjectCode subject code of subject
 * @apiSuccess {String} subject.subjectID subject ID of subject
 * @apiSuccess {Integer} subject.teachingLoadCreds teaching load credits of subject
 * @apiSuccess {Integer} subject.noOfStudents number of students enrolled in the subject
 * @apiSuccess {Integer} subject.hoursPerWeek number of hours per week subject takes up
 * @apiSuccess {String} subject.sectionCode section code of subject
 * @apiSuccess {String} subject.room room where subject is being taught
 *
 @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    "status": 200,
 *    "message": "Successfully fetched subjects",
 *    "data": [
 *       {
 *           "id": 1,
 *           "subjectCode": "Hi",
 *           "subjectID": 1,
 *           "teachingLoadCreds": 1,
 *           "noOfStudents": 5,
 *           "hoursPerWeek": 1,
 *           "sectionCode": "Hello",
 *           "room": 1
 *       },
 *       {
 *           "id": 2,
 *           "subjectCode": "Hi",
 *           "subjectID": 2,
 *           "teachingLoadCreds": 1,
 *           "noOfStudents": 5,
 *           "hoursPerWeek": 1,
 *           "sectionCode": "Hello",
 *           "room": 2
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
 * HTTP/1.1 404 Subjects not found
 * {
 *   "status": 404,
 *   "message": "Subjects not found"
 * }
 */

router.get('/subject/:id', async (req, res) => {
  try {
    const subject = await Ctrl.getSubjects(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched subjects',
      data: subject,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Subjects not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {post} /subject addSubject
 * @apiGroup Subject
 * @apiName addSubject

 * @apiParam (Body Params) {Integer} subject.id ID of subject
 * @apiParam (Body Params) {String} subject.subjectCode subject code of subject
 * @apiParam (Body Params) {Integer} subject.subjectID subject ID of subject
 * @apiParam (Body Params) {Integer} subject.teachingLoadCreds teaching load credits of subject
 * @apiParam (Body Params) {Integer} subject.noOfStudents number of students enrolled in the subject
 * @apiParam (Body Params) {Integer} subject.hoursPerWeek number of hours per week subject takes up
 * @apiParam (Body Params) {String} subject.sectionCode section code of subject
 * @apiParam (Body Params) {Integer} subject.room room where subject is being taught
 *
 * @apiSuccess {Object}  subject subject added
 * @apiSuccess {Integer} subject.id ID of subject
 * @apiSuccess {String} subject.subjectCode subject code of subject
 * @apiSuccess {Integer} subject.subjectID subject ID of subject
 * @apiSuccess {Integer} subject.teachingLoadCreds teaching load credits of subject
 * @apiSuccess {Integer} subject.noOfStudents number of students enrolled in the subject
 * @apiSuccess {Integer} subject.hoursPerWeek number of hours per week subject takes up
 * @apiSuccess {String} subject.sectionCode section code of subject
 * @apiSuccess {String} subject.room room where subject is being taught
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully added subject'
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

router.post('/subject/', async (req, res) => {
  try {
    const id = await Ctrl.addSubject(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully created subject',
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
 * @api {put} /subject/:id updateSubject
 * @apiGroup Subject
 * @apiName updateSubject
 *
 * @apiParam (Query Params) {Integer} id ID of subject

 * @apiParam (Body Params) {String} subject.subjectCode subject code of subject
 * @apiParam (Body Params) {Integer} subject.subjectID subject ID of subject
 * @apiParam (Body Params) {Integer} subject.teachingLoadCreds teaching load credits of subject
 * @apiParam (Body Params) {Integer} subject.noOfStudents number of students enrolled in the subject
 * @apiParam (Body Params) {Integer} subject.hoursPerWeek number of hours per week subject takes up
 * @apiParam (Body Params) {String} subject.sectionCode section code of subject
 * @apiParam (Body Params) {Integer} subject.room room where subject is being taught
 *
 *
 * @apiSuccess {Object} subject Subject updated
 * @apiSuccess {Integer} subject.id ID of subject
 * @apiSuccess {String} subject.subjectCode subject code of subject
 * @apiSuccess {Integer} subject.subjectID subject ID of subject
 * @apiSuccess {Integer} subject.teachingLoadCreds teaching load credits of subject
 * @apiSuccess {Integer} subject.noOfStudents number of students enrolled in the subject
 * @apiSuccess {Integer} subject.hoursPerWeek number of hours per week subject takes up
 * @apiSuccess {String} subject.sectionCode section code of subject
 * @apiSuccess {String} subject.room room where subject is being taught
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully updated subject'
 *     }
 *   }
 *
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
    HTTP/1.1 404 Subject not found
 * {
 *   "status": 404,
 *   "message": "Subject not found"
 * }
 */

router.put('/subject/:id', async (req, res) => {
  try {
    await Ctrl.updateSubject(req.params, req.body);
    const subject = await Ctrl.getSubject(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated subject',
      data: subject,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Subject not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /subject/:id deleteSubject
 * @apiGroup Subject
 * @apiName deleteSubject
 *
 * @apiParam (Query Params) {Integer} id ID of subject
 *
 * @apiSuccess {Object} subject Subject deleted
 * @apiSuccess {Integer} subject.id ID of subject
 * @apiSuccess {String} subject.subjectCode subject code of subject
 * @apiSuccess {Integer} subject.subjectID subject ID of subject
 * @apiSuccess {Integer} subject.teachingLoadCreds teaching load credits of subject
 * @apiSuccess {Integer} subject.noOfStudents number of students enrolled in the subject
 * @apiSuccess {Integer} subject.hoursPerWeek number of hours per week subject takes up
 * @apiSuccess {String} subject.sectionCode section code of subject
 * @apiSuccess {String} subject.room room where subject is being taught
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully deleted subject'
 *     }
 *   }
 *
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
 * HTTP/1.1 404 Subject not found
 * {
 *   "status": 404,
 *   "message": "Subject not found"
 * }
 */

router.delete('/subject/:id', async (req, res) => {
  try {
    await Ctrl.deleteSubject(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted subject',
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Subject not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
