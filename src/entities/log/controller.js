import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const searchFields = ['timestamp', 'action', 'changes'];

export const getLog = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getLog, { id }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results[0]);
    });
  });
};

export const getLogs = log => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getLogs(filtered(log, searchFields), log.sortBy),
      {
        field: 'action',
        ...escapeSearch(log, searchFields, log.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const getTotalLogs = log => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalLogs(filtered(log, searchFields)),
      {
        field: 'action',
        ...escapeSearch(log, searchFields, log.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results[0]);
      },
    );
  });
};

export const addLog = log => {
  return new Promise((resolve, reject) => {
    db.query(Query.addLog, log, (err, results) => {
      if (err) return reject(500);
      return resolve();
    });
  });
};
