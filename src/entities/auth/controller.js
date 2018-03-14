import bcrypt from 'bcrypt';
import db from '../../database/index';

import * as Query from './queries';

export const login = ({ emailAddress, password }) => {
  return new Promise((resolve, reject) => {
    db.query(Query.getUser, { emailAddress }, (err, result) => {
      if (err) return reject(500);
      else if (!result.length) return reject(401);

      bcrypt.compare(password, result[0].password, (error, isMatch) => {
        if (error) return reject(500);
        else if (!isMatch) return reject(401);
        return resolve(result[0]);
      });
    });
  });
};
