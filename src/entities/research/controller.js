import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

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
  'filepath',
];

const searchFields = [
  'id',
  'type',
  'role',
  'title',
  'startDate',
  'endDate',
  'funding',
  'approvedUnits',
  'filepath',
];

export const addResearch = research => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.addResearch,
      { filepath: '', ...research },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const getResearch = ({ researchID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getResearch, { researchID }, (err, results) => {
      if (err) return reject(500);
      return resolve(results[0]);
    });
  });
};

export const updateResearch = ({ researchID }, research) => {
  return new Promise((resolve, reject) => {
    if (!research) return reject(500);
    db.query(
      Query.updateResearch(filtered(research, researchAttributes)),
      { researchID, ...research },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteResearch = ({ researchID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteResearch, { researchID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.affectedRows) return reject(404);
      return resolve();
    });
  });
};

export const getResearches = research => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getResearches(
        filtered(research, researchAttributes),
        research.sortBy,
      ),
      {
        field: 'title',
        ...escapeSearch(research, searchFields, research.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const getTotalResearches = research => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalResearches(filtered(research, researchAttributes)),
      {
        field: 'title',
        ...escapeSearch(research, searchFields, research.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results[0]);
      },
    );
  });
};
