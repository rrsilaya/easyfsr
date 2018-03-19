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

export const updateAdminWork = `
	UPDATE adminWork SET
		position = :position,
		officeUnit = :officeUnit,
		approvedUnits = :approvedUnits
	WHERE id = :id AND adminWorkID = :adminWorkID
`;

export const deleteAdminWork = `
	DELETE FROM adminWork
	WHERE id = :id AND adminWorkID = :adminWorkID
`;

export const getAllAdminWork = `
	SELECT * FROM adminWork
	WHERE id = :id 
	ORDER BY adminWorkID ASC
	LIMIT 10
`;

export const getAdminWork = `
	SELECT * FROM adminWork
	WHERE id = :id AND adminWorkID = :adminWorkID
`;
