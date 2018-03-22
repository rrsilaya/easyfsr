import db from '../../database/index';
import * as Query from './queries';
import { filtered } from '../../utils';

const courseAttributes = [
  'id',
  'courseNumber',
  'courseID',
  'hoursPerWeek',
  'school',
  'credit',
];

export const addCourse = course => {
  return new Promise((resolve, reject) => {
    db.query(Query.addCourse, { ...course }, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const deleteCourse = ({ courseID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteCourse, { courseID }, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve(courseID);
    });
  });
};

export const getCourses = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getAllCourse, { id }, (err, results) => {
      if (err) return reject(500);
      else if (!results) return reject(404);
      return resolve(results);
    });
  });
};

export const getCourse = ({ courseID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getCourse, { courseID }, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results);
    });
  });
};

export const updateCourse = ({ courseID }, course) => {
  return new Promise((resolve, reject) => {
    if (!course) return reject(500);
    db.query(
      Query.updateCourse(filtered(course, courseAttributes)),
      { courseID, ...course },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};
