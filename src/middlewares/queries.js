export const getUserIDofFSR = `
  SELECT userID FROM fsr
  WHERE id = :id
`;

export const getIDofFSRfromCourse = `
	SELECT id FROM course c
	JOIN courseSched cs ON 
	c.courseID = cs.courseID
	WHERE c.courseID = :courseID
`;

export const getIDofFSRfromSubject = `
	SELECT id FROM subject s
	JOIN timeslot t ON 
	s.subjectID = t.subjectID
	WHERE s.subjectID = :subjectID
`;
