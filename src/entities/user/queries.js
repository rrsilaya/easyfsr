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

export const updateUser = `
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

export const getAllUser = `
  SELECT * FROM user
`;
