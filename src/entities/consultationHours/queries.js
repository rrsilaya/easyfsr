import { formatQueryParams } from '../../utils';

export const addConsultationHours = `
  INSERT INTO consultationHours (
    chID,
    id, 
    place
  )
  VALUES (
    :chID,
    :id,
    :place
  )
`;

export const updateConsultationHours = consultationHours => `
  UPDATE consultationHours SET 
    ${formatQueryParams(consultationHours)}
  WHERE id = :id AND chID = :chID
`;

export const getAllConsultationHours = `
  SELECT * FROM consultationHours NATURAL JOIN chTimeSlot
`;

export const getAllConsultationHoursOfFSR = `
  SELECT * FROM consultationHours NATURAL JOIN chTimeSlot
  WHERE id = :id 
`;

export const deleteConsultationHours = `
  DELETE FROM consultationHours
  WHERE id = :id
`;

export const addTimeslot = `
    INSERT INTO chTimeslot (
        chID,
        id,
        day,
        time
    )
    VALUES (
        :chID,
        :id,
        :day,
        :time
    )
`;

export const updateTimeslot = `
    UPDATE chTimeSlot SET 
        day = :day, 
        time = :time
    WHERE id = :id and chID = :chID
`;

export const deleteTimeslot = `
    DELETE FROM chTimeslot
    WHERE id = :id AND chID = :chID AND day = :day AND time = :time 
`;
