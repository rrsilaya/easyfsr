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
    endDate
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
    :endDate
  )
`;

export const updateAward = award => `
  UPDATE award SET
  ${formatQueryParams(award)}
  WHERE id = :id
`;

export const getAwards = (query, sortBy) => `
  SELECT *
  FROM award
  ${query.length ? `WHERE ${formatQueryParams(query)}` : ''}
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit
`;

export const deleteAward = `
  DELETE FROM award
  WHERE id = :id
`;

/*
// Supports single or multiple rows of delete 

export const deleteAward = `
  DELETE FROM award
  ${query.length ? `WHERE ${formatQueryParams(query)}` : ''}
`;

*/
