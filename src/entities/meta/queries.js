export const getMetadata = `
  SELECT
    acadYear,
    semester,
    formRevision,
    homeDepartment,
    homeCollege
    universityRegistrar
  FROM meta
  WHERE id = 1
`;
