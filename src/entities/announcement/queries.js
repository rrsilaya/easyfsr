import { formatQueryParams } from '../../utils';

export const getAnnouncement = `
  SELECT * FROM announcement
  WHERE announcementID = :announcementID
`;

export const getAllAnnouncements = (query, sortBy) => `
  SELECT * FROM announcement
  ${query.length ? `WHERE ${formatQueryParams(query)}` : ''} 
  ORDER BY [field] ${sortBy === 'DESC' ? 'DESC' : 'ASC'} 
  LIMIT :limit
`;

export const updateAnnouncement = announcement => `
  UPDATE announcement SET 
    ${formatQueryParams(announcement)}
  WHERE announcementID = :announcementID
`;

export const addAnnouncement = `
  INSERT INTO announcement ( 
    announcementID,
    userID,
    title,
    body,
    isResolved
  )
  VALUES ( 
    DEFAULT,
    :userID,
    :title,
    :body,
    :isResolved
  )
`;

export const deleteAnnouncement = `
  UPDATE announcement SET
    isResolved = true
  WHERE announcementID = :announcementID
`;
