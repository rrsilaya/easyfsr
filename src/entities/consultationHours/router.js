import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /consultationHours addConsultationHour
 * @apiGroup ConsultationHours
 * @apiName addConsultationHour
 *
 * @apiParam (Body Params) {Number} id ID of FSR
 * @apiParam (Body Params) {String} place place of consultationHour
 * @apiParam (Body Params) {String} day day of consultationHour
 * @apiParam (Body Params) {Time} timeStart timeStart of consultationHour
 * @apiParam (Body Params) {Time} timeEnd timeEnd of consultationHour
 *
 * @apiSuccess {Object} data new Consultation Hour
 * @apiSuccess {Number} data.chID chID of consultationHour
 * @apiSuccess {Number} data.id ID of FSR
 * @apiSuccess {String} data.place place of consultationHour
 * @apiSuccess {String} data.day day of consultationHour
 * @apiSuccess {Time} data.timeStart timeStart of consultationHour
 * @apiSuccess {Time} data.timeEnd timeEnd of consultationHour
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *      "status": 200,
 *      "message": "Successfully created consultation hours",
 *      "data":
 *          {
 *              "chID": 1,
 *              "id": 1,
 *              "place": "C-118",
 *              "day": "Monday",
 *              "timeStart": "11:00:00",
 *              "timeEnd": "12:00:00"
 *          }
 *  }
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

