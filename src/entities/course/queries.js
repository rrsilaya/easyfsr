import { formatQueryParams } from '../../utils';

export const addCourse = `
	INSERT INTO course 
	 ( id, 
    courseNumber, 
    courseID, 
    hoursPerWeek, 
    school, 
    credit ) 
	VALUES ( 
    :id, 
    :courseNumber, 
    :courseID, 
    :hoursPerWeek, 
    :school, 
    :credit )`;

export const deleteCourse = `delete from course where courseID = :courseID`;
export const getAllCourse = `SELECT * from course where id=:id`;
export const getCourse = `SELECT * FROM course WHERE  courseID=:courseID`;

export const updateCourse = course =>
  ` UPDATE course 
  SET  ${formatQueryParams(course)} WHERE courseID=:courseID`;

/*


export const getAllCourseWithSched = `
  SELECT * FROM course NATURAL JOIN courseSched 
  WHERE id=:id 
  ORDER BY courseID ASC LIMIT 10`;

export const getCourseWithSched = `SELECT * FROM course NATURAL JOIN courseSched 
  WHERE id=:id AND courseID=:courseID`;

export const dropCourse = `DROP TABLE course`;

export const addCourseSched = `INSERT INTO courseSched ( courseID, day, time ) VALUES ( :courseID, :day, :time );`;

export const updateCourseSched = `UPDATE courseSched SET day= :day, time=:time  WHERE courseID=:courseID AND id=:id`;

export const deleteCourseSched = `DELETE from courseSched where courseID = :courseID AND id = :id AND day=:day AND time=:time`;
export const getCourseSched = `SELECT * FROM courseSched WHERE courseID=:courseID`;


export const dropCourseSched = `DROP TABLE courseSched`;
*/
