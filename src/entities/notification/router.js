import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

/**
 * @api {post} /notification addNotification
 * @apiGroup Notification
 * @apiName addNotification
 *
 * @apiParam (Body Params) {String} notificationID notification ID
 * @apiParam (Body Params) {String} senderID sender ID
 * @apiParam (Body Params) {String} receiverID receiver ID
 * @apiParam (Body Params) {String} message the message of sender to receiver
 * @apiParam (Body Params) {String} dateSent date when message is sent
 * @apiParam (Body Params) {String} timeSent time when message is sent
 * @apiParam (Body Params) {String} isResolved verification is message is resolved
 *
 * @apiSuccess {Object} notification new Notification is added
 * @apiSuccess {String} notification.notificationID notification ID
 * @apiSuccess {String} notification.senderID sender ID
 * @apiSuccess {String} notification.receiverID receiver ID
 * @apiSuccess {String} notification.message the message of sender to receiver
 * @apiSuccess {String} notification.dateSent date when message is sent
 * @apiSuccess {String} notification.timeSent time when message is sent
 * @apiSuccess {String} notification.isResolved verification is message is resolved
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *       "status": 200,
 *       "message": "Successfully updated notification",
 *       "data": [
            {
                "notificationID": 1,
                "senderID": "3",
                "receiverID": "5",
                "message": "HIIIIIIIIIIIIIIIIIIIIII",
                "dateSent": "2018-01-01",
                "timeSent": "01:01:01",
                "isResolved": 1
            } 
        ]
 *   }
 *
 * @apiError (Error 500) {String} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }
 */

