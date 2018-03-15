import * as Utils from '../../utils';

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
  ${Utils.formatQueryParams(user)}
  WHERE employeeID = :employeeID
`;

export const getAllUser = `
  SELECT * FROM user
`;

export const deleteUser = `
  UPDATE user SET
    isArchived = true
  WHERE employeeID = :employeeID
`;

export const getUser = `
  SELECT * from user
  WHERE employeeID = :employeeID
`;
