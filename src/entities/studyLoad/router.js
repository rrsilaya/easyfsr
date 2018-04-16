import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /studyLoad addStudyLoad
 * @apiGroup Study Load
 * @apiName addStudyLoad
 *
 * @apiParam (Body Params) {Number} id ID of fsr
 * @apiParam (Body Params) {Boolean} [fullLeaveWithPay] full leave with pay of study load
 * @apiParam (Body Params) {Boolean} [fellowshipRecipient] fellowship recipient of study load
 * @apiParam (Body Params) {String} degree degree of study load
 * @apiParam (Body Params) {String} university university of study load
 * @apiParam (Body Params) {Number} totalSLcredits total credits of study load
 *
 * @apiSuccess {Object} data new Study Load created
 * @apiSuccess {Number} data.id FSR ID and ID of Study Load
 * @apiSuccess {Boolean} data.fullLeaveWithPay full leave with pay of study load
 * @apiSuccess {Boolean} data.fellowshipRecipient fellowship recipient of study load
 * @apiSuccess {String} data.degree degree of study load
 * @apiSuccess {String} data.university university of study load
 * @apiSuccess {Number} data.totalSLcredits total credits of study load
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully created studyLoad"
 *     "data":
 *       {
 *           "fullLeaveWithPay: "NO",
 *           "fellowshipRecipient: "NO",
 *           "degree": "BSCS",
 *           "courseNumber": "128",
 *           "university": "UPLB",
 *           "totalSLcredits": 3,
 *           "id": 1
 *       }
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

