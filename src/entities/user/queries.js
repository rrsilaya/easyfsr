import { formatQueryParams } from '../../utils';

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

export const updateUser = user => `
  UPDATE user SET 
  ${formatQueryParams(user)}
  WHERE userID = :userID
`;

export const getAllUser = `
  SELECT * FROM user;
`;

export const deleteUser = `
  UPDATE user SET
    isArchived = true
  WHERE userID = :userID
`;

export const getUser = `
  SELECT * from user
  WHERE userID = :userID
`;
