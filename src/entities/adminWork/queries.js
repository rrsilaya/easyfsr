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
		:id,
		:position,
		:officeUnit,
		:approvedUnits
	)
`;

export const updateAdminWork = adminWork => `
	UPDATE adminWork SET
	${formatQueryParams(adminWork, 'update')}
	WHERE id = :id AND adminWorkID = :adminWorkID
`;

export const deleteAdminWork = `
	DELETE FROM adminWork
	WHERE adminWorkID = :adminWorkID
`;

export const getAdminWorks = (query, sortBy) => `
 SELECT * FROM adminWork ${
   query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
 }
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} LIMIT :limit
`;

export const getAdminWork = `
	SELECT * FROM adminWork
	WHERE adminWorkID = :adminWorkID
`;

export const getTotalAdminWorks = `
	SELECT count(*) as total FROM adminWork
`;

export const getTotalAdminWorksByFSR = `
	SELECT count(*) as total FROM adminWork WHERE id = :id 
`;

/*

// Supports single or multiple rows delete

export const deleteAdminWork = query => `
  DELETE FROM adminWork
  ${query.length ? `WHERE ${formatQueryParams(query)}` : ''}
`;

*/
