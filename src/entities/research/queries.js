export const addReseach =
  'INSERT INTO research ( id, researchCode, type, role, title, startDate, funding, approvedUnits ) VALUES ( :id, :researchCode, :type, :role, :title, :startDate, :funding, :approvedUnits );';

export const updateResearch =
  'UPDATE research SET type=:type, title=:title, role=:role, startDate=:startDate, endDate=:endDate, funding=:funding, approvedUnits=:approvedUnits  WHERE id=:id and researchCode=:researchCode';

export const deleteResearch =
  'delete from research where researchID = :researchID';

export const selectResearch =
  'SELECT * FROM research WHERE fsrID=:fsrID, researchID=:researchID, type=:type, role=:role, title=:title, startDate=:startDate endDate=:endDate, funding=:funding, approvedUnits=:approvedUnits ORDER BY id ASC LIMIT 10';

export const dropResearch = 'DROP TABLE research';

export const addrCoAuthor =
  'INSERT INTO rCoAuthor ( id, degree, courseNumber, university, totalSLcredits )VALUES ( DEFAULT, :degree, :courseNumber, :university, :totalSLcredits )';

export const updaterCoAuthor =
  'UPDATE rCoAuthor SET degree= :degree, courseNumber=:courseNumber, university=:courseNumber, totalSLcredits= WHERE id=:id';

export const deleterCoAuthor = 'delete from rCoAuthor where userID = :userID';

export const selectrCoAuthor =
  'SELECT *FROM rCoAuthorWHERE fsrID=:fsrID, university=:university degree=:degree courseNumber=:courseNumber ORDER BY userID ASC LIMIT 10';

export const droprCoAuthor = 'DROP TABLE rCoAuthor';
