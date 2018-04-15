import { Router } from 'express';
import * as Ctrl from './controller';
import * as MiddlewareCtrl from '../../middlewares/controller';
import { upload, unlink } from './../../utils';

const router = Router();

/**
 * @api {post} /creativeWork addCreativeWork
 * @apiGroup Creative Work
 * @apiName addCreativeWork

 * @apiParam (Body Params) {Number} id ID of related FSR
 * @apiParam (Body Params) {Date} date date of creative work
 * @apiParam (Body Params) {String} title title of creative work
 * @apiParam (Body Params) {String}  type type of creative work
 * @apiParam (Body Params) {Number} credUnit credit units of creative work
 * @apiParam (Body Params) {File} filepath filepath 
 * 
 * @apiSuccess {Object} data creativeWork added
 * @apiSuccess {Number} data.id ID of related FSR
 * @apiSuccess {Date} data.date date of creative work
 * @apiSuccess {String} data.title title of creative work
 * @apiSuccess {String} data.type type of creative work
 * @apiSuccess {Number} data.credUnit credit units of creative work
 * @apiSuccess {String} data.filepath filepath
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Successfully created creative work",
 *     "data": {
 *         "id": 1,
 *         "creativeWorkID": 3,
 *         "date": "0000-00-00",
 *         "title": "test",
 *         "type": "writer",
 *         "credUnit": 1,
 *         "filepath":/uploads/creativeWorls/asdasdalsd-192e02d.png
 *     }
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

router.post('/creativeWork/', async (req, res) => {
  try {
    const userIDofFSR = await MiddlewareCtrl.getUserIDofFSR(
      req.body.id,
      req.session.user.userID,
    );
    if (req.files && req.files.filepath) {
      req.body.filepath = await upload(req.files.filepath, 'creativeWorks');
    }
    const creativeWorkID = await Ctrl.addCreativeWork(req.body);
    const creativeWork = await Ctrl.getCreativeWork({ creativeWorkID });
    res.status(200).json({
      status: 200,
      message: 'Successfully created creative work',
      data: creativeWork,
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
 * @api {get} /creativeWork/ getCreativeWorks
 * @apiGroup Creative Work
 * @apiName getCreativeWorks
 *
 * @apiParam (Query Params) {Number} [id] ID of related FSR
 * @apiParam (Query Params) {Date} [date] date of creative work
 * @apiParam (Query Params) {String} [title] title of creative work
 * @apiParam (Query Params) {String} [type] type of creative work
 * @apiParam (Query Params) {Number} [credUnit] credit units of creative work
 * @apiParam (Body Params) {File} [filepath] filepath
 * @apiParam (Query Params) {Number} [page] page number
 * @apiParam (Query Params) {Number} [limit] count limit of creative works to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'date'
 *
 * @apiSuccess {Object[]} data createWorks fetched
 * @apiSuccess {Number} data.id ID of related FSR
 * @apiSuccess {Date} data.date date of creative work
 * @apiSuccess {String} data.title title of creative work
 * @apiSuccess {String} data.type type of creative work
 * @apiSuccess {Number} data.credUnit credit units of creative work
 * @apiSuccess {String} data.filepath filepath
 * @apiSuccess {Number} total Total amount of documents.
 * @apiSuccess {Number} limit Max number of documents
 * @apiSuccess {Number} page nth page this query is.
 * @apiSuccess {Number} pages Number of total pages.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Successfully fetched creative works",
 *     "data": [
 *         {
 *             "id": 1,
 *             "creativeWorkID": 1,
 *             "date": "0000-00-00",
 *             "title": "1",
 *             "type": "1",
 *             "credUnit": 1,
 *             "filepath":'',
 *         },
 *         {
 *             "id": 1,
 *             "creativeWorkID": 2,
 *             "date": "0000-00-00",
 *             "title": "1",
 *             "type": "1",
 *             "credUnit": 1
 *             "filepath":'',
 *         }
 *     ],
 *     "total": 2,
 *     "limit": 12,
 *     "page": 1,
 *     "pages": 1
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
router.get('/creativeWork/', async (req, res) => {
  try {
    const creativeWorks = await Ctrl.getCreativeWorks(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched creative works',
      data: creativeWorks,
      total: (await Ctrl.getTotalCreativeWorks(req.query)).total,
      limit: req.query.limit || 12,
      page: req.query.page || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalCreativeWorks(req.query)).total /
          (req.query.limit || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Creative works not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /creativeWork/:creativeWorkID deleteCreativeWork
 * @apiGroup Creative Work
 * @apiName deleteCreativeWork
 *
 * @apiParam (Query Params) {Number} creativeWorkID ID of creativeWork
 *
 * @apiSuccess {Object} data createWork deleted
 * @apiSuccess {Number} data.id ID of related FSR
 * @apiSuccess {Date} data.date date of creative work
 * @apiSuccess {String} data.title title of creative work
 * @apiSuccess {String} data.type type of creative work
 * @apiSuccess {Number} data.credUnit credit units of creative work
 * @apiSuccess {String} data.filepath filepath
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Successfully deleted creative work",
 *     "data": {
 *         "id": 1,
 *         "creativeWorkID": 2,
 *         "date": "0000-00-00",
 *         "title": "1",
 *         "type": "1",
 *         "credUnit": 1,
 *         "filepath":''
 *     }
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
 *   HTTP/1.1 404 Creative works not found
 *   {
 *     "status": 404,
 *     "message": "Creative works not found"
 *   }
 */

