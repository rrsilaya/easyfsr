import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {get} /user/:employeeID/award getUserAwards
 * @apiGroup UserView
 * @apiName getUserAwards
 *
 * @apiParam (Query Params) {Number} employeeID ID of UserView
 *
 * @apiSuccess {Object} userView User View award fetched
 * @apiSuccess {Number} userView.employeeID ID of UserView
 * @apiSuccess {String} userView.grantF grantf of UserView
 * @apiSuccess {String} userView.chairGrantTitle chair grant title of UserView
 * @apiSuccess {String} userView.collegeHasNominated which college nominated the UserView
 * @apiSuccess {String} userView.recipientOrNominee recipient or nominee of UserView
 * @apiSuccess {String} userView.professionalChair professional chair of UserView
 * @apiSuccess {Date} userView.approvedStartDate approved start date of UserView
 * @apiSuccess {Date} userView.endDate end date of UserView
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *       "status": 200,
 *       "message": "Successfully fetched awards of user",
 *       "data": [
 *           {
 *               "employeeID": "1000335121",
 *               "grantF": "Sample Grant",
 *               "chairGrantTitle": "Sample Grant Title",
 *               "collegeHasNominated": "YES",
 *               "recipientOrNominee": "Recipient",
 *               "professionalChair": "Sample Chair",
 *               "approvedStartDate": "2017-10-26T16:00:00.000Z",
 *               "endDate": "2018-03-26T16:00:00.000Z"
 *           },
 *           {
 *               "employeeID": "1000335121",
 *               "grantF": "Sample Grant",
 *               "chairGrantTitle": "Sample Grant Title",
 *               "collegeHasNominated": "YES",
 *               "recipientOrNominee": "Recipient",
 *               "professionalChair": "Sample Chair",
 *               "approvedStartDate": "2017-07-01T16:00:00.000Z",
 *               "endDate": "2018-01-26T16:00:00.000Z"
 *           }
 *       ]
 *   }
 * @apiError (Error 500) {String} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error while getting usre awards"
 *   }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 User not found
 * {
 *   "status": 404,
 *   "message": "User not found"
 * }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 403 Unauthorized Access
 * {
 *   "status": 403,
 *   "message": "Unauthorized access"
 * }
 */

router.get('/user/:employeeID/award', async (req, res) => {
  try {
    const awards = await Ctrl.getUserAwards(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched awards of user',
      data: awards,
    });
  } catch (err) {
    res.status(status).json({
      status,
      message: 'Internal server error while getting user awards',
    });
  }
});
/**
 * @api {get} /user/:employeeID/research getUserResearch
 * @apiGroup UserView
 * @apiName getUserResearch
 *
 * @apiParam (Query Params) {String} employeeID ID of UserView
 *
 * @apiSuccess {Object} userView User View research fetched
 * @apiSuccess {Number} userView.employeeID ID of UserView
 * @apiSuccess {String} userView.type type of UserView
 * @apiSuccess {String} userView.role role of UserView
 * @apiSuccess {String} userView.title title of UserView
 * @apiSuccess {Date} userView.startDate start date of UserView
 * @apiSuccess {Date} userView.endDate end date of UserView
 * @apiSuccess {String} userView.funding funding of UserView
 * @apiSuccess {String} userView.approvedUnits approved units of UserView
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *       "status": 200,
 *       "message": "Successfully fetched research of user",
 *       "data": [
 *           {
 *               "employeeID": "1000335121",
 *               "type": "Implementation",
 *               "role": "Sample Role",
 *               "title": "Sample Title",
 *               "startDate": "2017-10-20T16:00:00.000Z",
 *               "endDate": null,
 *               "funding": "Sample Funding",
 *               "approvedUnits": "6"
 *           },
 *           {
 *               "employeeID": "1000335121",
 *               "type": "Proposal",
 *               "role": "Sample Role",
 *               "title": "Sample Title",
 *               "startDate": "2017-07-05T16:00:00.000Z",
 *               "endDate": null,
 *               "funding": "Sample Funding",
 *               "approvedUnits": "6"
 *           }
 *       ]
 *   }
 * @apiError (Error 500) {String} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error while getting user research"
 *   }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 User not found
 * {
 *   "status": 404,
 *   "message": "User not found"
 * }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 403 Unauthorized Access
 * {
 *   "status": 403,
 *   "message": "Unauthorized access"
 * }
 */

