import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';
import moment from 'moment';

const timeslotAttributes = ['subjectID', 'day', 'timeStart', 'timeEnd'];

const searchFields = ['day', 'timeStart', 'timeEnd'];

export const addTimeslot = timeslot => {
  return new Promise((resolve, reject) => {
    const timeStart = moment(timeslot.timeStart, 'HH:mm:ss');
    const timeEnd = moment(timeslot.timeEnd, 'HH:mm:ss');

    if (!moment(timeStart).isBefore(timeEnd)) return reject(400);
    db.query(Query.addTimeslot, timeslot, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const getTimeslots = (timeslot, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTimeslots(
        filtered(timeslot, timeslotAttributes),
        timeslot.sortBy,
        userID,
      ),
      {
        field: 'day',
        ...escapeSearch(timeslot, searchFields, timeslot.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const getTimeslot = ({ timeslotID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getTimeslot, { timeslotID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results[0]);
    });
  });
};

export const updateTimeslot = ({ timeslotID }, timeslot) => {
  return new Promise((resolve, reject) => {
    const timeStart = moment(timeslot.timeStart, 'HH:mm:ss');
    const timeEnd = moment(timeslot.timeEnd, 'HH:mm:ss');

    if (!moment(timeStart).isBefore(timeEnd)) return reject(400);
    if (!timeslot) return reject(500);
    db.query(
      Query.updateTimeslot(filtered(timeslot, timeslotAttributes)),
      { timeslotID, ...timeslot },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteTimeslot = ({ timeslotID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteTimeslot, { timeslotID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};

export const getTotalTimeslots = (timeslot, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalTimeslots(filtered(timeslot, timeslotAttributes), userID),
      {
        field: 'day',
        ...escapeSearch(timeslot, searchFields, timeslot.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results[0]);
      },
    );
  });
};
