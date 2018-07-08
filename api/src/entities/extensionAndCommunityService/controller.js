import db from '../../database/index';
import * as Query from './queries';
import { filtered, escapeSearch } from '../../utils';

const serviceAttributes = [
  'id',
  'participant',
  'role',
  'fundingAgency',
  'hours',
  'title',
  'creditUnit',
  'type',
  'startDate',
  'endDate',
];

const searchFields = [
  'participant',
  'role',
  'fundingAgency',
  'title',
  'type',
  'startDate',
  'endDate',
];

export const addExtensionAndCommunityService = service => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.addExtensionAndCommunityService,
      { fundingAgency: 'NONE', ...service },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const updateExtensionAndCommunityService = (
  { extAndCommServiceID },
  service,
) => {
  return new Promise((resolve, reject) => {
    if (!service) return reject(500);
    db.query(
      Query.updateExtensionAndCommunityService(
        filtered(service, serviceAttributes),
      ),
      { extAndCommServiceID, ...service },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const deleteExtensionAndCommunityService = ({ extAndCommServiceID }) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.deleteExtensionAndCommunityService,
      { extAndCommServiceID },
      (err, results) => {
        if (err) return reject(500);
        else if (!results.affectedRows) return reject(404);
        return resolve();
      },
    );
  });
};

export const getExtensionAndCommunityService = ({ extAndCommServiceID }) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getExtensionAndCommunityService,
      { extAndCommServiceID },
      (err, results) => {
        if (err) return reject(500);
        else if (!results.length) return reject(404);
        return resolve(results[0]);
      },
    );
  });
};

export const getExtensionAndCommunityServices = (service, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getExtensionAndCommunityServices(
        filtered(service, serviceAttributes),
        service.sortBy,
        userID,
      ),
      {
        field: 'title',
        ...escapeSearch(service, searchFields, service.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results);
      },
    );
  });
};

export const getTotalExtensionAndCommunityServices = (service, userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getTotalExtensionAndCommunityServices(
        filtered(service, serviceAttributes),
        userID,
      ),
      {
        field: 'participant',
        ...escapeSearch(service, searchFields, service.limit),
      },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results[0]);
      },
    );
  });
};
