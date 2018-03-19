import db from '../../database/index';
import * as Query from './queries';
import { filtered } from '../../utils';

const researchAttributes = [
  'id',
  'researchID',
  'type',
  'role',
  'title',
  'startDate',
  'endDate',
  'funding',
  'approvedUnits',
];

const rCoAuthorAttributes = ['researchID', 'userID'];

export const addResearch = research => {
  return new Promise((resolve, reject) => {
    db.query(Query.addResearch, { ...research }, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const addrCoAuthor = rCoAuthor => {
  return new Promise((resolve, reject) => {
    db.query(Query.addrCoAuthor, { ...rCoAuthor }, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const deleteResearch = ({ id, researchID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteResearch, { id, researchID }, (err, results) => {
      if (err) return reject(500);
      // else if (!results.changedRows) return reject(404);
      return resolve();
    });
  });
};

export const deleterCoAuthor = ({ userID, researchID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleterCoAuthor, { userID, researchID }, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      // else if (!results.changedRows) return reject(404);
      return resolve();
    });
  });
};

export const selectResearch = ({ id, researchID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.selectResearch, { id, researchID }, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      return resolve(results);
    });
  });
};

export const selectResearchWithCoAuthor = ({ id, researchID }) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.selectResearchWithCoAuthor,
      { id, researchID },
      (err, results) => {
        console.log(err);
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const selectAllResearch = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.selectAllResearch, { id }, (err, results) => {
      if (err) return reject(500);
      // else if (!results.length) return reject(404);
      return resolve(results);
    });
  });
};

export const selectAllResearchWithCoAuthor = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.selectAllResearchWithCoAuthor, { id }, (err, results) => {
      if (err) return reject(500);
      // else if (!results.length) return reject(404);
      return resolve(results);
    });
  });
};
