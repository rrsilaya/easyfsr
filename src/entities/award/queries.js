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
    :awardID,
    :grantF,
    :chairGrantTitle,
    :collegeHasNominated,
    :recipientOrNominee,
    :professionalChair,
    :approvedStartDate,
    :endDate
  )
`;

export const updateAward = `
  UPDATE award SET
    awardID=:awardID,
    grant=:grantF,
    chairGrantTitle=:chairGrantTitle,
    collegeHasNominated=:collegeHasNominated,
    receipient/nominee=:recipientOrNominee,
    professionalChair=:professionalChair,
    approvedStartDate=:approvedStartDate,
    endDate=:endDate
  WHERE id = :id
`;

export const getAward = `
  SELECT * FROM award
  WHERE id = :id
  ORDER BY id ASC
  LIMIT 10
`;

export const deleteAward = `
  DELETE FROM award
  WHERE id = :id
`;
