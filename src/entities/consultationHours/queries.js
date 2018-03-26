import { formatQueryParams } from '../../utils';

export const addConsultationHours = `
  INSERT INTO consultationHours (
    chID,
    id, 
    place
  )
  VALUES (
    DEFAULT,
    :id,
    :place
  )
`;

export const updateConsultationHours = consultationHours => `
  UPDATE consultationHours SET 
    ${formatQueryParams(consultationHours)}
  WHERE chID = :chID
`;

export const deleteConsultationHours = `
  DELETE FROM consultationHours
  WHERE chID = :chID
`;

export const addTimeslot = `
    INSERT INTO chTimeslot (
        chID,
        id,
        day,
        timeStart,
        timeEnd
    )
    VALUES (
        DEFAULT,
        :id,
        :day,
        :timeStart,
        :timeEnd
    )
`;

// get All time slots

export const getTimeslot = `
    SELECT * FROM chTimeslot
    WHERE chTimeSlotID = :chTimeSlotID
`;

export const updateTimeslot = `
    UPDATE chTimeSlot SET 
      ${formatQueryParams(consultationHours, 'update')}
    WHERE chTimeslotID = :chTimeslotID
`;

export const deleteTimeslot = `
    DELETE FROM chTimeslot
    WHERE chTimeslotID=:chTimeslotID
`;

// Natural join for consultationHours and chTimeslot

export const getAllConsultationHours = `
  SELECT * FROM consultationHours NATURAL JOIN chTimeSlot
`;

export const getAllConsultationHoursOfFSR = `
  SELECT * FROM consultationHours NATURAL JOIN chTimeSlot
  WHERE id = :id 
`;
