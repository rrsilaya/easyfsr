import db from '../../database/index';
import * as Query from './queries';
import { filtered } from '../../utils';

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
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateAward = ({ id }, award) => {
  return new Promise((resolve, reject) => {
    if (!award) return reject(500);
    db.query(
      Query.updateAward(filtered(award, awardAttributes)),
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
      else if (!results.affectedRows) return reject(404);
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

export const getAwards = award => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getAwards(filtered(award, awardAttributes)),
      award,
      (err, results) => {
        if (err) return reject(500);
        else if (!results.length) return reject(404);
        return resolve(results);
      },
    );
  });
};
