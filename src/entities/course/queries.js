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
