import db from '../../database/index';
import * as Query from './queries';
import { filtered } from '../../utils';

const courseAttributes = ['hoursPerWeek', 'school', 'credit', 'courseNumber'];

export const addCourse = course => {
  return new Promise((resolve, reject) => {
    db.query(Query.addCourse, { ...course }, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateCourse = ({ courseNumber }, course) => {
  return new Promise((resolve, reject) => {
    if (!course) return reject(500);
    db.query(
      Query.updateCourse(filtered(course, courseAttributes)),
      { courseNumber, ...course },
      (err, results) => {
        if (err) return reject(500);
        console.log(results);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteCourse = ({ courseNumber }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteCourse, { courseNumber }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve(courseNumber);
    });
  });
};

export const getCourses = course => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getCourses(filtered(course, courseAttributes)),
      course,
      (err, results) => {
        if (err) return reject(500);
        else if (!results) return reject(404);
        return resolve(results);
      },
    );
  });
};

export const getCourse = ({ courseNumber }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getCourse, { courseNumber }, (err, results) => {
      console.log(courseNumber);
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results);
    });
  });
};
