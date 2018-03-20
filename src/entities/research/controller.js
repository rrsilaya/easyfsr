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

export const addResearch = research => {
  return new Promise((resolve, reject) => {
    db.query(Query.addResearch, { ...research }, (err, results) => {
      console.log(err);
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const selectResearch = ({ researchID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.selectResearch, { researchID }, (err, results) => {
      console.log('err: ' + err);
      if (err) return reject(500);
      return resolve(results);
    });
  });
};
