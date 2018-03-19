export const addReseach = `
	INSERT INTO research (
		id,
		researchID,
		type,
		role,
		title,
		startDate,
		funding,
		approvedUnits
	)
  	VALUES (
  		:id,
  		:researchID,
  		:type,
  		:role,
  		:title,
  		:startDate,
  		:funding,
  		:approvedUnits
  	)
`;

export const updateResearch = `
	UPDATE research SET
		type=:type,
		title=:title,
		role=:role,
		startDate=:startDate,
		endDate=:endDate,
		funding=:funding,
		approvedUnits=:approvedUnits
  	WHERE id=:id and researchID=:researchID
`;

export const deleteResearch = `
	delete from research
	where id=:id AND researchID = :researchID
`;

//nilagyan ko ng orderby at limit
export const selectAllResearches = `
	SELECT * FROM research
	WHERE id=:id
	ORDER BY researchID ASC
	LIMIT 10
`;

export const selectAllResearchesWithCoAuthor = `
	SELECT * FROM research NATURAL JOIN rCoAuthor
	where id = :id
	ORDER BY researchID ASC
	LIMIT 10
`;
//======================================
export const selectResearch = `
	SELECT * FROM research
	WHERE id=:id AND researchID = :researchID
`;

export const selectResearchWithCoAuthor = `
	SELECT * FROM research NATURAL JOIN rCoAuthor
	where id = :id AND researchID = :researchID
`;

export const dropResearch = `
	DROP TABLE research
`;

export const addrCoAuthor = `
	INSERT INTO rCoAuthor (
		researchID,
		userID
	)
	VALUES (
		:researchID,
		:userID
	)
`;

export const updaterCoAuthor = `
	UPDATE rCoAuthor SET
		userID=:userID
  	WHERE researchID=:researchID AND userID = :userID
`;

export const deleterCoAuthor = `
	delete from rCoAuthor
	where userID = :userID AND researchID=:researchID
`;

export const droprCoAuthor = `
	DROP TABLE rCoAuthor
`;
