import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const courseSchedAttributes = [
  'courseSchedID',
  'courseID',
  'day',
  'timeStart',
  'timeEnd',
];

const searchFields = ['courseID', 'day', 'timeStart', 'timeEnd'];

export const addCourseSched = courseSched => {
  return new Promise((resolve, reject) => {
    db.query(Query.addCourseSched, { courseSched }, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateCourseSched = ({ courseSchedID }, courseSched) => {
  return new Promise((resolve, reject) => {
    if (!courseSched) return reject(500);
    db.query(
      Query.updateCourseSched(filtered(courseSched, courseSchedAttributes)),
      { courseSchedID, ...courseSched },
      (err, results) => {
        console.log(err);
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteCourseSched = ({ courseSchedID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteCourseSched, { courseSchedID }, (err, results) => {
      if (err) return reject(500);
      return resolve(courseSchedID);
    });
  });
};

export const getCourseSched = ({ courseSchedID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getCourseSched, { courseSchedID }, (err, results) => {
      if (err) return reject(500);
      else if (results.length == 0) return reject(404);
      return resolve(results);
    });
  });
};

export const getCourseScheds = courseSched => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getCourseScheds(
        filtered(courseSched, courseSchedAttributes),
        courseSched.sortBy,
      ),
      {
        field: 'courseSchedID',
        ...escapeSearch(courseSched, searchFields, courseSched.limit),
      },
      (err, results) => {
        console.log(err);
        if (err) return reject(500);
        else if (!results) return reject(404);
        return resolve(results);
      },
    );
  });
};

export const getTotalCourseScheds = () => {
  return new Promise((resolve, reject) => {
    db.query(Query.getTotalCourseScheds, (err, results) => {
      if (err) return reject(500);
      return resolve(results[0]);
    });
  });
};
