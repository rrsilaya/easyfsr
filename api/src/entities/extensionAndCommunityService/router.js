import { Router } from 'express';
import * as Ctrl from './controller';
import {
  getUserIDofFSR,
  getIDofFSRfromService,
} from '../../middlewares/controller';
import { addLog } from './../log/controller';

const router = Router();

/**
 * @api {post} /service addExtensionAndCommunityService
 * @apiGroup ExtensionAndCommunityService
 * @apiName addExtensionAndCommunityService
 *
 * @apiParam (Body Params) {Number} id id of fsr
 * @apiParam (Body Params) {Number} participant number of participants
 * @apiParam (Body Params) {String} role role
 * @apiParam (Body Params) {Number} hours hours spent
 * @apiParam (Body Params) {String} title comminity service title
 * @apiParam (Body Params) {Number} creditUnit credit units of service
 * @apiParam (Body Params) {String} type type of service
 * @apiParam (Body Params) {Date} startDate date the service started
 * @apiParam (Body Params) {Date} endDate date service ended
 *
 * @apiSuccess {Object} data new service created
 * @apiSuccess {Number} data.id id of fsr
 * @apiSuccess {Number} data.extAndCommServiceID id of service
 * @apiSuccess {Number} data.participant participant
 * @apiSuccess {String} data.role role
 * @apiSuccess {Number} data.hours hours of service
 * @apiSuccess {String} data.title title of service
 * @apiSuccess {Number} data.creditUnit creditUnit of service
 * @apiSuccess {String} data.type type of service
 * @apiSuccess {Date} data.startDate start date of service
 * @apiSuccess {Date} data.endDate end date of service
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *    "status": 200,
 *    "message": "Successfully created service",
 *    "data":
 *        {
 *            "id": 1,
 *            "extAndCommServiceID": 1,
 *            "participant": "maniquah",
 *            "role": "wala",
 *            "fundingAgency": "NONE",
 *            "hours": 1,
 *            "title": "tulog",
 *            "creditUnit": 1,
 *            "type": "rest",
 *            "startDate": "010118",
 *            "endDate": "123118"
 *        }
 * }
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

router.post('/service/', async (req, res) => {
  try {
    const userIDofFSR = await getUserIDofFSR(
      req.body.id,
      req.session.user.userID,
    );
    const extAndCommServiceID = await Ctrl.addExtensionAndCommunityService(
      req.body,
    );
    const service = await Ctrl.getExtensionAndCommunityService({
      extAndCommServiceID,
    });
    await addLog({
      action: 'INSERT_SERVICE',
      changes: '',
      affectedID: extAndCommServiceID,
      userID: req.session.user.userID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully created service',
      data: service,
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
 * @api {put} /service/:extAndCommServiceID updateExtensionAndCommunityService
 * @apiGroup ExtensionAndCommunityService
 * @apiName updateExtensionAndCommunityService
 *
 * @apiParam (Query Params) {Number} extAndCommServiceID id of service
 *
 * @apiParam (Body Params) {Number} [id] id of fsr
 * @apiParam (Body Params) {Number} [participant] number of participants
 * @apiParam (Body Params) {String} [role] role
 * @apiParam (Body Params) {Number} [hours] hours spent
 * @apiParam (Body Params) {String}  [title] comminity service title
 * @apiParam (Body Params) {Number} [creditUnit] credit units of service
 * @apiParam (Body Params) {String} [type] type of service
 * @apiParam (Body Params) {Date} [startDate] date the service started
 * @apiParam (Body Params) {Date} [endDate] date service ended
 *
 * @apiSuccess {Object} data  service updated
 * @apiSuccess {Number} data.id id of fsr
 * @apiSuccess {Number} data.extAndCommServiceID id of service
 * @apiSuccess {Number} data.participant participant
 * @apiSuccess {String} data.role role
 * @apiSuccess {Number} data.hours hours of service
 * @apiSuccess {String} data.title title of service
 * @apiSuccess {Number} data.creditUnit creditUnit of service
 * @apiSuccess {String} data.type type of service
 * @apiSuccess {Date} data.startDate start date of service
 * @apiSuccess {Date} data.endDate end date of service
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *    "status": 200,
 *    "message": "Successfully updated service",
 *    "data":
 *        {
 *            "id": 1,
 *            "extAndCommServiceID": 1,
 *            "participant": "ren",
 *            "role": "wala",
 *            "fundingAgency": "NONE",
 *            "hours": 3,
 *            "title": "tulog",
 *            "creditUnit": 1,
 *            "type": "rest",
 *            "startDate": "010118",
 *            "endDate": "123118"
 *        }
 * }
 *
 * @apiError (Error 500) {Number} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Service not found
 *   {
 *     "status": 404,
 *     "message": "Service not found"
 *   }
 */

