import { Router } from 'express';
import * as Ctrl from './controller';
import { isAdmin } from '../../middlewares/middlewares';
import { getReceiverIDofNotification } from '../../middlewares/controller';
import { addLog } from './../log/controller';
import { getName } from './../user/controller';

const router = Router();

/**
 * @api {post} /notification addNotification
 * @apiGroup Notification
 * @apiName addNotification
 *
 * @apiParam (Body Params) {Number} receiverID receiver ID
 * @apiParam (Body Params) {String} message the message of sender to receiver
 * @apiParam (Body Params) {String} priority priority of the notification. 'LOW', 'NORMAL', 'HIGH'. Default: 'NORMAL'
 *
 * @apiSuccess {Object} data New notification added
 * @apiSuccess {Number} data.notificationID notification ID
 * @apiSuccess {Number} data.receiverID receiver ID
 * @apiSuccess {String} data.message the message of sender to receiver
 * @apiSuccess {Datetime} data.timestamp timestamp when message is sent
 * @apiSuccess {String} data.priority priority of the notification
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "status": 200,
 *      "message": 'Successfully created notification',
 *      "data":
 *       {
 *          "notificationID": 1,
 *          "receiverID": "5",
 *          "message": "HIIIIIIIIIIIIIIIIIIIIII",
 *          "timestamp": "2018-04-18T15:45:37.000Z",
 *          "priority": "NORMAL"
 *       }
 *   }
 *
 * @apiError (Error 500) {Number} status  status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.post('/notification/', isAdmin, async (req, res) => {
  try {
    req.body.senderID = req.session.user.userID;
    const notificationID = await Ctrl.addNotification(req.body);
    const notification = await Ctrl.getNotification({ notificationID });
    notification.senderName = await getName({ userID: notification.senderID });
    notification.receiverName = await getName({
      userID: notification.receiverID,
    });
    delete notification.isResolved;
    await addLog({
      action: 'INSERT_NOTIFICATION',
      changes: '',
      affectedID: notificationID,
      userID: req.session.user.userID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully added notification',
      data: notification,
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
 * @api {delete} /notification/:notificationID deleteNotification
 * @apiGroup Notification
 * @apiName deleteNotification
 *
 * @apiParam (Query Params) {Number} notificationID notificationID of notification
 *
 * @apiSuccess {Object} data Notification deleted
 * @apiSuccess {Number} data.notificationID notification ID
 * @apiSuccess {Number} data.receiverID receiver ID
 * @apiSuccess {String} data.message the message of sender to receiver
 * @apiSuccess {Date} data.dateSent date when message is sent
 * @apiSuccess {Time} data.timeSent time when message is sent
 * @apiSuccess {Boolean} data.isResolved verification is message is resolved
 * @apiSuccess {String} data.priority priority of the notification
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *       "status": 200;
 *       "message": 'Succesfully deleted notification;
 *       "data":
 *        {
 *          "notificationID": 1,
 *          "receiverID": "5",
 *          "message": "HIIIIIIIIIIIIIIIIIIIIII",
 *          "timestamp": "2018-04-18T14:36:56.000Z",
 *          "priority": "NORMAL"
 *        }
 *
 *   }
 *
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
 * HTTP/1.1 404 Notification not found
 * {
 *   "status": 404,
 *   "message": "Notification not found"
 * }
 */

