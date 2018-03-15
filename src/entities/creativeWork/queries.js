export const addCreativeWork = `
	INSERT INTO creativeWork ( 
		id,
		creativeWorkCode, 
		date, 
		title, 
		type, 
		credUnit 
	)
	VALUES ( 
		DEFAULT, 
		:creativeWorkCode, 
		:date, 
		:title, 
		:type, 
		:credUnit 
	)
`;

export const updateCreativeWork = `
	UPDATE creativeWork SET 
		date = :date, 
		type = :type, 
		title = :title, 
		credUnit = :credUnit  
	WHERE id = :id AND creativeWorkCode = :creativeWorkCode;
`;

export const deleteCreativeWork = `
	DELETE FROM creativeWork
	WHERE creativeWorkCode = :creativeWorkCode
`;

export const getAllCreativeWork = `
	SELECT * FROM creativeWork
	NATURAL JOIN cworkCoAuthor
	ORDER BY id ASC
	LIMIT 10
`;

export const addCoAuthor = `
	INSERT INTO cworkCoAuthor ( 
		creativeWorkCode, 
		userID 
	)
	VALUES ( 
		:creativeWorkCode, 
		:userID )
`;

export const updateCoAuthor = `
	UPDATE cworkCoAuthor SET
		userID = :userID
	WHERE creativeWorkCode = :creativeWorkCode
`;

export const deleteCoAuthor = `
	DELETE FROM cworkAuthors 
	WHERE userID = :userID
`;