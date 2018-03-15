export const addAdminWork = `
	INSERT INTO adminWork ( 
		id, 
		position, 
		officeUnit, 
		approvedUnits 
	)
	VALUES ( 
		DEFAULT, 
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
	WHERE id = :id
`;

export const deleteAdminWork = `
	DELETE FROM adminWork
	WHERE adminWorkID = :adminWorkID
`;

export const viewAdminWork = `
	SELECT * FROM adminWork
	WHERE
		id = :id
		position = :position
		officeUnit = :officeUnit
		approvedUnits = :approvedUnits
	ORDER BY id ASC
	LIMIT 10
`;