import { Router } from 'express';
import * as Ctrl from './controller';
import { upload, unlink } from './../../utils';

const router = Router();
/**
 * @api {post} /research addResearch
 * @apiGroup Research
 * @apiName addResearch
 *
 * @apiParam (Body Params) {Number} id of fsr
 * @apiParam (Body Params) {Number} researchID ID of research
 * @apiParam (Body Params) {String} type type of research
 * @apiParam (Body Params) {String} role role of research
 * @apiParam (Body Params) {String} title title of research
 * @apiParam (Body Params) {Date} startDate start date of research
 * @apiParam (Body Params) {Date} endDate end date of research
 * @apiParam (Body Params) {String} funding funding of research
 * @apiParam (Body Params) {String} approvedUnits approved units of research
 * @apiParam (Body Params) {File} [filepath] filepath
 *
 * @apiSuccess {Object} research Successfully added research
 * @apiSuccess {String} research.researchID ID of research
 * @apiSuccess {String} research.id ID of fsr
 * @apiSuccess {String} research.type type of research
 * @apiSuccess {String} research.role role of research
 * @apiSuccess {String} research.title title of research
 * @apiSuccess {Date} research.startDate start date of research
 * @apiSuccess {Date} research.endDate end date of research
 * @apiSuccess {String} research.funding funding of research
 * @apiSuccess {String} research.approvedUnits approved units of research
 * @apiSuccess {String} research.filepath filepath
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully created research",
 *     "data":
 *         {
 *           "id": 1,
 *           "researchID": 92,
 *           "type": "annyeonglol",
 *           "role": "role1",
 *           "title": "title",
 *           "startDate": "2013-01-31T16:00:00.000Z",
 *           "endDate": "2015-01-31T16:00:00.000Z",
 *           "funding": "fund",
 *           "approvedUnits": "20",
 *           "filepath": "/uploads/researches/gold-Hk9N-l2sf.png"
 *         }
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

router.post('/research/', async (req, res) => {
  try {
    if (req.files && req.files.filepath)
      req.body.filepath = await upload(req.files.filepath, 'researches');
    const researchID = await Ctrl.addResearch(req.body);
    const research = await Ctrl.getResearch({ researchID });
    res.status(200).json({
      status: 200,
      message: 'Successfully created research',
      data: research,
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
 * @api {get} /research/:researchID getResearch
 * @apiGroup Research
 * @apiName getResearch
 *
 * @apiParam (Query Params) {Number} researchID id of research
 *
 * @apiSuccess {Object} research Successfully fetched research
 * @apiSuccess {Number} research.id ID of fsr
 * @apiSuccess {Number} research.researchID ID of research
 * @apiSuccess {String} research.type type of research
 * @apiSuccess {String} research.role role of research
 * @apiSuccess {String} research.title title of research
 * @apiSuccess {Date} research.startDate start date of research
 * @apiSuccess {Date} research.endDate end date of research
 * @apiSuccess {String} research.funding funding of research
 * @apiSuccess {String} research.approvedUnits approved units of research
 * @apiSuccess {String} research.filepath filepath
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *   "status": 200,
 *   "message": "Successfully fetched research",
 *   "data":
 *       {
 *           "id": 1,
 *           "researchID": 1,
 *           "type": "Implementation",
 *           "role": "Sample Role",
 *           "title": "Sample Title",
 *           "startDate": "2017-10-20T16:00:00.000Z",
 *           "endDate": null,
 *           "funding": "Sample Funding",
 *           "approvedUnits": "6",
 *           "filepath": "/uploads/researches/gold-Hk9N-l2sf.png"
 *
 *       }
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
 * HTTP/1.1 404 FSR not found
 * {
 *   "status": 404,
 *   "message": "Research not found"
 * }
 */
