import { formatQueryParams } from '../../utils';

export const addFSR = `
  INSERT INTO fsr (
    userID, 
    acadYear, 
    semester,
    metaID
  )
  VALUES (
    :userID, 
    :acadYear, 
    :semester,
    :metaID
  )
`;

export const updateFSR = fsr => `
  UPDATE fsr SET 
  ${formatQueryParams(fsr, 'update')}
  WHERE id = :id
`;

export const deleteFSR = `
  DELETE FROM fsr 
  WHERE id = :id
`;

export const getFSR = `
  SELECT * from fsr
  WHERE id = :id 
`;

export const getFSRs = (query, sortBy) => `
  SELECT x.*, concat(u.firstName,' ',u.lastName) name FROM fsr x LEFT JOIN user u ON x.userID=u.userID ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  } 
  ORDER BY [field] ${
    sortBy === 'DESC' ? 'DESC' : 'ASC'
  } LIMIT :limit OFFSET :offset
`;

export const getTotalFSRs = query => `
  SELECT count(*) as total FROM fsr x ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  } 
`;

export const addTLC = `
  CALL subTLC(:subjectCreds, :id);
`;

export const subTLC = `
  CALL subTLC(:subjectCreds, :id);
`;
