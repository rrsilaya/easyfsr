import { formatQueryParams } from '../../utils';

export const addLtdPractOfProf = `
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

export const updateLtdPractOfProf = limitedPracticeOfProf => `
  UPDATE limitedPracticeOfProf SET
  ${formatQueryParams(limitedPracticeOfProf, 'update')}
  WHERE limitedPracticeOfProfID=:limitedPracticeOfProfID
`;

export const getLtdPractOfProfs = (query, sortBy, userID) => `
  SELECT * FROM limitedPracticeOfProf x ${
    userID
      ? `JOIN fsr f ON x.id = f.id WHERE f.userID = :userID ${
          query.length ? `AND ${formatQueryParams(query, 'getUser')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
  ORDER BY ${userID ? `f.` : ''}[field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit OFFSET :offset
`;

export const getLtdPractOfProf = `
  SELECT * FROM limitedPracticeOfProf

  WHERE limitedPracticeOfProfID = :limitedPracticeOfProfID
`;

export const deleteLtdPractOfProf = `
  DELETE FROM limitedPracticeOfProf WHERE limitedPracticeOfProfID = :limitedPracticeOfProfID
`;

export const getTotalLtdPractOfProfs = (query, userID) => `
  SELECT count(*) as total FROM limitedPracticeOfProf x ${
    userID
      ? `JOIN fsr f ON x.id = f.id WHERE f.userID = :userID ${
          query.length ? `AND ${formatQueryParams(query, 'getUser')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
