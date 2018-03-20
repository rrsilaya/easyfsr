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

export const updateSubject = subject => `
	UPDATE subject SET
		${formatQueryParams(subject)}
	WHERE subjectID = :subjectID
`;

/*

// Supports single or multiple rows of delete
export const deleteSubjects = query =>`
	DELETE FROM subject
	${query.length ? `WHERE ${formatQueryParams(query)}` : ''}
`; 
*/

export const deleteSubject = `
	DELETE FROM subject
	WHERE id = :id AND subjectID = :subjectID
`;

export const getSubjects = (query, sortBy) => `
	SELECT * FROM subject 
	${query.length ? `WHERE ${formatQueryParams(query)}` : ''} 
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit
`;

export const getSubject = `
	SELECT *
	FROM teachingLoad natural join subject
	WHERE id=:id AND subjectID =:subjectID
`;

export const getSubjectsWithSched = (query, sortBy) => `
	SELECT *
	FROM subject natural join timeslot
	${query.length ? `WHERE ${formatQueryParams(query)}` : ''}
	ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
	LIMIT :limit
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

export const getTimeslots = query => `
	SELECT FROM timeslot
	${query.length ? `WHERE ${formatQueryParams(query)}` : ''}	
`;

export const updateTimeslot = timeslot => `
	UPDATE timeslot SET
		${formatQueryParams(timeslot)}
	WHERE subjectID = :subjectID
`;

// Is this too specific?
export const deleteTimeslot = `
	DELETE FROM timeslot
	WHERE subjectID = :subjectID AND day = :day AND time = :time 
`;

/*

// Supports deleting single or multiple rows at the same time 

export const deleteTimeslots = query =>`
	DELETE FROM timeslot
	${query.length ? `WHERE ${formatQueryParams(query)}` : ''}
`
*/
