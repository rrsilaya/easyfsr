// <<<<<<< HEAD
// import * as {formatQueryParams} from '../../utils';

// export const addCourse =
//   'INSERT INTO course ( hoursPerWeek, school, credit, courseNumber ) VALUES ( :hoursPerWeek, :school, :credit, :courseNumber )';

// export const updateCourse = course =>
//   `UPDATE course SET   ${Utils.formatQueryParams(
//     course,
//   )} WHERE courseNumber= :courseNumber`;

// export const deleteCourse =
//   'delete from course where courseNumber = :courseNumber';

// export const getCourse = `
//   SELECT * from course
//   WHERE courseNumber = :courseNumber
// `;

// export const selectCourse =
//   'SELECT *FROM course WHERE fsrID=:fsrID courseNumber=:courseNumber school=:school credit=:credit ORDER BY id ASC LIMIT 10';

// export const dropCourse = 'DROP TABLE course';
// =======
// export const addCourse = `
// 	INSERT INTO course
// 	( id, courseNumber, courseID, hoursPerWeek, school, credit )
// 	VALUES ( :id, :courseNumber, :courseID, :hoursPerWeek, :school, :credit )`;

// export const updateCourse = `
// 	UPDATE course
// 	SET hoursPerWeek=:hoursPerWeek, school=:school, credit=:credit
// 	WHERE courseID=:courseID AND id=:id`;

// export const deleteCourse = `delete from course where courseID = :courseID`;

// export const getAllCourse = `SELECT * from course where id=:id`;

// export const getAllCourseWithSched = `
// 	SELECT * FROM course NATURAL JOIN courseSched
// 	WHERE id=:id
// 	ORDER BY courseID ASC LIMIT 10`;

// export const getCourseWithSched = `SELECT * FROM course NATURAL JOIN courseSched
// 	WHERE id=:id AND courseID=:courseID`;

// export const dropCourse = `DROP TABLE course`;

// export const addCourseSched = `INSERT INTO courseSched ( courseID, day, time ) VALUES ( :courseID, :day, :time );`;

// export const updateCourseSched = `UPDATE courseSched SET day= :day, time=:time  WHERE courseID=:courseID AND id=:id`;

// export const deleteCourseSched = `DELETE from courseSched where courseID = :courseID AND id = :id AND day=:day AND time=:time`;

// export const getCourseSched = `SELECT * FROM courseSched WHERE courseID=:courseID`;

// export const dropCourseSched = `DROP TABLE courseSched`;
// >>>>>>> ea5aeea5985dca8a27aa3a769046e273c9012916