router.get('/user/:employeeID/research', async (req, res) => {
  try {
    const research = await Ctrl.getUserResearch(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched research of user',
      data: research,
    });
  } catch (err) {
    res.status(status).json({
      status,
      message: 'Internal server error while getting user research',
    });
  }
});

/**
 * @api {get} /user/:employeeID/adminWork  getUserAdminWork
 * @apiGroup UserView
 * @apiName getUserAdminWork
 *
 * @apiParam (Query Params) {Nuumber} employeeID ID of UserView
 *
 * @apiSuccess {Object} UserView User View adminWork fetched
 * @apiSuccess {Number} UserView.employeeID ID of UserView
 * @apiSuccess {String} UserView.position position of UserView
 * @apiSuccess {String} UserView.officeUnit office unit of UserView
 * @apiSuccess {Number} UserView.approvedUnits approved units of UserView
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *       "status": 200,
 *       "message": "Successfully fetched admin works of user",
 *       "data":
 *           {
 *               "employeeID": "1000335121",
 *               "position": "Administrative Aide",
 *               "officeUnit": "Institute of Computer Science",
 *               "approvedUnits": 6
 *           },
 *           {
 *               "employeeID": "1000335121",
 *               "position": "Administrative Aide",
 *               "officeUnit": "Institute of Computer Science",
 *               "approvedUnits": 5
 *           }
 *   }
 * @apiError (Error 500) {String} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error while getting user admin works"
 *   }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 User not found
 * {
 *   "status": 404,
 *   "message": "User not found"
 * }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 403 Unauthorized Access
 * {
 *   "status": 403,
 *   "message": "Unauthorized access"
 * }
 */

router.get('/user/:employeeID/adminWork', async (req, res) => {
  try {
    const adminWorks = await Ctrl.getUserAdminWork(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched admin works of user',
      data: adminWorks,
    });
  } catch (err) {
    res.status(status).json({
      status,
      message: 'Internal server error while getting user admin works',
    });
  }
});

/**
 * @api {get} /user/:employeeID/studyLoad  getUserStudyLoad
 * @apiGroup UserView
 * @apiName getUserStudyLoad
 *
 * @apiParam (Query Params) {Number} employeeID ID of UserView
 *
 * @apiSuccess {Object} UserView User View adminWork fetched
 * @apiSuccess {Number} UserView.employeeID ID of UserView
 * @apiSuccess {String} UserView.degree degree of UserView
 * @apiSuccess {String} UserView.university university of UserView
 * @apiSuccess {Boolean} UserView.fullLeaveWithPay full leave with pay of UserView
 * @apiSuccess {Boolean} UserView.fellowshipRecipient fellowship recipient of UserView
 * @apiSuccess {Number} UserView.totalSLcredits total credits of UserView
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *       "status": 200,
 *       "message": "Successfully fetched study loads of user",
 *       "data": [
 *           {
 *               "employeeID": "1000335121",
 *               "degree": "MSCS",
 *               "university": "UPLB",
 *               "fullLeaveWithPay": 0,
 *               "fellowshipRecipient": 0,
 *               "totalSLcredits": 2
 *           },
 *           {
 *               "employeeID": "1000335121",
 *               "degree": "MIT",
 *               "university": "UPD",
 *               "fullLeaveWithPay": 0,
 *               "fellowshipRecipient": 0,
 *               "totalSLcredits": 1
 *           }
 *       ]
 *   }
 * @apiError (Error 500) {String} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error while getting user study loads"
 *   }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 User not found
 * {
 *   "status": 404,
 *   "message": "User not found"
 * }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 403 Unauthorized Access
 * {
 *   "status": 403,
 *   "message": "Unauthorized access"
 * }
 */
router.get('/user/:employeeID/studyLoad', async (req, res) => {
  try {
    const studyLoad = await Ctrl.getUserStudyLoad(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched study loads of user',
      data: studyLoad,
    });
  } catch (err) {
    res.status(status).json({
      status,
      message: 'Internal server error while getting user admin works',
    });
  }
});

