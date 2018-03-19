export const addLimitedPracticeOfProf = `
  INSERT INTO limitedPracticeOfProf ( 
    id,
    askedPermission,
    date 
  )
  VALUES ( 
    :id,
    :askedPermission,
    :date
  )
`;

export const updateLimitedPracticeOfProf = `
  UPDATE limitedPracticeOfProf SET 
    askedPermission=:askedPermission,
    date=:date  
  WHERE id=:id
`;

export const getLimitedPracticeOfProf = `
  SELECT * FROM limitedPracticeOfProf
  WHERE id = :id
`;

export const deleteLimitedPracticeOfProf = `
  DELETE FROM limitedPracticeOfProf
  WHERE id = :id
`;
