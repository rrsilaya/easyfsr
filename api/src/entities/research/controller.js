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
  'coAuthor',
];

const searchFields = [
  'type',
  'role',
  'title',
  'startDate',
  'endDate',
  'funding',
  'approvedUnits',
  'filepath',
  'coAuthor',
];

export const addResearch = research => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.addResearch,
      { filepath: '', funding: '', coAuthor: '', endDate: null, ...research },
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
      else if (!results.length) return reject(404);
      return resolve(results[0]);
    });
  });
};

export const updateResearch = ({ researchID }, research) => {
  return new Promise((resolve, reject) => {
    if (!research) return reject(500);

    if (research.endDate == 'null') delete research.endDate;
    if (Object.keys(research).length > 0) {
      db.query(
        Query.updateResearch(filtered(research, researchAttributes)),
        { researchID, ...research },
        (err, results) => {
          if (err) return reject(500);
          return resolve(results.insertId);
        },
      );
    } else return resolve();
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

export const getResearches = (research, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getResearches(
        filtered(research, researchAttributes),
        research.sortBy,
        userID,
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

export const getTotalResearches = (research, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalResearches(filtered(research, researchAttributes), userID),
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
