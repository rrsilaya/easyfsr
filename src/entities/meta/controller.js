import db from '../../database';
import * as Query from './queries';

export const getMetadata = () => {
  return new Promise((resolve, reject) => {
    db.query(Query.getMetadata, (err, results) => {
      if (err) return reject(500);

      return resolve(results[0]);
    });
  });
};
