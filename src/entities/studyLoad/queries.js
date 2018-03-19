export const addStudyLoad =
	'INSERT INTO studyLoad ( studyLoadID, degree, university, totalSLcredits, id )VALUES ( :studyLoadID, :degree, :university, :totalSLcredits, DEFAULT )';

export const updateStudyLoad =
  'UPDATE studyLoad SET degree= :degree, university=:university, totalSLcredits= WHERE id=:id';

export const deleteStudyLoad = 'delete from studyLoad where id = :id';
//made a getAll and getSpecific
export const selectAllStudyLoads =
  'SELECT *FROM studyLoad WHERE id=:id ORDER BY id ASC LIMIT 10';

export const selectStudyLoad =
  'SELECT *FROM studyLoad WHERE id=:id AND university=:university AND degree=:degree AND courseNumber=:courseNumber';
//=============================
export const dropStudyLoad = 'DROP TABLE studyLoad';
