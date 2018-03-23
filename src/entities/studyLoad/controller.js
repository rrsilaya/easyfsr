import db from '../../database/index';
import * as Query from './queries';
import * as Utils from '../../utils';
import { filtered } from '../../utils';

const studyLoadAttributes = ['id', 'degree', 'university', 'totalSLcredits'];

export const addStudyLoad = studyLoad => {
  return new Promise((resolve, reject) => {
    db.query(Query.addStudyLoad, { ...studyLoad }, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateStudyLoad = ({ id }, studyLoad) => {
  return new Promise((resolve, reject) => {
    if (!studyLoad) return reject(500);
    db.query(
      Query.updateStudyLoad(Utils.filtered(studyLoad, studyLoadAttributes)),
      { id, ...studyLoad },
      (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        // else if (!results.length) return reject(404);
        return resolve(results.insertId);
      },
    );
  });
};

export const getStudyLoad = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getStudyLoad, { id }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results);
    });
  });
};

export const getStudyLoads = studyLoad => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getStudyLoads(filtered(studyLoad, studyLoadAttributes)),
      studyLoad,
      (err, results) => {
        if (err) return reject(500);
        else if (!results.length) return reject(404);
        return resolve(results);
      },
    );
  });
};

export const deleteStudyLoad = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteStudyLoad, { id }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve(id);
    });
  });
};
