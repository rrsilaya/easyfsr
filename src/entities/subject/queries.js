import { formatQueryParams } from '../../utils';

export const addSubject = `
	INSERT INTO subject (
		id,
		subjectCode,
		subjectID,
		teachingLoadCreds,
		noOfStudents,
		hoursPerWeek,
		sectionCode,
		room
	)
	VALUES (
		:id,
		:subjectCode,
		DEFAULT,
		:teachingLoadCreds,
		:noOfStudents,
		:hoursPerWeek,
		:sectionCode,
		:room
	)
`;

export const getSubjects = (query, sortBy) => `
	SELECT * FROM subject ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  } 
  	ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  	LIMIT :limit
`;

export const getSubject = `
	SELECT *
	FROM subject
	WHERE subjectID =:subjectID
`;

//FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
export const updateSubject = subject => `  			
	UPDATE subject SET
	${formatQueryParams(subject, 'update')}
	WHERE subjectID = :subjectID
`;

export const deleteSubject = `
	DELETE FROM subject
	WHERE subjectID = :subjectID
`;

//ADDITIONAL GET FOR SUBJECTS

export const getSubjectsWithSched = (query, sortBy) => `
	SELECT *
	FROM subject natural join timeslot ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
	ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
	LIMIT :limit
`;

export const getSubjectWithSched = `
	SELECT *
	FROM subject natural join timeslot
	WHERE subjectID=:subjectID
`;
