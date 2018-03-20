import { formatQueryParams } from '../../utils';

//done
export const addResearch = `
  INSERT INTO research (
    id, 
    researchID, 
    type, 
    role, 
    title, 
    startDate, 
    endDate, 
    funding,
    approvedUnits
  )
  VALUES ( :id, :researchID, :type, :role, :title, :startDate, :endDate, :funding, :approvedUnits )`;

export const updateResearch = `UPDATE research 
  SET type=:type, title=:title, role=:role, startDate=:startDate, endDate=:endDate, funding=:funding, approvedUnits=:approvedUnits  
  WHERE id=:id and researchID=:researchID`;

//done
export const deleteResearch = `delete from research where id=:id AND researchID = :researchID`;

//done
export const selectAllResearch = `SELECT * FROM research WHERE id=:id`;

//done
export const selectAllResearchWithCoAuthor = `SELECT * FROM research NATURAL JOIN rCoAuthor where id = :id`;

//done
export const selectResearch = `SELECT * FROM research WHERE researchID = :researchID`;

//done
export const selectResearchWithCoAuthor = `SELECT * FROM research NATURAL JOIN rCoAuthor where id = :id AND researchID = :researchID`;

export const dropResearch = `DROP TABLE research`;

//done
export const addrCoAuthor = `INSERT INTO rCoAuthor ( researchID, userID ) VALUES (:researchID, :userID)`;

export const updaterCoAuthor = `UPDATE rCoAuthor 
  	SET userID=:userID
  	WHERE researchID=:researchID AND userID = :userID
`;
//done
export const deleterCoAuthor = `delete from rCoAuthor where userID = :userID AND researchID=:researchID`;

export const droprCoAuthor = `DROP TABLE rCoAuthor`;
