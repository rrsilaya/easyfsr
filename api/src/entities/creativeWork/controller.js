import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const creativeWorkAttributes = [
  'id',
  'date',
  'title',
  'type',
  'credUnit',
  'filepath',
  'coAuthor',
];

const searchFields = ['date', 'title', 'type', 'credUnit', 'coAuthor'];

export const addCreativeWork = creativeWork => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.addCreativeWork,
      { coAuthor: '', filepath: '', ...creativeWork },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const getCreativeWorks = (creativeWork, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getCreativeWorks(
        filtered(creativeWork, creativeWorkAttributes),
        creativeWork.sortBy,
        userID,
      ),
      {
        field: 'date',
        ...escapeSearch(creativeWork, searchFields, creativeWork.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const updateCreativeWork = ({ creativeWorkID }, creativeWork) => {
  return new Promise((resolve, reject) => {
    if (!creativeWork) return reject(500);
    db.query(
      Query.updateCreativeWork(filtered(creativeWork, creativeWorkAttributes)),
      { creativeWorkID, ...creativeWork },
      (err, results) => {
        if (err) {
          return reject(500);
        }
        return resolve(results.insertID);
      },
    );
  });
};

export const deleteCreativeWork = ({ creativeWorkID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteCreativeWork, { creativeWorkID }, (err, results) => {
      if (err) {
        return reject(500);
      } else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};

export const getCreativeWork = ({ creativeWorkID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getCreativeWork, { creativeWorkID }, (err, results) => {
      if (err) {
        return reject(500);
      } else if (!results.length) return reject(404);
      return resolve(results[0]);
    });
  });
};

export const getTotalCreativeWorks = (creativeWork, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalCreativeWorks(
        filtered(creativeWork, creativeWorkAttributes),
        userID,
      ),
      {
        field: 'date',
        ...escapeSearch(creativeWork, searchFields, creativeWork.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results[0]);
      },
    );
  });
};
