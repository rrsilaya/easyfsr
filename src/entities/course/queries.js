export const addCourse = `INSERT INTO course ( id, courseNumber, hoursPerWeek, school, credit ) VALUES ( DEFAULT, :courseNumber, :hoursPerWeek, :school, :credit )`;

export const updateCourse = `UPDATE course SET hoursPerWeek=:hoursPerWeek, school=:school, credit=:credit WHERE courseNumber=:courseNumber AND id=:id`;

export const deleteCourse = `delete from course where courseNumber = :courseNumber`;

export const getAllCourse = `SELECT * from course where id=:id`;

export const getAllCourseWithSched = `SELECT * FROM course NATURAL JOIN courseSched WHERE id=:id ORDER BY id, courseNumber ASC LIMIT 10`;

export const getCourseWithSched = `SELECT * FROM course NATURAL JOIN courseSched WHERE id=:id AND courseNumber=:courseNumber`;

export const dropCourse = `DROP TABLE course`;

export const addCourseSched = `INSERT INTO courseSched ( courseNumber, day, time ) VALUES ( :courseNumber, :day, :time );`;

export const updateCourseSched = `UPDATE courseSched SET day= :day, time=:time  WHERE courseNumber=:courseNumber AND id=:id`;

export const deleteCourseSched = `DELETE from courseSched where courseNumber = :courseNumber AND id = :id AND day=:day AND time=:time`;

export const getCourseSched = `SELECT * FROM courseSched WHERE courseNumber=:courseNumber`;

export const dropCourseSched = `DROP TABLE courseSched`;