router.delete('/notification/:notificationID', isAdmin, async (req, res) => {
  try {
    const notification = await Ctrl.getNotification(req.params);
    notification.senderName = await getName({ userID: notification.senderID });
    notification.receiverName = await getName({
      userID: notification.receiverID,
    });
    await Ctrl.deleteNotification(req.params);

    await addLog({
      action: 'DELETE_NOTIFICATION',
      changes: '',
      affectedID: notification.notificationID,
      userID: req.session.user.userID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted notification',
      data: notification,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Notification not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /notification/:notificationID getNotification
 * @apiGroup Notification
 * @apiName getNotification
 *
 * @apiParam (Query Params) {Number} notificationID notificationID of notification
 *
 * @apiSuccess {Object} data Notification fetched
 * @apiSuccess {Number} data.notificationID notification ID
 * @apiSuccess {Number} data.senderID sender ID
 * @apiSuccess {Number} data.receiverID receiver ID
 * @apiSuccess {String} data.message the message of sender to receiver
 * @apiSuccess {Date} data.dateSent date when message is sent
 * @apiSuccess {Time} data.timeSent time when message is sent
 * @apiSuccess {Boolean} data.isResolved verification is message is resolved
 * @apiSuccess {String} data.priority priority of the notification
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *       "status": 200;
 *       "message": 'Succesfully fetched notification;
 *       "data":
 *        {
 *          "notificationID": 1,
 *          "senderID": "3",
 *          "receiverID": "5",
 *          "message": "HIIIIIIIIIIIIIIIIIIIIII",
 *          "dateSent": "2018-01-01",
 *          "timeSent": "01:01:01",
 *          "isResolved": 1,
 *          "priority": "LOW"
 *        }
 *
 *   }
 *
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
 * HTTP/1.1 404 Notification not found
 * {
 *   "status": 404,
 *   "message": "Notification not found"
 * }
 */

router.get('/notification/:notificationID', async (req, res) => {
  try {
    let receiverIDofNotification = '';
    if (req.session.user.acctType === 'USER')
      receiverIDofNotification = await getReceiverIDofNotification(
        req.params.notificationID,
        req.session.user.userID,
      );
    let notification = await Ctrl.getNotification(req.params);
    notification.senderName = await getName({ userID: notification.senderID });
    notification.receiverName = await getName({
      userID: notification.receiverID,
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched notification',
      data: notification,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 403:
        message = 'Unauthorized access';
        break;
      case 404:
        message = 'Notification not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {get} /notification getNotifications
 * @apiGroup Notification
 * @apiName getNotifications
 *
 * @apiParam (Query Params) {Number} [notificationID] id of notification
 * @apiParam (Query Params) {Number} [senderID] id of user who sent the notification
 * @apiParam (Query Params) {Number} [receiverID] id of user who received the notification
 * @apiParam (Query Params) {String} [message] content of the notification
 * @apiParam (Query Params) {Date} [dateSent] date notification is sent
 * @apiParam (Query Params) {Time} [timeSent] time notification is sent
 * @apiParam (Query Params) {Boolean} [isResolved] notification state
 * @apiParam (Query Params) {String} [priority] priority of the notification
 * @apiParam (Query Params) {Number} [page] page number
 * @apiParam (Query Params) {Number} [limit] count limit of notifications to fetch
 * @apiParam (Query Params) {String} [sortBy] sort data by 'ASC' or 'DESC'
 * @apiParam (Query Params) {String} [field] order data depending on this field. Default value is 'courseNumber'
 *
 * @apiSuccess {Object[]} data Notifications fetched
 * @apiSuccess {Number} data.notificationID id of notification
 * @apiSuccess {Number} data.senderID id of user who sent the notification
 * @apiSuccess {Number} data.receiverID id of user who received the notification
 * @apiSuccess {String} data.message content of the notification
 * @apiSuccess {Date} data.dateSent date notification is sent
 * @apiSuccess {Time} data.timeSent time notification is sent
 * @apiSuccess {Boolean} data.isResolved notification state
 * @apiSuccess {String} data.priority priority of the notification
 * @apiSuccess {Number} total total number of notifications
 * @apiSuccess {Number} limit limit of notifications per page
 * @apiSuccess {Number} page page number
 * @apiSuccess {Number} pages number of pages
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *   {
 *      "status": 200,
 *      "message": "Successfully fetched notifications",
 *      "data": [
 *        {
 *          "notificationID": 1,
 *          "senderID": "05",
 *          "receiverID": "30",
 *          "message": "update",
 *          "dateSent": "2018-05-12",
 *          "timeSent": "23:23:11",
 *          "isResolved": 0,
 *          "priority": "LOW"
 *        },
 *        {
 *          "notificationID": 2,
 *          "senderID": "10",
 *          "receiverID": "15",
 *          "message": "update",
 *          "dateSent": "2018-05-19",
 *          "timeSent": "23:11:11",
 *          "isResolved": 0,
 *          "priority": "LOW"
 *        }
 *      ],
 *    "total": 2,
 *    "limit": 10,
 *    "page": 1,
 *    "pages": 1
 *  }
 *
 * @apiError (Error 500) {Number} status  status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *     "status": 500,
 *     "message": "Internal server error"
 *    }
 **/

router.get('/notification/', async (req, res) => {
  try {
    req.session.user.acctType === 'USER'
      ? (req.query.receiverID = req.session.user.userID)
      : '';
    const notifications = await Ctrl.getNotifications(
      req.query,
      req.query.receiverID,
    );
    notifications.forEach(async notif => {
      notif.senderName = await getName({ userID: notif.senderID });
      notif.receiverName = await getName({ userID: req.query.receiverID });
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched notifications',
      data: notifications,
      total: (await Ctrl.getTotalNotifs(req.query, req.query.receiverID)).total,
      limit: parseInt(req.query.limit) || 12,
      page: parseInt(req.query.page) || 1,
      pages: Math.ceil(
        (await Ctrl.getTotalNotifs(req.query, req.query.receiverID)).total /
          (parseInt(req.query.limit) || 12),
      ),
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Notification/s not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

/**
 * @api {put} /notification/:notificationID updateNotification
 * @apiGroup Notification
 * @apiName updateNotification
 *
 * @apiParam (Query Params) {Number} notificationID id of notification
 *
 * @apiParam (Body Params) {Number} [senderID] id of user who sent the notification
 * @apiParam (Body Params) {Number} [receiverID] id of user who received the notification
 * @apiParam (Body Params) {String} [message] content of the notification
 * @apiParam (Body Params) {Date} [dateSent] date notification is sent
 * @apiParam (Body Params) {Time} [timeSent] time notification is sent
 * @apiParam (Body Params) {Boolean} [isResolved] notification state
 * @apiParam (Body Params) {String} [priority] priority of the notification
 *
 * @apiSuccess {Object} data Notification updated
 * @apiSuccess {Number} data.notificationID notification ID
 * @apiSuccess {Number} data.senderID sender ID
 * @apiSuccess {Number} data.receiverID receiver ID
 * @apiSuccess {String} data.message the message of sender to receiver
 * @apiSuccess {Date} data.dateSent date when message is sent
 * @apiSuccess {Time} data.timeSent time when message is sent
 * @apiSuccess {Boolean} data.isResolved verification is message is resolved
 * @apiSuccess {String} data.priority priority of the notification
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *       "status": 200,
 *       "message": "Successfully updated notification",
 *       "data":
 *         {
 *          "notificationID": 1,
 *          "senderID": "05",
 *          "receiverID": "30",
 *          "message": "update",
 *          "dateSent": "2018-05-12",
 *          "timeSent": "23:23:11",
 *          "isResolved": 0,
 *          "priority": "LOW"
 *        }
 *
 *   }
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
 * HTTP/1.1 404 Notification not found
 * {
 *   "status": 404,
 *   "message": "Notification not found"
 * }
 */

router.put('/notification/:notificationID', isAdmin, async (req, res) => {
  try {
    await Ctrl.updateNotification(req.params, req.body);
    const notification = await Ctrl.getNotification(req.params);
    notification.senderName = await getName({ userID: notification.senderID });
    notification.receiverName = await getName({
      userID: notification.receiverID,
    });
    await addLog({
      action: 'UPDATE_NOTIFICATION',
      changes: '',
      affectedID: notification.notificationID,
      userID: req.session.user.userID,
    });
    res.status(200).json({
      status: 200,
      message: 'Successfully updated notification',
      data: notification,
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Notification not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
