import { formatQueryParams } from '../../utils';

export const addAdminWork = `
	INSERT INTO adminWork ( 
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
  WHERE adminWorkID = :adminWorkID
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