router.delete('/creativeWork/:creativeWorkID', async (req, res) => {
  try {
    const idOfCreativeWork = await MiddlewareCtrl.getIDofFSRfromCreativeWork(
      req.params.creativeWorkID,
    );
    const userIDofFSR = await MiddlewareCtrl.getUserIDofFSR(
      idOfCreativeWork,
      req.session.user.userID,
    );
    const creativeWork = await Ctrl.getCreativeWork(req.params);
    await Ctrl.deleteCreativeWork(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted creative work',
      data: creativeWork,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'Creative work not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /creativeWork/:creativeWorkID getCreativeWork
 * @apiGroup Creative Work
 * @apiName getCreativeWork
 *
 * @apiParam (Query Params) {Number} creativeWorkID ID of creativeWork
 *
 * @apiParam (Body Params) {Number} id ID of related FSR
 * @apiParam (Body Params) {Date} creativeWork.date date of creative work
 * @apiParam (Body Params) {String} creativeWork.title title of creative work
 * @apiParam (Body Params) {String} creativeWork.type type of creative work
 * @apiParam (Body Params) {Number} creativeWork.credUnit credit units of creative work
 * @apiParam (Body Params) {Number} creativeWork.userID user ID of creative work
 *
 * @apiSuccess {Object} data createWork fetched
 * @apiSuccess {Number} data.id ID of related FSR
 * @apiSuccess {Date} data.date date of creative work
 * @apiSuccess {String} data.title title of creative work
 * @apiSuccess {String} data.type type of creative work
 * @apiSuccess {Number} data.credUnit credit units of creative work
 * @apiSuccess {String} data.filepath filepath
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Successfully fetched creative work",
 *     "data": {
 *         "id": 1,
 *         "creativeWorkID": 3,
 *         "date": "0000-00-00",
 *         "title": "test",
 *         "type": "writer",
 *         "credUnit": 1,
 *         "filepath":''
 *     }
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
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Creative work not found
 * {
 *   "status": 404,
 *   "message": "Creative work not found"
 *   }
 */

router.get('/creativeWork/:creativeWorkID', async (req, res) => {
  try {
    const idOfCreativeWork = await MiddlewareCtrl.getIDofFSRfromCreativeWork(
      req.params.creativeWorkID,
    );
    const userIDofFSR = await MiddlewareCtrl.getUserIDofFSR(
      idOfCreativeWork,
      req.session.user.userID,
    );
    const creativeWork = await Ctrl.getCreativeWork(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched creative work',
      data: creativeWork,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'Creative work not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {put} /creativeWork/creativeWorkID updateCreativeWork
 * @apiGroup Creative Work
 * @apiName updateCreativeWork
 *
 * @apiParam (Query Params) {Number} creativeWorkID ID of creativeWork
 *
 * @apiParam (Body Params) {Number} [id] ID of related FSR
 * @apiParam (Body Params) {Date} [date] date of creative work
 * @apiParam (Body Params) {String} [title] title of creative work
 * @apiParam (Body Params) {String} [type] type of creative work
 * @apiParam (Body Params) {Number} [credUnit] credit units of creative work
 * @apiParam (Body Params) {Number} [userID] user ID of creative work
 *
 * @apiSuccess {Object} data createWork updated
 * @apiSuccess {Number} data.id ID of related FSR
 * @apiSuccess {Date} data.date date of creative work
 * @apiSuccess {String} data.title title of creative work
 * @apiSuccess {String} data.type type of creative work
 * @apiSuccess {Number} data.credUnit credit units of creative work
 * @apiSuccess {String} data.filepath filepath
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * {
 *     "status": 200,
 *     "message": "Successfully updated creative work",
 *     "data": {
 *         "id": 1,
 *         "creativeWorkID": 3,
 *         "date": "0000-00-00",
 *         "title": "test",
 *         "type": "writer",
 *         "credUnit": 1
 *         "filepath":''
 *     }
 * }
 *
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
 * HTTP/1.1 404 Creative work not found
 * {
 *   "status": 404,
 *   "message": "Creative work not found"
 *   }
 */
router.put('/creativeWork/:creativeWorkID', async (req, res) => {
  try {
    const idOfCreativeWork = await MiddlewareCtrl.getIDofFSRfromCreativeWork(
      req.params.creativeWorkID,
    );
    const userIDofFSR = await MiddlewareCtrl.getUserIDofFSR(
      idOfCreativeWork,
      req.session.user.userID,
    );
    if (req.files && req.files.filepath) {
      const creativeWork = await Ctrl.getCreativeWork(req.params);

      if (creativeWork.filepath) await unlink(creativeWork.filepath);
      req.body.filepath = await upload(req.files.filepath, 'creativeWorks');
    }

    await Ctrl.updateCreativeWork(req.params, req.body);
    const creativeWork = await Ctrl.getCreativeWork(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated creative work',
      data: creativeWork,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'Creative work not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
