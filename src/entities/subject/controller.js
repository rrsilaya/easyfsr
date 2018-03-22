import db from '../../database/index';
import * as Query from './queries';
import { filtered } from '../../utils';

const subjectAttributes = [
  'id',
  'subjectCode',
  'teachingLoadCreds',
  'noOfStudents',
  'hoursPerWeek',
  'sectionCode',
  'room',
];

export const addSubject = subject => {
  return new Promise((resolve, reject) => {
    db.query(Query.addSubject, { ...subject }, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateSubject = ({ id }, subject) => {
  return new Promise((resolve, reject) => {
    if (!subject) return reject(500);
    db.query(
      Query.updateSubject(filtered(subject, subjectAttributes)),
      { id, ...subject },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

/*export const addTimeslot = timeslot => {
  return new Promise((resolve, reject) => {
    db.query(Query.addTimeslot, { ...timeslot }, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};*/

export const getSubjects = subject => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getSubjects(filtered(subject, subjectAttributes)),
      subject,
      (err, results) => {
        if (err) return reject(500);
        else if (!results.length) return reject(404);
        return resolve(results);
      },
    );
  });
};

export const getSubject = subject => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getSubject(filtered(subject, subjectAttributes)),
      subject,
      (err, results) => {
        console.log(err);
        if (err) return reject(500);
        else if (!results.length) return reject(404);
        return resolve(results);
      },
    );
  });
};

export const deleteSubject = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteSubject, { id }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve(id);
    });
  });
};
