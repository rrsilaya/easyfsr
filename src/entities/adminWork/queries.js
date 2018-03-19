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
		:adminWorkID,
		:id,
		:position,
		:officeUnit,
		:approvedUnits
	)
`;

export const updateAdminWork = adminWork => `
	UPDATE adminWork SET
	${formatQueryParams(adminWork)}
	WHERE id = :id AND adminWorkID = :adminWorkID
`

export const deleteAdminWork = `
	DELETE FROM adminWork
	WHERE id = :id AND adminWorkID = :adminWorkID
`;

export const getAdminWorks = query => `
	SELECT * FROM adminWork ${query.length ? `WHERE ${formatQueryParams(query)}` : ''}
`

export const getAdminWork = `
	SELECT * FROM adminWork
	WHERE id = :id AND adminWorkID = :adminWorkID
`;
