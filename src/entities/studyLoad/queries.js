export const addStudyLoad = 'INSERT INTO studyLoad ( id, degree, courseNumber, university, totalSLcredits )VALUES ( DEFAULT, :degree, :courseNumber, :university, :totalSLcredits )';

export const updateStudyLoad = 'UPDATE studyLoad SET degree= :degree, courseNumber=:courseNumber, university=:courseNumber, totalSLcredits= WHERE id=:id';

export const deleteStudyLoad = 'delete from studyLoad where userID = :userID';

export const selectStudyLoad = 'SELECT *FROM studyLoadWHERE fsrID=:fsrID, university=:university degree=:degree courseNumber=:courseNumber ORDER BY userID ASC LIMIT 10';

export const dropStudyLoad = 'DROP TABLE studyLoad';

