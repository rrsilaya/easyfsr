import { formatQueryParams } from '../../utils';

export const addSubject = `
	INSERT INTO subject (
		id,
		subjectCode,
		teachingLoadCreds,
		noOfStudents,
		sectionCode,
		room
	)
	VALUES (
		:id,
		:subjectCode,
		:teachingLoadCreds,
		:noOfStudents,
		:sectionCode,
		:room
	)
`;

export const updateSubject = subject => `  			
	UPDATE subject SET
	${formatQueryParams(subject, 'update')}
	WHERE subjectID = :subjectID
`;

export const deleteSubject = `
	DELETE FROM subject
	WHERE subjectID = :subjectID
`;

export const getSubject = `
	SELECT *
	FROM subject
	WHERE subjectID = :subjectID
`;

export const getSubjects = (query, sortBy, userID) => `
	SELECT ${
    userID
      ? `x.id, 
  subjectID,
  subjectCode,
  x.teachingLoadCreds,
  noOfStudents,
  sectionCode,
  room,
  hoursPerWeek`
      : `*`
  } FROM subject x ${
  userID
    ? `LEFT JOIN fsr f ON x.id = f.id WHERE f.userID = :userID ${
        query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
      }`
    : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
}
  	ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  	LIMIT :limit
`;

export const getTotalSubjects = (query, userID) => `
	SELECT COUNT(*) as total FROM subject x ${
    userID
      ? `WHERE id IN (SELECT id FROM fsr WHERE userID=:userID) ${
          query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;

export const getSubjectsWithTimeslot = `
	SELECT * from subject s LEFT JOIN timeslot t 
	ON s.subjectID = t.subjectID WHERE s.id = :id

`;

export const addTLC = `
  CALL addTLC(:subjectCreds, :id)
`;

export const subTLC = `
  CALL subTLC(:subjectCreds, :id)
`;
