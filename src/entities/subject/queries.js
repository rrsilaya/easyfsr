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

/*GETS SPECIFIC SUBJECT*/
export const getSubjects = query => ` 
  SELECT * FROM subject ${
    query.length ? `WHERE ${formatQueryParams(query)}` : ''
  }
`;
/*GETS ALL SUBJECTS*/
export const getSubject = query => `
	SELECT *
	FROM subject natural join teachingLoad
	WHERE id=id
	ORDER BY subjectCode ASC
	LIMIT 10
`;
/*GETS ALL SUBJECTS WITH SPECIFIC SCHED*/
export const getAllSubjectsWithSched = query => `
	SELECT * 
	FROM subject natural join timeslot
	WHERE id=id
	ORDER BY subjectCode ASC
	LIMIT 10
`;

export const getSubjectWithSched = query => `
	SELECT * 
	FROM subject natural join timeslot 
	WHERE subjectID=subjectID AND id=id 
`;

export const addTimeSlot = `
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
