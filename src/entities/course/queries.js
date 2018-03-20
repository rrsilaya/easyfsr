import { formatQueryParams } from '../../utils';

export const addCourse =
  'INSERT INTO course ( hoursPerWeek, school, credit, courseNumber ) VALUES ( :hoursPerWeek, :school, :credit, :courseNumber )';

export const updateCourse = course =>
  `UPDATE course SET   ${formatQueryParams(
    course,
  )} WHERE courseNumber= :courseNumber`;

export const deleteCourse =
  'delete from course where courseNumber = :courseNumber';

export const getCourse = `
  SELECT * from course
  WHERE courseNumber = :courseNumber
`;

export const getCourses = query => `
  SELECT * FROM course ${
    query.length ? `WHERE ${formatQueryParams(query)}` : ''
  }
`;
