import { formatQueryParams } from '../../utils';

export const addResearch = `
	INSERT INTO research (
		id,
		researchID,
		type,
		role,
		title,
		startDate,
    endDate,
		funding,
		approvedUnits,
    filepath,
    coAuthor
	)
	VALUES (
		:id,
		DEFAULT,
		:type,
		:role,
		:title,
		:startDate,
    :endDate,
		:funding,
		:approvedUnits,
    :filepath,
    :coAuthor
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

export const getResearches = (query, sortBy) => `
	SELECT * FROM research ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  } 
  	ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  	LIMIT :limit OFFSET :offset
`;

export const getResearch = `
	SELECT * FROM research
	WHERE researchID = :researchID
`;

export const getTotalResearches = query => `
	SELECT count(*) as total FROM research ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  } 
`;
