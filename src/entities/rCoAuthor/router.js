import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /rCoAuthor addrCoAuthor
 * @apiGroup rCoAuthor
 * @apiName addrCoAuthor
 *
 * @apiParam (Body Params) {Number} researchID ID of research
 * @apiParam (Body Params) {String} name name of co-author
 *
 * @apiSuccess {Object} data new research created
 * @apiSuccess {Number} data.rCoAuthorID ID of research co-authot
 * @apiSuccess {Number} data.researchID ID of research
 * @apiSuccess {String} data.name name of co-author
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully created research co-author",
 *     "data":
 *         {
 *           "rCoAuthorID":1,
 *           "researchID": 92,
 *           "name": "annyeonglol",
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
router.post('/rCoAuthor/', async (req, res) => {
  try {
    const rCoAuthorID = await Ctrl.addrCoAuthor(req.body);
    const rCoAuthor = await Ctrl.getrCoAuthor({ rCoAuthorID });
    res.status(200).json({
      status: 200,
      message: 'Successfully created research co-author',
      data: rCoAuthor,
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
 * @api {get} /rCoAuthor/:rCoAuthorID getrCoAuthor
 * @apiGroup rCoAuthor
 * @apiName getrCoAuthor
 *
 * @apiParam (Query Params) {Number} rCoAuthorID ID of research co-authot
 *
 * @apiSuccess {Object} data Research fetched
 * @apiSuccess {Number} data.rCoAuthorID ID of research co-authot
 * @apiSuccess {Number} data.researchID ID of research
 * @apiSuccess {String} data.name name of co-author
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully fetched research co-author",
 *     "data":
 *         {
 *           "rCoAuthorID":1,
 *           "researchID": 92,
 *           "name": "annyeonglol",
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
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Research co-author not found
 * {
 *   "status": 404,
 *   "message": "Research co-author not found"
 * }
 */
router.get('/rCoAuthor/:rCoAuthorID', async (req, res) => {
  try {
    const rCoAuthor = await Ctrl.getrCoAuthor(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched research co-author',
      data: rCoAuthor,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research co-author not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /rCoAuthor getrCoAuthors
 * @apiGroup rCoAuthor
 * @apiName getrCoAuthors
 *
 * @apiParam (Query Params) {Number} [researchID] ID of research
 * @apiParam (Query Params) {String} [name] name of co-author
 * @apiParam (Query Params) {Number} [page] page number
 * @apiParam (Query Params) {Number} [limit] count limit of users to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'name'
 *
 * @apiSuccess {Object[]} data Researches fetched
 * @apiSuccess {Number} data.rCoAuthorID ID of research co-authot
 * @apiSuccess {Number} data.researchID ID of research
 * @apiSuccess {String} data.name name of co-author
 * @apiSuccess {Number} total Total amount of documents.
 * @apiSuccess {Number} limit Max number of documents
 * @apiSuccess {Number} page nth page this query is.
 * @apiSuccess {Number} pages Number of total pages.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully fetched research co-authors",
 *     "data": [
 *         {
 *           "rCoAuthorID":1,
 *           "researchID": 92,
 *           "name": "annyeonglol",
 *         },
 *         {
 *           "rCoAuthorID":1,
 *           "researchID": 92,
 *           "name": "annyeonglol",
 *         }
 *       ]
 *     "total": 2,
 *     "limit": 2,
 *     "page": 8,
 *     "pages": 8
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
 * HTTP/1.1 404 Research co-author/s not found
 * {
 *   "status": 404,
 *   "message": "Research co-author/s not found"
 * }
 */
router.get('/rCoAuthor/', async (req, res) => {
  try {
    const rCoAuthors = await Ctrl.getrCoAuthors(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched research co-authors',
      data: rCoAuthors,
      total: (await Ctrl.getTotalrCoAuthors(req.query)).total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalrCoAuthors(req.query)).total /
          (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research co-author not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {delete} /rCoAuthor/:rCoAuthorID deleterCoAuthor
 * @apiGroup rCoAuthor
 * @apiName deleterCoAuthor
 *
 * @apiParam (Query Params) {Number} rCoAuthorID ID of research co-author
 *
 * @apiSuccess {Object} data Deleted research
 * @apiSuccess {Number} data.rCoAuthorID ID of research co-author
 * @apiSuccess {Number} data.researchID ID of research
 * @apiSuccess {String} data.name name of co-author
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully deleted research co-author",
 *     "data":
 *          {
 *           "rCoAuthorID":1,
 *           "researchID": 92,
 *           "name": "annyeonglol",
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
 * @apiError (Error 404) {Number} status status code
 * @apiError (Error 404) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Research co-author not found
 * {
 *   "status": 404,
 *   "message": "Research co-author not found"
 * }
 */

router.delete('/rCoAuthor/:rCoAuthorID', async (req, res) => {
  try {
    const rCoAuthor = await Ctrl.getrCoAuthor(req.params);
    await Ctrl.deleterCoAuthor(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted research co-author',
      data: rCoAuthor,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research co-author not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {put} /rCoAuthor updaterCoAuthor
 * @apiGroup rCoAuthor
 * @apiName updaterCoAuthor
 *
 * @apiParam (Query Params) {Number} rCoAuthorID ID of research co-author
 *
 * @apiParam (Body Params) {String} [name] name of co-author
 * @apiParam (Query Params) {Number} [researchID] ID of research
 *
 * @apiSuccess {Object} data Updated research
 * @apiSuccess {Number} data.rCoAuthorID ID of research co-authot
 * @apiSuccess {Number} data.researchID ID of research
 * @apiSuccess {String} data.name name of co-author
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "status": 200,
 *     "message": "Successfully updated research co-author",
 *     "data":
 *         {
 *           "rCoAuthorID":1,
 *           "researchID": 92,
 *           "name": "annyeonglol",
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
router.put('/rCoAuthor/:rCoAuthorID', async (req, res) => {
  try {
    await Ctrl.updaterCoAuthor(req.params, req.body);
    const rCoAuthor = await Ctrl.getrCoAuthor(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully updated research co-author',
      data: rCoAuthor,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Research co-author not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
