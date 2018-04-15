import { formatQueryParams } from '../../utils';

export const addAward = `
  INSERT INTO award (
    id,
    awardID,
    grantF,
    chairGrantTitle,
    collegeHasNominated,
    recipientOrNominee,
    professionalChair,
    approvedStartDate,
    endDate,
    filepath
  )
  VALUES (
    :id,
    DEFAULT,
    :grantF,
    :chairGrantTitle,
    :collegeHasNominated,
    :recipientOrNominee,
    :professionalChair,
    :approvedStartDate,
    :endDate,
    :filepath
  )
`;

export const updateAward = award => `
  UPDATE award SET 
   ${formatQueryParams(award, 'update')}
  WHERE awardID = :awardID
`;

export const deleteAward = `
  DELETE FROM award
  WHERE awardID = :awardID
`;

export const getAward = `
  SELECT * FROM award
  WHERE awardID = :awardID
`;

export const getAwards = (query, sortBy, userID) => `
 SELECT * FROM award x ${
   userID
     ? `JOIN fsr f ON x.id = f.id WHERE f.userID = :userID ${
         query.length ? `AND ${formatQueryParams(query, 'getUser')}` : ''
       }`
     : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
 }
  ORDER BY ${userID ? `f.` : ''}[field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit OFFSET :offset
`;

export const getTotalAwards = (query, userID) => `
  SELECT count(*) as total FROM award x ${
    userID
      ? `JOIN fsr f ON x.id = f.id WHERE f.userID = :userID ${
          query.length ? `AND ${formatQueryParams(query, 'getUser')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
