import db from '../../database/index';
import * as Query from './queries';
import { filtered } from '../../utils';

const creativeWorkAttributes = ['id', 'date', 'title', 'type', 'credUnit'];

export const addCreativeWork = creativeWork => {
  return new Promise((resolve, reject) => {
    db.query(Query.addCreativeWork, { ...creativeWork }, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const getAllCreativeWork = creativeWork => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getAllCreativeWork(filtered(creativeWork, creativeWorkAttributes)),
      creativeWork,
      (err, results) => {
        if (err) return reject(500);
        else if (!results.length) return reject(404);
        return resolve(results);
      },
    );
  });
};
