import { formatQueryParams } from '../../utils';

export const addAdminWork = `
	INSERT INTO adminWork (
		adminWorkID,
		id,
		position,
		officeUnit,
		approvedUnits
	)
	VALUES (
		DEFAULT,
		:id,
		:position,
		:officeUnit,
		:approvedUnits
	)
`;

export const getAdminWorks = (query, sortBy) => `
	SELECT * FROM adminWork 
	${query.length ? `WHERE ${formatQueryParams(query)}` : ''} 
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit
`;

export const getAdminWork = `
	SELECT * FROM adminWork
	WHERE id = :id AND adminWorkID = :adminWorkID
`;

export const updateAdminWork = adminWork => `
	UPDATE adminWork SET
	${formatQueryParams(adminWork)}
	WHERE id = :id AND adminWorkID = :adminWorkID
`;

export const deleteAdminWork = `
	DELETE FROM adminWork
	WHERE id = :id AND adminWorkID = :adminWorkID
`;

/*

// Supports single or multiple rows delete

export const deleteAdminWork = query => `
  DELETE FROM adminWork
  ${query.length ? `WHERE ${formatQueryParams(query)}` : ''}
`;

*/
