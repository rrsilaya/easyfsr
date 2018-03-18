export const addExtensionAndCommunityService = `
  INSERT INTO extensionAndCommunityService (
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
  WHERE id=DEFAULT
`;

export const getExtensionAndCommunityService = `
  SELECT * FROM extensionAndCommunityService
  WHERE id = :id
  ORDER BY id ASC
  LIMIT 10;
`;

export const deleteExtensionAndCommunityService = `
  DELETE FROM extensionAndCommunityService
  WHERE id = ""
`;
