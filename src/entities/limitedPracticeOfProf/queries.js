import { formatQueryParams } from '../../utils';

export const addLimitedPracticeOfProf = `
  INSERT INTO limitedPracticeOfProf (
    id,
    limitedPracticeOfProfID,
    askedPermission,
    date
  )
  VALUES (
    :id,
    DEFAULT,
    :askedPermission,
    :date
  )
`;

export const updateLimitedPracticeOfProf = limitedPracticeOfProf => `
  UPDATE limitedPracticeOfProf SET
  ${formatQueryParams(limitedPracticeOfProf, 'update')}
  WHERE limitedPracticeOfProfID=:limitedPracticeOfProfID
`;

export const getLimitedPracticeOfProfs = (query, sortBy) => `
  SELECT * FROM limitedPracticeOfProf ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  } 
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit
`;

export const getLimitedPracticeOfProf = `
  SELECT * FROM limitedPracticeOfProf
  WHERE limitedPracticeOfProfID = :limitedPracticeOfProfID
`;

export const deleteLimitedPracticeOfProf = `
  DELETE FROM limitedPracticeOfProf
  WHERE limitedPracticeOfProfID = :limitedPracticeOfProfID
`;

export const getTotalLimitedPracticeOfProfs = `
  SELECT count(*) as total FROM limitedPracticeOfProf
`;

export const getTotalLimitedPracticeOfProfsByFSR = `
  SELECT count(*) as total FROM limitedPracticeOfProf WHERE id = :id
`;

/*

// Supports single or multiple rows delete

export const deleteLimitedPracticeOfProfs = query => `
  DELETE FROM limitedPracticeOfProfs
  ${query.length ? `WHERE ${formatQueryParams(query)}` : ''}
`;

*/
