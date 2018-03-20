import { formatQueryParams } from '../../utils';

export const getExtensionAndCommunityService = `
  SELECT * FROM extensionAndCommunityService
  WHERE id = :id AND extAndCommServiceID = :extAndCommServiceID
  ORDER BY id ASC
  LIMIT 10;
`;

export const getAllExtensionAndCommunityService = (query, sortBy) => `
  SELECT * FROM extensionAndCommunityService ${
    query.length ? `WHERE ${formatQueryParams(query)}` : ''
  } 
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} LIMIT :limit
`;

export const updateExtensionAndCommunityService = extensionAndCommunityService => `
  UPDATE extensionAndCommunityService SET 
  ${formatQueryParams(extensionAndCommunityService)}
  WHERE id= :id AND extAndCommServiceID = :extAndCommServiceID
`;

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

export const deleteExtensionAndCommunityService = `
  DELETE FROM extensionAndCommunityService
  WHERE id = :id AND extAndCommServiceID = :extAndCommServiceID
`;
