export const addTeachingLoad = `
	INSERT INTO teachingLoad ( 
		id, 
		teachingLoadCreds 
	)
	VALUES ( 
		:id, 
		:teachingLoadCreds 
	)
`;

export const updateTeachingLoad = `
	UPDATE teachingLoad SET 
		teachingLoadCreds = :teachingLoadCreds
	WHERE id = :id
`;

export const deleteTeachingLoad = `
	 DELETE FROM 
	 	teachingLoad 
	 WHERE id = :id
`;

export const getTeachingLoad = `
	SELECT * FROM teachingLoad
	WHERE id = :id
	ORDER BY id ASC
	LIMIT 10
`;