router.put('/service/:extAndCommServiceID/', async (req, res) => {
  try {
    const idOfService = await getIDofFSRfromService(
      req.params.extAndCommServiceID,
    );
    const userIDofFSR = await getUserIDofFSR(
      idOfService,
      req.session.user.userID,
    );
    await Ctrl.updateExtensionAndCommunityService(req.params, req.body);
    const service = await Ctrl.getExtensionAndCommunityService(req.params);
    await addLog({
      action: 'UPDATE_SERVICE',
      changes: '',
      affectedID: service.extAndCommServiceID,
      userID: req.session.user.userID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully updated service',
      data: service,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'Service not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /service getExtensionAndCommunityServices
 * @apiGroup ExtensionAndCommunityService
 * @apiName getExtensionAndCommunityServices
 *
 * @apiParam (Query Params) {Number} [extAndCommServiceID] id of service
 * @apiParam (Query Params) {Number} [id] id of fsr
 * @apiParam (Query Params) {Number} [participant] number of participants
 * @apiParam (Query Params) {String} [role] role
 * @apiParam (Query Params) {Number} [hours] hours spent
 * @apiParam (Query Params) {String}  [title] comminity service title
 * @apiParam (Query Params) {Number} [creditUnit] credit units of service
 * @apiParam (Query Params) {String} [type] type of service
 * @apiParam (Query Params) {Date} [startDate] date the service started
 * @apiParam (Query Params) {Date} [endDate] date service ended
 * @apiParam (Query Params) {Number} [page] page number
 * @apiParam (Query Params) {Number} [limit] count limit of creative works to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'date'
 *
 * @apiSuccess {Object[]} data  services fetched
 * @apiSuccess {Number} data.id id of fsr
 * @apiSuccess {Number} data.extAndCommServiceID id of service
 * @apiSuccess {Number} data.participant participant
 * @apiSuccess {String} data.role role
 * @apiSuccess {Number} data.hours hours of service
 * @apiSuccess {String} data.title title of service
 * @apiSuccess {Number} data.creditUnit creditUnit of service
 * @apiSuccess {String} data.type type of service
 * @apiSuccess {Date} data.startDate start date of service
 * @apiSuccess {Date} data.endDate end date of service
 * @apiSuccess {Number} total Total amount of documents.
 * @apiSuccess {Number} limit Max number of documents
 * @apiSuccess {Number} page nth page this query is.
 * @apiSuccess {Number} pages Number of total pages.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *    "status": 200,
 *    "message": "Successfully fetched services",
 *    "data": [
 *        {
 *            "id": 1,
 *            "extAndCommServiceID": 1,
 *            "participant": "ren",
 *            "role": "wala",
 *            "fundingAgency": "NONE",
 *            "hours": 3,
 *            "title": "tulog",
 *            "creditUnit": 1,
 *            "type": "rest",
 *            "startDate": "010118",
 *            "endDate": "123118"
 *        },
 *        {
 *            "id": 2,
 *            "extAndCommServiceID": 2,
 *            "participant": "ren",
 *            "role": "wala",
 *            "fundingAgency": "NONE",
 *            "hours": 3,
 *            "title": "tulog",
 *            "creditUnit": 1,
 *            "type": "rest",
 *            "startDate": "010118",
 *            "endDate": "123118"
 *        }
 *   ],
 *    "total": 1,
 *    "limit": 10,
 *    "page": 1,
 *    "pages": 1
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

router.get('/service/', async (req, res) => {
  try {
    req.session.user.acctType === 'USER'
      ? (req.query.userID = req.session.user.userID)
      : '';
    const services = await Ctrl.getExtensionAndCommunityServices(
      req.query,
      req.query.userID,
    );
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched services',
      data: services,
      total: (await Ctrl.getTotalExtensionAndCommunityServices(
        req.query,
        req.query.userID,
      )).total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalExtensionAndCommunityServices(
          req.query,
          req.query.userID,
        )).total / (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Extension and community services not found';
        break;
      case 500:
        a;
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /service/:extAndCommServiceID deleteExtensionAndCommunityService
 * @apiGroup ExtensionAndCommunityService
 * @apiName deleteExtensionAndCommunityService
 *
 * @apiParam (Query Params) {Number} extAndCommServiceID id of service
 *
 * @apiSuccess {Object} data  service deleted
 * @apiSuccess {Number} data.id id of fsr
 * @apiSuccess {Number} data.extAndCommServiceID id of service
 * @apiSuccess {Number} data.participant participant
 * @apiSuccess {String} data.role role
 * @apiSuccess {Number} data.hours hours of service
 * @apiSuccess {String} data.title title of service
 * @apiSuccess {Number} data.creditUnit creditUnit of service
 * @apiSuccess {String} data.type type of service
 * @apiSuccess {Date} data.startDate start date of service
 * @apiSuccess {Date} data.endDate end date of service
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *    "status": 200,
 *    "message": "Successfully deleted service",
 *    "data":
 *        {
 *            "id": 1,
 *            "extAndCommServiceID": 1,
 *            "participant": "ren",
 *            "role": "wala",
 *            "fundingAgency": "NONE",
 *            "hours": 3,
 *            "title": "tulog",
 *           "creditUnit": 1,
 *           "type": "rest",
 *           "startDate": "010118",
 *           "endDate": "123118"
 *       }
 *
 * }
 *
 * @apiError (Error 500) {Number} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Service not found
 *   {
 *     "status": 404,
 *     "message": "Service not found"
 *   }
 */

router.delete('/service/:extAndCommServiceID/', async (req, res) => {
  try {
    const idOfService = await getIDofFSRfromService(
      req.params.extAndCommServiceID,
    );
    const userIDofFSR = await getUserIDofFSR(
      idOfService,
      req.session.user.userID,
    );
    const service = await Ctrl.getExtensionAndCommunityService(req.params);
    await Ctrl.deleteExtensionAndCommunityService(req.params);
    await addLog({
      action: 'DELETE_SERVICE',
      changes: '',
      affectedID: service.extAndCommServiceID,
      userID: req.session.user.userID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted service',
      data: service,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'ExtensionAndCommunityService not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /service/:extAndCommServiceID getExtensionAndCommunityService
 * @apiGroup ExtensionAndCommunityService
 * @apiName getExtensionAndCommunityService
 *
 * @apiParam (Query Params) {Number} extAndCommServiceID id of service
 *
 * @apiSuccess {Object} data  service fetched
 * @apiSuccess {Number} data.id id of fsr
 * @apiSuccess {Number} data.extAndCommServiceID id of service
 * @apiSuccess {Number} data.participant participant
 * @apiSuccess {String} data.role role
 * @apiSuccess {Number} data.hours hours of service
 * @apiSuccess {String} data.title title of service
 * @apiSuccess {Number} data.creditUnit creditUnit of service
 * @apiSuccess {String} data.type type of service
 * @apiSuccess {Date} data.startDate start date of service
 * @apiSuccess {Date} data.endDate end date of service
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *    "status": 200,
 *    "message": "Successfully fetched service",
 *    "data":
 *        {
 *            "id": 1,
 *            "extAndCommServiceID": 1,
 *            "participant": "ren",
 *            "role": "wala",
 *            "fundingAgency": "NONE",
 *            "hours": 3,
 *            "title": "tulog",
 *           "creditUnit": 1,
 *           "type": "rest",
 *           "startDate": "010118",
 *           "endDate": "123118"
 *       }
 *
 * }
 *
 * @apiError (Error 500) {Number} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 *
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Service not found
 *   {
 *     "status": 404,
 *     "message": "Service not found"
 *   }
 */

router.get('/service/:extAndCommServiceID', async (req, res) => {
  try {
    if (req.session.user.acctType === 'USER' && !req.session.user.isHead) {
      const idOfService = await getIDofFSRfromService(
        req.params.extAndCommServiceID,
      );
      const userIDofFSR = await getUserIDofFSR(
        idOfService,
        req.session.user.userID,
      );
    }
    const service = await Ctrl.getExtensionAndCommunityService(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched service',
      data: service,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'Service not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
