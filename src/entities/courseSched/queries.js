import * as Utils from '../../utils';

export const addCourseSched =
  'INSERT INTO courseSched ( courseNumber, day, time ) VALUES ( :courseNumber, :day, :time )';

export const updateCourseSched = courseSched =>
  `UPDATE courseSched SET ${Utils.formatQueryParams(
    courseSched,
  )} WHERE courseNumber=:courseNumber`;

export const deleteCourseSched =
  'delete from courseSched where courseNumber = :courseNumber';

export const getCourseSched = `
  SELECT * from courseSched
  WHERE courseNumber = :courseNumber
`;

export const selectCourseSched =
  'SELECT *FROM courseSched WHERE courseNumber=:courseNumber, day=:day, time=:time ORDER BY courseNumber ASC LIMIT 10';

export const dropCourseSched = 'DROP TABLE courseSched';
