import { formatQueryParams } from '../../utils';

export const addSubject = `
	INSERT INTO subject ( 
		id, 
		subjectCode,
		teachingLoadCreds, 
		noOfStudents, 
		hoursPerWeek, 
		sectionCode, 
		room 
	)
	VALUES ( 
		:id, 
		:subjectCode,
		:teachingLoadCreds, 
		:noOfStudents, 
		:hoursPerWeek, 
		:sectionCode, 
		:room
	)
`;

export const updateSubject = subject => `
  UPDATE subject SET 
   ${formatQueryParams(subject)}
  WHERE id = :id
`;

export const deleteSubject = `
	DELETE FROM subject 
	WHERE id = :id
`;

export const getSubject = query => `
  SELECT * FROM subject ${
    query.length ? `WHERE ${formatQueryParams(query)}` : ''
  }
`;

/*export const getAllSubject = `
	SELECT *
	FROM teachingLoad natural join subject
	WHERE id=:id
	ORDER BY subjectCode ASC
	LIMIT 10
`;

export const getAllSubjectWithSched = `
	SELECT * 
	FROM subject natural join timeslot
	WHERE id=:id
	ORDER BY subjectCode ASC
	LIMIT 10
`;

export const getSubjectWithSched = `
	SELECT * 
	FROM subject natural join timeslot 
	WHERE subjectID=:subjectID AND id=:id 
`;

export const addTimeslot = `
	INSERT INTO timeslot (
		subjectID,
		day,
		time
	)
	VALUES (
		:subjectID,
		:day,
		:time
	)
`;

*/
