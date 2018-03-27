import { formatQueryParams } from '../../utils';

export const addCourseSched = `INSERT INTO courseSched 
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
  )} WHERE courseSchedID=:courseSchedID`;

// export const deleteCourseSched =
//   'delete from courseSched where courseNumber = :courseNumber';

// export const getCourseSched = `
//   SELECT * from courseSched
//   WHERE courseNumber = :courseNumber
// `;

// export const selectCourseSched =
//   'SELECT *FROM courseSched WHERE courseNumber=:courseNumber, day=:day, time=:time ORDER BY courseNumber ASC LIMIT 10';

// export const dropCourseSched = 'DROP TABLE courseSched';

// // export const getCourseSchedules = ` SELECT * FROM courseSched WHERE courseNumber=:courseNumber`;

export const deleteCourseSched = `DELETE from courseSched where courseSchedID = :courseSchedID`;

// // export const getCourseSched = `SELECT * FROM courseSched WHERE courseID=:courseID`;

export const getCourseSched = `SELECT * FROM courseSched WHERE courseSchedID=:courseSchedID`;

export const getCourseScheds = (query, sortBy) => `
  SELECT * FROM courseSched ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
  ORDER BY [field] ${
    sortBy === 'DESC' ? 'DESC' : 'ASC'
  } LIMIT :limit OFFSET :offset

`;

export const getTotalCourseScheds = () => `SELECT count(*) FROM courseSched`;
