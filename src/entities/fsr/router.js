import { Router } from 'express';
import * as Ctrl from './controller';
import { getUsers, getTotalUsers } from './../user/controller';
import { getAdminWorks } from './../adminWork/controller';
import { getAwards } from './../award/controller';
import { getCreativeWorks } from './../creativeWork/controller';
import { getCworkCoAuthors } from './../coAuthor/controller';
import { getCourses } from './../course/controller';
import { getCourseScheds } from './../courseSched/controller';
import { getConsultationHours } from './../consultationHours/controller';
import { getExtensionAndCommunityServices } from './../extensionAndCommunityService/controller';
import { getLtdPractOfProfs } from './../limitedPracticeOfProf/controller';
import { getSubjects } from './../subject/controller';
import { addStudyLoad, getStudyLoads } from './../studyLoad/controller';
import { getTimeslots } from './../timeslot/controller';
import { getUserByUserID } from './../user/controller';

const router = Router();

/**
 * @api {post} /fsr addFSR
 * @apiGroup FSR
 * @apiName addFSR
 * @apiParam (Body Params) {Number[]} users Array of userIDs
 * @apiParam (Body Params) {String} acadYear academic year the fsr is filed
 * @apiParam (Body Params) {String} semester semester the fsr is filed
 *
 * @apiSuccess {Object} data new FSR created
 * @apiSuccess {Number} data.id ID of FSR
 * @apiSuccess {Number} data.userID ID of user
 * @apiSuccess {String} data.acadYear academic year the fsr is filed
 * @apiSuccess {String} data.semester semester the fsr is filed
 * @apiSuccess {Boolean} data.isChecked indicates if fsr is approved or not
 * @apiSuccess {Boolean} data.isTurnedIn indicates if fsr is turned in or not
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200;
 *     "message": 'Succesfully created fsr'
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

router.post('/fsr/', async (req, res) => {
  try {
    const users = req.body.users;
    users.map(async userID => await Ctrl.addFSR({ userID, ...req.body }));
    res.status(200).json({
      status: 200,
      message: 'Successfully created fsr for users',
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
 * @api {delete} /fsr/:id deleteFSR
 * @apiGroup FSR
 * @apiName deleteFSR
 *
 * @apiParam (Query Params) {Number} id ID of FSR
 *
 * @apiSuccess {Object} data  FSR deleted
 * @apiSuccess {Number} data.id ID of FSR
 * @apiSuccess {Number} data.userID ID of user
 * @apiSuccess {String} data.acadYear academic year the fsr is filed
 * @apiSuccess {String} data.semester semester the fsr is filed
 * @apiSuccess {Number} data.teachingLoadCreds  teaching load credits
 * @apiSuccess {Boolean} data.isChecked indicates if fsr is approved or not
 * @apiSuccess {Boolean} data.isTurnedIn indicates if fsr is turned in or not
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200;
 *     "message": 'Succesfully deleted fsr'
 *     "data": {
 *         "id": 92,
 *         "userID": 1,
 *         "acadYear": "2018",
 *         "semester": "2",
 *         "teachingLoadCreds": 5
 *         "isChecked": 0,
 *         "isTurnedIn":0
 *      }
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
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 FSR not found
 * {
 *   "status": 404,
 *   "message": "FSR not found"
 * }
 */
