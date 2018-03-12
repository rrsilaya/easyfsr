import db from './../../database/index';

export const addUser = user => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO user VALUES (
        :employeeID, 
        :password, 
        :firstName, 
        :middleName, 
        :lastName, 
        :committee, 
        :isHead, 
        :officeNumber, 
        :contractType, 
        :emailAddress, 
        :rank, 
        :isArchived, 
        :acctType
      )
    `;

    db.query(query, user, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};

export const updateUser = ({ employeeID }, user) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE user SET 
        password = :password,
        firstName = :firstName,
        middleName = :middleName,
        lastName = :lastName,
        committee = :committee,
        isHead = :isHead,
        officeNumber = :officeNumber,
        contractType = :contractType,
        emailAddress = :emailAddress,
        rank = :rank,
        isArchived = :isArchived,
        acctType = :acctType 
      WHERE employeeID = :employeeID
    `;

    db.query(query, { ...user, employeeID }, (err, results) => {
      if (err) return reject(500);
      return resolve(results.insertId);
    });
  });
};
