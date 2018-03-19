export const addExtensionAndCommunityService = `
  INSERT INTO extensionAndCommunityService (
    extAndCommServiceID,
    id,
    participant,
    role,
    hours,
    title,
    creditUnit,
    type,
    startDate,
    endDate
  )
  VALUES ( 
    :extAndCommServiceID,
    :id,
    :participant,
    :role,
    :hours,
    :title,
    :creditUnit,
    :type,
    :startDate,
    :endDate
  )
`;

export const updateExtensionAndCommunityService = `
  UPDATE extensionAndCommunityService SET 
    participant=:participant, 
    role=:role;
    hours=:hours, 
    title=:title, 
    creditUnit=:creditUnit, 
    type=:type, 
    startDate=:startDate, 
    endDate=:endDate     
  WHERE id= :id AND extAndCommServiceID = :extAndCommServiceID
`;

export const getAllExtensionAndCommunityService = `
  SELECT * FROM extensionAndCommunityService
  WHERE id = :id 
  ORDER BY extAndCommServiceID ASC
  LIMIT 10;
`;

export const getExtensionAndCommunityService = `
  SELECT * FROM extensionAndCommunityService
  WHERE id = :id AND extAndCommServiceID = :extAndCommServiceID
`;

export const deleteExtensionAndCommunityService = `
  DELETE FROM extensionAndCommunityService
  WHERE id = :id AND extAndCommServiceID = :extAndCommServiceID
`;
