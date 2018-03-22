export const addStudyLoad =
  'INSERT INTO studyLoad ( degree, university, totalSLcredits, id )VALUES ( :degree, :university, :totalSLcredits, DEFAULT )';

export const updateStudyLoad =
  'UPDATE studyLoad SET degree= :degree, university=:university, totalSLcredits= WHERE id=:id';

export const deleteStudyLoad = 'delete from studyLoad where id = :id';

export const selectStudyLoad =
  'SELECT *FROM studyLoad WHERE id=:id, university=:university degree=:degree courseNumber=:courseNumber ORDER BY id ASC LIMIT 10';

export const dropStudyLoad = 'DROP TABLE studyLoad';
