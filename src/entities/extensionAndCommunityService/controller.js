import db from '../../database/index';
import * as Query from './queries';
import * as Utils from '../../utils';

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
        Utils.filtered(service, serviceAttributes),
      ),
      { id, ...service },
      (err, results) => {
        if (err) {
          console.log(err);
          return reject(500);
        }
        return resolve(results.insertId);
      },
    );
  });
};

export const getAllExtensionAndCommunityServices = () => {
  return new Promise((resolve, reject) => {
    db.query(Query.getAllExtensionAndCommunityServices, (err, results) => {
      if (err) return reject(500);
      else if (!results) return reject(404);
      return resolve(results);
    });
  });
};

export const deleteExtensionAndCommunityService = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(
      Query.deleteExtensionAndCommunityService,
      { id },
      (err, results) => {
        if (err) return reject(500);
        return resolve(id);
      },
    );
  });
};

export const getExtensionAndCommunityService = ({ id }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getExtensionAndCommunityService, { id }, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results);
    });
  });
};
