import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const LtdPractAttributes = ['id', 'askedPermission', 'date'];

const searchFields = ['askedPermission', 'date'];

export const addLtdPractOfProf = limitedPracticeOfProf => {
  return new Promise((resolve, reject) => {
    db.query(Query.addLtdPractOfProf, limitedPracticeOfProf, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateLtdPractOfProf = ({ id }, limitedPracticeOfProf) => {
  return new Promise((resolve, reject) => {
    if (!limitedPracticeOfProf) return reject(500);
    db.query(
      Query.updateLtdPractOfProf(
        filtered(limitedPracticeOfProf, LtdPractAttributes),
      ),
      { id, ...limitedPracticeOfProf },
      (err, results) => {
        if (err) return reject(500);
        return resolve(id);
      },
    );
  });
};

export const getLtdPractOfProf = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getLtdPractOfProf, { id }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results[0]);
    });
  });
};

export const deleteLtdPractOfProf = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteLtdPractOfProf, { id }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};

export const getLtdPractOfProfs = (limitedPracticeOfProf, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getLtdPractOfProfs(
        filtered(limitedPracticeOfProf, LtdPractAttributes),
        limitedPracticeOfProf.sortBy,
        userID,
      ),
      {
        field: 'id',
        ...escapeSearch(
          limitedPracticeOfProf,
          searchFields,
          limitedPracticeOfProf.limit,
        ),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};
export const getTotalLtdPractOfProfs = (limitedPracticeOfProf, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalLtdPractOfProfs(
        filtered(limitedPracticeOfProf, LtdPractAttributes),
        userID,
      ),
      {
        field: 'id',
        ...escapeSearch(
          limitedPracticeOfProf,
          searchFields,
          limitedPracticeOfProf.limit,
        ),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results[0]);
      },
    );
  });
};