/**
 * @api {get} /user/:employeeID/schedule  getUserSchedule
 * @apiGroup UserView
 * @apiName getUserSchedule
 *
 * @apiParam (Query Params) {Number} employeeID ID of UserView
 *
 * @apiSuccess {Object} UserView User View adminWork fetched
 * @apiSuccess {Number} UserView.employeeID ID of UserView
 * @apiSuccess {Number} UserView.subjectCode subject code of UserView
 * @apiSuccess {Number} UserView.teachingLoadCreds teaching load of UserView
 * @apiSuccess {Number} UserView.noOfStudents number of students of UserView
 * @apiSuccess {Number} UserView.hoursPerWeek number of hours per week of UserView
 * @apiSuccess {String} UserView.room room of UserView
 * @apiSuccess {String} UserView.day day assigned to UserView
 * @apiSuccess {Time} UserView.timeStart starting time of UserView
 * @apiSuccess {Time} UserView.timeEnd dismissal time of UserView
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *       "status": 200,
 *       "message": "Successfully fetched schedule",
 *       "data": [
 *           {
 *               "employeeID": "1000335121",
 *               "subjectCode": "CMSC11",
 *               "teachingLoadCreds": 4,
 *               "noOfStudents": 44,
 *               "hoursPerWeek": 4,
 *               "room": "ICSMH",
 *               "day": "Tuesday",
 *               "timeStart": "07:00:00",
 *               "timeEnd": "08:00:00"
 *           },
 *           {
 *               "employeeID": "1000335121",
 *               "subjectCode": "CMSC137",
 *               "teachingLoadCreds": 5,
 *               "noOfStudents": 71,
 *               "hoursPerWeek": 3,
 *               "room": "PCLAB2",
 *               "day": "Wednesday",
 *               "timeStart": "09:00:00",
 *               "timeEnd": "10:00:00"
 *           }
 *       ]
 *   }
 * @apiError (Error 500) {String} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error while getting user schedule"
 *   }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 User not found
 * {
 *   "status": 404,
 *   "message": "User not found"
 * }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 403 Unauthorized Access
 * {
 *   "status": 403,
 *   "message": "Unauthorized access"
 * }
 */

router.get('/user/:employeeID/schedule', async (req, res) => {
  try {
    const subjects = await Ctrl.getUserSubject(req.params);
    const consultationHours = await Ctrl.getUserConsultationHours(req.params);
    const courses = await Ctrl.getUserSLCourse(req.params);
    const schedule = [...subjects, ...consultationHours, ...courses];
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched schedule',
      data: schedule,
    });
  } catch (err) {
    res.status(status).json({
      status,
      message: 'Internal server error while getting user schedule',
    });
  }
});

/**
 * @api {get} /user/:employeeID/extensionAndCommunityService  getUserExtensionAndCommunityService
 * @apiGroup UserView
 * @apiName getUserExtensionAndCommunityService
 *
 * @apiParam (Query Params) {Number} employeeID ID of UserView
 *
 * @apiSuccess {Object} UserView User View adminWork fetched
 * @apiSuccess {Number} UserView.employeeID ID of UserView
 * @apiSuccess {String} UserView.participant participant of UserView
 * @apiSuccess {String} UserView.role role o UserView
 * @apiSuccess {Number} UserView.hours hours of UserView
 * @apiSuccess {String} UserView.title title of UserView
 * @apiSuccess {Number} UserView.creditUnit creditUnit of UserView
 * @apiSuccess {String} UserView.type type of UserView
 * @apiSuccess {Date} UserView.startdate startdate of UserView
 * @apiSuccess {Date} UserView.enddate enddate of UserView
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *       "status": 200,
 *       "message": "Successfully fetched extension and community service of user",
 *       "data": [
 *           {
 *               "employeeID": "1000335121",
 *               "participant": "10",
 *               "role": "Speaker",
 *               "hours": 29,
 *               "title": "Sample Title",
 *               "creditUnit": 4,
 *               "type": "Workshop",
 *               "startDate": "2017-03-07T16:00:00.000Z",
 *               "endDate": "2018-05-02T16:00:00.000Z"
 *           },
 *           {
 *               "employeeID": "1000335121",
 *               "participant": "1",
 *               "role": "Volunteer",
 *               "hours": 45,
 *               "title": "Sample Title",
 *               "creditUnit": 5,
 *               "type": "Symposium",
 *               "startDate": "2017-05-02T16:00:00.000Z",
 *               "endDate": "2018-03-17T16:00:00.000Z"
 *           }
 *       ]
 *   }
 * @apiError (Error 500) {String} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error while getting user extension and community service"
 *   }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 User not found
 * {
 *   "status": 404,
 *   "message": "User not found"
 * }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 403 Unauthorized Access
 * {
 *   "status": 403,
 *   "message": "Unauthorized access"
 * }
 */

