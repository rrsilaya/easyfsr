import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const notificationAttributes = [
  'notificationID',
  'senderID',
  'receiverID',
  'message',
  'dateSent',
  'timeSent',
  'isResolved',
];

const searchFields = [
  'notificationID',
  'senderID',
  'receiverID',
  'dateSent',
  'isResolved',
];

export const addNotification = notification => {
  return new Promise((resolve, reject) => {
    db.query(Query.addNotification, { ...notification }, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      return resolve(results.insertId);
    });
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
