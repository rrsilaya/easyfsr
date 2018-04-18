export const getMetaData = `
  SELECT *
  FROM meta
  WHERE id = :id
`;

export const addMetaData = ` 
  INSERT INTO meta (
    acadYear,
    semester,
    formRevision,
    homeDepartment,
    homeCollege,
    universityRegistrar
  ) VALUES (
    :acadYear,
    :semester,
    :formRevision,
    :homeDepartment,
    :homeCollege,
    :universityRegistrar
  )
`;

export const getLastInsertedID = `
  SELECT * FROM meta ORDER BY id DESC LIMIT 1;
`;
