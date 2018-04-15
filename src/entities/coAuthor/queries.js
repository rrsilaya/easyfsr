import { formatQueryParams } from '../../utils';

export const addCworkCoAuthor = `
	INSERT INTO cworkCoAuthor (
		creativeWorkID,
		name
	)
	VALUES (
		:creativeWorkID,
		:name
	)
`;

export const updateCworkCoAuthor = cworkCoAuthor => `
	UPDATE cworkCoAuthor SET
	${formatQueryParams(cworkCoAuthor, 'update')}
	WHERE cworkCoAuthorID = :cworkCoAuthorID
`;

export const deleteCworkCoAuthor = `
	DELETE FROM cworkCoAuthor
	WHERE cworkCoAuthorID = :cworkCoAuthorID
`;

export const getCworkCoAuthor = `
	SELECT * FROM cworkCoAuthor
	WHERE cworkCoAuthorID = :cworkCoAuthorID
`;

export const getCworkCoAuthors = (query, sortBy, userID) => `
	SELECT * FROM cworkCoAuthor x ${
    userID
      ? `JOIN creativeWork c ON x.creativeWorkID = c.creativeWorkID LEFT JOIN fsr f ON c.id = f.id WHERE f.userID = :userID ${
          query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
	ORDER BY [field] ${
    sortBy === 'DESC' ? 'DESC' : 'ASC'
  } LIMIT :limit OFFSET :offset
`;

export const getTotalCworkCoAuthors = (query, userID) => `
  SELECT count(*) as total FROM cworkCoAuthor x ${
    userID
      ? `JOIN creativeWork c ON x.creativeWorkID = c.creativeWorkID WHERE id IN (SELECT id FROM fsr WHERE userID=:userID) ${
          query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
