import { formatQueryParams } from '../../utils';

export const addConsultationHour = `
  INSERT INTO consultationHours(
    chID,
    id,
    place,
    day,
    timeStart,
    timeEnd
  )
  VALUES (
    DEFAULT,
    :id,
    :place,
    :day,
    :timeStart,
    :timeEnd
  )
`;

export const updateConsultationHour = consultationHour => `
  UPDATE consultationHours SET 
  ${formatQueryParams(consultationHour, 'update')}
  WHERE chID = :chID
`;

export const getConsultationHours = (query, sortBy, userID) => `
  SELECT * FROM consultationHours x ${
    userID
      ? `JOIN fsr f ON x.id = f.id WHERE f.userID = :userID ${
          query.length ? `AND ${formatQueryParams(query, 'getUser')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
  ORDER BY ${userID ? `f.` : ''}[field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit OFFSET :offset
`;

export const getConsultationHour = `
  SELECT * FROM consultationHours
  WHERE chID = :chID
`;

export const deleteConsultationHour = `
  DELETE FROM consultationHours
  WHERE chID = :chID
`;

export const getTotalConsultationHours = (query, userID) => `
  SELECT count(*) as total FROM consultationHours x ${
    userID
      ? `JOIN fsr f ON x.id = f.id WHERE f.userID = :userID ${
          query.length ? `AND ${formatQueryParams(query, 'getUser')}` : ''
        }`
      : query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
`;
