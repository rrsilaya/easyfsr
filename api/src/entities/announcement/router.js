import { Router } from 'express';
import { isAdmin } from '../../middlewares/middlewares';
import * as Ctrl from './controller';
import { addLog } from './../log/controller';

const router = Router();

/**
 * @api {post} /announcement addAnnouncement
 * @apiGroup Announcement
 * @apiName addAnnouncement
 *
 *
 * @apiParam (Body Params) {String} title title of the announcement
 * @apiParam (Body Params) {String} body body of the announcement
 * @apiParam (Body Params) {Boolean} [isResolved] indicates if announcement entry is resolved
 *
 * @apiSuccess {Object} data new Announcement created
 * @apiSuccess {Number} data.announcementID ID of announcement
 * @apiSuccess {Number} data.userID ID of user who posted announcement
 * @apiSuccess {String} data.title title of announcement
 * @apiSuccess {String} data.body body of announcement
 * @apiSuccess {Boolean} data.isResolved isResolved indicates if announcement is resolved
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *   "status": 200,
 *    "message": "Successfully created announcement",
 *    "data": {
 *        "announcementID": 2,
 *        "userID": 1,
 *        "title": "Hello",
 *        "body": "Hello world!",
 *        "isResolved": 0
 *    }
 *}
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
router.post('/announcement', isAdmin, async (req, res) => {
  try {
    req.body.userID = req.session.user.userID;
    const announcementID = await Ctrl.addAnnouncement(req.body);
    const announcement = await Ctrl.getAnnouncement({ announcementID });
    delete announcement.isResolved;
    await addLog({
      action: 'ADD_ANNOUNCEMENT',
      changes: '',
      affectedID: announcementID,
      userID: req.session.user.userID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully created announcement',
      data: announcement,
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
 * @api {delete} /announcement/:announcementID deleteAnnouncement
 * @apiGroup Announcement
 * @apiName deleteAnnouncement
 *
 * @apiParam (Query Params) {Number} announcementID ID of announcement
 *
 * @apiSuccess {Object} data  Announcement deleted
 * @apiSuccess {Number} data.announcementID ID of announcement
 * @apiSuccess {Number} data.userID ID of user who posted announcement
 * @apiSuccess {String} data.title title of announcement
 * @apiSuccess {String} data.body body of announcement
 * @apiSuccess {Boolean} data.isResolved isResolved indicates if announcement is resolved
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *   "status": 200,
 *   "message": "Successfully deleted announcement",
 *   "data": {
 *       "announcementID": 2,
 *       "userID": 1,
 *       "title": "Hi nalang",
 *       "body": "Hello world!",
 *       "isResolved": 0
 *   }
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
 * HTTP/1.1 404 Announcement not found
 * {
 *   "status": 404,
 *   "message": "Announcement not found"
 * }
 */
