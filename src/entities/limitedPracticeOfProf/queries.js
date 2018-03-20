import { formatQueryParams } from '../../utils';

export const getLimitedPracticeOfProf = `
  SELECT * FROM limitedPracticeOfProf
  WHERE id = :id
  ORDER BY id ASC
  LIMIT 10;
`;

export const updateLimitedPracticeOfProf = limitedPracticeOfProf => `
  UPDATE limitedPracticeOfProf SET 
     ${formatQueryParams(limitedPracticeOfProf)} 
  WHERE id=DEFAULT
`;

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

export const deleteLimitedPracticeOfProf = `
  DELETE FROM limitedPracticeOfProf
  WHERE id = ""
`;