router.post('/consultationHours/', async (req, res) => {
  try {
    const chID = await Ctrl.addConsultationHour(req.body);
    const consultationHour = await Ctrl.getConsultationHour({ chID });
    res.status(200).json({
      status: 200,
      message: 'Successfully created consultation hours',
      data: consultationHour,
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
 * @api {put} /consultationHours/:chID updateConsultationHour
 * @apiGroup ConsultationHours
 * @apiName updateConsultationHour
 *
 * @apiParam (Query Params) {Number} chID chID of consultationHour
 *
 * @apiParam (Body Params) {Number} [id] ID of FSR
 * @apiParam (Body Params) {String} [place] place of consultationHour
 * @apiParam (Body Params) {String} [day] day of consultationHour
 * @apiParam (Body Params) {Time} [timeStart] timeStart of consultationHour
 * @apiParam (Body Params) {Time} [timeEnd] timeEnd of consultationHour
 *
 * @apiSuccess {Object} data Consultation Hour updated
 * @apiSuccess {Number} data.chID chID of consultationHour
 * @apiSuccess {Number} data.id ID of FSR
 * @apiSuccess {String} data.place place of consultationHour
 * @apiSuccess {String} data.day day of consultationHour
 * @apiSuccess {Time} data.timeStart timeStart of consultationHour
 * @apiSuccess {Time} data.timeEnd timeEnd of consultationHour
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *      "status": 200,
 *      "message": "Successfully updated consultation hours",
 *      "data":
 *          {
 *              "chID": 1,
 *              "id": 1,
 *              "place": "C-118",
 *              "day": "Monday",
 *              "timeStart": "11:00:00",
 *              "timeEnd": "12:00:00"
 *          }
 *  }
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
 * HTTP/1.1 404 Consultation Hour not found
 * {
 *   "status": 404,
 *   "message": "Consultation hours details not found"
 * }
 */

router.put('/consultationHours/:chID', async (req, res) => {
  try {
    await Ctrl.updateConsultationHour(req.params, req.body);
    const consultationHour = await Ctrl.getConsultationHour(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully updated consultation hours',
      data: consultationHour,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Consultation hours not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /consultationHours/:chID deleteConsultationHour
 * @apiGroup ConsultationHours
 * @apiName deleteConsultationHour
 *
 * @apiParam (Query Params) {Number} chID chID of consultationHour
 *
 * @apiSuccess {Object} data Consultation Hour deleted
 * @apiSuccess {Number} data.chID chID of consultationHour
 * @apiSuccess {Number} data.id ID of FSR
 * @apiSuccess {String} data.place place of consultationHour
 * @apiSuccess {String} data.day day of consultationHour
 * @apiSuccess {Time} data.timeStart timeStart of consultationHour
 * @apiSuccess {Time} data.timeEnd timeEnd of consultationHour
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *      "status": 200,
 *      "message": "Successfully deleted consultation hours",
 *      "data":
 *          {
 *              "chID": 1,
 *              "id": 1,
 *              "place": "C-118",
 *              "day": "Monday",
 *              "timeStart": "11:00:00",
 *              "timeEnd": "12:00:00"
 *          }
 *  }
 *
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * HTTP/1.1 404 Consultation Hour not found
 * {
 *   "status": 404,
 *   "message": "Consultation hours details not found"
 * }
 * @apiError (Error 500) {Number} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.delete('/consultationHours/:chID', async (req, res) => {
  try {
    const consultationHour = await Ctrl.getConsultationHour(req.params);
    await Ctrl.deleteConsultationHour(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully deleted consultation hours',
      data: consultationHour,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Consultation hours not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /consultationHours/:chID getConsultationHour
 * @apiGroup ConsultationHours
 * @apiName getConsultationHour
 *
 * @apiParam (Query Params) {Number} chID chID of consultationHour
 *
 * @apiSuccess {Object[]} data Consulatation Hours fetched
 * @apiSuccess {Number} data.chID chID of consultationHour
 * @apiSuccess {Number} data.id ID of FSR
 * @apiSuccess {String} data.place place of consultationHour
 * @apiSuccess {String} data.day day of consultationHour
 * @apiSuccess {Time} data.timeStart timeStart of consultationHour
 * @apiSuccess {Time} data.timeEnd timeEnd of consultationHour
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *      "status": 200,
 *      "message": "Successfully fetched consultation hours",
 *      "data":
 *          {
 *              "chID": 1,
 *              "id": 1,
 *              "place": "C-118",
 *              "day": "Monday",
 *              "timeStart": "11:00:00",
 *              "timeEnd": "12:00:00"
 *          }
 *  }
 *
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * HTTP/1.1 404 Consultation Hour not found
 * {
 *   "status": 404,
 *   "message": "Consultation hours details not found"
 * }
 * @apiError (Error 500) {Number} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.get('/consultationHours/:chID', async (req, res) => {
  try {
    const consultationHour = await Ctrl.getConsultationHour(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched consultation hours',
      data: consultationHour,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Consultation hours not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /consultationHours/ getConsultationHours
 * @apiGroup ConsultationHours
 * @apiName getConsultationHours
 *
 * @apiParam (Query Params) {Number} [chID] id of consultation hours
 * @apiParam (Query Params) {Number} [id] id of fsr
 * @apiParam (Query Params) {String} [place] chair grant title of award
 * @apiParam (Query Params) {String} [day] professional chair of award
 * @apiParam (Query Params) {Time} [timeStart] approved start date of award
 * @apiParam (Query Params) {Time} [timeEnd] end date of award
 * @apiParam (Query Params) {Number} [page] page number
 * @apiParam (Query Params) {Number} [limit] count limit of consultationHours to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'day'
 *
 * @apiSuccess {Object} data consulatationHours fetched
 * @apiSuccess {Number} data.chID chID of consultationHour
 * @apiSuccess {Number} data.id ID of FSR
 * @apiSuccess {String} data.place place of consultationHours
 * @apiSuccess {String} data.day day of consultationHours
 * @apiSuccess {Time} data.timeStart timeStart of consultationHours
 * @apiSuccess {Time} data.timeEnd timeEnd of consultationHours
 * @apiSuccess {Number} total Total amount of documents.
 * @apiSuccess {Number} limit Max number of documents
 * @apiSuccess {Number} page nth page this query is.
 * @apiSuccess {Number} pages Number of total pages.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *      "status": 200,
 *      "message": "Successfully fetched consultation hours",
 *      "data":
 *          {
 *              "chID": 1,
 *              "id": 1,
 *              "place": "C-118",
 *              "day": "Monday",
 *              "timeStart": "11:00:00",
 *              "timeEnd": "12:00:00"
 *          },
 *          {
 *              "chID": 2,
 *              "id": 2,
 *              "place": "C-117",
 *              "day": "Tuesday",
 *              "timeStart": "01:00:00",
 *              "timeEnd": "02:00:00"
 *          },
 *      "total": 2,
 *      "limit": 12,
 *      "page": 1,
 *      "pages": 1
 *  }
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

router.get('/consultationHours/', async (req, res) => {
  try {
    const consultationHours = await Ctrl.getConsultationHours(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched consultation hours',
      data: consultationHours,
      total: (await Ctrl.getTotalConsultationHours(req.query)).total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalConsultationHours(req.query)).total /
          (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Consultation hours not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