router.delete('/announcement/:announcementID', isAdmin, async (req, res) => {
  try {
    const announcement = await Ctrl.getAnnouncement(req.params);
    delete announcement.isResolved;
    await Ctrl.deleteAnnouncement(req.params);
    await addLog({
      action: 'DELETE_ANNOUNCEMENT',
      changes: '',
      affectedID: announcement.announcementID,
      userID: req.session.user.userID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted announcement',
      data: announcement,
    });
  } catch (status) {
    let message = '';

    switch (status) {
      case 404:
        message = 'Announcement not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }

    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /announcement getAnnouncements
 * @apiGroup Announcement
 * @apiName getAnnouncements
 *
 * @apiParam (Query Params) {Number} [announcementID] ID of announcement
 * @apiParam (Query Params) {Number} [userID] ID of user who posted announcement
 * @apiParam (Query Params) {String} [title] title of the announcement
 * @apiParam (Query Params) {String} [body] body of the announcement
 * @apiParam (Query Params) {Boolean} [isResolved] isResolved indicates if announcement entry is resolved
 * @apiParam (Query Params) {Number} [page] page number
 * @apiParam (Query Params) {Number} [limit] count limit of users to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'title'
 *
 * @apiSuccess {Object[]}  data Announcement fetched
 * @apiSuccess {Number} data.announcementID ID of announcement
 * @apiSuccess {Number} data.userID ID of user who posted announcement
 * @apiSuccess {String} data.title title of announcement
 * @apiSuccess {String} data.body body of announcement
 * @apiSuccess {Boolean} data.isResolved isResolved indicates if announcement is resolved
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *   "status": 200,
 *   "message": "Successfully fetched announcements",
 *   "data": [
 *        {
 *            "announcementID": 1,
 *            "userID": 1,
 *            "title": "Hello",
 *            "body": "Hello",
 *            "isResolved": 1
 *        },
 *        {
 *            "announcementID": 2,
 *            "userID": 1,
 *            "title": "Hello",
 *            "body": "Hello world!",
 *            "isResolved": 0
 *        }
 *    ],
 *    "total": 2,
 *    "limit": 12,
 *    "page": 1,
 *    "pages": 1
 *		}
 * @apiError (Error 500) {Number} status status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */
router.get('/announcement', async (req, res) => {
  try {
    const announcements = await Ctrl.getAnnouncements(req.query);
    announcements.map(announcement => delete announcement.isResolved);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched announcements',
      data: announcements,
      total: announcements.length,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalAnnouncements(req.query)).total /
          parseInt(req.query.limit) || 12,
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Announcement/s not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /announcement/:announcementID getAnnouncement
 * @apiGroup Announcement
 * @apiName getAnnouncement
 *
 * @apiParam (Query Params) {Number} announcementID ID of announcement
 *
 * @apiSuccess {Object} data Announcement details
 * @apiSuccess {Number} data.announcementID ID of announcement
 * @apiSuccess {Number} data.userID ID of user who posted announcement
 * @apiSuccess {String} data.title title of announcement
 * @apiSuccess {String} data.body body of announcement
 * @apiSuccess {Boolean} data.isResolved isResolved indicates if announcement is resolved
 * @apiSuccess {Number} total Total amount of documents.
 * @apiSuccess {Number} limit Max number of documents
 * @apiSuccess {Number} page nth page this query is.
 * @apiSuccess {Number} pages Number of total pages.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 * 	{
 *     "status": 200,
 *     "message": "Successfully fetched announcement",
 *     "data":
 *         {
 *             "announcementID": 1,
 *             "userID": 1,
 *             "title": "Hello",
 *             "body": "Hello",
 *             "isResolved": 0
 *         }
 * }
 * @apiError (Error 500) {Number} status  status code
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
 * HTTP/1.1 404 Announcement not found
 * {
 *   "status": 404,
 *   "message": "Announcement not found"
 * }
 */
router.get('/announcement/:announcementID', async (req, res) => {
  try {
    const announcement = await Ctrl.getAnnouncement(req.params);
    delete announcement.isResolved;

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched announcement',
      data: announcement,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Announcement not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {put} /announcement/:announcementID updateAnnouncement
 * @apiGroup Announcement
 * @apiName updateAnnouncement
 *
 * @apiParam (Query Params) {Number} announcementID ID of announcement
 *
 * @apiParam (Body Params) {Number} [userID] ID of user who posted announcement
 * @apiParam (Body Params) {String} [title] title of the announcement
 * @apiParam (Body Params) {String} [body] body of the announcement
 * @apiParam (Body Params) {Boolean} [isResolved] isResolved indicates if announcement entry is resolved
 *
 * @apiSuccess {Object} data  Announcement updated
 * @apiSuccess {Number} data.announcementID ID of announcement
 * @apiSuccess {Number} data.userID ID of user who posted announcement
 * @apiSuccess {String} data.title title of announcement
 * @apiSuccess {String} data.body body of announcement
 * @apiSuccess {Boolean} data.isResolved isResolved indicates if announcement is resolved
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *   "status": 200,
 *    "message": "Successfully updated announcement",
 *    "data": {
 *        "announcementID": 2,
 *        "userID": 1,
 *        "title": "Hi",
 *        "body": "Hello world!",
 *        "isResolved": 0
 *    }
 *}
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
 * HTTP/1.1 404 Announcement not found
 * {
 *   "status": 404,
 *   "message": "Announcement not found"
 * }
 */
router.put('/announcement/:announcementID', isAdmin, async (req, res) => {
  try {
    req.body.userID = req.session.user.userID;
    await Ctrl.updateAnnouncement(req.params, req.body);
    const announcement = await Ctrl.getAnnouncement(req.params);
    delete announcement.isResolved;
    await addLog({
      action: 'UPDATE_ANNOUNCEMENT',
      changes: '',
      affectedID: announcement.announcementID,
      userID: req.session.user.userID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully updated announcement',
      data: announcement,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Announcement not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
  }
});

export default router;
