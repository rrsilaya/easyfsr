import { formatQueryParams } from '../../utils';

export const addCreativeWork = `
	INSERT INTO creativeWork ( 
		id,
		date, 
		title, 
		type, 
		credUnit 
	)
	VALUES ( 
		:id,
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
	WHERE id = :id AND creativeWorkID = :creativeWorkID;
`;

export const deleteCreativeWork = `
	DELETE FROM creativeWork
	WHERE creativeWorkID = :creativeWorkID AND id = :id
`;

export const getAllCreativeWork = `
	SELECT * FROM creativeWork
	NATURAL JOIN cworkCoAuthor
	ORDER BY id ASC
	LIMIT 10
`;

export const addCoAuthor = `
	INSERT INTO cworkCoAuthor ( 
		creativeWorkID, 
		userID 
	)
	VALUES ( 
		:creativeWorkID, 
		:userID )
`;

export const updateCoAuthor = `
	UPDATE cworkCoAuthor SET
		userID = :userID
	WHERE creativeWorkID = :creativeWorkID
`;

export const deleteCoAuthor = `
	DELETE FROM cworkAuthors 
	WHERE userID = :userID
`;
