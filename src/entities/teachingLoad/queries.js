export const addTeachingLoad = `
	INSERT INTO teachingLoad (
		id,
		teachingLoadID,
		teachingLoadCreds
	)
	VALUES (
		:id,
		:teachingLoadID,
		:teachingLoadCreds
	)
`;

export const updateTeachingLoad = `
	UPDATE teachingLoad SET
		teachingLoadCreds = :teachingLoadCreds,
		teachingLoadID = :teachingLoadID
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
