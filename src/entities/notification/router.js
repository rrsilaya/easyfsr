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

export default router;
