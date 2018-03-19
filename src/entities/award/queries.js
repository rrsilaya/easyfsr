import * as Utils from '../../utils';

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
   ${Utils.formatQueryParams(award)}
  WHERE id = :id
`;

export const getAward = `
  SELECT * FROM award
  WHERE id = :id 
  ORDER BY id ASC
  LIMIT 10
`;

export const getAllAward = `
  SELECT * FROM award
`;

export const deleteAward = `
  DELETE FROM award
  WHERE id =:id
`;
