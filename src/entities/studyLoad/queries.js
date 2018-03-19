import * as Utils from '../../utils';

export const addStudyLoad = `
	INSERT INTO studyLoad ( 
		id, 
		degree, 
		courseNumber, 
		university, 
		totalSLcredits 
	)

	VALUES ( 
		:id, 
		:degree, 
		:courseNumber, 
		:university, 
		:totalSLcredits 
	)
`;

export const updateStudyLoad = studyLoad => `
	UPDATE studyLoad SET 
		${Utils.formatQueryParams(studyLoad)}
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

export const dropStudyLoad = `
	DROP TABLE studyLoad
`;
