import db from '../../database/index';
import * as Query from './queries';
import { filtered } from '../../utils';

const serviceAttributes = [
  'id',
  'participant',
  'role',
  'hours',
  'title',
  'creditUnit',
  'type',
  'startDate',
  'endDate',
];

export const addExtensionAndCommunityService = service => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.addExtensionAndCommunityService,
      { ...service },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const updateExtensionAndCommunityService = ({ id }, service) => {
  return new Promise((resolve, reject) => {
    if (!service) return reject(500);
    db.query(
      Query.updateExtensionAndCommunityService(
        filtered(service, serviceAttributes),
      ),
      { id, ...service },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const getExtensionAndCommunityServices = service => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.getExtensionAndCommunityServices(
        filtered(service, serviceAttributes),
      ),
      service,
      (err, results) => {
        if (err) return reject(500);
        else if (!results.length) return reject(404);
        return resolve(results);
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
        return resolve(extAndCommServiceID);
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
        return resolve(results);
      },
    );
  });
};
