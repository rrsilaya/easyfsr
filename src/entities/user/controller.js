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
      if (err) {
        console.log(err);
        return reject(500);
      }
      return resolve(results.insertId);
    });
  });
};
