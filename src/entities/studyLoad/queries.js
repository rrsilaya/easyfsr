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

export const getStudyLoads = (query, sortBy, userID) => `
	SELECT ${
    userID
      ? `
		fullLeaveWithPay,
	  fellowshipRecipient,
	  degree,
	  university,
	  totalSLcredits
		`
      : `*`
  } FROM studyLoad x ${
  userID
    ? `LEFT JOIN fsr f ON x.id = f.id WHERE f.userID = :userID ${
        query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
      }`
    : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
}
 	ORDER BY [field] ${
    sortBy === 'DESC' ? 'DESC' : 'ASC'
  } LIMIT :limit OFFSET :offset
`;

export const getTotalStudyLoad = (query, userID) => `
	SELECT count(*) as total FROM studyLoad x ${
    userID
      ? `WHERE id IN (SELECT id FROM fsr WHERE userID=:userID) ${
          query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
