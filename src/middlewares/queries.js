export const getUserIDofFSR = `
  SELECT userID FROM fsr
  WHERE id = :id
`;

export const getIDofFSRfromCourse = `
	SELECT id FROM course c
	WHERE c.courseID = :courseID
`;

export const getIDofFSRfromCourseSched = `
	SELECT id FROM course c
	JOIN courseSched cs ON
	c.courseID = cs.courseID
	WHERE cs.courseID = c.courseID 
	AND cs.courseSchedID = :courseSchedID
`;

export const getIDofFSRfromSubject = `
	SELECT id FROM subject s
	WHERE s.subjectID = :subjectID
`;

export const getIDofFSRfromTimeslot = `
	SELECT id FROM subject s
	JOIN timeslot t ON
	s.subjectID = t.subjectID
	WHERE t.subjectID = s.subjectID 
	AND t.timeslotID = :timeslotID
`;

export const getIDofFSRfromResearch = `
	SELECT id FROM research r
	WHERE r.researchID = :researchID
`;

export const getIDofFSRfromRCoAuth = `
	SELECT id FROM research r
	JOIN rCoAuthor rc ON 
	r.researchID = rc.researchID
	WHERE r.researchID = :researchID
`;

export const getIDofFSRfromCreativeWork = `
	SELECT id FROM creativeWork c
	WHERE c.creativeWorkID = :creativeWorkID
`;

export const getIDofFSRfromCWorkCoAuth = `
	SELECT id FROM creativeWork c
	JOIN cworkCoAuthor cc ON 
	c.creativeWorkID = cc.creativeWorkID
	WHERE c.creativeWorkID = :creativeWorkID
`;

export const getIDofFSRfromAdminWork = `
	SELECT id FROM adminWork a
	WHERE a.adminWorkID = :adminWorkID
`;

export const getIDofFSRfromConsultationHours = `
	SELECT id FROM consultationHours ch
	WHERE ch.consultationHoursID = :consultationHoursID
`;

export const getIDofFSRfromService = `
	SELECT id FROM extensionAndCommunityService e
	WHERE e.extensionAndCommunityServiceID = :extensionAndCommunityServiceID
`;

export const getIDofFSRfromLtd = `
	SELECT id FROM limitedPracticeOfProf l
	WHERE l.limitedPracticeOfProfID = :limitedPracticeOfProfID
`;

export const getReceiverIDofNotification = `
	SELECT receiverID FROM notification
	WHERE notificationID = :notificationID
`;
