import { formatQueryParams } from '../../utils';

export const addResearch = `
	INSERT INTO research (
		id,
		researchID,
		type,
		role,
		title,
		startDate,
		funding,
		approvedUnits,
    filepath
	)
	VALUES (
		:id,
		DEFAULT,
		:type,
		:role,
		:title,
		:startDate,
		:funding,
		:approvedUnits,
    :filepath
	)
`;

export const updateResearch = research => `
  UPDATE research SET
    ${formatQueryParams(research, 'update')}
  WHERE researchID = :researchID
`;

export const deleteResearch = `
  DELETE from research
  where researchID = :researchID
`;

export const getResearches = (query, sortBy, userID) => `
	SELECT ${
    userID
      ? `
  x.id,
  researchID,
  type,
  role,
  title,
  startDate,
  endDate,
  funding,
  approvedUnits,
  x.filepath`
      : `*`
  } FROM research x ${
  userID
    ? `LEFT JOIN fsr f ON x.id = f.id WHERE f.userID = :userID ${
        query.length ? `AND ${formatQueryParams(query, 'getUser')}` : ''
      }`
    : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
}
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit OFFSET :offset
`;

export const getResearch = `
	SELECT * FROM research
	WHERE researchID = :researchID
`;

export const getTotalResearches = (query, userID) => `
	SELECT count(*) as total FROM research x ${
    userID
      ? `WHERE id IN (SELECT id FROM fsr WHERE userID=:userID) ${
          query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
