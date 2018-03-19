import db from '../../database/index';
import * as Query from './queries';
import * as Utils from '../../utils';

const courseSchedAttributes = ['courseNumber', 'day', 'time'];

export const addCourseSched = courseSched => {
  return new Promise((resolve, reject) => {
    db.query(Query.addCourseSched, { ...courseSched }, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateCourseSched = ({ courseNumber }, courseSched) => {
  return new Promise((resolve, reject) => {
    if (!courseSched) return reject(500);
    db.query(
      Query.updateCourseSched(
        Utils.filtered(courseSched, courseSchedAttributes),
      ),
      { courseNumber, ...courseSched },
      (err, results) => {
        // console.log(err);
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteCourseSched = ({ courseNumber }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteCourseSched, { courseNumber }, (err, results) => {
      if (err) return reject(500);
      return resolve(courseNumber);
    });
  });
};

export const getCourseSched = ({ courseNumber }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getCourseSched, { courseNumber }, (err, results) => {
      if (err) return reject(500);
      else if (results.length == 0) return reject(404);
      return resolve(results);
    });
  });
};
