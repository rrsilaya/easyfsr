import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const consultationHoursAttributes = [
  'chID',
  'id',
  'place',
  'day',
  'timeStart',
  'timeEnd',
];
const fields = ['id', 'place', 'day', 'timeStart', 'timeEnd'];

export const addConsultationHour = consultationHours => {
  return new Promise((resolve, reject) => {
    db.query(Query.addConsultationHour, consultationHours, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateConsultationHour = ({ chID }, consultationHour) => {
  return new Promise((resolve, reject) => {
    if (!consultationHour) return reject(500);
    db.query(
      Query.updateConsultationHour(
        filtered(consultationHour, consultationHoursAttributes),
      ),
      { chID, ...consultationHour },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteConsultationHour = ({ chID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteConsultationHour, { chID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};

export const getConsultationHour = ({ chID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getConsultationHour, { chID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results[0]);
    });
  });
};

export const getConsultationHours = (consultationHours, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getConsultationHours(
        filtered(consultationHours, consultationHoursAttributes),
        consultationHours.sortBy,
        userID,
      ),

      {
        field: 'day',
        ...escapeSearch(consultationHours, fields, consultationHours.limit),
      },

      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const getTotalConsultationHours = (consultationHours, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalConsultationHours(
        filtered(consultationHours, consultationHoursAttributes),
        userID,
      ),
      {
        field: 'day',
        ...escapeSearch(consultationHours, fields, consultationHours.limit),
      },

      (err, results) => {
        if (err) return reject(500);
        return resolve(results[0]);
      },
    );
  });
};
