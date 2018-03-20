import { formatQueryParams } from '../../utils';

export const getUser = `
  SELECT * from user
  WHERE userID = :userID
`;

export const getAllUser = `
  SELECT * FROM user;
`;

export const getUsers = (query, sortBy) => `
  SELECT * FROM user ${query.length ? `WHERE ${formatQueryParams(query)}` : ''} 
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} LIMIT :limit
`;

export const updateUser = user => `
  UPDATE user SET 
  ${formatQueryParams(user)}
  WHERE userID = :userID
`;

export const addUser = `
  INSERT INTO user (
    employeeID, 
    password, 
    firstName, 
    middleName, 
    lastName, 
    officeNumber, 
    contractType, 
    emailAddress
  )
  VALUES (
    :employeeID, 
    :password, 
    :firstName, 
    :middleName, 
    :lastName, 
    :officeNumber, 
    :contractType, 
    :emailAddress
  )
`;

export const deleteUser = `
  UPDATE user SET
    isArchived = true
  WHERE userID = :userID
`;
