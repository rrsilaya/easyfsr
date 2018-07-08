import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const courseAttributes = ['id', 'courseNumber', 'courseID', 'school', 'credit'];

const searchFields = ['courseNumber', 'school', 'credit', 'hoursPerWeek'];

export const addCourse = course => {
  return new Promise((resolve, reject) => {
    db.query(Query.addCourse, course, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
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

export const deleteCourse = ({ courseID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteCourse, { courseID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};

export const getCourse = ({ courseID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getCourse, { courseID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results[0]);
    });
  });
};

export const getCourses = (course, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getCourses(
        filtered(course, courseAttributes),
        course.sortBy,
        userID,
      ),
      {
        field: 'courseNumber',
        ...escapeSearch(course, searchFields, course.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const getTotalCourses = (course, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalCourses(filtered(course, courseAttributes), userID),
      {
        field: 'courseNumber',
        ...escapeSearch(course, searchFields, course.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results[0]);
      },
    );
  });
};

export const getCoursesWithSched = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getCoursesWithSched, { id }, (err, results) => {
      if (err) return reject(500);
      return resolve(results);
    });
  });
};
