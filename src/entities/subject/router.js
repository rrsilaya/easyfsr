import { Router } from 'express';
import * as Ctrl from './controller';
import {
  getUserIDofFSR,
  getIDofFSRfromSubject,
} from '../../middlewares/controller';
import { addLog } from './../log/controller';

const router = Router();

/**
 * @api {post} /subject addSubject
 * @apiGroup Subject
 * @apiName addSubject

 * @apiParam (Body Params) {Number} id ID of FSR
 * @apiParam (Body Params) {String} subjectCode subject code of subject
 * @apiParam (Body Params) {Number} [teachingLoadCreds] teaching load credits of subject
 * @apiParam (Body Params) {Number} noOfStudents number of students enrolled in the subject
 * @apiParam (Body Params) {String} sectionCode section code of subject
 * @apiParam (Body Params) {String} room room where subject is being taught
 *
 * @apiSuccess {Object} data subject added
 * @apiSuccess {Number} data.id ID of FSR
 * @apiSuccess {String} data.subjectCode subject code of subject
 * @apiSuccess {Number} data.subjectID ID of subject
 * @apiSuccess {Number} data.teachingLoadCreds teaching load credits of subject
 * @apiSuccess {Number} data.noOfStudents number of students enrolled in the subject
 * @apiSuccess {Number} data.hoursPerWeek number of hours per week subject takes up
 * @apiSuccess {String} data.sectionCode section code of subject
 * @apiSuccess {String} data.room room where subject is being taught
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "status": 200,
 *       "message": "Successfully created subject",
 *       "data": 
 *           {
 *               "id": 5,
 *               "subjectCode": "NEW",
 *               "subjectID": 20,
 *               "teachingLoadCreds": 1,
 *               "noOfStudents": 1,
 *               "hoursPerWeek": 1,
 *               "sectionCode": "a",
 *               "room": "A"
 *           }
 *       
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
 */

