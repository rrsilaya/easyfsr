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

export const getrCoAuthors = (query, sortBy) => `
	SELECT * FROM rCoAuthor ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  } 
  	ORDER BY [field] ${
      sortBy === 'DESC' ? 'DESC' : 'ASC'
    } LIMIT :limit OFFSET :offset
`;

export const getrCoAuthor = `
	SELECT * FROM research 
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

export const getTotalrCoAuthors = query => `
	SELECT count(*) as total FROM rCoAuthor ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
