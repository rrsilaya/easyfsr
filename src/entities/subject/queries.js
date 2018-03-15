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
		DEFAULT, 
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
	ORDER BY subjectCode ASC
	LIMIT 10
`;


