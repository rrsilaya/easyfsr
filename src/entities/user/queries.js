export const addUser = `
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
