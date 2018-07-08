import db from '../../database';
import * as Query from './queries';

const defaultAttr = {
  homeDepartment: '',
  homeCollege: '',
  universityRegistrar: '',
  formRevision: null,
};

export const getMetaData = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getMetaData, { id }, (err, results) => {
      if (err) return reject(500);
      return resolve(results[0]);
    });
  });
};

export const addMetaData = metaData => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.addMetaData,
      { ...defaultAttr, ...metaData },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const getLatestMetaData = () => {
  return new Promise((resolve, reject) => {
    db.query(Query.getLastInsertedID, (err, results) => {
      if (err) return reject(500);
      return resolve(results[0]);
    });
  });
};