router.post('/subject/', async (req, res) => {
  try {
    const userIDofFSR = await getUserIDofFSR(
      req.body.id,
      req.session.user.userID,
    );
    const subjectID = await Ctrl.addSubject(req.body);
    let subject = await Ctrl.getSubject({ subjectID });
    subject = await Ctrl.computeSubject(subject);
    await addLog({
      action: 'INSERT_SUBJECT',
      changes: '',
      affectedID: subjectID,
      userID: req.session.user.userID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully added subject',
      data: subject,
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
 * @api {put} /subject/:subjectID updateSubject
 * @apiGroup Subject
 * @apiName updateSubject
 *
 * @apiParam (Query Params) {Number} subjectID ID of subject
 *
 * @apiParam (Body Params) {Number} [id] ID of fsr
 * @apiParam (Body Params) {String} [subjectCode] subject code of subject
 * @apiParam (Body Params) {Number} [noOfStudents] number of students enrolled in the subject
 * @apiParam (Body Params) {String} [sectionCode] section code of subject
 * @apiParam (Body Params) {Number} [room] room where subject is being taught
 *
 * @apiSuccess {Object} data Subject updated
 * @apiSuccess {Number} data.id ID of FSR
 * @apiSuccess {String} data.subjectCode subject code of subject
 * @apiSuccess {Number} data.subjectID ID of subject
 * @apiSuccess {Number} data.teachingLoadCreds teaching load credits of subject
 * @apiSuccess {Number} data.noOfStudents number of students enrolled in the subject
 * @apiSuccess {Number} data.hoursPerWeek number of hours per week subject takes up
 * @apiSuccess {String} data.sectionCode section code of subject
 * @apiSuccess {String} data.room room where subject is being taught
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *     "status": 200,
 *     "message": "Successfully updated subject",
 *     "data":
 *         {
 *             "id": 1,
 *             "subjectCode": "NEW CODE",
 *             "subjectID": 1,
 *             "teachingLoadCreds": 2,
 *             "noOfStudents": 2,
 *             "hoursPerWeek": 2,
 *             "sectionCode": "sd",
 *             "room": "12"
 *         }
 *   }
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
 * HTTP/1.1 404 Subject not found
 * {
 *   "status": 404,
 *   "message": "Subject not found"
 * }
 */
router.put('/subject/:subjectID', async (req, res) => {
  try {
    const idOfSubject = await getIDofFSRfromSubject(
      req.params.subjectID,
      req.session.user.userID,
    );
    const userIDofFSR = await getUserIDofFSR(
      idOfSubject,
      req.session.user.userID,
    );
    await Ctrl.updateSubject(req.params, req.body);
    let subject = await Ctrl.getSubject(req.params);
    subject = await Ctrl.computeSubject(subject);
    await addLog({
      action: 'UPDATE_SUBJECT',
      changes: '',
      affectedID: subject.subjectID,
      userID: req.session.user.userID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully updated subject',
      data: subject,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
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
 * @api {delete} /subject/:subjectID deleteSubject
 * @apiGroup Subject
 * @apiName deleteSubject
 *
 * @apiParam (Query Params) {Number} subjectID ID of subject
 *
 * @apiSuccess {Object} data Subject deleted
 * @apiSuccess {Number} data.id ID of FSR
 * @apiSuccess {String} data.subjectCode subject code of subject
 * @apiSuccess {Number} data.subjectID ID of subject
 * @apiSuccess {Number} data.teachingLoadCreds teaching load credits of subject
 * @apiSuccess {Number} data.noOfStudents number of students enrolled in the subject
 * @apiSuccess {Number} data.hoursPerWeek number of hours per week subject takes up
 * @apiSuccess {String} data.sectionCode section code of subject
 * @apiSuccess {String} data.room room where subject is being taught
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *        "status": 200;
 *        "message": 'Succesfully deleted subject'
 *         "data":
 *         {
 *           "id": 1,
 *           "subjectCode": "NEW CODE",
 *           "subjectID": 1,
 *           "teachingLoadCreds": 2,
 *           "noOfStudents": 2,
 *           "hoursPerWeek": 2,
 *           "sectionCode": "sd",
 *           "room": "12"
 *         }
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
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Subject not found
 * {
 *   "status": 404,
 *   "message": "Subject not found"
 * }
 */

router.delete('/subject/:subjectID', async (req, res) => {
  try {
    const idOfSubject = await getIDofFSRfromSubject(
      req.params.subjectID,
      req.session.user.userID,
    );
    const userIDofFSR = await getUserIDofFSR(
      idOfSubject,
      req.session.user.userID,
    );
    let subject = await Ctrl.getSubject(req.params);
    subject = await Ctrl.computeSubject(subject);
    await Ctrl.deleteSubject(req.params);
    await addLog({
      action: 'DELETE_SUBJECT',
      changes: '',
      affectedID: subject.subjectID,
      userID: req.session.user.userID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted subject',
      data: subject,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
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
 * @api {get} /subject/:subjectID getSubject
 * @apiGroup Subject
 * @apiName getSubject
 *
 * @apiParam (Query Params) {Number} subjectID ID of subject
 *
 * @apiSuccess {Object} data Subject fetched
 * @apiSuccess {Number} data.id ID of FSR
 * @apiSuccess {String} data.subjectCode subject code of subject
 * @apiSuccess {Number} data.subjectID ID of subject
 * @apiSuccess {Number} data.teachingLoadCreds teaching load credits of subject
 * @apiSuccess {Number} data.noOfStudents number of students enrolled in the subject
 * @apiSuccess {Number} data.hoursPerWeek number of hours per week subject takes up
 * @apiSuccess {String} data.sectionCode section code of subject
 * @apiSuccess {String} data.room room where subject is being taught
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    "status": 200,
 *    "message": "Successfully fetched subject",
 *    "data":
 *       {
 *         "id": 38,
 *         "subjectCode": "CMSC123",
 *         "subjectID": 128,
 *         "teachingLoadCreds": 6,
 *         "noOfStudents": 68,
 *         "hoursPerWeek": 3,
 *         "sectionCode": "U",
 *         "room": "PCLAB7",
 *         "courseCred": 3,
 *         "studCredUnits": 204,
 *         "TLC": 3,
 *         "TLCM": 3.7
 *       }
 *
 *  }
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
 * HTTP/1.1 404 Subject not found
 * {
 *   "status": 404,
 *   "message": "Subject not found"
 * }
 */

router.get('/subject/:subjectID', async (req, res) => {
  try {
    const idOfSubject = await getIDofFSRfromSubject(
      req.params.subjectID,
      req.session.user.userID,
    );
    const userIDofFSR = await getUserIDofFSR(
      idOfSubject,
      req.session.user.userID,
    );
    let subject = await Ctrl.getSubject(req.params);
    subject = await Ctrl.computeSubject(subject);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched subject',
      data: subject,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
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
 * @apiParam (Query Params) {Number} [subjectID] id of subject 
 * @apiParam (Query Params) {Number} [id]  fsr id 
 * @apiParam (Query Params) {String} [subjectCode] subject code of subject
 * @apiParam (Query Params) {Number} [teachingLoadCreds] teaching load credits of subject
 * @apiParam (Query Params) {Number} [noOfStudents] number of students enrolled in the subject
 * @apiParam (Query Params) {Number} [hoursPerWeek] number of hours per week subject takes up
 * @apiParam (Query Params) {String} [sectionCode] section code of subject
 * @apiParam (Query Params) {String} [room] room where subject is being taught
 * @apiParam (Query Params) {Number} [page] page number
 * @apiParam (Query Params) {Number} [limit] count limit of subjects to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'subjectCode'
 * 
 * @apiSuccess {Object[]} data Subjects fetched
 * @apiSuccess {Number} data.id ID of FSR
 * @apiSuccess {String} data.subjectCode subject code of subject
 * @apiSuccess {Number} data.subjectID ID of subject
 * @apiSuccess {Number} data.teachingLoadCreds teaching load credits of subject
 * @apiSuccess {Number} data.noOfStudents number of students enrolled in the subject
 * @apiSuccess {Number} data.hoursPerWeek number of hours per week subject takes up
 * @apiSuccess {String} data.sectionCode section code of subject
 * @apiSuccess {String} data.room room where subject is being taught
 * @apiSuccess {Number} total Total amount of documents.
 * @apiSuccess {Number} limit Max number of documents
 * @apiSuccess {Number} page nth page this query is.
 * @apiSuccess {Number} pages Number of total pages.
 * 
 @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *    "status": 200,
 *    "message": "Successfully fetched subjects",
 *    "data": [
 *       {
 *         "id": 38,
 *         "subjectCode": "CMSC123",
 *         "subjectID": 128,
 *         "teachingLoadCreds": 6,
 *         "noOfStudents": 68,
 *         "hoursPerWeek": 3,
 *         "sectionCode": "U",
 *         "room": "PCLAB7",
 *         "courseCred": 3,
 *         "studCredUnits": 204,
 *         "TLC": 3,
 *         "TLCM": 3.7
 *       },
 *       {
 *         "id": 38,
 *         "subjectCode": "CMSC127",
 *         "subjectID": 218,
 *         "teachingLoadCreds": 6,
 *         "noOfStudents": 34,
 *         "hoursPerWeek": 1,
 *         "sectionCode": "C",
 *         "room": "PCLAB1",
 *         "courseCred": 1,
 *         "studCredUnits": 34,
 *         "TLC": 1,
 *         "TLCM": 1
 *       }
 *    ],
 *     "total": 2,
 *     "limit": 2,
 *     "page": 8,
 *     "pages": 8
 *  }
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
 * HTTP/1.1 404 Subjects not found
 * {
 *   "status": 404,
 *   "message": "Subjects not found"
 * }
 */
router.get('/subject/', async (req, res) => {
  try {
    req.session.user.acctType === 'USER'
      ? (req.query.userID = req.session.user.userID)
      : '';
    const subjects = await Ctrl.getSubjects(req.query);
    let computedSubjects = [];
    subjects.map(async subject => {
      computedSubjects.push(await Ctrl.computeSubject(subject));
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched subjects',
      data: computedSubjects,
      total: (await Ctrl.getTotalSubjects(req.query)).total,
      limit: req.query.limit || 12,
      page: req.query.page || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalSubjects(req.query, req.query.userID)).total /
          (req.query.limit || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Subject/s not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
