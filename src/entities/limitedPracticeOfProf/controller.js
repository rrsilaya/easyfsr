import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const LimitedPracticeAttributes = [
  'id',
  'limitedPracticeOfProfID',
  'askedPermission',
  'date',
];

const searchFields = [
  'id',
  'limitedPracticeOfProfID',
  'askedPermission',
  'date',
];

export const addLimitedPracticeOfProf = limitedPracticeOfProf => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.addLimitedPracticeOfProf,
      limitedPracticeOfProf,
      (err, results) => {
        console.log(err);
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const updateLimitedPracticeOfProf = (
  { limitedPracticeOfProfID },
  limitedPracticeOfProf,
) => {
  return new Promise((resolve, reject) => {
    if (!limitedPracticeOfProf) return reject(500);
    db.query(
      Query.updateLimitedPracticeOfProf(
        filtered(limitedPracticeOfProf, LimitedPracticeAttributes),
      ),
      { limitedPracticeOfProfID, ...limitedPracticeOfProf },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const getLimitedPracticeOfProf = ({ limitedPracticeOfProfID }) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getLimitedPracticeOfProf,
      { limitedPracticeOfProfID },
      (err, results) => {
        if (err) return reject(500);
        else if (!results.length) return reject(404);
        return resolve(results[0]);
      },
    );
  });
};

export const deleteLimitedPracticeOfProf = ({ limitedPracticeOfProfID }) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.deleteLimitedPracticeOfProf,
      { limitedPracticeOfProfID },
      (err, results) => {
        console.log(err);
        if (err) return reject(500);
        else if (!results.affectedRows) return reject(404);
        return resolve();
      },
    );
  });
};

export const getLimitedPracticeOfProfs = limitedPracticeOfProf => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getLimitedPracticeOfProfs(
        filtered(limitedPracticeOfProf, LimitedPracticeAttributes),
        limitedPracticeOfProf.sortBy,
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
export const getTotalLimitedPracticeOfProfs = limitedPracticeOfProf => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalLimitedPracticeOfProfs(
        filtered(limitedPracticeOfProf, LimitedPracticeAttributes),
      ),
      {
        field: 'askedPermission',
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
