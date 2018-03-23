import { formatQueryParams } from '../../utils';

export const addStudyLoad = `
	INSERT INTO studyLoad ( 
		id, 
		degree, 
		university, 
		totalSLcredits 
	)

	VALUES ( 
		:id, 
		:degree, 
		:university, 
		:totalSLcredits 
	)
`;

export const updateStudyLoad = studyLoad => `
	UPDATE studyLoad SET 
		${formatQueryParams(studyLoad)}
		WHERE id = :id
`;

export const deleteStudyLoad = `
	DELETE FROM studyLoad 
		where id = :id
`;

export const getStudyLoad = `
	SELECT * FROM studyLoad
		WHERE id = :id 
		ORDER BY id ASC 
		LIMIT 10
`;

export const getStudyLoads = query => `
	SELECT * FROM studyLoad 
	${query.length ? `WHERE ${formatQueryParams(query)}` : ''}
`;

export const dropStudyLoad = `
	DROP TABLE studyLoad
`;
