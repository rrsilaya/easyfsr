import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const timeslotAttributes = ['subjectID', 'day', 'time'];

const searchFields = ['day', 'time'];

export const addTimeslot = timeslot => {
  return new Promise((resolve, reject) => {
    db.query(Query.addTimeslot, { ...timeslot }, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const getTimeslots = timeslot => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTimeslots(
        filtered(timeslot, timeslotAttributes),
        timeslot.sortBy,
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
      console.log(err);
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results);
    });
  });
};

export const updateTimeslot = ({ timeslotID }, timeslot) => {
  return new Promise((resolve, reject) => {
    if (!timeslot) return reject(500);
    db.query(
      Query.updateTimeslot(filtered(timeslot, timeslotAttributes)),
      { timeslotID, ...timeslot },
      (err, results) => {
        console.log(err);
        if (err) return reject(500);
        return resolve(results.timeslotID);
      },
    );
  });
};

export const deleteTimeslot = ({ timeslotID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteTimeslot, { timeslotID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve(results.insertId);
    });
  });
};
