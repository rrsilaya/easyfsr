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
		:subjectID, 
		:subjectCode,
		:teachingLoadCreds, 
		:noOfStudents, 
		:hoursPerWeek, 
		:sectionCode, 
		:room
	)
`;

export const updateSubject = `
	UPDATE subject SET 
		teachingLoadCreds = :teachingLoadCreds 
	WHERE subjectCode = :subjectCode
`;

export const deleteSubject = `
	DELETE FROM subject 
	WHERE id = :id
`;

export const getAllSubject = `
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
