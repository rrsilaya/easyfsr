import db from '../../database/index';
import * as Query from './queries';
import { filtered } from '../../utils';

const userAttributes = [
  'employeeID',
  'firstName',
  'middleName',
  'lastName',
  'committee',
  'isHead',
  'officeNumber',
  'contractType',
  'emailAddress',
  'rank',
  'acctType',
];

export const addUser = user => {
  return new Promise((resolve, reject) => {
    db.query(Query.addUser, { middleName: '', ...user }, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateUser = ({ userID }, user) => {
  return new Promise((resolve, reject) => {
    if (!user) return reject(500);
    db.query(
      Query.updateUser(filtered(user, userAttributes)),
      { userID, ...user },
      (err, results) => {
        if (err) return reject(500);
        return resolve(results.insertId);
      },
    );
  });
};

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query(Query.getAllUser, (err, results) => {
      if (err) return reject(500);
      else if (!results.length) return reject(404);
      return resolve(results);
    });
  });
};

export const deleteUser = ({ userID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteUser, { userID }, (err, results) => {
      if (err) return reject(500);
      else if (!results.changedRows) return reject(404);
      return resolve();
    });
  });
};

export const getUser = ({ userID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getUser, { userID }, (err, results) => {
      if (err) return reject(500);
      return resolve(results);
    });
  });
};
