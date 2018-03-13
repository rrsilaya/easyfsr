import db from './../../database/index';

export const addUser = ({
  employeeID,
  password,
  firstName,
  middleName,
  lastName,
  committee,
  isHead,
  officeNumber,
  contractType,
  emailAddress,
  rank,
  isArchived,
  acctType,
}) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      employeeID,
      password,
      firstName,
      middleName,
      lastName,
      committee,
      isHead,
      officeNumber,
      contractType,
      emailAddress,
      rank,
      isArchived,
      acctType,
    ];

    db.query(query, values, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateUser = (
  { employeeID },
  {
    password,
    firstName,
    middleName,
    lastName,
    committee,
    isHead,
    officeNumber,
    contractType,
    emailAddress,
    rank,
    isArchived,
    acctType,
  },
) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE user SET 
      password = ?,
      firstName = ?,
      middleName = ?,
      lastName = ?,
      committee = ?,
      isHead = ?,
      officeNumber = ?,
      contractType = ?,
      emailAddress = ?,
      rank = ?,
      isArchived = ?,
      acctType = ? 
      WHERE employeeID = ?;`;
    const values = [
      password,
      firstName,
      middleName,
      lastName,
      committee,
      isHead,
      officeNumber,
      contractType,
      emailAddress,
      rank,
      isArchived,
      acctType,
      employeeID,
    ];

    db.query(query, values, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const deleteUser = ({ employeeID }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.deleteUser, { employeeID }, (err, results) => {
      if (err) return reject(500);
      return resolve(employeeID);
    });
  });
};
