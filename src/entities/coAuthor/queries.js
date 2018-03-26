import { formatQueryParams } from '../../utils';

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

export const getCoAuthor = `
	SELECT * FROM cworkCoAuthor
	WHERE userID = :userID
`;
