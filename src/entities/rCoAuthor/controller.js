import db from '../../database/index';
import * as Query from './queries';
import { filtered } from '../../utils';

const rCoAuthorAttributes = ['researchID', 'rCoAuthorID', 'name'];

const searchFields = ['researchID', 'name'];

export const addrCoAuthor = rCoAuthor => {
  return new Promise((resolve, reject) => {
    db.query(Query.addrCoAuthor, rCoAuthor, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const getrCoAuthor = ({ rCoAuthorID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getrCoAuthor, { rCoAuthorID }, (err, results) => {
      if (err) return reject(500);
      return resolve(results[0]);
    });
  });
};

export const updaterCoAuthor = ({ rCoAuthorID }, rCoAuthor) => {
  return new Promise((resolve, reject) => {
    if (!rCoAuthor) return reject(500);
    db.query(
      Query.updaterCoAuthor(filtered(rCoAuthor, rCoAuthorAttributes)),
      { rCoAuthorID, ...rCoAuthor },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleterCoAuthor = ({ rCoAuthorID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleterCoAuthor, { rCoAuthorID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};

export const getrCoAuthors = rCoAuthor => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getrCoAuthors(
        filtered(rCoAuthor, rCoAuthorAttributes),
        rCoAuthor.sortBy,
      ),
      {
        field: 'name',
        ...escapeSearch(rCoAuthor, searchFields, rCoAuthor.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const getTotalrCoAuthors = rCoAuthor => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalResearches(filtered(rCoAuthor, rCoAuthorAttributes)),
      {
        field: 'name',
        ...escapeSearch(rCoAuthor, searchFields, rCoAuthor.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results[0]);
      },
    );
  });
};
