import db from '../../database/index';
import * as Query from './queries';
import { filtered } from '../../utils';

const coAuthorAttributes = ['creativeWorkID', 'userID'];

const searchFields = ['creativeWorkID', 'userID'];

export const addCoAuthor = coAuthor => {
  return new Promise((resolve, reject) => {
    db.query(Query.addCoAuthor, { ...coAuthor }, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateCoAuthor = coAuthor => {
  return new Promise((resolve, reject) => {
    if (!coAuthor) return reject(500);
    db.query(
      Query.updateCoAuthor(filtered(coAuthor, coAuthorAttributes)),
      { coAuthorID, ...coAuthor },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteCoAuthor = ({ coAuthorID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteCoAuthor, { coAuthorID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};

export const getCoAuthor = ({ coAuthorID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getCoAuthor, { coAuthorID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results);
    });
  });
};
