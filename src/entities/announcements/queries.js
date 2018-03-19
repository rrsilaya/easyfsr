export const addAnnouncement = `
  INSERT INTO announcement (
    announcementID,
    authorID,
    title,
    body,
    isResolved
  )
  VALUES (
    DEFAULT,
    :authorID,
    :title,
    :body,
    :isResolved
  )
`;

export const updateAnnouncement = `
  UPDATE announcement SET
    announcementID=:announcementID,
    authorID=:authorID,
    title=:title,
    body=:body,
    isResolved=:isResolved
  WHERE announcementID = :announcementID
`;

export const getAllAnnouncements = `
  SELECT * FROM announcement
  WHERE authorID = :authorID
  ORDER BY announcementID ASC
  LIMIT 10
`;

export const getAnnouncement = `
  SELECT * FROM announcement
  WHERE announcementID = :announcementID
`;

export const deleteAnnouncement = `
  DELETE FROM announcement
  WHERE announcementID = :announcementID
`;
