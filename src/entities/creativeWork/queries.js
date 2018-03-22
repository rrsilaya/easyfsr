import { formatQueryParams } from '../../utils';

export const addCreativeWork = `
	INSERT INTO creativeWork (
		id,
		creativeWorkID,
		date,
		title,
		type,
		credUnit
	)
	VALUES (
		:id,
		DEFAULT,
		:date,
		:title,
		:type,
		:credUnit
	)
`;

export const updateCreativeWork = creativeWork => `
	UPDATE creativeWork SET
	${formatQueryParams(creativeWork)}
	WHERE id = :id AND creativeWorkID = :creativeWorkID;
`;

export const deleteCreativeWork = `
	DELETE FROM creativeWork
	WHERE creativeWorkID = :creativeWorkID AND id = :id
`;

export const getCreativeWorks = (query, sortBy) => `
	SELECT * FROM creativeWork ${
    query.length ? `WHERE ${formatQueryParams(query)}` : ''
  }
	ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
	LIMIT :limit
`;

export const getCreativeWork = `
	SELECT * FROM creativeWork NATURAL JOIN cworkCoAuthor
	WHERE id = :id AND creativeWorkID = :creativeWorkID
`;

export const addCoAuthor = `
	INSERT INTO cworkCoAuthor (
		creativeWorkID,
		userID
	)
	VALUES (
		:creativeWorkID,
		:userID
	)
`;

export const updateCoAuthor = `
	UPDATE cworkCoAuthor SET
		userID = :userID
	WHERE creativeWorkID = :creativeWorkID
`;

export const deleteCoAuthor = `
	DELETE FROM cworkAuthors
	WHERE userID = :userID
`;
