import { formatQueryParams } from '../../utils';

export const addCourseSched = ` INSERT INTO courseSched 
	(
    courseID,
 	 	day,
	  timeStart,
    timeEnd
	) 
	VALUES 
	(
		:courseID,
    :day,
		:timeStart,
    :timeEnd
	)`;

export const updateCourseSched = courseSched =>
  `UPDATE courseSched SET ${formatQueryParams(
    courseSched,
  )} WHERE courseSchedID = :courseSchedID`;

export const deleteCourseSched = `
  DELETE from courseSched 
  WHERE courseSchedID = :courseSchedID
`;

export const getCourseSched = `
  SELECT * FROM courseSched 
  WHERE courseSchedID = :courseSchedID
`;

export const getCourseScheds = (query, sortBy, userID) => `
  SELECT courseSchedID, x.courseID, day,timeStart, timeEnd FROM courseSched x ${
    userID
      ? `JOIN course c ON x.courseID = c.courseID LEFT JOIN fsr f ON c.id = f.id WHERE f.userID = :userID ${
          query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit
  OFFSET :offset
`;

export const getTotalCourseScheds = (query, userID) => `
  SELECT COUNT(*) as total FROM courseSched x ${
    userID
      ? `JOIN course c ON x.courseID = c.courseID WHERE id IN (SELECT id FROM fsr WHERE userID=:userID) ${
          query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
