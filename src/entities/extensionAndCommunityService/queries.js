import { formatQueryParams } from '../../utils';

export const addExtensionAndCommunityService = `
  INSERT INTO extensionAndCommunityService (
    id,
    participant,
    role,
    fundingAgency
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
    :fundingAgency
    :hours,
    :title,
    :creditUnit,
    :type,
    :startDate,
    :endDate
  )
`;

export const updateExtensionAndCommunityService = service => `
  UPDATE extensionAndCommunityService SET 
    ${formatQueryParams(service, 'update')} 
  WHERE extAndCommServiceID = :extAndCommServiceID
`;

export const deleteExtensionAndCommunityService = `
  DELETE FROM extensionAndCommunityService
  WHERE extAndCommServiceID = :extAndCommServiceID
`;

export const getExtensionAndCommunityService = `
  SELECT * FROM extensionAndCommunityService
  WHERE extAndCommServiceID = :extAndCommServiceID
`;

export const getExtensionAndCommunityServices = (query, sortBy, userID) => `
  SELECT ${
    userID
      ? ` x.id,
      extAndCommServiceID,
      participant,
      role,
      fundingAgency,
      hours,
      title,
      creditUnit,
      type,
      startDate,
      endDate
    `
      : `*`
  } FROM extensionAndCommunityService x ${
  userID
    ? `LEFT JOIN fsr f ON x.id = f.id WHERE f.userID = :userID ${
        query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
      }`
    : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
}
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit OFFSET :offset
`;

export const getTotalExtensionAndCommunityServices = (query, userID) => `
  SELECT count(*) as total FROM extensionAndCommunityService x ${
    userID
      ? `WHERE id IN (SELECT id FROM fsr WHERE userID=:userID) ${
          query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;

/*

// Supports single or multiple rows delete

export const deleteExtensionAndCommunityService = query => `
  DELETE FROM extensionAndCommunityService
  ${query.length ? `WHERE ${formatQueryParams(query)}` : ''}
`;

*/
