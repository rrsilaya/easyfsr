import db from '../../database/index';
import * as Query from './queries';
import * as Utils from '../../utils';

const awardAttributes = [
  'id',
  'grantF',
  'chairGrantTitle',
  'collegeHasNominated',
  'recipientOrNominee',
  'professionalChair',
  'approvedStartDate',
  'endDate',
];

export const addAward = award => {
  return new Promise((resolve, reject) => {
    db.query(Query.addAward, { ...award }, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      console.log(results);
      return resolve(results.insertId);
    });
  });
};

export const updateAward = ({ id }, award) => {
  return new Promise((resolve, reject) => {
    if (!award) return reject(500);
    db.query(
      Query.updateAward(Utils.filtered(award, awardAttributes)),
      { id, ...award },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteAward = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteAward, { id }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(id);
    });
  });
};

export const getAward = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getAward, { id }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results);
    });
  });
};
