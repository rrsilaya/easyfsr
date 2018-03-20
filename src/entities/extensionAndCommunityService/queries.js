import { formatQueryParams } from '../../utils';

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
    DEFAULT,
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

export const getExtensionAndCommunityServices = (query, sortBy) => `
  SELECT * FROM extensionAndCommunityService 
  ${query.length ? `WHERE ${formatQueryParams(query)}` : ''} 
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit
`;

export const getExtensionAndCommunityService = `
  SELECT * FROM extensionAndCommunityService
  WHERE id = :id AND extAndCommServiceID = :extAndCommServiceID
`;

export const updateExtensionAndCommunityService = extAndCommService => `
  UPDATE extensionAndCommunityService SET
    ${formatQueryParams(extAndCommService)}
  WHERE id= :id AND extAndCommServiceID = :extAndCommServiceID
`;

export const deleteExtensionAndCommunityService = `
  DELETE FROM extensionAndCommunityService
  WHERE id = :id AND extAndCommServiceID = :extAndCommServiceID
`;

/*

// Supports single or multiple rows delete

export const deleteExtensionAndCommunityService = query => `
  DELETE FROM extensionAndCommunityService
  ${query.length ? `WHERE ${formatQueryParams(query)}` : ''}
`;

*/
