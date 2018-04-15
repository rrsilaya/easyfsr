import { Router } from 'express';
import * as Ctrl from './controller';
import * as MiddlewareCtrl from '../../middlewares/controller';

const router = Router();

/**
 * @api {post} /ltdPractOfProf addLtdPractOfProf
 * @apiGroup LtdPractOfProf
 * @apiName addLtdPractOfProf
 *
 * @apiParam (Body Params) {Number} id ID of fsr
 * @apiParam (Body Params) {Number} limitedPracticeOfProfID limitedPracticeOfProfID of limitedPracticeOfProf
 * @apiParam (Body Params) {String} askedPermssion Asked permission of limitedPracticeOfProf. Can be 'YES' OR 'NO'
 * @apiParam (Body Params) {Date} [date] Date of limitedPracticeOfProf
 *
 * @apiSuccess {Object} data new LtdPractOfProf created
 * @apiSuccess {Number} data.id ID of fsr
 * @apiSuccess {Number} data.limitedPracticeOfProfID limitedPracticeOfProfID of limitedPracticeOfProf
 * @apiSuccess {String} data.askedPermssion Asked permission of limitedPracticeOfProf. Can be 'YES' OR 'NO'
 * @apiSuccess {Date} data.date Date of limitedPracticeOfProf
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *	{
 *	    "status": 200,
 *	    "message": "Successfully created ltdPractOfProf",
 *	    "data":
 *	        {
 *	            "limitedPracticeOfProfID": 97,
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
    const userIDofFSR = await MiddlewareCtrl.getUserIDofFSR(
      req.body.id,
      req.session.user.userID,
    );
    const limitedPracticeOfProfID = await Ctrl.addLtdPractOfProf(req.body);
    const ltdPractOfProf = await Ctrl.getLtdPractOfProf({
      limitedPracticeOfProfID,
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
 * @api {put} /ltdPractOfProf/:limitedPracticeOfProfID updateLtdPractOfProf
 * @apiGroup LtdPractOfProf
 * @apiName updateLtdPractOfProf

 * @apiParam (Query Params) {Number} limitedPracticeOfProfID limitedPracticeOfProfID of limitedPracticeOfProf
 *
 * @apiParam (Body Params) {Number} [id] ID of fsr
 * @apiParam (Body Params) {String} [askedPermssion] Asked permission of limitedPracticeOfProf.Can be 'YES' OR 'NO'
 * @apiParam (Body Params) {Date} [date] Date of limitedPracticeOfProf
 *
 * @apiSuccess {Object} data LtdPractOfProf updated
 * @apiSuccess {Number} data.id ID of fsr
 * @apiSuccess {Number} data.limitedPracticeOfProfID limitedPracticeOfProfID of limitedPracticeOfProf
 * @apiSuccess {String} data.askedPermssion Asked permission of limitedPracticeOfProf. Can be 'YES' OR 'NO'
 * @apiSuccess {Date} data.date Date of limitedPracticeOfProf
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *	{
 *	    "status": 200,
 *	    "message": "Successfully updated LtdPractOfProf",
 *	    "data": 
 *	        {
 *	            "limitedPracticeOfProfID": 97,
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

router.put('/ltdPractOfProf/:limitedPracticeOfProfID', async (req, res) => {
  try {
    const userIDofFSR = await MiddlewareCtrl.getUserIDofFSR(
      req.params.limitedPracticeOfProfID,
      req.session.user.userID,
    );
    await Ctrl.updateLtdPractOfProf(req.params, req.body);
    const ltdPractOfProf = await Ctrl.getLtdPractOfProf(req.params);
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
 * @api {delete} /ltdPractOfProf/:limitedPracticeOfProfID deleteLtdPractOfProf
 * @apiGroup LtdPractOfProf
 * @apiName deleteLtdPractOfProf
 *
 *
 * @apiParam (Query Params) {Number} limitedPracticeOfProfID limitedPracticeOfProfID of limitedPracticeOfProf
 *
 * @apiSuccess {Object} data LtdPractOfProf deleted
 * @apiSuccess {Number} data.id ID of fsr
 * @apiSuccess {Number} data.limitedPracticeOfProfID limitedPracticeOfProfID of limitedPracticeOfProf
 * @apiSuccess {String} data.askedPermssion Asked permission of limitedPracticeOfProf. Can be 'YES' OR 'NO'
 * @apiSuccess {Date} data.date Date of limitedPracticeOfProf
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *	{
 *	    "status": 200,
 *	    "message": "Successfully deleted LtdPractOfProf",
 *	    "data":
 *	        {
 *	            "limitedPracticeOfProfID": 97,
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

router.delete('/ltdPractOfProf/:limitedPracticeOfProfID', async (req, res) => {
  try {
    const userIDofFSR = await MiddlewareCtrl.getUserIDofFSR(
      req.params.limitedPracticeOfProfID,
      req.session.user.userID,
    );
    const ltdPractOfProf = await Ctrl.getLtdPractOfProf(req.params);
    await Ctrl.deleteLtdPractOfProf(req.params);
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
 * @api {get} /ltdPractOfProf/:limitedPracticeOfProfID getLtdPractOfProf
 * @apiGroup LtdPractOfProf
 * @apiName getLtdPractOfProf
 *
 *
 * @apiParam (Query Params) {Number} limitedPracticeOfProfID limitedPracticeOfProfID of limitedPracticeOfProf
 *
 * @apiSuccess {Object} data LtdPractOfProf fetchedNumber
 * @apiSuccess {Number} data.id ID of fsr
 * @apiSuccess {Number} data.limitedPracticeOfProfID limitedPracticeOfProfID of limitedPracticeOfProf
 * @apiSuccess {String} data.askedPermssion Asked permission of limitedPracticeOfProf. Can be 'YES' OR 'NO'
 * @apiSuccess {Date} data.date Date of limitedPracticeOfProf
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *	{
 *	    "status": 200,
 *	    "message": "Successfully fetched LtdPractOfProf",
 *	    "data": [
 *	        {
 *	            "limitedPracticeOfProfID": 97,
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

router.get('/ltdPractOfProf/:limitedPracticeOfProfID', async (req, res) => {
  try {
    const userIDofFSR = await MiddlewareCtrl.getUserIDofFSR(
      req.params.limitedPracticeOfProfID,
      req.session.user.userID,
    );
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
 * @apiParam (Query Params) {Number} [limitedPracticeOfProfID] limitedPracticeOfProfID of limitedPracticeOfProf
 * @apiParam (Query Params) {String} [askedPermssion] Asked permission of limitedPracticeOfProf. Can be 'YES' OR 'NO'
 * @apiParam (Query Params) {Date} [date] Date of limitedPracticeOfProf
 * @apiParam (Query Params) {Number} [page] page number
 * @apiParam (Query Params) {Number} [limit] count limit to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'id'
 *
 * @apiSuccess {Object[]} data All LtdPractOfProf fecthed
 * @apiSuccess {Number} data.id ID of fsr
 * @apiSuccess {Number} data.limitedPracticeOfProfID limitedPracticeOfProfID of limitedPracticeOfProf
 * @apiSuccess {String} data.askedPermssion Asked permission of limitedPracticeOfProf. Can be 'YES' OR 'NO'
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
 *	            "limitedPracticeOfProfID": 97,
 *	            "id": 5,
 *	            "askedPermission": "YES",
 *	            "date": "2002-12-31T16:00:00.000Z"
 *	        },
 *			{
 *	            "limitedPracticeOfProfID": 96,
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
    const ltdPractOfProfs = await Ctrl.getLtdPractOfProfs(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched LtdPractOfProf',
      data: ltdPractOfProfs,
      total: (await Ctrl.getTotalLtdPractOfProfs(req.query)).total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalLtdPractOfProfs(req.query)).total /
          (parseInt(req.query.limit) || 12),
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