router.delete('/fsr/:id', async (req, res) => {
  try {
    const fsr = await Ctrl.getFSR(req.params);
    await Ctrl.deleteFSR(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted fsr',
      data: fsr,
    });
  } catch (status) {
    let message = '';
    switch (status) {
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
 * @api {get} /fsr/:id getFSR
 * @apiGroup FSR
 * @apiName getFSR
 *
 * @apiParam (Query Params) {Number} id ID of FSR
 *
 * @apiSuccess {Object} fsr  FSR fetched
 * @apiSuccess {Number} fsr.id ID of FSR
 * @apiSuccess {Number} fsr.userID ID of user
 * @apiSuccess {String} fsr.acadYear academic year the fsr is filed
 * @apiSuccess {String} fsr.semester semester the fsr is filed
 * @apiSuccess {Number} fsr.teachingLoadCreds  teaching load credits
 * @apiSuccess {Boolean} fsr.isChecked indicates if fsr is approved or not
 * @apiSuccess {Boolean} fsr.isTurnedIn indicates if fsr is turned in or not
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200;
 *     "message": 'Succesfully fetched fsr'
 *     "data": {
 *         "id": 92,
 *         "userID": 1,
 *         "acadYear": "2018",
 *         "semester": "2",
 *         "teachingLoadCreds": 5
 *         "isChecked": 0,
 *         "isTurnedIn":0
 *      }
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
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 FSR not found
 * {
 *   "status": 404,
 *   "message": "FSR not found"
 * }
 */
router.get('/fsr/:id', async (req, res) => {
  try {
    let fsr = await Ctrl.getFSR(req.params);
    const adminWorks = await getAdminWorks(req.params);
    const awards = await getAwards(req.params);
    const creativeWorks = await getCreativeWorks(req.params);
    const cworksWithAuthor = await Promise.all(
      creativeWorks.map(
        async ({ creativeWorkID } = cwork) =>
          await getCworkCoAuthors({ creativeWorkID }),
      ),
    );
    const courses = await getCourses(req.params);
    const coursesWithSched = await Promise.all(
      courses.map(
        async ({ courseID } = course) => await getCourseScheds({ courseID }),
      ),
    );
    const consultationHours = await getConsultationHours(req.params);
    const services = await getExtensionAndCommunityServices(req.params);
    const ltdPractices = await getLtdPractOfProfs(req.params);
    const subjects = await getSubjects(req.params);
    const subjsWithTimeslot = await Promise.all(
      subjects.map(
        async ({ subjectID } = subject) => await getTimeslots({ subjectID }),
      ),
    );
    const studyLoads = await getStudyLoads(req.params);
    const userID = fsr.userID;
    const user = await getUserByUserID({ userID });
    delete user.password;

    fsr = {
      user,
      fsr,
      adminWorks,
      awards,
      cworksWithAuthor,
      coursesWithSched,
      consultationHours,
      services,
      ltdPractices,
      subjsWithTimeslot,
      studyLoads,
    };

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched fsr',
      data: fsr,
    });
  } catch (status) {
    let message = '';
    switch (status) {
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
 * @api {get} /fsr getFSRs
 * @apiGroup FSR
 * @apiName getFSRs
 *
 * @apiParam (Query Params) {Number} [userID] ID of user
 * @apiParam (Query Params) {String} [acadYear] academic year the fsr is filed
 * @apiParam (Query Params) {String} [semester] semester the fsr is filed
 * @apiParam (Query Params) {Number} [teachingLoadCreds] teaching load credits
 * @apiParam (Query Params) {Boolean} [isChecked] indicates if fsr is approved or not
 * @apiParam (Query Params) {Boolean} [isTurnedIn] indicates if fsr is turned in or not
 * @apiParam (Query Params) {Number} [page] page number
 * @apiParam (Query Params) {Number} [limit] count limit of fsrs to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'isChecked'
 *
 * @apiSuccess {Object[]} data  FSRs fetched
 * @apiSuccess {Number} data.id ID of FSR
 * @apiSuccess {Number} data.userID ID of user
 * @apiSuccess {String} data.acadYear academic year the fsr is filed
 * @apiSuccess {String} data.semester semester the fsr is filed
 * @apiSuccess {Number} data.teachingLoadCreds teaching load credits
 * @apiSuccess {Boolean} data.isChecked indicates if fsr is approved or not
 * @apiSuccess {Boolean} data.isTurnedIn indicates if fsr is turned in or not
 * @apiSuccess {Number} total Total amount of documents.
 * @apiSuccess {Number} limit Max number of documents
 * @apiSuccess {Number} page nth page this query is.
 * @apiSuccess {Number} pages Number of total pages.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200;
 *     "message": 'Succesfully fetched FSRs'
 *     "data": [
 *        {
 *            "id": 1,
 *            "userID": 1,
 *            "acadYear": "2017-2018",
 *            "semester": "Second",
 *            "isChecked": 0,
 *            "isTurnedIn":0
 *        },
 *        {
 *            "id": 2,
 *            "userID": 1,
 *            "acadYear": "2017-2018",
 *            "semester": "First",
 *            "isChecked": 0,
 *            "isTurnedIn":0
 *        },
 *      ],
 *     "total": 2,
 *     "limit": 2,
 *     "page": 8,
 *     "pages": 8
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
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 FSR/s not found
 * {
 *   "status": 404,
 *   "message": "FSR/s not found"
 * }
 */

router.get('/fsr', async (req, res) => {
  try {
    const FSRs = await Ctrl.getFSRs(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched FSRs',
      data: FSRs,
      total: (await Ctrl.getTotalFSRs(req.query)).total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalFSRs(req.query)).total /
          (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'FSR/s not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.use('/fsr/:userID', (req, res, next) => {
  const { user } = req.session;
  if (user && (user.acctType === 'ADMIN' || user.userID == req.params.userID)) {
    return next();
  }
  res.status(403).json({
    status: 403,
    message: 'Unauthorized access',
  });
});
/**
 * @api {put} /fsr/:id updateFSR
 * @apiGroup FSR
 * @apiName updateFSR
 *
 * @apiParam (Query Params) {Number} id ID of FSR
 *
 * @apiParam (Body Params) {Number} [userID] ID of user
 * @apiParam (Body Params) {String} [acadYear] academic year the fsr is filed
 * @apiParam (Body Params) {String} [semester] semester the fsr is filed
 * @apiParam (Body Params) {Boolean} [isChecked] indicates if fsr is approved or not
 * @apiParam (Query Params) {Boolean} [isTurnedIn] indicates if fsr is turned in or not
 *
 * @apiSuccess {Object} data  FSR updated
 * @apiSuccess {Number} data.id ID of FSR
 * @apiSuccess {Number} data.userID ID of user
 * @apiSuccess {String} data.acadYear academic year the fsr is filed
 * @apiSuccess {String} data.semester semester the fsr is filed
 * @apiSuccess {Number} data.teachingLoadCreds  teaching load credits
 * @apiSuccess {Boolean} data.isChecked indicates if fsr is approved or not
 * @apiSuccess {Boolean} data.isTurnedIn indicates if fsr is turned in or not
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200;
 *     "message": 'Succesfully updated fsr'
 *     "data": {
 *         "id": 92,
 *         "userID": 1,
 *         "acadYear": "2018",
 *         "semester": "2",
 *         "teachingLoadCreds": 5
 *         "isChecked": 0,
 *          "isTurnedIn":0
 *      }
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
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 FSR not found
 * {
 *   "status": 404,
 *   "message": "FSR not found"
 * }
 */

router.put('/fsr/:id', async (req, res) => {
  try {
    await Ctrl.updateFSR(req.params, req.body);
    const fsr = await Ctrl.getFSR(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully updated fsr',
      data: fsr,
    });
  } catch (status) {
    let message = '';
    switch (status) {
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

export default router;
