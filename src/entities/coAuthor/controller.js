import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const cworkCoAuthorAttributes = ['creativeWorkID', 'userID', 'cworkCoAuthorID'];

const searchFields = ['creativeWorkID', 'userID'];

export const addCworkCoAuthor = cworkCoAuthor => {
  return new Promise((resolve, reject) => {
    db.query(Query.addCworkCoAuthor, cworkCoAuthor, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateCworkCoAuthor = ({ cworkCoAuthorID }, cworkCoAuthor) => {
  return new Promise((resolve, reject) => {
    if (!cworkCoAuthor) return reject(500);
    db.query(
      Query.updateCworkCoAuthor(
        filtered(cworkCoAuthor, cworkCoAuthorAttributes),
      ),
      { cworkCoAuthorID, ...cworkCoAuthor },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteCworkCoAuthor = ({ cworkCoAuthorID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteCworkCoAuthor, { cworkCoAuthorID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};

export const getCworkCoAuthor = ({ cworkCoAuthorID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getCworkCoAuthor, { cworkCoAuthorID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results[0]);
    });
  });
};

export const getCworkCoAuthors = cworkCoAuthor => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getCworkCoAuthors(
        filtered(cworkCoAuthor, cworkCoAuthorAttributes),
        cworkCoAuthor.sortBy,
      ),
      {
        field: 'creativeWorkID',
        ...escapeSearch(cworkCoAuthor, searchFields, cworkCoAuthor.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const getTotalCworkCoAuthors = cworkCoAuthor => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalCworkCoAuthors(
        filtered(cworkCoAuthor, cworkCoAuthorAttributes),
      ),
      {
        field: 'userID',
        ...escapeSearch(cworkCoAuthor, searchFields, cworkCoAuthor.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results[0]);
      },
    );
  });
};