router.get('/research/:researchID', async (req, res) => {
  try {
    const research = await Ctrl.getResearch(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched research',
      data: research,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /research getResearches
 * @apiGroup Research
 * @apiName getResearches
 *
 * @apiParam (Query Params) {Number} [id] of fsr
 * @apiParam (Query Params) {Number} [researchID] ID of research
 * @apiParam (Query Params) {String} [type] type of research
 * @apiParam (Query Params) {String} [role] role of research
 * @apiParam (Query Params) {String} [title] title of research
 * @apiParam (Query Params) {Date} [startDate] start date of research
 * @apiParam (Query Params) {Date} [endDate] end date of research
 * @apiParam (Query Params) {String} [funding] funding of research
 * @apiParam (Query Params) {String} [approvedUnits] approved units of research
 * @apiParam (Query Params) {File} [filepath] filepath
 * @apiParam (Query Params) {Number} [limit] count limit of researches to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'type'
 * @apiParam (Query Params) {String} [page] page number
 *
 * @apiSuccess {Object} research Successfully fetched researches
 * @apiSuccess {Number} research.id ID of fsr
 * @apiSuccess {Number} research.researchID ID of research
 * @apiSuccess {String} research.type type of research
 * @apiSuccess {String} research.role role of research
 * @apiSuccess {String} research.title title of research
 * @apiSuccess {Date} research.startDate start date of research
 * @apiSuccess {Date} research.endDate end date of research
 * @apiSuccess {String} research.funding funding of research
 * @apiSuccess {String} research.approvedUnits approved units of research
 * @apiSuccess {String} research.filepath filepath
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *   "status": 200,
 *   "message": "Successfully fetched researches",
 *   "data":
 *     [
 *       {
 *           "id": 1,
 *           "researchID": 1,
 *           "type": "Implementation",
 *           "role": "Sample Role",
 *           "title": "Sample Title",
 *           "startDate": "2017-10-20T16:00:00.000Z",
 *           "endDate": null,
 *           "funding": "Sample Funding",
 *           "approvedUnits": "6",
 *           "filepath": "/uploads/researches/gold-Hk9N-l2sf.png"
 *       },
 *       {
 *           "id": 27,
 *           "researchID": 27,
 *           "type": "Implementation",
 *           "role": "Sample Role",
 *           "title": "Sample Title",
 *           "startDate": "2017-12-02T16:00:00.000Z",
 *           "endDate": null,
 *           "funding": "Sample Funding",
 *           "approvedUnits": "4",
 *           "filepath": "/uploads/researches/gold-Hk9N-l2sf.png"
 *       }
 *       ],
 *     "total": 2,
 *     "limit": 12,
 *     "page": 1,
 *     "pages": 1
 *   }
 *
 * @apiError (Error 500) {String} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */
router.get('/research/', async (req, res) => {
  try {
    const researches = await Ctrl.getResearches(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched researches',
      data: researches,
      total: (await Ctrl.getTotalResearches(req.query)).total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalResearches(req.query)).total /
          (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /research/:researchID deleteResearch
 * @apiGroup Research
 * @apiName deleteResearch
 *
 * @apiParam (Query Params) {Number} researchID ID of research
 *
 * @apiSuccess {Object} research Successfully deleted research
 * @apiSuccess {Number} research.id ID of fsr
 * @apiSuccess {Number} research.researchID ID of research
 * @apiSuccess {String} research.type type of research
 * @apiSuccess {String} research.role role of research
 * @apiSuccess {String} research.title title of research
 * @apiSuccess {String} research.startDate start date of research
 * @apiSuccess {String} research.endDate end date of research
 * @apiSuccess {String} research.funding funding of research
 * @apiSuccess {String} research.approvedUnits approved units of research
 * @apiSuccess {String} research.filepath filepath
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "status": 200,
 *      "message": "Successfully deleted research",
 *       "data":
 *       {
 *           "id": 13,
 *           "researchID": 13,
 *           "type": "Implementation",
 *           "role": "Sample Role",
 *           "title": "Sample Title",
 *           "startDate": "2017-11-01T16:00:00.000Z",
 *           "endDate": null,
 *           "funding": "Sample Funding",
 *           "approvedUnits": "5",
 *           "filepath": "/uploads/researches/gold-SJ8tMl3sf.png"
 *       }
 *
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
 * HTTP/1.1 404 FSR not found
 * {
 *   "status": 404,
 *   "message": "Research not found"
 * }
 */
router.delete('/research/:researchID', async (req, res) => {
  try {
    const research = await Ctrl.getResearch(req.params);
    await Ctrl.deleteResearch(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted research',
      data: research,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {put} /research/:researchID updateResearch
 * @apiGroup Research
 * @apiName updateResearch
 *
 * @apiParam (Query Params) {Number} researchID id of research
 *
 * @apiParam (Body Params) {Number} [id] ID of fsr
 * @apiParam (Body Params) {String} [type] type of research
 * @apiParam (Body Params) {String} [role] role of research
 * @apiParam (Body Params) {String} [title] title of research
 * @apiParam (Body Params) {Date} [startDate] start date of research
 * @apiParam (Body Params) {Date} [endDate] end date of research
 * @apiParam (Body Params) {String} [funding] funding of research
 * @apiParam (Body Params) {String} [approvedUnits] approved units of research
 * @apiParam (Body Params) {File} [filepath] filepath
 *
 * @apiSuccess {Object} research Successfully updated research
 * @apiSuccess {Number} research.researchID ID of research
 * @apiSuccess {Number} research.id ID of fsr
 * @apiSuccess {String} research.type type of research
 * @apiSuccess {String} research.role role of research
 * @apiSuccess {String} research.title title of research
 * @apiSuccess {Date} research.startDate start date of research
 * @apiSuccess {Date} research.endDate end date of research
 * @apiSuccess {String} research.funding funding of research
 * @apiSuccess {String} research.approvedUnits approved units of research
 * @apiSuccess {String} research.filepath filepath
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "status": 200,
 *      "message": "Successfully updated research",
 *      "data":
 *       {
 *           "id": 1,
 *           "researchID": 17,
 *           "type": "annyeonglol",
 *           "role": "role1",
 *           "title": "title",
 *           "startDate": "2013-01-31T16:00:00.000Z",
 *           "endDate": "2015-01-31T16:00:00.000Z",
 *           "funding": "fund",
 *           "approvedUnits": "20",
 *           "filepath": "/uploads/researches/gold-SJ8tMl3sf.png"
 *       }
 *   }
 *
 * @apiError (Error 500) {String} statuc status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */
router.put('/research/:researchID', async (req, res) => {
  try {
    if (req.files && req.files.filepath) {
      const research = await Ctrl.getResearch(req.params);

      if (research.filepath) await unlink(research.filepath);
      req.body.filepath = await upload(req.files.filepath, 'researches');
    }
    await Ctrl.updateResearch(req.params, req.body);
    const research = await Ctrl.getResearch(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated research',
      data: research,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
