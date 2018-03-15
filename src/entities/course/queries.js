export const addCourse = 'INSERT INTO course ( id, courseID, hoursPerWeek, school, credit ) VALUES ( DEFAULT, :courseID, :hoursPerWeek, :school, :credit )';

export const updateCourse = 'UPDATE course SET hoursPerWeek=:hoursPerWeek, school=:school, credit=:credit  WHERE courseID=“ “';

export const deleteCourse = 'delete from course where courseID = :courseID';

export const selectCourse = 'SELECT *FROM course WHERE fsrID=:fsrID courseI:courseID school=:school credit=:credit ORDER BY id ASC LIMIT 10';

export const dropCourse = 'DROP TABLE course';

export const addCourseSched = 'INSERT INTO courseSched ( courseID, day, time ) VALUES ( :courseID, :day, :time );';

export const updateCourseSched = 'UPDATE courseSched SET day= :day, time=:time  WHERE courseID=:courseID';

export const deleteCourseSched = 'delete from courseSched where courseID = :courseID';

export const selectCourseSched = 'SELECT *FROM courseSched WHERE courseID=:courseID, day=:day, time=:time ORDER BY courseID ASC LIMIT 10';

export const dropCourseSched = 'DROP TABLE courseSched';

