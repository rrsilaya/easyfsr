import db from '../../database/index';
import * as Query from './queries';
import { filtered } from '../../utils';

const courseSchedAttributes = ['courseID', 'day', 'time'];

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

// export const getCourseSched = ({ courseNumber }) => {
//   return new Promise((resolve, reject) => {
//     db.query(Query.getCourseSched, { courseNumber }, (err, results) => {
//       if (err) return reject(500);
//       else if (results.length == 0) return reject(404);
//       return resolve(results);
//     });
//   });
// };

// export const getCourseSchedules = ({ courseNumber }) => {
//   return new Promise((resolve, reject) => {
//     db.query(Query.getCourseSchedules(courseNumber), (err, results) => {
//       if (err) return reject(500);
//       else if (!results) return reject(404);
//       return resolve(results);
//     });
//   });
// };