router.post('/studyLoad/', async (req, res) => {
  try {
    const id = await Ctrl.addStudyLoad(req.body);
    const studyLoad = await Ctrl.getStudyLoad({ id });
    res.status(200).json({
      status: 200,
      message: 'Successfully created studyLoad',
      data: studyLoad,
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
 * @api {put} /studyLoad/:id updateStudyLoad
 * @apiGroup Study Load
 * @apiName updateStudyLoad
 *
 * @apiParam (Body Params) {Boolean} [fullLeaveWithPay] full leave with pay of study load
 * @apiParam (Body Params) {Boolean} [fellowshipRecipient] fellowship recipient of study load
 * @apiParam (Body Params) {String} [degree] degree of study load
 * @apiParam (Body Params) {String} [university] university of study load
 * @apiParam (Body Params) {Number} [totalSLcredits] total credits of study load
 *
 * @apiSuccess {Object} data Study Load updated
 * @apiSuccess {Number} data.id FSR ID and ID of Study Load
 * @apiSuccess {Boolean} data.fullLeaveWithPay full leave with pay of study load
 * @apiSuccess {Boolean} data.fellowshipRecipient fellowship recipient of study load
 * @apiSuccess {String} data.degree degree of study load
 * @apiSuccess {String} data.university university of study load
 * @apiSuccess {Number} data.totalSLcredits total credits of study loadNumber
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully updated studyLoad"
 *     "data":
 *       {
 *           "fullLeaveWithPay: "NO",
 *           "fellowshipRecipient: "NO",
 *           "degree": "BSCS",
 *           "courseNumber": "128",
 *           "university": "UPLB",
 *           "totalSLcredits": 3,
 *           "id": 1
 *       }
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
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 studyLoad not found
 * {
 *   "status": 404,
 *   "message": "studyLoad not found"
 * }
 */

router.put('/studyLoad/:id', async (req, res) => {
  try {
    await Ctrl.updateStudyLoad(req.params, req.body);
    const studyLoad = await Ctrl.getStudyLoad(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated studyLoad',
      data: studyLoad,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'studyLoad not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /studyLoad/:id deleteStudyLoad
 * @apiGroup Study Load
 * @apiName deleteStudyLoad
 *
 * @apiParam (Query Params) {Number} id ID of Study Load
 *
 * @apiSuccess {Object} data Study Load deleted
 * @apiSuccess {Number} data.id FSR ID and ID of Study Load
 * @apiSuccess {Boolean} data.fullLeaveWithPay full leave with pay of study load
 * @apiSuccess {Boolean} data.fellowshipRecipient fellowship recipient of study load
 * @apiSuccess {String} data.degree degree of study load
 * @apiSuccess {String} data.university university of study load
 * @apiSuccess {Number} data.totalSLcredits total credits of study load
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully deleted studyLoad"
 *     "data":
 *       {
 *           "fullLeaveWithPay: "NO",
 *           "fellowshipRecipient: "NO",
 *           "degree": "BSCS",
 *           "courseNumber": "128",
 *           "university": "UPLB",
 *           "totalSLcredits": 3,
 *           "id": 1
 *       }
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
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 studyLoad not found
 *   {
 *     "status": 404,
 *     "message": "studyLoad not found"
 *   }
 */

router.delete('/studyLoad/:id', async (req, res) => {
  try {
    const studyLoad = await Ctrl.getStudyLoad(req.params);
    await Ctrl.deleteStudyLoad(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted studyLoad',
      data: studyLoad,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'studyLoad not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /studyLoad/:id getStudyLoad
 * @apiGroup Study Load
 * @apiName getStudyLoad
 *
 * @apiParam (Query Params) {Number} id ID of Study Load
 *
 * @apiSuccess {Object} studyLoad Study Load fetched
 * @apiSuccess {Number} data.id FSR ID and ID of Study Load
 * @apiSuccess {Boolean} data.fullLeaveWithPay full leave with pay of study load
 * @apiSuccess {Boolean} data.fellowshipRecipient fellowship recipient of study load
 * @apiSuccess {String} data.degree degree of study load
 * @apiSuccess {String} data.university university of study load
 * @apiSuccess {Number} data.totalSLcredits total credits of study load
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully fetched studyLoad",
 *     "data":
 *       {
 *           "fullLeaveWithPay: "NO",
 *           "fellowshipRecipient: "NO",
 *           "degree": "BSCS",
 *           "courseNumber": "128",
 *           "university": "UPLB",
 *           "totalSLcredits": 3,
 *           "id": 1
 *       }
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
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 studyLoad not found
 * {
 *   "status": 404,
 *   "message": "studyLoad not found"
 * }
 */

router.get('/studyLoad/:id', async (req, res) => {
  try {
    const studyLoad = await Ctrl.getStudyLoad(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched studyLoad',
      data: studyLoad,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'studyLoad not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /studyLoad getStudyLoads
 * @apiGroup Study Load
 * @apiName getStudyLoads
 *
 * @apiParam (Query Params) {String} [id] id of study load
 * @apiParam (Query Params) {String} [fullLeaveWithPay] full leave with pay of study load
 * @apiParam (Query Params) {String} [fellowshipRecipient] fellowship recipient of study load
 * @apiParam (Query Params) {String} [degree] degree of study load
 * @apiParam (Query Params) {String} [university] university of study load
 * @apiParam (Query Params) {Number} [totalSLCredits] total credits of study load
 * @apiParam (Query Params) {Number} [page] page number
 * @apiParam (Query Params) {Number} [limit] count limit of study loads to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'degree'
 *
 * @apiSuccess {Object[]} data Study loads fetched
 * @apiSuccess {Number} data.id FSR ID and ID of Study Load
 * @apiSuccess {Boolean} data.fullLeaveWithPay full leave with pay of study load
 * @apiSuccess {Boolean} data.fellowshipRecipient fellowship recipient of study load
 * @apiSuccess {String} data.degree degree of study load
 * @apiSuccess {String} data.university university of study load
 * @apiSuccess {Number} data.totalSLcredits total credits of study load
 * @apiSuccess {Number} total Total amount of documents.
 * @apiSuccess {Number} limit Max number of documents
 * @apiSuccess {Number} page nth page this query is.
 * @apiSuccess {Number} pages Number of total pages.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully fetched studyLoads",
 *     "data":[
 *       {
 *           "fullLeaveWithPay: "NO",
 *           "fellowshipRecipient: "NO",
 *           "degree": "BSCS",
 *           "courseNumber": "128",
 *           "university": "UPLB",
 *           "totalSLcredits": 3,
 *           "id": 1
 *       },
 *       {
 *           "fullLeaveWithPay: "NO",
 *           "fellowshipRecipient: "NO",
 *           "degree": "BSCS",
 *           "courseNumber": "128",
 *           "university": "UPLB",
 *           "totalSLcredits": 9,
 *           "id": 2
 *       },
 *    ],
 *    "total": 2,
 *    "limit": 12,
 *    "page": 1,
 *    "pages": 1
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

router.get('/studyLoad/', async (req, res) => {
  try {
    const studyLoads = await Ctrl.getStudyLoads(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched studyLoads',
      data: studyLoads,
      total: (await Ctrl.getTotalStudyLoad(req.query)).total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalStudyLoad(req.query)).total /
          (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'studyLoad/s not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