router.get(
  '/user/:employeeID/extensionAndCommunityService',
  async (req, res) => {
    try {
      const extensionAndCommunityService = await Ctrl.getUserExtensionAndCommunityService(
        req.params,
      );
      res.status(200).json({
        status: 200,
        message: 'Successfully fetched extension and community service of user',
        data: extensionAndCommunityService,
      });
    } catch (err) {
      res.status(status).json({
        status,
        message:
          'Internal server error while getting user extension and community service',
      });
    }
  },
);

/**
 * @api {get} /user/:employeeID/limitedPracticeOfProf  getUserLimitedPractice
 * @apiGroup UserView
 * @apiName getUserLimitedPractice
 *
 * @apiParam (Query Params) {Number} employeeID ID of UserView
 *
 * @apiSuccess {Object} UserView User View adminWork fetched
 * @apiSuccess {Number} UserView.employeeID ID of UserView
 * @apiSuccess {String} UserView.askedPermssion Asked permission of UserView. Can be 'YES' OR 'NO'
 * @apiSuccess {Date} UserView.date Date of UserView
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *       "status": 200,
 *       "message": "Successfully fetched limited practices of user",
 *       "data": [
 *           {
 *               "employeeID": "1000335121",
 *               "askedPermission": "NO",
 *               "date": null
 *           },
 *           {
 *               "employeeID": "1000335121",
 *               "askedPermission": "YES",
 *               "date": null
 *           }
 *       ]
 *   }
 * @apiError (Error 500) {String} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error while getting user limited practices"
 *   }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 User not found
 * {
 *   "status": 404,
 *   "message": "User not found"
 * }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 403 Unauthorized Access
 * {
 *   "status": 403,
 *   "message": "Unauthorized access"
 * }
 */

router.get('/user/:employeeID/limitedPracticeOfProf', async (req, res) => {
  try {
    const limitedPracticeOfProf = await Ctrl.getUserLimitedPractice(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched limited practices of user',
      data: limitedPracticeOfProf,
    });
  } catch (err) {
    res.status(status).json({
      status,
      message: 'Internal server error while getting user limited practices',
    });
  }
});

/**
 * @api {get} /user/:employeeID/creativeWork  getUserCreativeWork
 * @apiGroup UserView
 * @apiName getUserCreativeWork
 *
 * @apiParam (Query Params) {Number} employeeID ID of UserView
 *
 * @apiSuccess {Object} UserView User View adminWork fetched
 * @apiSuccess {Date} UserView.date date of UserView
 * @apiSuccess {String} UserView.title title of UserView
 * @apiSuccess {String} UserView.type type of UserView
 * @apiSuccess {Number} UserView.credUnit credit units of UserView
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *       "status": 200,
 *       "message": "Successfully fetched creative works of user",
 *       "data": [
 *           {
 *               "employeeID": "1000335121",
 *               "date": "2018-02-18T16:00:00.000Z",
 *               "title": "Sample Title",
 *               "type": "Book",
 *               "credUnit": 2
 *           },
 *           {
 *               "employeeID": "1000335121",
 *               "date": "2017-10-30T16:00:00.000Z",
 *               "title": "Sample Title",
 *               "type": "ChapterInABook",
 *               "credUnit": 4
 *           }
 *       ]
 *   }
 * @apiError (Error 500) {String} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error while getting user creative works"
 *   }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 User not found
 * {
 *   "status": 404,
 *   "message": "User not found"
 * }
 * @apiError (Error 404) {String} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 403 Unauthorized Access
 * {
 *   "status": 403,
 *   "message": "Unauthorized access"
 * }
 */

router.get('/user/:employeeID/creativeWork', async (req, res) => {
  try {
    const creativeWorks = await Ctrl.getUserCreativeWork(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched creative works of user',
      data: creativeWorks,
    });
  } catch (err) {
    res.status(status).json({
      status,
      message: 'Internal server error while getting user creative works',
    });
  }
});

export default router;
