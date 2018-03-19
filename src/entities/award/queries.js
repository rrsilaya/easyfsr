import { formatQueryParams } from '../../utils';

export const addAward = `
  INSERT INTO award ( 
    id,
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

export const getAward = `
  SELECT * FROM award
  WHERE id = :id 
  ORDER BY id ASC
  LIMIT 10
`;

export const getAwards = query => `
  SELECT * FROM award ${query.length ? `WHERE ${formatQueryParams(query)}` : ''}
`;

export const deleteAward = `
  DELETE FROM award
  WHERE id =:id
`;
