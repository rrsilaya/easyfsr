import { formatQueryParams } from '../../utils';

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

export const updateExtensionAndCommunityService = service => `
  UPDATE extensionAndCommunityService SET 
  ${formatQueryParams(service)} 
  WHERE extAndCommServiceID = :extAndCommServiceID
`;

export const getExtensionAndCommunityServices = query => `
  SELECT * FROM extensionAndCommunityService ${
    query.length ? `WHERE ${formatQueryParams(query)}` : ''
  }
`;

export const getExtensionAndCommunityService = `
  SELECT * FROM extensionAndCommunityService
  WHERE extAndCommServiceID = :extAndCommServiceID
  ORDER BY id ASC
  LIMIT 10;
`;

export const deleteExtensionAndCommunityService = `
  DELETE FROM extensionAndCommunityService
  WHERE extAndCommServiceID = :extAndCommServiceID
`;
