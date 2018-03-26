import db from '../../database/index';
import * as Query from './queries';
import { filtered } from '../../utils';

const consultationHoursAttributes = ['chID', 'id', 'place'];

const timeSlotAttributes = ['chID', 'id', 'day', 'time'];

export const addConsultationHours = consultationHours => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.addConsultationHours,
      { ...consultationHours },
      (err, results) => {
        console.log(results);
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const updateConsultationHours = (
  { id },
  { chID },
  consultationHours,
) => {
  return new Promise((resolve, reject) => {
    if (!consultationHours) return reject(500);
    db.query(
      Query.updateConsultationHours(
        filtered(consultationHours, consultationHoursAttributes),
      ),
      { id, chID, ...consultationHours },
      (err, results) => {
        console.log(results);
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteConsultationHours = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteConsultationHours, { id }, (err, results) => {
      console.log(results);
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};

export const getAllConsultationHoursOfFSR = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getAllConsultationHoursOfFSR, { id }, (err, results) => {
      console.log(results);
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results);
    });
  });
};

export const getAllConsultationHours = () => {
  return new Promise((resolve, reject) => {
    db.query(Query.getAllConsultationHours, (err, results) => {
      console.log(results);
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results);
    });
  });
};

export const addTimeslot = chTimeslot => {
  return new Promise((resolve, reject) => {
    db.query(Query.addTimeslot, { ...chTimeslot }, (err, results) => {
      console.log(results);
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateTimeslot = ({ id }, { chID }, chTimeslot) => {
  return new Promise((resolve, reject) => {
    if (!chTimeslot) return reject(500);
    db.query(
      Query.updateTimeslot(filtered(chTimeslot, timeSlotAttributes)),
      { id, chID, ...chTimeslot },
      (err, results) => {
        console.log(results);
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteTimeslot = ({ id }, { chID }, { day }, { time }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteTimeslot, { id, chID, day, time }, (err, results) => {
      console.log(results);
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};
