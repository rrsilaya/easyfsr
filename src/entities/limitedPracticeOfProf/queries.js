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
  WHERE id=DEFAULT
`;

export const getLimitedPracticeOfProf = `
  SELECT * FROM limitedPracticeOfProf
  WHERE id = :id
  ORDER BY id ASC
  LIMIT 10;
`;

export const deleteLimitedPracticeOfProf = `
  DELETE FROM limitedPracticeOfProf
  WHERE id = ""
`;
