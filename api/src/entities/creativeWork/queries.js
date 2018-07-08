import { formatQueryParams } from '../../utils';

export const addCreativeWork = `
	INSERT INTO creativeWork (
		id,
		date,
		title,
		type,
		credUnit,
		filepath,
		coAuthor
	)
	VALUES (
		:id,
		:date,
		:title,
		:type,
		:credUnit,
		:filepath,
		:coAuthor
	)
`;

export const updateCreativeWork = creativeWork => `
	UPDATE creativeWork SET
	${formatQueryParams(creativeWork, 'update')}
	WHERE creativeWorkID = :creativeWorkID
`;

export const deleteCreativeWork = `
	DELETE FROM creativeWork
	WHERE creativeWorkID = :creativeWorkID
`;

export const getCreativeWorks = (query, sortBy, userID) => `
	SELECT ${
    userID
      ? `
	x.id,
  creativeWorkID,
  date,
  title,
  type,
  credUnit,
  x.filepath`
      : `*`
  } FROM creativeWork x ${
  userID
    ? `LEFT JOIN fsr f ON x.id = f.id WHERE f.userID = :userID ${
        query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
      }`
    : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
}
	ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit OFFSET :offset
`;

export const getCreativeWork = `
	SELECT * FROM creativeWork
	WHERE creativeWorkID = :creativeWorkID
`;

export const getTotalCreativeWorks = (query, userID) => `
	SELECT count(*) as total FROM creativeWork x ${
    userID
      ? `WHERE id IN (SELECT id FROM fsr WHERE userID=:userID) ${
          query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
