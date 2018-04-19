import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const notificationAttributes = [
  'notificationID',
  'senderID',
  'receiverID',
  'message',
  'timestamp',
  'isResolved',
  'priority',
];

const searchFields = ['dateSent', 'isResolved', 'priority'];

export const addNotification = notification => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.addNotification,
      { priority: 'NORMAL', ...notification },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteNotification = ({ notificationID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteNotification, { notificationID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};

export const getNotification = ({ notificationID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getNotification, { notificationID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results[0]);
    });
  });
};

export const getNotifications = (notification, receiverID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getNotifications(
        filtered(notification, notificationAttributes),
        notification.sortBy,
        receiverID,
      ),
      {
        field: 'message',
        ...escapeSearch(notification, searchFields, notification.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const getTotalNotifs = (notification, receiverID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalNotifications(
        filtered(notification, notificationAttributes),
        receiverID,
      ),
      {
        field: 'message',
        ...escapeSearch(notification, searchFields, notification.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results[0]);
      },
    );
  });
};

export const updateNotification = ({ notificationID }, notification) => {
  return new Promise((resolve, reject) => {
    if (!notification) return reject(500);
    notification.timestamp = Date.now();
    db.query(
      Query.updateNotification(filtered(notification, notificationAttributes)),
      { notificationID, ...notification },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};
