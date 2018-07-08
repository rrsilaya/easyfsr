import { Router } from 'express';
import * as Ctrl from './controller';
import { getUserIDofFSR } from '../../middlewares/controller';
import { addLog } from './../log/controller';

const router = Router();

/**
 * @api {post} /ltdPractOfProf addLtdPractOfProf
 * @apiGroup LtdPractOfProf
 * @apiName addLtdPractOfProf
 *
 * @apiParam (Body Params) {Number} id ID of fsr
 * @apiParam (Body Params) {String} askedPermission Asked permission of limitedPracticeOfProf. Can be 'YES' OR 'NO'
 * @apiParam (Body Params) {Date} [date] Date of limitedPracticeOfProf
 *
 * @apiSuccess {Object} data new LtdPractOfProf created
 * @apiSuccess {Number} data.id ID of fsr
 * @apiSuccess {String} data.askedPermission Asked permission of limitedPracticeOfProf. Can be 'YES' OR 'NO'
 * @apiSuccess {Date} data.date Date of limitedPracticeOfProf
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *	{
 *	    "status": 200,
 *	    "message": "Successfully created ltdPractOfProf",
 *	    "data":
 *	        {
 *	            "id": 5,
 *	            "askedPermission": "no",
 *	            "date": "2000-12-31T16:00:00.000Z"
 *	        }
 *	}
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

router.post('/ltdPractOfProf/', async (req, res) => {
  try {
    const userIDofFSR = await getUserIDofFSR(
      req.body.id,
      req.session.user.userID,
    );
    const id = await Ctrl.addLtdPractOfProf(req.body);
    const ltdPractOfProf = await Ctrl.getLtdPractOfProf({
      id,
    });
    await addLog({
      action: 'INSERT_LTD_PRACTICE',
      changes: '',
      affectedID: id,
      userID: req.session.user.userID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully created LtdPractOfProf',
      data: ltdPractOfProf,
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
 * @api {put} /ltdPractOfProf/:id updateLtdPractOfProf
 * @apiGroup LtdPractOfProf
 * @apiName updateLtdPractOfProf

 * @apiParam (Query Params) {Number} id ID of fsr
 *
 * @apiParam (Body Params) {Number} [id] ID of fsr
 * @apiParam (Body Params) {String} [askedPermission] Asked permission of limitedPracticeOfProf.Can be 'YES' OR 'NO'
 * @apiParam (Body Params) {Date} [date] Date of limitedPracticeOfProf
 *
 * @apiSuccess {Object} data LtdPractOfProf updated
 * @apiSuccess {Number} data.id ID of fsr
 * @apiSuccess {String} data.askedPermission Asked permission of limitedPracticeOfProf. Can be 'YES' OR 'NO'
 * @apiSuccess {Date} data.date Date of limitedPracticeOfProf
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *	{
 *	    "status": 200,
 *	    "message": "Successfully updated LtdPractOfProf",
 *	    "data": 
 *	        {
 *	            "id": 5,
 *	            "askedPermission": "YES",
 *	            "date": "2002-12-31T16:00:00.000Z"
 *	        }
 *	}
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
 * 	HTTP/1.1 404 LtdPractOfProf not found
 *	 {
 * 	  "status": 404,
 * 	  "message": "LtdPractOfProf not found"
 * 	 }
 */

