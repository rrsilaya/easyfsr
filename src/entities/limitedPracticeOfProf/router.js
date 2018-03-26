import { Router } from 'express';
import bcrypt from 'bcrypt';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /limitPracticeOfProf addLimitedPracticeOfProf
 * @apiGroup limitPracticeOfProf
 * @apiName addLimitedPracticeOfProf
 *
 * @apiParam (Body Params) {Integer} id ID of limitPracticeOfProf
 * @apiParam (Body Params) {Integer} limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
 * @apiParam (Body Params) {String} askedPermssion Asked permission of limitPracticeOfProf
 * @apiParam (Body Params) {Date} date Date of limitPracticeOfProf
 *
 * @apiSuccess {Object} limitPracticeOfProf new LimitPracticeOfProf
 * @apiSuccess {Integer} limitPracticeOfProf.id ID of limitPracticeOfProf
 * @apiSuccess {Integer} limitPracticeOfProf.limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
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

 * @apiParam (Query Params) {Integer} limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
 *
 * @apiParam (Body Params) {Integer} id ID of limitPracticeOfProf
 * @apiParam (Body Params) {Integer} limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
 * @apiParam (Body Params) {String} askedPermssion Asked permission of limitPracticeOfProf
 * @apiParam (Body Params) {Date} date Date of limitPracticeOfProf
 *
 * @apiSuccess {Object} limitPracticeOfProf new LimitPracticeOfProf
 * @apiSuccess {Integer} limitPracticeOfProf.id ID of limitPracticeOfProf
 * @apiSuccess {Integer} limitPracticeOfProf.limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
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
 * @apiParam (Query Params) {Integer} limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
 *
 * @apiSuccess {Object} limitPracticeOfProf new LimitPracticeOfProf
 * @apiSuccess {Integer} limitPracticeOfProf.id ID of limitPracticeOfProf
 * @apiSuccess {Integer} limitPracticeOfProf.limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
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
 * @apiParam (Query Params) {Integer} limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
 *
 * @apiSuccess {Object} limitPracticeOfProf new LimitPracticeOfProf
 * @apiSuccess {Integer} limitPracticeOfProf.id ID of limitPracticeOfProf
 * @apiSuccess {Integer} limitPracticeOfProf.limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
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
 * @apiSuccess {Integer} limitPracticeOfProf.id ID of limitPracticeOfProf
 * @apiSuccess {Integer} limitPracticeOfProf.limitedPracticeOfProfID limitedPracticeOfProfID of limitPracticeOfProf
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

router.get('/limitedPracticeOfProf/', async (req, res) => {
  try {
    const limitedPracticeOfProf = await Ctrl.getLimitedPracticeOfProfs(
      req.query,
    );
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched limitedPracticeOfProf',
      data: limitedPracticeOfProf,
      // total: limitedPracticeOfProf.length,
      // limit: req.query.limit || 12,
      // page: req.query.page || 1,
      // pages: Math.ceil(limitedPracticeOfProf.length / (req.query.limit || 12)),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'limitPracticeOfProf not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /countlimitPracticeOfProf/:id getTotalLimitedPracticeOfProfsByFSR
 * @apiGroup limitPracticeOfProf
 * @apiName getTotalLimitedPracticeOfProfsByFSR
 *
 *
 *
 * @apiSuccess {Integer} total total countof limitPracticeOfProf
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *	{
 *	    "status": 200,
 *	    "message": "Successfully fetched limitedPracticeOfProf",
 *	    "data": [
 *	        {
 *	            "total": 1,
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

router.get('/countlimitedPracticeOfProf/:id', async (req, res) => {
  try {
    const limitedPracticeOfProf = await Ctrl.getTotalLimitedPracticeOfProfsByFSR(
      req.params,
    );
    res.status(200).json({
      status: 200,
      message: 'Successfully counted limitedPracticeOfProf by FSR',
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
});

/**
 * @api {get} /countlimitPracticeOfProf/ getTotalLimitedPracticeOfProfs
 * @apiGroup limitPracticeOfProf
 * @apiName getTotalLimitedPracticeOfProfs
 *
 *
 *
 * @apiSuccess {Integer} total total countof limitPracticeOfProf
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *	{
 *	    "status": 200,
 *	    "message": "Successfully fetched limitedPracticeOfProf",
 *	    "data": [
 *	        {
 *	            "total": 94,
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

router.get('/countlimitedPracticeOfProf/', async (req, res) => {
  try {
    const total = await Ctrl.getTotalLimitedPracticeOfProfs(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully counted limitedPracticeOfProf',
      data: total,
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
});

export default router;
