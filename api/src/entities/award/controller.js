import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const awardAttributes = [
  'id',
  'grantF',
  'chairGrantTitle',
  'collegeHasNominated',
  'recipientOrNominee',
  'professionalChair',
  'approvedStartDate',
  'endDate',
  'filepath',
];

const searchFields = [
  'chairGrantTitle',
  'collegeHasNominated',
  'recipientOrNominee',
  'professionalChair',
  'approvedStartDate',
  'endDate',
  'grantF',
];
const defaultVal = {
  grantF: '',
  chairGrantTitle: '',
  collegeHasNominated: '',
  recipientOrNominee: '',
  professionalChair: '',
  approvedStartDate: new Date('0000-00-00'),
  endDate: new Date('0000-00-00'),
  filepath: '',
};

export const addAward = award => {
  return new Promise((resolve, reject) => {
    db.query(Query.addAward, { ...defaultVal, ...award }, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateAward = ({ awardID }, award) => {
  return new Promise((resolve, reject) => {
    if (!award) return reject(500);
    db.query(
      Query.updateAward(filtered(award, awardAttributes)),
      { awardID, ...award },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteAward = ({ awardID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteAward, { awardID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};

export const getAward = ({ awardID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getAward, { awardID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results[0]);
    });
  });
};

export const getAwards = (award, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getAwards(filtered(award, awardAttributes), award.sortBy, userID),
      {
        field: 'chairGrantTitle',
        ...escapeSearch(award, searchFields, award.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const getTotalAwards = (award, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalAwards(filtered(award, awardAttributes), userID),
      {
        field: 'chairGrantTitle',
        ...escapeSearch(award, searchFields, award.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results[0]);
      },
    );
  });
};
