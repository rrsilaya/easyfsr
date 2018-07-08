import { formatQueryParams } from '../../utils';

export const addLtdPractOfProf = `
  INSERT INTO limitedPracticeOfProf (
    id,
    askedPermission,
    date
  )
  VALUES (
    :id,
    :askedPermission,
    :date
  )
`;

export const updateLtdPractOfProf = limitedPracticeOfProf => `
  UPDATE limitedPracticeOfProf SET
  ${formatQueryParams(limitedPracticeOfProf, 'update')}
  WHERE id=:id
`;

export const getLtdPractOfProfs = (query, sortBy, userID) => `
  SELECT ${
    userID
      ? `
    x.id,
    askedPermission,
    date
    `
      : `*`
  } FROM limitedPracticeOfProf x ${
  userID
    ? `LEFT JOIN fsr f ON x.id = f.id WHERE f.userID = :userID ${
        query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
      }`
    : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
}
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit OFFSET :offset
`;

export const getLtdPractOfProf = `
  SELECT * FROM limitedPracticeOfProf
    WHERE id = :id
`;

export const deleteLtdPractOfProf = `
  DELETE FROM limitedPracticeOfProf WHERE id = :id
`;

export const getTotalLtdPractOfProfs = (query, userID) => `
  SELECT count(*) as total FROM limitedPracticeOfProf x ${
    userID
      ? `WHERE x.id IN (SELECT id FROM fsr WHERE userID=:userID) ${
          query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
