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
<<<<<<< HEAD
  WHERE limitedPracticeOfProfID=:limitedPracticeOfProfID
=======
  WHERE id=:id
>>>>>>> 2de2382430c6c4e82ff68370060495353a73cf59
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
<<<<<<< HEAD
  WHERE limitedPracticeOfProfID = :limitedPracticeOfProfID
=======
  WHERE id = :id
>>>>>>> 2de2382430c6c4e82ff68370060495353a73cf59
`;

export const deleteLimitedPracticeOfProf = `
  DELETE FROM limitedPracticeOfProf
<<<<<<< HEAD
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

=======
  WHERE id = :id
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

>>>>>>> 2de2382430c6c4e82ff68370060495353a73cf59
*/
