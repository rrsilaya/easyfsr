import { Router } from 'express';
import { isAdmin, isHead } from '../../middlewares/middlewares';
import * as Ctrl from './controller';
import { getUsers, getTotalUsers } from './../user/controller';
import { getAdminWorks } from './../adminWork/controller';
import { getAwards } from './../award/controller';
import { getCreativeWorks } from './../creativeWork/controller';
import { getCoursesWithSched } from './../course/controller';
import { getConsultationHours } from './../consultationHours/controller';
import { getExtensionAndCommunityServices } from './../extensionAndCommunityService/controller';
import { getLtdPractOfProfs } from './../limitedPracticeOfProf/controller';
import { getSubjectsWithTimeslot } from './../subject/controller';
import { getStudyLoads } from './../studyLoad/controller';
import { getUserByUserID } from './../user/controller';
import { getResearches } from './../research/controller';
import { getMetaData, getLatestMetaData } from './../meta/controller';
import { addLog } from './../log/controller';

const router = Router();

/**
 * @api {post} /fsr addFSR
 * @apiGroup FSR
 * @apiName addFSR
 * @apiParam (Body Params) {Number[]} users Array of userIDs
 * @apiParam (Body Params) {String} acadYear academic year the fsr is filed
 * @apiParam (Body Params) {String} semester semester the fsr is filed
 * @apiParam (Body Params) {Number} metaID  meta data id
 *
 * @apiSuccess {Object} data new FSR created
 * @apiSuccess {Number} data.id ID of FSR
 * @apiSuccess {Number} data.userID ID of user
 * @apiSuccess {String} data.acadYear academic year the fsr is filed
 * @apiSuccess {String} data.semester semester the fsr is filed
 * @apiSuccess {Boolean} data.isChecked indicates if fsr is approved or not
 * @apiSuccess {Boolean} data.isTurnedIn indicates if fsr is turned in or not
 * @apiSuccess {Number} data.metaID meta data id
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
router.post('/fsr', isAdmin, async (req, res) => {
  try {
    const users = req.body.users;
    const { metaID } = await getLatestMetaData();
    users.map(
      async userID => await Ctrl.addFSR({ userID, ...req.body, metaID }),
    );
    users.forEach(
      async user =>
        await addLog({
          action: 'INSERT_FSR',
          changes: '',
          affectedID: user,
          userID: req.session.user.userID,
        }),
    );

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
    await addLog({
      action: 'DELETE_FSR',
      changes: '',
      affectedID: fsr.id,
      userID: req.session.user.userID,
    });
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

/*
 * @api {get} /fsr/:id getFSR
 * @apiGroup FSR
 * @apiName getFSR
 *
 * @apiParam (Query Params) {Number} id ID of FSR
 *
 * @apiSuccess {Object} data  FSR fetched
 * @apiSuccess {Number} data.user.userID ID of user
 * @apiSuccess {String} data.user.employeeID ID of employee
 * @apiSuccess {String} data.user.password password of employee
 * @apiSuccess {String} data.user.firstName first name of employee
 * @apiSuccess {String} data.user.middleName middle name of employee
 * @apiSuccess {String} data.user.lastName last name of employee
 * @apiSuccess {String} data.user.committee committee of employee, if exists
 * @apiSuccess {Boolean} data.user.isHead indicates if employee is head
 * @apiSuccess {String} data.user.officeNumber office number of employee
 * @apiSuccess {String} data.user.contractType contract type of employee
 * @apiSuccess {String} data.user.emailAddress email address of employee
 * @apiSuccess {String} data.user.rank rank of employee
 * @apiSuccess {Boolean} data.user.isArchived indicates if employee entry is archived
 * @apiSuccess {String} data.user.acctType account type of employee
 * @apiSuccess {String} data.user.profileIcon profileIcon of employee
 *
 * @apiSuccess {Number} data.fsr.id ID of FSR
 * @apiSuccess {Number} data.fsr.userID ID of user
 * @apiSuccess {String} data.fsr.acadYear academic year the fsr is filed
 * @apiSuccess {String} data.fsr.semester semester the fsr is filed
 * @apiSuccess {Boolean} data.fsr.isChecked indicates if fsr is approved or not
 * @apiSuccess {Boolean} data.fsr.isTurnedIn indicates if fsr is turned in or 
 * @apiSuccess {Number} data.fsr.teachingLoadCreds  teaching load credits
 * @apiSuccess {Number} data.fsr.totalCHours total consultation hours
 * @apiSuccess {Number} data.fsr.metaID meta data id
 *
 * @apiSuccess {Number} data.adminWorks.id ID of admin work
 * @apiSuccess {Number} data.adminWorks.id ID of FSR
 * @apiSuccess {String} data.adminWorks.position position of admin work
 * @apiSuccess {String} data.adminWorks.officeUnit office unit of admin work
 * @apiSuccess {Number} data.adminWorks.approvedUnits approved units of admin work
 *
 * @apiSuccess {Number} data.award.awardID awardID of award
 * @apiSuccess {Number} data.award.id ID of fsr
 * @apiSuccess {String} data.award.grantF grantf of award
 * @apiSuccess {String} data.award.chairGrantTitle chair grant title of award
 * @apiSuccess {String} data.award.collegeHasNominated which college nominated the award
 * @apiSuccess {String} data.award.recipientOrNominee recipient or nominee of award
 * @apiSuccess {String} data.award.professionalChair professional chair of award
 * @apiSuccess {Date} data.award.approvedStartDate approved start date of award
 * @apiSuccess {Date} data.award.endDate end date of award
 * @apiSuccess {String} data.award.filepath file path to image of award
 *
 * @apiSuccess {Number} data.creativeWorks.id ID of related FSR
 * @apiSuccess {Number} data.creativeWorks.creativeWorkID ID of creative work
 * @apiSuccess {Date} data.creativeWorks.date date of creative work
 * @apiSuccess {String} data.creativeWorks.title title of creative work
 * @apiSuccess {String} data.creativeWorks.type type of creative work
 * @apiSuccess {Number} data.creativeWorks.credUnit credit units of creative work
 * @apiSuccess {String} data.creativeWorks.filepath filepath
 * @apiSuccess {String} data.creativeWorks.coAuthor co-author/s
 *
 * @apiSuccess {Number} data.researches.researchID ID of research
 * @apiSuccess {Number} data.researches.id ID of fsr
 * @apiSuccess {String} data.researches.type type of research
 * @apiSuccess {String} data.researches.role role of research
 * @apiSuccess {String} data.researches.title title of research
 * @apiSuccess {Date} data.researches.startDate start date of research
 * @apiSuccess {Date} data.researches.endDate end date of research
 * @apiSuccess {String} data.researches.funding funding of research
 * @apiSuccess {String} data.researches.approvedUnits approved units of research
 * @apiSuccess {String} data.researches.filepath filepath
 * @apiSuccess {String} data.researches.coAuthor co-author/s
 *
 * @apiSuccess {Number} data.courses.courseID course ID
 * @apiSuccess {Number} data.courses.hoursPerWeek number of hours of course per week
 * @apiSuccess {String} data.courses.school school course is being taken
 * @apiSuccess {Number} data.courses.credit credit of course
 * @apiSuccess {String} data.courses.courseNumber courseNumber of course
 * @apiSuccess {Number} data.courses.id fsr id
 * @apiSuccess {Number} data.courses.courseSchedID course schedule id
 * @apiSuccess {String} data.courses.day day course is being taught
 * @apiSuccess {Time} data.courses.timeStart time course start
 * @apiSuccess {Time} data.courses.timeEnd time course end
 *
 * @apiSuccess {Number} data.ltdPractices.id ID of fsr
 * @apiSuccess {Number} data.ltdPractices.limitedPracticeOfProfID limitedPracticeOfProfID of limitedPracticeOfProf
 * @apiSuccess {String} data.ltdPractices.askedPermssion Asked permission of limitedPracticeOfProf. Can be 'YES' OR 'NO'
 * @apiSuccess {Date} data.ltdPractices.date Date of limitedPracticeOfProf
 *
 * @apiSuccess {Number} data.subjects.id ID of FSR
 * @apiSuccess {String} data.subjects.subjectCode subject code of subject
 * @apiSuccess {Number} data.subjects.subjectID ID of subject
 * @apiSuccess {Number} data.subjects.teachingLoadCreds teaching load credits of subject
 * @apiSuccess {Number} data.subjects.noOfStudents number of students enrolled in the subject
 * @apiSuccess {Number} data.subjects.hoursPerWeek number of hours per week subject takes up
 * @apiSuccess {String} data.subjects.sectionCode section code of subject
 * @apiSuccess {String} data.subjects.room room where subject is being taught
 * @apiSuccess {Number} data.subjects.timeslotID ID of timeslot
 * @apiSuccess {String} data.subjects.day day assigned to timeslot
 * @apiSuccess {Time} data.subjects.timeStart starting time of timeslot
 * @apiSuccess {Time} data.subjects.timeEnd dismissal time of timeslot
 *
 * @apiSuccess {String} data.studyLoads.degree degree of study load
 * @apiSuccess {String} data.studyLoads.university university of study load
 * @apiSuccess {Number} data.studyLoads.totalSLcredits total credits of study load
 * @apiSuccess {Number} data.studyLoads.id FSR ID and ID of Study Load
 * @apiSuccess {Boolean} data.studyLoads.fullLeaveWithPay full leave with pay of study load
 * @apiSuccess {Boolean} data.studyLoads.fellowshipRecipient fellowship recipient of study load
 *
 * @apiSuccess {Number} data.meta.id id of meta
 * @apiSuccess {String} data.meta.acadYear acad year of meta
 * @apiSuccess {String} data.meta.semester semester of meta
 * @apiSuccess {String} data.meta.universityRegistrar university registrar of meta
 * @apiSuccess {String} data.meta.homeDepartment home Department of meta
 * @apiSuccess {String} data.meta.formRevision form revision of meta 
 * @apiSuccess {String} data.meta.homeCollege home college of meta 
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Successfully fetched fsr",
 *     "data": {
 *         "user": {
 *             "userID": 10,
 *             "employeeID": "1000322226",
 *             "firstName": "Alessandra",
 *             "middleName": "Ratnege",
 *             "lastName": "Newband",
 *             "committee": "Curriculum & Instruction",
 *             "isHead": null,
 *             "officeNumber": "C-113",
 *             "contractType": "FULL-TIME",
 *             "emailAddress": "anewband8@up.edu.ph",
 *             "rank": "Instructor 1",
 *             "isArchived": 0,
 *             "acctType": "USER",
 *             "profileIcon": "/uploads/users/default.png"
 *         },
 *         "fsr": {
 *             "id": 30,
 *             "userID": 10,
 *             "acadYear": "2016-2017",
 *             "semester": "Second",
 *             "isChecked": 0,
 *             "isTurnedIn": 0,
 *             "teachingLoadCreds": 14,
 *             "totalCHours": 0,
 *             "metaID": 1
 *         },
 *         "adminWorks": [
 *             {
 *                 "adminWorkID": 30,
 *                 "position": "Administrative Officer",
 *                 "officeUnit": "Institute of Computer Science",
 *                 "approvedUnits": 6,
 *                 "id": 30
 *             }
 *         ],
 *         "awards": [
 *             {
 *                 "awardID": 30,
 *                 "id": 30,
 *                 "grantF": "Sample Grant",
 *                 "chairGrantTitle": "Sample Grant Title",
 *                 "collegeHasNominated": "YES",
 *                 "recipientOrNominee": "Nominee",
 *                 "professionalChair": "Sample Chair",
 *                 "approvedStartDate": "2017-08-25T16:00:00.000Z",
 *                 "endDate": "2018-04-06T16:00:00.000Z",
 *                 "filepath": null
 *             }
 *         ],
 *         "creativeWorks": [
 *             {
 *                 "id": 30,
 *                 "creativeWorkID": 30,
 *                 "date": "2017-08-01T16:00:00.000Z",
 *                 "title": "Sample Title",
 *                 "type": "Monograph",
 *                 "credUnit": 6,
 *                 "filepath": null,
 *                 "coAuthor": null
 *             }
 *         ],
 *         "researches": [
 *             {
 *                 "id": 30,
 *                 "researchID": 30,
 *                 "type": "Proposal",
 *                 "role": "Sample Role",
 *                 "title": "Sample Title",
 *                 "startDate": "2017-04-20T16:00:00.000Z",
 *                 "endDate": null,
 *                 "funding": "Sample Funding",
 *                 "approvedUnits": "5",
 *                 "filepath": null,
 *                 "coAuthor": null
 *             }
 *         ],
 *         "courses": [
 *             {
 *                 "courseID": 30,
 *                 "hoursPerWeek": "5",
 *                 "school": "CAS",
 *                 "credit": 2,
 *                 "courseNumber": "CMSC 280",
 *                 "id": 30,
 *                 "courseSchedID": 30,
 *                 "day": "Friday",
 *                 "timeStart": "12:00:00",
 *                 "timeEnd": "13:00:00"
 *             }
 *         ],
 *         "consultationHours": [],
 *         "services": [
 *             {
 *                 "id": 30,
 *                 "extAndCommServiceID": 30,
 *                 "participant": 1,
 *                 "role": "Volunteer",
 *                 "hours": 27,
 *                 "title": "Sample Title",
 *                 "creditUnit": 4,
 *                 "type": "Information Dissemination",
 *                 "startDate": "2017-03-05T16:00:00.000Z",
 *                 "endDate": "2018-01-29T16:00:00.000Z"
 *             }
 *         ],
 *         "ltdPractices": [
 *             {
 *                 "limitedPracticeOfProfID": 30,
 *                 "id": 30,
 *                 "askedPermission": "YES",
 *                 "date": null
 *             }
 *         ],
 *         "subjects": [
 *             {
 *                 "id": 30,
 *                 "subjectCode": "CMSC132",
 *                 "subjectID": 30,
 *                 "teachingLoadCreds": 5,
 *                 "noOfStudents": 26,
 *                 "hoursPerWeek": 1,
 *                 "sectionCode": "EF",
 *                 "room": "PCLAB5",
 *                 "timeslotID": 30,
 *                 "day": "Tuesday",
 *                 "timeStart": "12:00:00",
 *                 "timeEnd": "13:00:00"
 *             },
 *             {
 *                 "id": 30,
 *                 "subjectCode": "CMSC57",
 *                 "subjectID": 120,
 *                 "teachingLoadCreds": 3,
 *                 "noOfStudents": 64,
 *                 "hoursPerWeek": 3,
 *                 "sectionCode": "E",
 *                 "room": "PCLAB4",
 *                 "timeslotID": 120,
 *                 "day": "Thursday",
 *                 "timeStart": "16:00:00",
 *                 "timeEnd": "19:00:00"
 *             },
 *             {
 *                 "id": 30,
 *                 "subjectCode": "CMSC170",
 *                 "subjectID": 210,
 *                 "teachingLoadCreds": 6,
 *                 "noOfStudents": 48,
 *                 "hoursPerWeek": 1,
 *                 "sectionCode": "X",
 *                 "room": "PCLAB4",
 *                 "timeslotID": 210,
 *                 "day": "Monday",
 *                 "timeStart": "08:00:00",
 *                 "timeEnd": "09:00:00"
 *             }
 *         ],
 *         "studyLoads": [
 *             {
 *                 "degree": "MIT",
 *                 "university": "UPD",
 *                 "totalSLcredits": 1,
 *                 "id": 90,
 *                 "fullLeaveWithPay": 0,
 *                 "fellowshipRecipient": 0
 *             },
 *             {
 *                 "degree": "DCS",
 *                 "university": "UPD",
 *                 "totalSLcredits": 3,
 *                 "id": 12,
 *                 "fullLeaveWithPay": 0,
 *                 "fellowshipRecipient": 0
 *             },
 *             {
 *                 "degree": "PHDCS",
 *                 "university": "UPD",
 *                 "totalSLcredits": 2,
 *                 "id": 11,
 *                 "fullLeaveWithPay": 0,
 *                 "fellowshipRecipient": 0
 *             },
 *             {
 *                 "degree": "MIT",
 *                 "university": "UPLB",
 *                 "totalSLcredits": 2,
 *                 "id": 10,
 *                 "fullLeaveWithPay": 0,
 *                 "fellowshipRecipient": 0
 *             },
 *             {
 *                 "degree": "MSCS",
 *                 "university": "UPLB",
 *                 "totalSLcredits": 2,
 *                 "id": 9,
 *                 "fullLeaveWithPay": 0,
 *                 "fellowshipRecipient": 0
 *             },
 *             {
 *                 "degree": "DCS",
 *                 "university": "UPD",
 *                 "totalSLcredits": 2,
 *                 "id": 8,
 *                 "fullLeaveWithPay": 0,
 *                 "fellowshipRecipient": 0
 *             },
 *             {
 *                 "degree": "PHDCS",
 *                 "university": "UPD",
 *                 "totalSLcredits": 3,
 *                 "id": 7,
 *                 "fullLeaveWithPay": 0,
 *                 "fellowshipRecipient": 0
 *             },
 *             {
 *                 "degree": "MIT",
 *                 "university": "UPLB",
 *                 "totalSLcredits": 2,
 *                 "id": 6,
 *                 "fullLeaveWithPay": 0,
 *                 "fellowshipRecipient": 0
 *             },
 *             {
 *                 "degree": "MSCS",
 *                 "university": "UPD",
 *                 "totalSLcredits": 2,
 *                 "id": 5,
 *                 "fullLeaveWithPay": 0,
 *                 "fellowshipRecipient": 0
 *             },
 *             {
 *                 "degree": "DCS",
 *                 "university": "UPLB",
 *                 "totalSLcredits": 1,
 *                 "id": 4,
 *                 "fullLeaveWithPay": 0,
 *                 "fellowshipRecipient": 0
 *             },
 *             {
 *                 "degree": "PHDCS",
 *                 "university": "UPD",
 *                 "totalSLcredits": 2,
 *                 "id": 3,
 *                 "fullLeaveWithPay": 0,
 *                 "fellowshipRecipient": 0
 *             },
 *             {
 *                 "degree": "MIT",
 *                 "university": "UPD",
 *                 "totalSLcredits": 1,
 *                 "id": 2,
 *                 "fullLeaveWithPay": 0,
 *                 "fellowshipRecipient": 0
 *             }
 *         ],
 *         "meta": {
 *              "id": 1,
 *              "acadYear": "2017-2018",
 *              "semester": "Second",
 *              "universityRegistrar": "Myrna G. Carandang",
 *              "homeDepartment": "Institute of Computer Science",
 *              "formRevision": "2013-10-24T16:00:00.000Z",
 *              "homeCollege": "CAS"
 *         }
 *     }
 * }
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
router.get('/fsr/:id', isHead, async (req, res) => {
  try {
    let fsr = await Ctrl.getFSR(req.params);
    const adminWorks = await getAdminWorks(req.params);
    const awards = await getAwards(req.params);
    const creativeWorks = await getCreativeWorks(req.params);
    const researches = await getResearches(req.params);
    const courses = await getCoursesWithSched(req.params);
    const consultationHours = await getConsultationHours(req.params);
    const services = await getExtensionAndCommunityServices(req.params);
    const ltdPractices = await getLtdPractOfProfs(req.params);
    const subjects = await getSubjectsWithTimeslot(req.params);
    const studyLoads = await getStudyLoads(req.params);
    const userID = fsr.userID;
    const user = await getUserByUserID({ userID });
    const meta = await getMetaData({ id: fsr.metaID });
    delete user.password;

    fsr = {
      user,
      fsr,
      adminWorks,
      awards,
      creativeWorks,
      researches,
      courses,
      consultationHours,
      services,
      ltdPractices,
      subjects,
      studyLoads,
      meta,
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
 * @apiParam (Query Params) {Number} [id] ID of fsr
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
 * @apiParam (Query Params) {Number} [totalCHours]  total consultation Hours
 * @apiParam (Query Params) {Number} [metaID]  meta data id
 *
 * @apiSuccess {Object[]} data  FSRs fetched
 * @apiSuccess {Number} data.id ID of FSR
 * @apiSuccess {Number} data.userID ID of user
 * @apiSuccess {String} data.acadYear academic year the fsr is filed
 * @apiSuccess {String} data.semester semester the fsr is filed
 * @apiSuccess {Number} data.teachingLoadCreds teaching load credits
 * @apiSuccess {Boolean} data.isChecked indicates if fsr is approved or not
 * @apiSuccess {Boolean} data.isTurnedIn indicates if fsr is turned in or not
 * @apiSuccess {Number} data.totalCHours total consultation hours
 * @apiSuccess {Number} data.metaID meta data id
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
 *            "id": 90,
 *            "userID": 30,
 *            "acadYear": "2016-2017",
 *            "semester": "Second",
 *            "isChecked": 0,
 *            "isTurnedIn": 0,
 *            "teachingLoadCreds": 14,
 *            "totalCHours": 0,
 *            "metaID": 1
 *        },
 *        {
 *            "id": 12,
 *            "userID": 4,
 *            "acadYear": "2016-2017",
 *            "semester": "Second",
 *            "isChecked": 0,
 *            "isTurnedIn": 0,
 *            "teachingLoadCreds": 16,
 *            "totalCHours": 0,
 *            "metaID": 1
 *        }
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
router.get('/fsr', isHead, async (req, res) => {
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
 * @apiParam (Query Params) {Number} [metaID]  meta data id
 *
 * @apiSuccess {Object} data  FSR updated
 * @apiSuccess {Number} data.id ID of FSR
 * @apiSuccess {Number} data.userID ID of user
 * @apiSuccess {String} data.acadYear academic year the fsr is filed
 * @apiSuccess {String} data.semester semester the fsr is filed
 * @apiSuccess {Number} data.teachingLoadCreds  teaching load credits
 * @apiSuccess {Boolean} data.isChecked indicates if fsr is approved or not
 * @apiSuccess {Boolean} data.isTurnedIn indicates if fsr is turned in or not
 * @apiSuccess {Number} data.metaID meta data id
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

router.put('/fsr/:id', isEmployeeAuthorized, async (req, res) => {
  try {
    await Ctrl.updateFSR(req.params, req.body);
    const fsr = await Ctrl.getFSR(req.params);
    await addLog({
      action: 'UPDATE_FSR',
      changes: '',
      affectedID: fsr.id,
      userID: req.session.user.userID,
    });
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
