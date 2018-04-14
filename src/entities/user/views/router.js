import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {get} /user/:employeeID/award getUserAwards
 * @apiGroup userView
 * @apiName getUserAwards
 *
 * @apiParam (Query Params) {String} employeeID employee ID of user
 *
 * @apiSuccess {Object[]} data Awards fetched
 * @apiSuccess {String} data.employeeID ID of user
 * @apiSuccess {String} data.grantF grantf of user's award
 * @apiSuccess {String} data.chairGrantTitle chair grant title of user's award
 * @apiSuccess {String} data.collegeHasNominated which college nominated the user's award
 * @apiSuccess {String} data.recipientOrNominee recipient or nominee of user's award
 * @apiSuccess {String} data.professionalChair professional chair of user's award
 * @apiSuccess {Date} data.approvedStartDate approved start date of user's award
 * @apiSuccess {Date} data.endDate end date of user's award
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
 * @apiError (Error 500) {Number} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error while getting user awards"
 *   }
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
 * @api {get} /user/:employeeID/research getUserResearches
 * @apiGroup userView
 * @apiName getUserResearches
 *
 * @apiParam (Query Params) {String} employeeID employee ID of user
 *
 * @apiSuccess {Object} data Researches fetched
 * @apiSuccess {String} data.employeeID ID of user
 * @apiSuccess {String} data.type type of user's research
 * @apiSuccess {String} data.role role of user's research
 * @apiSuccess {String} data.title title of user's research
 * @apiSuccess {Date} data.startDate start date of user's research
 * @apiSuccess {Date} data.endDate end date of user's research
 * @apiSuccess {String} data.funding funding of user's research
 * @apiSuccess {String} data.approvedUnits approved units of user's research
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
 * @apiError (Error 500) {Number} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error while getting user researches"
 *   }
 */

router.get('/user/:employeeID/research', async (req, res) => {
  try {
    const research = await Ctrl.getUserResearches(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched researches of user',
      data: research,
    });
  } catch (err) {
    res.status(status).json({
      status,
      message: 'Internal server error while getting user researches',
    });
  }
});

/**
 * @api {get} /user/:employeeID/adminWork  getUserAdminWorks
 * @apiGroup userView
 * @apiName getUserAdminWorks
 *
 * @apiParam (Query Params) {String} employeeID ID of UserView
 *
 * @apiSuccess {Object} data AdminWorks fetched
 * @apiSuccess {String} data.employeeID ID of user
 * @apiSuccess {String} data.position position of user
 * @apiSuccess {String} data.officeUnit office unit of user
 * @apiSuccess {Number} data.approvedUnits approved units of user
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
 * @apiError (Error 500) {Number} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error while getting user admin works"
 *   }
 */

