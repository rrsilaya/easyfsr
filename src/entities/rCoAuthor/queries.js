import { formatQueryParams } from '../../utils';

export const addrCoAuthor = `
	INSERT INTO rCoAuthor (
		researchID,
		name
	)
	VALUES (
		:researchID,
		:name
	)
`;

export const getrCoAuthors = (query, sortBy, userID) => `
	SELECT * FROM rCoAuthor x ${
    userID
      ? `JOIN research r ON x.researchID = r.researchID LEFT JOIN fsr f ON r.id = f.id WHERE f.userID = :userID ${
          query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
  	ORDER BY [field] ${
      sortBy === 'DESC' ? 'DESC' : 'ASC'
    } LIMIT :limit OFFSET :offset
`;

export const getrCoAuthor = `
	SELECT * FROM rCoAuthor 
	where rCoAuthorID = :rCoAuthorID
`;

export const updaterCoAuthor = rCoAuthor => `
	UPDATE rCoAuthor SET
		${formatQueryParams(rCoAuthor, 'update')}
	WHERE rCoAuthorID = :rCoAuthorID
`;

export const deleterCoAuthor = `
	DELETE from rCoAuthor
	where rCoAuthorID = :rCoAuthorID
`;

export const getTotalrCoAuthors = (query, userID) => `
	SELECT count(*) as total FROM rCoAuthor x ${
    userID
      ? `JOIN research r ON x.researchID = r.researchID WHERE id IN (SELECT id FROM fsr WHERE userID=:userID) ${
          query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
