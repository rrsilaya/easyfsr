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

export const getCreativeWorks = query => `
	SELECT * FROM creativeWork
	NATURAL JOIN cworkCoAuthor
	ORDER BY id ASC
	LIMIT 10
`;

export const getCreativeWork = query => `
	SELECT * FROM creativeWork
	WHERE creativeWorkID = :creativeWorkID AND id = :id
`;
