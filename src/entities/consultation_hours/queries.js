export const addConsultationHour = `
  INSERT INTO consultationHours (
    id, 
    place
  )
  VALUES (
    :id,
    :place
  )
`;

export const updateConsultationHours = `
  UPDATE consultationHours SET 
    place = :place
  WHERE id = :id
`;

export const getAllConsultationHours = `
  SELECT * FROM consultationHours
  WHERE id = :id
`;

export const deleteConsultationHours = `
  DELETE FROM consultationHours
  WHERE id = :id
`;

export const addTimeslot = `
    INSERT INTO chTimeslot (
        id,
        day,
        time
    )
    VALUES (
        :id,
        :day,
        :time
    )
`;

export const updateTimeslot = `
    UPDATE chTimeSlot SET 
        day = :day, 
        time = :time
    WHERE id = :id
`;

export const deleteTimeslot = `
    DELETE FROM chTimeslot
    WHERE id = :id
`;
