import { formatQueryParams } from '../../utils';

export const addCourse = `
	INSERT INTO course (
		id,
		courseNumber,
		courseID,
		hoursPerWeek,
		school,
		credit
	)
	VALUES (
		:id,
		:courseNumber,
		:courseID,
		:hoursPerWeek,
		:school,
		:credit
	)
`;

export const updateCourse = course => `
	UPDATE course SET
	${formatQueryParams(course)}
	WHERE courseID=:courseID AND id=:id
`;

/*

// Supports single or multiple rows of delete
export const deleteCourses = query =>`
	DELETE FROM subject
	${query.length ? `WHERE ${formatQueryParams(query)}` : ''}
`; 
*/

export const deleteCourse = `
	DELETE FROM course where courseID = :courseID`;

export const getCourses = (query, sortBy) => `
	SELECT * FROM course 
	${query.length ? `WHERE ${formatQueryParams(query)}` : ''} 
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit
`;

export const getCoursesWithSched = (query, sortBy) => `
	SELECT *
	FROM course natural join courseSched
	${query.length ? `WHERE ${formatQueryParams(query)}` : ''}
	ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
	LIMIT :limit
`;

export const getCourseWithSched = `
	SELECT * FROM course NATURAL JOIN courseSched
	WHERE id=:id AND courseID=:courseID
`;

export const addCourseSched = `
	INSERT INTO courseSched (
		courseID,
		day,
		time
	)
	VALUES (
		:courseID,
		:day,
		:time
	);
`;

export const getCourseScheds = query => `
	SELECT FROM courseSched
	${query.length ? `WHERE ${formatQueryParams(query)}` : ''}	
`;

export const updateCourseSched = timeslot => `
	UPDATE courseSched SET
		${formatQueryParams(timeslot)}
	WHERE courseID = :courseID
`;

// Supports single or multiple rows of delete
export const deleteCourseSched = (query = `
	DELETE FROM courseSched
	${query.length ? `WHERE ${formatQueryParams(query)}` : ''}
`);