router.put('/ltdPractOfProf/:id', async (req, res) => {
  try {
    const userIDofFSR = await getUserIDofFSR(
      req.params.id,
      req.session.user.userID,
    );
    await Ctrl.updateLtdPractOfProf(req.params, req.body);
    const ltdPractOfProf = await Ctrl.getLtdPractOfProf(req.params);
    await addLog({
      action: 'UPDATE_LTD_PRACTICE',
      changes: '',
      affectedID: ltdPractOfProf.id,
      userID: req.session.user.userID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully updated LtdPractOfProf',
      data: ltdPractOfProf,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'LtdPractOfProf not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /ltdPractOfProf/:id deleteLtdPractOfProf
 * @apiGroup LtdPractOfProf
 * @apiName deleteLtdPractOfProf
 *
 *
 * @apiParam (Query Params) {Number} id ID of fsr
 *
 * @apiSuccess {Object} data LtdPractOfProf deleted
 * @apiSuccess {Number} data.id ID of fsr
 * @apiSuccess {String} data.askedPermission Asked permission of limitedPracticeOfProf. Can be 'YES' OR 'NO'
 * @apiSuccess {Date} data.date Date of limitedPracticeOfProf
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *	{
 *	    "status": 200,
 *	    "message": "Successfully deleted LtdPractOfProf",
 *	    "data":
 *	        {
 *	            "id": 5,
 *	            "askedPermission": "YES",
 *	            "date": "2002-12-31T16:00:00.000Z"
 *	        }
 *	}
 *
 * @apiError (Error 500) {data} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * @apiError (Error 404) {data} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * 	HTTP/1.1 404 LtdPractOfProf not found
 *	 {
 * 	  "status": 404,
 * 	  "message": "LtdPractOfProf not found"
 * 	 }
 */

router.delete('/ltdPractOfProf/:id', async (req, res) => {
  try {
    const userIDofFSR = await getUserIDofFSR(
      req.params.id,
      req.session.user.userID,
    );
    const ltdPractOfProf = await Ctrl.getLtdPractOfProf(req.params);
    await Ctrl.deleteLtdPractOfProf(req.params);
    await addLog({
      action: 'DELETE_LTD_PRACTICE',
      changes: '',
      affectedID: ltdPractOfProf.id,
      userID: req.session.user.userID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted LtdPractOfProf',
      data: ltdPractOfProf,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'LtdPractOfProf not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /ltdPractOfProf/:id getLtdPractOfProf
 * @apiGroup LtdPractOfProf
 * @apiName getLtdPractOfProf
 *
 *
 * @apiParam (Query Params) {Number} id ID of FSR
 *
 * @apiSuccess {Object} data LtdPractOfProf fetchedNumber
 * @apiSuccess {Number} data.id ID of fsr
 * @apiSuccess {String} data.askedPermission Asked permission of limitedPracticeOfProf. Can be 'YES' OR 'NO'
 * @apiSuccess {Date} data.date Date of limitedPracticeOfProf
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *	{
 *	    "status": 200,
 *	    "message": "Successfully fetched LtdPractOfProf",
 *	    "data": [
 *	        {
 *	            "id": 5,
 *	            "askedPermission": "YES",
 *	            "date": "2002-12-31T16:00:00.000Z"
 *	        }
 *	    ]
 *	}
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
 * 	HTTP/1.1 404 LtdPractOfProf not found
 *	 {
 * 	  "status": 404,
 * 	  "message": "LtdPractOfProf not found"
 * 	 }
 */

router.get('/ltdPractOfProf/:id', async (req, res) => {
  try {
    if (req.session.user.acctType === 'USER' && !req.session.user.isHead) {
      const userIDofFSR = await getUserIDofFSR(
        req.params.id,
        req.session.user.userID,
      );
    }
    const ltdPractOfProf = await Ctrl.getLtdPractOfProf(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched LtdPractOfProf',
      data: ltdPractOfProf,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'LtdPractOfProf not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /ltdPractOfProf/ getLtdPractOfProfs
 * @apiGroup LtdPractOfProf
 * @apiName getLtdPractOfProfs
 *
 * @apiParam (Query Params) {Number} [id] ID of fsr
 * @apiParam (Query Params) {String} [askedPermission] Asked permission of limitedPracticeOfProf. Can be 'YES' OR 'NO'
 * @apiParam (Query Params) {Date} [date] Date of limitedPracticeOfProf
 * @apiParam (Query Params) {Number} [page] page number
 * @apiParam (Query Params) {Number} [limit] count limit to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'id'
 *
 * @apiSuccess {Object[]} data All LtdPractOfProf fecthed
 * @apiSuccess {Number} data.id ID of fsr
 * @apiSuccess {String} data.askedPermission Asked permission of limitedPracticeOfProf. Can be 'YES' OR 'NO'
 * @apiSuccess {Date} data.date Date of limitedPracticeOfProf
 * @apiSuccess {Number} total Total amount of documents.
 * @apiSuccess {Number} limit Max number of documents
 * @apiSuccess {Number} page nth page this query is.
 * @apiSuccess {Number} pages Number of total pages.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *	{
 *	    "status": 200,
 *	    "message": "Successfully fetched ltdPractOfProfs",
 *	    "data": [
 *	        {
 *	            "askedPermission": "YES",
 *	            "date": "2002-12-31T16:00:00.000Z"
 *	        },
 *			{
 *	            "id": 4,
 *	            "askedPermission": "NO",
 *	            "date": "2000-12-31T16:00:00.000Z"
 *	        }
 *	    ],
 *      "total": 2,
 *      "limit": 12,
 *      "page": 8,
 *      "pages": 8
 *	}
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
 * 	HTTP/1.1 404 LtdPractOfProf/s not found
 *	 {
 * 	  "status": 404,
 * 	  "message": "LtdPractOfProf/s not found"
 * 	 }
 */

router.get('/ltdPractOfProf/', async (req, res) => {
  try {
    req.session.user.acctType === 'USER'
      ? (req.query.userID = req.session.user.userID)
      : '';
    const ltdPractOfProfs = await Ctrl.getLtdPractOfProfs(
      req.query,
      req.query.userID,
    );
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched LtdPractOfProf',
      data: ltdPractOfProfs,
      total: (await Ctrl.getTotalLtdPractOfProfs(req.query, req.query.userID))
        .total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalLtdPractOfProfs(req.query, req.query.userID))
          .total / (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'LtdPractOfProf/s not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
