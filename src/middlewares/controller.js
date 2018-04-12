import db from '../database/index';
import * as Query from './queries';

export const getUserIDofFSR = (id, userID) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getUserIDofFSR, { id }, (err, results) => {
      if (err) return reject(500);
      console.log(results);
      try {
        const result = results[0].userID;

        if (result == userID) return resolve(result);
        else return reject(403);
      } catch (status) {
        if (results.length == 0) return reject(404);
        else return reject(403);
      }
    });
  });
};
