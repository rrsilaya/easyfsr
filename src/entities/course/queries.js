import { formatQueryParams } from '../../utils';

export const addCourse = `
	INSERT INTO course (
		id,
		courseNumber,
		school,
		credit
	)
	VALUES (
		:id,
		:courseNumber,
		:school,
		:credit
	)
`;

export const updateCourse = course => ` 
  UPDATE course SET  
    ${formatQueryParams(course, 'update')} 
  WHERE courseID = :courseID
`;

export const deleteCourse = `
	DELETE FROM course 
  where courseID = :courseID
`;

export const getCourse = `
  SELECT * FROM course 
  WHERE courseID = :courseID
`;

export const getCourses = (query, sortBy, userID) => `
  SELECT ${
    userID
      ? `
    courseNumber,
  courseID,
  school,
  credit,
  hoursPerWeek
  `
      : `*`
  } FROM course x ${
  userID
    ? `LEFT JOIN fsr f ON x.id = f.id WHERE f.userID = :userID ${
        query.length ? `AND ${formatQueryParams(query, 'getUser')}` : ''
      }`
    : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
}
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit OFFSET :offset
`;

export const getTotalCourses = (query, userID) => `
  SELECT count(*) as total FROM course x ${
    userID
      ? `WHERE id IN (SELECT id FROM fsr WHERE userID=:userID) ${
          query.length ? `AND ${formatQueryParams(query, 'get')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
