import { formatQueryParams } from '../../utils';

export const addCourseSched = `INSERT INTO courseSched 
  	(
  		courseID,
 	 	day,
  		time
  	) 
  	VALUES 
  	(
  		:courseID,
  		:day,
  		:time 
  	)`;

// export const updateCourseSched = courseSched =>
//   `UPDATE courseSched SET ${Utils.formatQueryParams(
//     courseSched,
//   )} WHERE courseNumber=:courseNumber`;

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

// // export const deleteCourseSched = `DELETE from courseSched where courseID = :courseID`;

// // export const getCourseSched = `SELECT * FROM courseSched WHERE courseID=:courseID`;

// export const deleteCourseSched = `DELETE from courseSched where courseID = :courseID AND id = :id AND day=:day AND time=:time`;
// export const getCourseSched = `SELECT * FROM courseSched WHERE courseID=:courseID`;
