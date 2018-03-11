import db from './../../database/index';
import bcrypt from 'bcrypt';

export const login = ({ emailAddress, password }) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM user WHERE emailAddress = ?`;
    const values = [emailAddress];

    db.query(query, values, (err, result) => {
      if (err) return reject(500);
      else if (!result.length) return reject(404);

      bcrypt.compare(password, result[0].password, (error, isMatch) => {
        if (error) return reject(500);
        else if (!isMatch) return reject(401);
        return resolve(result[0]);
      });
    });
  });
};