router.post('/notification/', async (req, res) => {
  try {
    const notificationID = await Ctrl.addNotification(req.body);
    //const notification = await Ctrl.getCourse({ notificationID });

    res.status(200).json({
      status: 200,
      message: 'Successfully added notification',
      //  data: notification,
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
 * @apiParam (Query Params) {String} notificationID notificationID of notification
 *
 * @apiSuccess {Object} notification Notification notification deleted
 * @apiSuccess {String} notification.notificationID notification ID
 * @apiSuccess {String} notification.senderID sender ID
 * @apiSuccess {String} notification.receiverID receiver ID
 * @apiSuccess {String} notification.message the message of sender to receiver
 * @apiSuccess {String} notification.dateSent date when message is sent
 * @apiSuccess {String} notification.timeSent time when message is sent
 * @apiSuccess {String} notification.isResolved verification is message is resolved
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully deleted notification;
 *        "data": 
 *         {
            "notificationID": 1,
            "senderID": "3",
            "receiverID": "5",
            "message": "HIIIIIIIIIIIIIIIIIIIIII",
            "dateSent": "2018-01-01",
            "timeSent": "01:01:01",
            "isResolved": 1
 *        }
 *     }
 *   }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }

    HTTP/1.1 404 Notification not found
 * {
 *   "status": 404,
 *   "message": "Notification not found"
 * }
 */

router.delete('/notification/:notificationID', async (req, res) => {
  try {
    //const notification = await Ctrl.getCourse(req.params);

    await Ctrl.deleteNotification(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully deleted notification',
      //data: notification,
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
 * @apiParam (Query Params) {Integer} notificationID notificationID of notification
 * 
 * @apiSuccess {Object} notification Notification updated
 * @apiSuccess {String} notification.notificationID notification ID
 * @apiSuccess {String} notification.senderID id of user who sent the notification
 * @apiSuccess {String} notification.receiverID id of user who received the notification
 * @apiSuccess {String} notification.message content of the notification
 * @apiSuccess {String} notification.dateSent date notification is sent
 * @apiSuccess {String} notification.timeSent time notification is sent
 * @apiSuccess {String} notification.isResolved notification state
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *        "status": 200;
 *        "message": 'Succesfully got course details'
 *        "data": [
 *          {
            "notificationID": 1,
            "senderID": "05",
            "receiverID": "30",
            "message": "update",
            "dateSent": "2018-05-12",
            "timeSent": "23:23:11",
            "isResolved": 0,
 *        }
 *     ]
 *     }
 *   }
 *
 * @apiError (Error 500) {String[]} errors List of errors
 * @apiError (Error 500) {String} errors.message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }

    HTTP/1.1 404 Notification not found
 * {
 *   "status": 404,
 *   "message": "Notification not found"
 * }
 */

router.get('/notification/:notificationID', async (req, res) => {
  try {
    const notification = await Ctrl.getNotification(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched course',
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
 * @api {get} /notification getNotifications
 * @apiGroup Notification
 * @apiName getNotifications
 *
 * @apiSuccess {String} message Confirmation Message.
 * @apiSuccess {Object[]} notifications All notifications
 * @apiParam (Query Params) {Integer} notificationID id of notification
 * @apiParam (Body Params) {Integer} senderID id of user who sent the notification
 * @apiParam (Body Params) {Integer} receiverID id of user who received the notification
 * @apiParam (Body Params) {String} message content of the notification
 * @apiParam (Body Params) {Date} dateSent date notification is sent
 * @apiParam (Body Params) {Time} timeSent time notification is sent
 * @apiParam (Body Params) {Boolean} isResolved notification state
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *   {
        "message": "Successfully fetched notifications",
        "courses": [
            {
            "notificationID": 1,
            "senderID": "05",
            "receiverID": "30",
            "message": "update",
            "dateSent": "2018-05-12",
            "timeSent": "23:23:11",
            "isResolved": 0,
 *        }
        ]
    }
 *
 * @apiError (Error 500) {String[]} errors List of errors.
 * @apiError (Error 500) {String} errors.message Error message.
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "errors": [
 *        "Internal server error."
 *      ]
 *    }
 **/

router.get('/notification/', async (req, res) => {
  try {
    const notifications = await Ctrl.getNotifications(req.query);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched notifications',
      data: notifications,
      total: notifications.length,
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      //pages: Math.ceil(
      //(await Ctrl.getTotalNotifications()).total / (req.query.limit || 10),
      //),
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
 * @api {put} /notification/:notificationID updateNotification
 * @apiGroup Notification
 * @apiName updateNotification
 *
 * @apiParam (Query Params) {Integer} notificationID id of notification
 * @apiParam (Body Params) {Integer} senderID id of user who sent the notification
 * @apiParam (Body Params) {Integer} receiverID id of user who received the notification
 * @apiParam (Body Params) {String} message content of the notification
 * @apiParam (Body Params) {Date} dateSent date notification is sent
 * @apiParam (Body Params) {Time} timeSent time notification is sent
 * @apiParam (Body Params) {Boolean} isResolved notification state
 *
 * @apiSuccess {Object} notification Notification updated
 * @apiSuccess {Integer} notification.notificationID notification ID
 * @apiSuccess {Integer} notification.senderID id of user who sent the notification
 * @apiSuccess {Integer} notification.receiverID id of user who received the notification
 * @apiSuccess {String} notification.message content of the notification
 * @apiSuccess {Date} notification.dateSent date notification is sent
 * @apiSuccess {Time} notification.timeSent time notification is sent
 * @apiSuccess {Boolean} notification.isResolved notification state
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *       "status": 200,
 *       "message": "Successfully updated course",
 *       "data": [
 *         {
            "notificationID": 1,
            "senderID": "05",
            "receiverID": "30",
            "message": "update",
            "dateSent": "2018-05-12",
            "timeSent": "23:23:11",
            "isResolved": 0,
 *        }
 *      ]
 *   }
 *
 *
 * @apiError (Error 500) {String} status error status code
 * @apiError (Error 500) {String} message Error message
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "status": 500,
 *     "message": "Internal server error"
 *   }

    HTTP/1.1 404 Notification not found
 * {
 *   "status": 404,
 *   "message": "Notification not found"
 * }
 */

router.put('/notification/:notificationID', async (req, res) => {
  try {
    await Ctrl.updateNotification(req.params, req.body);
    const notification = await Ctrl.getNotification(req.params);

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
