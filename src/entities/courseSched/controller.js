import db from '../../database/index';
import * as Query from './queries';
import { filtered } from '../../utils';

const courseSchedAttributes = ['courseSchedID', 'courseID', 'day', 'time'];
const searchFields = ['courseSchedID', 'day', 'time'];

export const addCourseSched = courseSched => {
  return new Promise((resolve, reject) => {
    db.query(Query.addCourseSched, { ...courseSched }, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

// export const updateCourseSched = ({ courseID }, courseSched) => {
//   return new Promise((resolve, reject) => {
//     if (!courseSched) return reject(500);
//     db.query(
//       Query.updateCourseSched(
//         Utils.filtered(courseSched, courseSchedAttributes),
//       ),
//       { courseNumber, ...courseSched },
//       (err, results) => {
//         // console.log(err);
//         if (err) return reject(500);
//         return resolve(results.insertId);
//       },
//     );
//   });
// };

// export const deleteCourseSched = ({ courseID }) => {
//   return new Promise((resolve, reject) => {
//     db.query(Query.deleteCourseSched, { courseID }, (err, results) => {
//       if (err) return reject(500);
//       return resolve(courseID);
//     });
//   });
// };

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
      Query.getCourseSched(
        filtered(courseNumber, courseSchedAttributes),
        award.sortBy,
      ),
      {
        field: 'courseSchedID',
        ...escapeSearch(courseSched, searchFields, courseSched.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        else if (!results) return reject(404);
        return resolve(results);
      },
    );
  });
};
