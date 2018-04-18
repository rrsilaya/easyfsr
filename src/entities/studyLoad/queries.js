import { formatQueryParams } from '../../utils';

export const addStudyLoad = `
	INSERT INTO studyLoad ( 
		id,
		fullLeaveWithPay,
		fellowshipRecipient, 
		degree, 
		university, 
		totalSLcredits 
	)
	VALUES ( 
		:id,
		:fullLeaveWithPay,
		:fellowshipRecipient, 
		:degree, 
		:university, 
		:totalSLcredits 
	)
`;

export const updateStudyLoad = studyLoad => `
	UPDATE studyLoad SET 
		${formatQueryParams(studyLoad, 'update')}
		WHERE id = :id
`;

export const deleteStudyLoad = `
	DELETE FROM studyLoad 
		WHERE id = :id
`;

export const getStudyLoad = `
	SELECT * FROM studyLoad
		WHERE id = :id
`;

export const getStudyLoads = (query, sortBy) => `
	SELECT * FROM studyLoad ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
 	ORDER BY [field] ${
    sortBy === 'DESC' ? 'DESC' : 'ASC'
  } LIMIT :limit OFFSET :offset
`;

export const getTotalStudyLoad = query => `
	SELECT count(*) as total FROM studyLoad ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
