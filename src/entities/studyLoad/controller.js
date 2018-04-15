import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const studyLoadAttributes = [
  'fullLeaveWithPay',
  'fellowshipRecipient',
  'degree',
  'university',
  'totalSLcredits',
];

const searchFields = [
  'id',
  'fullLeaveWithPay',
  'fellowshipRecipient',
  'degree',
  'university',
  'totalSLcredits',
];

export const addStudyLoad = studyLoad => {
  return new Promise((resolve, reject) => {
    db.query(Query.addStudyLoad, studyLoad, (err, results) => {
      if (err) return reject(500);
      return resolve(studyLoad.id);
    });
  });
};

export const updateStudyLoad = ({ id }, studyLoad) => {
  return new Promise((resolve, reject) => {
    if (!studyLoad) return reject(500);
    db.query(
      Query.updateStudyLoad(filtered(studyLoad, studyLoadAttributes)),
      { id, ...studyLoad },
      (err, results) => {
        if (err) return reject(500);
        return resolve(studyLoad.id);
      },
    );
  });
};

export const deleteStudyLoad = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteStudyLoad, { id }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};

export const getStudyLoad = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getStudyLoad, { id }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results[0]);
    });
  });
};

export const getStudyLoads = (studyLoad, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getStudyLoads(
        filtered(studyLoad, studyLoadAttributes),
        studyLoad.sortBy,
        userID,
      ),
      {
        field: 'fullLeaveWithPay',
        ...escapeSearch(studyLoad, searchFields, studyLoad.limit),
      },
      (err, results) => {
        console.log(err);
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const getTotalStudyLoad = (studyLoad, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalStudyLoad(filtered(studyLoad, studyLoadAttributes), userID),
      {
        field: 'fullLeaveWithPay',
        ...escapeSearch(studyLoad, searchFields, studyLoad.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results[0]);
      },
    );
  });
};
