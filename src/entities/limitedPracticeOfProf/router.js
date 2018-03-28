import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /limitPracticeOfProf addLimitedPracticeOfProf
 * @apiGroup limitPracticeOfProf
 * @apiName addLimitedPracticeOfProf
 *
 * @apiParam (Body Params) {Number} id ID of limitPracticeOfProf
 * @apiParam (Body Params) {Number} limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
 * @apiParam (Body Params) {String} askedPermssion Asked permission of limitPracticeOfProf
 * @apiParam (Body Params) {Date} date Date of limitPracticeOfProf
 *
 * @apiSuccess {Object} limitPracticeOfProf new LimitPracticeOfProf
 * @apiSuccess {Number} limitPracticeOfProf.id ID of limitPracticeOfProf
 * @apiSuccess {Number} limitPracticeOfProf.limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
 * @apiSuccess {String} limitPracticeOfProf.askedPermssion Asked permission of limitPracticeOfProf
 * @apiSuccess {Date} limitPracticeOfProf.date Date of limitPracticeOfProf
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *	{
 *	    "status": 200,
 *	    "message": "Successfully created limitedPracticeOfProf",
 *	    "data": [
 *	        {
 *	            "limitedPracticeOfProfID": 97,
 *	            "id": 5,
 *	            "askedPermission": "no",
 *	            "date": "2000-12-31T16:00:00.000Z"
 *	        }
 *	    ]
 *	}
 *
 * @apiError (Error 500) {String[]} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.post('/limitedPracticeOfProf/', async (req, res) => {
  try {
    const limitedPracticeOfProfID = await Ctrl.addLimitedPracticeOfProf(
      req.body,
    );
    const limitedPracticeOfProf = await Ctrl.getLimitedPracticeOfProf({
      limitedPracticeOfProfID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully created limitedPracticeOfProf',
      data: limitedPracticeOfProf,
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
 * @api {put} /limitPracticeOfProf/:limitedPracticeOfProfID updateLimitedPracticeOfProf
 * @apiGroup limitPracticeOfProf
 * @apiName updateLimitedPracticeOfProf

 * @apiParam (Query Params) {Number} limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
 *
 * @apiParam (Body Params) {Number} id ID of limitPracticeOfProf
 * @apiParam (Body Params) {Number} limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
 * @apiParam (Body Params) {String} askedPermssion Asked permission of limitPracticeOfProf
 * @apiParam (Body Params) {Date} date Date of limitPracticeOfProf
 *
 * @apiSuccess {Object} limitPracticeOfProf new LimitPracticeOfProf
 * @apiSuccess {Number} limitPracticeOfProf.id ID of limitPracticeOfProf
 * @apiSuccess {Number} limitPracticeOfProf.limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
 * @apiSuccess {String} limitPracticeOfProf.askedPermssion Asked permission of limitPracticeOfProf
 * @apiSuccess {Date} limitPracticeOfProf.date Date of limitPracticeOfProf
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *	{
 *	    "status": 200,
 *	    "message": "Successfully updated limitedPracticeOfProf",
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
 * @apiError (Error 500) {String[]} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * 	HTTP/1.1 404 limitPracticeOfProf not found
 *	 {
 * 	  "status": 404,
 * 	  "message": "limitPracticeOfProf not found"
 * 	 }
 */

router.put(
  '/limitedPracticeOfProf/:limitedPracticeOfProfID',
  async (req, res) => {
    try {
      await Ctrl.updateLimitedPracticeOfProf(req.params, req.body);
      const limitedPracticeOfProf = await Ctrl.getLimitedPracticeOfProf(
        req.params,
      );
      res.status(200).json({
        status: 200,
        message: 'Successfully updated limitedPracticeOfProf',
        data: limitedPracticeOfProf,
      });
    } catch (status) {
      let message = '';
      switch (status) {
        case 404:
          message = 'limitedPracticeOfProf not found';
          break;
        case 500:
          message = 'Internal server error';
          break;
      }
      res.status(status).json({ status, message });
    }
  },
);

/**
 * @api {put} /limitPracticeOfProf/:limitedPracticeOfProfID deleteLimitedPracticeOfProf
 * @apiGroup limitPracticeOfProf
 * @apiName deleteLimitedPracticeOfProf
 *
 *
 * @apiParam (Query Params) {Number} limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
 *
 * @apiSuccess {Object} limitPracticeOfProf new LimitPracticeOfProf
 * @apiSuccess {Number} limitPracticeOfProf.id ID of limitPracticeOfProf
 * @apiSuccess {Number} limitPracticeOfProf.limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
 * @apiSuccess {String} limitPracticeOfProf.askedPermssion Asked permission of limitPracticeOfProf
 * @apiSuccess {Date} limitPracticeOfProf.date Date of limitPracticeOfProf
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *	{
 *	    "status": 200,
 *	    "message": "Successfully deleted limitedPracticeOfProf",
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
 * @apiError (Error 500) {String[]} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * 	HTTP/1.1 404 limitPracticeOfProf not found
 *	 {
 * 	  "status": 404,
 * 	  "message": "limitPracticeOfProf not found"
 * 	 }
 */

router.delete(
  '/limitedPracticeOfProf/:limitedPracticeOfProfID',
  async (req, res) => {
    try {
      const limitedPracticeOfProf = await Ctrl.getLimitedPracticeOfProf(
        req.params,
      );
      await Ctrl.deleteLimitedPracticeOfProf(req.params);
      res.status(200).json({
        status: 200,
        message: 'Successfully deleted limitedPracticeOfProf',
        data: limitedPracticeOfProf,
      });
    } catch (status) {
      let message = '';
      switch (status) {
        case 404:
          message = 'LimitedPracticeOfProf not found';
          break;
        case 500:
          message = 'Internal server error';
          break;
      }
      res.status(status).json({ status, message });
    }
  },
);

/**
 * @api {get} /limitPracticeOfProf/:limitedPracticeOfProfID getLimitedPracticeOfProf
 * @apiGroup limitPracticeOfProf
 * @apiName getLimitedPracticeOfProf
 *
 *
 * @apiParam (Query Params) {Number} limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
 *
 * @apiSuccess {Object} limitPracticeOfProf new LimitPracticeOfProf
 * @apiSuccess {Number} limitPracticeOfProf.id ID of limitPracticeOfProf
 * @apiSuccess {Number} limitPracticeOfProf.limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
 * @apiSuccess {String} limitPracticeOfProf.askedPermssion Asked permission of limitPracticeOfProf
 * @apiSuccess {Date} limitPracticeOfProf.date Date of limitPracticeOfProf
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *	{
 *	    "status": 200,
 *	    "message": "Successfully fetched limitedPracticeOfProf",
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
 * @apiError (Error 500) {String[]} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * 	HTTP/1.1 404 limitPracticeOfProf not found
 *	 {
 * 	  "status": 404,
 * 	  "message": "limitPracticeOfProf not found"
 * 	 }
 */

router.get(
  '/limitedPracticeOfProf/:limitedPracticeOfProfID',
  async (req, res) => {
    try {
      const limitedPracticeOfProf = await Ctrl.getLimitedPracticeOfProf(
        req.params,
      );
      res.status(200).json({
        status: 200,
        message: 'Successfully fetched limitedPracticeOfProf',
        data: limitedPracticeOfProf,
      });
    } catch (status) {
      let message = '';
      switch (status) {
        case 404:
          message = 'limitedPracticeOfProf not found';
          break;
        case 500:
          message = 'Internal server error';
          break;
      }
      res.status(status).json({ status, message });
    }
  },
);

/**
 * @api {get} /limitPracticeOfProf/ getLimitedPracticeOfProfs
 * @apiGroup limitPracticeOfProf
 * @apiName getLimitedPracticeOfProfs
 *
 *
 *
 * @apiSuccess {Object} limitPracticeOfProf new LimitPracticeOfProf
 * @apiSuccess {Number} limitPracticeOfProf.id ID of limitPracticeOfProf
 * @apiSuccess {Number} limitPracticeOfProf.limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
 * @apiSuccess {String} limitPracticeOfProf.askedPermssion Asked permission of limitPracticeOfProf
 * @apiSuccess {Date} limitPracticeOfProf.date Date of limitPracticeOfProf
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *	{
 *	    "status": 200,
 *	    "message": "Successfully fetched limitedPracticeOfProf",
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
 * @apiError (Error 500) {String[]} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 * 	HTTP/1.1 404 limitPracticeOfProf not found
 *	 {
 * 	  "status": 404,
 * 	  "message": "limitPracticeOfProf not found"
 * 	 }
 */

router.get('/limitedPracticeOfProf/', async (req, res) => {
  try {
    const limitedPracticeOfProf = await Ctrl.getLimitedPracticeOfProfs(
      req.query,
    );
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched limitedPracticeOfProf',
      data: limitedPracticeOfProf,
      total: limitedPracticeOfProf.length,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalLimitedPracticeOfProfs(req.query)).total /
          (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'limitedPracticeOfProf/s not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