router.get('/user/:employeeID/adminWork', async (req, res) => {
  try {
    const adminWorks = await Ctrl.getUserAdminWorks(req.params);

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
 * @api {get} /user/:employeeID/studyLoad  getUserStudyLoads
 * @apiGroup userView
 * @apiName getUserStudyLoads
 *
 * @apiParam (Query Params) {String} employeeID employee ID of UserView
 *
 * @apiSuccess {Object[]} data Study loads fetched
 * @apiSuccess {String} data.employeeID ID of user
 * @apiSuccess {String} data.degree degree of user
 * @apiSuccess {String} data.university university of user
 * @apiSuccess {Boolean} data.fullLeaveWithPay full leave with pay of user
 * @apiSuccess {Boolean} data.fellowshipRecipient fellowship recipient of user
 * @apiSuccess {Number} data.totalSLcredits total credits of user
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
 * @apiError (Error 500) {Number} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error while getting user study loads"
 *   }
 */

router.get('/user/:employeeID/studyLoad', async (req, res) => {
  try {
    const studyLoad = await Ctrl.getUserStudyLoads(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched study loads of user',
      data: studyLoad,
    });
  } catch (err) {
    res.status(status).json({
      status,
      message: 'Internal server error while getting user study loads',
    });
  }
});

/**
 * @api {get} /user/:employeeID/schedule  getUserSchedules
 * @apiGroup userView
 * @apiName getUserSchedules
 *
 * @apiParam (Query Params) {String} employeeID employee ID of user
 *
 * @apiSuccess {Object[]} data Schedulesfetched
 * @apiSuccess {String} data.employeeID employee ID of user
 * @apiSuccess {Number} data.subjectCode subject code of subject
 * @apiSuccess {Number} data.teachingLoadCreds teaching load of subject
 * @apiSuccess {Number} data.noOfStudents number of students of subject
 * @apiSuccess {Number} data.hoursPerWeek number of hours per week of subject
 * @apiSuccess {String} data.room room of subject
 * @apiSuccess {String} data.day day assigned to subject
 * @apiSuccess {Time} data.timeStart starting time of subject
 * @apiSuccess {Time} data.timeEnd dismissal time of subject
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
 * @apiError (Error 500) {Number} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error while getting user schedule"
 *   }
 */

router.get('/user/:employeeID/schedule', async (req, res) => {
  try {
    const subjects = await Ctrl.getUserSubjects(req.params);
    const consultationHours = await Ctrl.getUserConsultationHours(req.params);
    const courses = await Ctrl.getUserSLCourses(req.params);
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
 * @api {get} /user/:employeeID/extensionAndCommunityService  getUserExtensionAndCommunityServices
 * @apiGroup userView
 * @apiName getUserExtensionAndCommunityServices
 *
 * @apiParam (Query Params) {String} employeeID employee ID of user
 *
 * @apiSuccess {Object} data Services fetched
 * @apiSuccess {String} data.employeeID employee ID of user
 * @apiSuccess {String} data.participant number of participants in user's service
 * @apiSuccess {String} data.role role in user's service
 * @apiSuccess {Number} data.hours hours of user's service
 * @apiSuccess {String} data.title title of user's service
 * @apiSuccess {Number} data.creditUnit creditUnit of user's service
 * @apiSuccess {String} data.type type of user's service
 * @apiSuccess {Date} data.startDate startDate of user's service
 * @apiSuccess {Date} data.endDate endDate of user's service
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
 * @apiError (Error 500) {Number} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error while getting user extension and community service"
 *   }
 */

router.get(
  '/user/:employeeID/extensionAndCommunityService',
  async (req, res) => {
    try {
      const extensionAndCommunityService = await Ctrl.getUserExtensionAndCommunityServices(
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
 * @api {get} /user/:employeeID/limitedPracticeOfProf  getUserLimitedPractices
 * @apiGroup userView
 * @apiName getUserLimitedPractices
 *
 * @apiParam (Query Params) {String} employeeID employee ID of user
 *
 * @apiSuccess {Object[]} data AdminWorks fetched
 * @apiSuccess {String} data.employeeID employee ID of user
 * @apiSuccess {String} dataaskedPermssion Asked permission of user's limited pratice.
 * @apiSuccess {Date} data.date Date of user's limited pratice
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
 * @apiError (Error 500) {Number} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error while getting user limited practices"
 *   }
 */

router.get('/user/:employeeID/limitedPracticeOfProf', async (req, res) => {
  try {
    const limitedPracticeOfProf = await Ctrl.getUserLimitedPractices(
      req.params,
    );

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
 * @api {get} /user/:employeeID/creativeWork  getUserCreativeWorks
 * @apiGroup userView
 * @apiName getUserCreativeWorks
 *
 * @apiParam (Query Params) {String} employeeID employee ID of user
 *
 * @apiSuccess {Object[]} data adminWork fetched
 * @apiSuccess {String} employeeID employee ID of user
 * @apiSuccess {Date} data.date date of admin work
 * @apiSuccess {String} data.title title of admin work
 * @apiSuccess {String} data.type type of admin work
 * @apiSuccess {Number} data.credUnit credit units of admin work
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
 * @apiError (Error 500) {Number} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error while getting user creative works"
 *   }
 */

router.get('/user/:employeeID/creativeWork', async (req, res) => {
  try {
    const creativeWorks = await Ctrl.getUserCreativeWorks(req.params);

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
