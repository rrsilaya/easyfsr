import { formatQueryParams } from '../../utils';

export const addTimeslot = `
	INSERT INTO timeslot (
		timeslotID,
		subjectID,
		day,
		timeStart,
		timeEnd
	)
	VALUES (
		DEFAULT,
		:subjectID,
		:day,
		:timeStart,
		:timeEnd
	)
`;

export const getTimeslots = (query, sortBy, userID) => `
	SELECT x.subjectID, day, timeStart, timeEnd FROM timeslot x ${
    userID
      ? `JOIN subject s ON x.subjectID = s.subjectID LEFT JOIN fsr f ON s.id = f.id WHERE f.userID = :userID ${
          query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
  	ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  	LIMIT :limit
  	OFFSET :offset
`;

export const getTimeslot = `
	SELECT *
	FROM timeslot
	WHERE timeslotID=:timeslotID
`;

export const updateTimeslot = timeslot => `
	UPDATE timeslot SET
	${formatQueryParams(timeslot, 'update')}
	WHERE timeslotID=:timeslotID
`;

export const deleteTimeslot = `
	DELETE FROM timeslot
	WHERE timeslotID = :timeslotID
`;

export const getTotalTimeslots = (query, userID) => `
	SELECT COUNT(*) as total FROM timeslot x ${
    userID
      ? `JOIN subject s ON x.subjectID = s.subjectID WHERE id IN (SELECT id FROM fsr WHERE userID=:userID) ${
          query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
