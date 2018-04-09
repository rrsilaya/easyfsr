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

export const getConsultationHours = (query, sortBy) => `
  SELECT * FROM consultationHours ${
    query.length ? `WHERE ${formatQueryParams(query, 'get')}` : ''
  }
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
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
